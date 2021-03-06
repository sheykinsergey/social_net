const router = require('express').Router();
const postService = require('../services/store/post.service');
const asyncError = require('../middlewares/asyncError');
const authMiddleware = require('../middlewares/authMiddleware');

const imgPost = require('./imgPost')
const editImgPost = require('./editImgPost')

router.get('/', asyncError(async (req, res) => {
	res.send(await postService.getAllPosts());
}));

router.get('/:postId', asyncError(async (req, res) => {
	res.send(await postService.getPostId(req.params.postId));
}));

router.get('/:postId/comments', asyncError(async (req, res) => {
	res.send(await postService.getPostIdComments(req.params.postId));
}));

router.get('/:postId/likes', asyncError(async (req, res) => {
	res.send(await postService.getPostIdLikes(req.params.postId));
}));

router.post('/add', imgPost.single('imgPost'), (req, res, next) => {
	console.log('req.auth');
	console.log(req.headers.authorization);
	{req.file ? postService.addPostAndImage(req.body, req.file) : postService.addPost(req.body)}
	res.status(201).send('Created new article!');
});

router.put('/:postId', asyncError(async (req, res) => {
	await postService.updatePost(req.params.postId, req.body);
	res.status(200).send('Post updated!');
}));

router.post('/:id', editImgPost.single('imgPost'), (req, res, next) => {
	res.status(200).send('Post image updated!');
});

router.delete('/:postId', asyncError(async (req, res) => {
	await postService.deletePost(req.params.postId)
	res.status(200).send('Post deleted!');
}));

module.exports = router;