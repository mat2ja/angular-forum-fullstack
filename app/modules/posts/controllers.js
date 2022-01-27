const Methods = require('./methods.js');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Methods.getPosts();
    if (!posts) {
      return res.status(404).send({ error: 'Posts not found' });
    }
    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addNewPost = async (req, res) => {
  console.log('add new post');
  try {
    const userId = req.user._id;
    const { comment } = req.body;
    const created_at = new Date();
    const post = { userId, comment, created_at };

    await Methods.addPost(post);
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const updatedPost = await Methods.editPost(postId, { comment });
    if (!updatedPost) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(updatedPost);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Methods.deletePost(postId);
    if (!deletedPost) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(deletedPost);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllPosts,
  addNewPost,
  editPost,
  deletePost,
};
