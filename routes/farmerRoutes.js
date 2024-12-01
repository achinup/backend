const express = require('express');
const {
  addFarmer,
  updateFarmer,
  deleteFarmer,
  detail,
  searchFarmers
 
} = require('../controllers/farmerController');

const router = express.Router();

router.post('/add', addFarmer);
router.put('/update', updateFarmer);
router.delete('/delete', deleteFarmer);          // Delete entire farmer
// router.delete('/delete-produce/:id', deleteProduceItem);  // Delete specific produce item
router.get('/detail', detail);      
router.get('/search', searchFarmers);   
            

module.exports = router;
