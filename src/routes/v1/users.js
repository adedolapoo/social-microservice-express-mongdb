const router = require('express').Router()
const UsersController = require('../../controllers/users.controller');

router.get('/', (req, res) => {
  UsersController.findAll(req, res);
})

router.post('/', (req, res) => {
  UsersController.create(req, res);
})

router.get('/:id', (req, res) => {
  UsersController.find(req, res)
})

router.patch('/:id', (req, res) => {
  UsersController.update(req, res)
})

router.delete('/:id', (req, res) => {
  UsersController.delete(req, res)
})

module.exports = router