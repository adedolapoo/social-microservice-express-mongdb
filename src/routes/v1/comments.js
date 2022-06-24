const router = require('express').Router()

const CommentsController = require('../../controllers/comments.controller');

router.post('/', (req, res) => {
  CommentsController.create(req, res);
})

router.get('/stats', (req, res) =>  {
  CommentsController.getStat(req, res)
})

router.get('/:userId', (req, res) => {
  CommentsController.findForUser(req, res)
})

router.get('/single/:id', (req, res) => {
  CommentsController.find(req, res)
})

router.patch('/:id', (req, res) => {
  CommentsController.update(req, res)
})

router.delete('/:id', (req, res) => {
  CommentsController.delete(req, res)
})

module.exports = router