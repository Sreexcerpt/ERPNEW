const express = require('express');
const router = express.Router();
const materialController = require('../controllers/Material');

router.post('/generate-id', materialController.generateMaterialId);
router.post('/', materialController.createMaterial);
router.get('/', materialController.getAllMaterials);
router.put('/:id', materialController.updateMaterial);
router.get('/:id', materialController.getMaterialById);

module.exports = router;
