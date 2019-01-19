const express = require('express')
const router = express.Router()
const controllers = require('../controllers/customerController.js')

router.get('/', controllers.list )
router.post('/add',controllers.save)
router.get('/delete/:id', controllers.delete)
router.get('/update/:id', controllers.update)
router.post('/update/:id', controllers.updateData)

module.exports = router
