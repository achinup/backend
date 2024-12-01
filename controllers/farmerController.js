// controllers/farmerController.js
const Farmer = require('../models/Farmer');

exports.addFarmer = async (req, res) => {
  try {
    const { contactNumber } = req.body;
    
    // Check if a farmer with the same contact number already exists
    const existingFarmer = await Farmer.findOne({ contactNumber });

    if (!existingFarmer) {
      const farmer = new Farmer(req.body);
      await farmer.save();
      res.status(201).json({ message: 'Farmer details saved successfully!' });
    } else {
      res.status(400).json({ message: 'Contact number already exists' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to save farmer details.' });
  }
};




exports.updateFarmer = async (req, res) => {
  const { name } = req.query;
  const updatedDetails = req.body;

  if (!name) {
    return res.status(400).json({ error: "Farmer name is required." });
  }

  try {
    const farmer = await Farmer.findOneAndUpdate(
      { name },
      updatedDetails,
      { new: true, runValidators: true }
    );

    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found." });
    }

    res.status(200).json(farmer);
  } catch (err) {
    console.error("Error updating farmer:", err);
    res.status(500).json({ error: "Failed to update farmer details." });
  }
};





exports.deleteFarmer = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Farmer name is required." });
  }

  try {
    const farmer = await Farmer.findOneAndDelete({ name });

    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found." });
    }

    res.status(200).json({ message: "Farmer profile deleted successfully." });
  } catch (err) {
    console.error("Error deleting farmer:", err);
    res.status(500).json({ error: "Failed to delete farmer profile." });
  }
};





exports.detail = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required.' });
  }

  try {
    // Find farmer by name
    const farmer = await Farmer.findOne({ name });

    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found.' });
    }

    // Respond with farmer details
    return res.status(200).json({
      contactNumber: farmer.contactNumber,
      name: farmer.name,  // Changed to name
      location: farmer.location,
      produce: farmer.produce,
    });
  } catch (err) {
    console.error('Error fetching farmer details:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



exports.searchFarmers = async (req, res) => {
  const { location, grocery } = req.query;

  try {
    const filter = {};

    // Add location filter if provided
    if (location) {
      filter.location = location;
    }

    // Add grocery filter if provided
    if (grocery) {
      filter.produce = { $elemMatch: { item: grocery } };
    }

    // Find farmers based on the filter
    const farmers = await Farmer.find(filter, {
      contactNumber: 1,
      location: 1,
      produce: grocery ? { $elemMatch: { item: grocery } } : 1 // Include all produce if no grocery is specified
    });

    if (farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found with the given criteria" });
    }

    // Transform the result to include all produce if grocery is not provided
    const result = farmers.map(farmer => {
      const selectedProduce = grocery
        ? farmer.produce.find(p => p.item === grocery)
        : farmer.produce; // Include all produce if grocery is not specified
      return {
        contactNumber: farmer.contactNumber,
        // location: farmer.location,
        produce: Array.isArray(selectedProduce) ? selectedProduce : [selectedProduce].filter(Boolean)
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving farmers", error });
  }
};

