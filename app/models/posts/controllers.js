const Methods = require('./methods.js');

const getAllPosts = async (req, res) => {
  try {
    const includeUser = req.query.includeUser == 'true';
    const posts = await Methods.getPosts(includeUser);
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
    const timestamp = new Date();
    const post = { userId, comment, timestamp };

    await Methods.addPost(post);
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const updatedPost = await Methods.editPost(
      postId,
      { comment },
      req.user._id
    );
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
    const deletedPost = await Methods.deletePost(postId, req.user._id);
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
