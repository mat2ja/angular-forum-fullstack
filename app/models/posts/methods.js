const { db } = require('../../../db/mongo');
const { ObjectId } = require('mongodb');

const Posts = db.collection('posts');

const getPosts = async () => {
  try {
    const posts = await Posts.find({}).toArray();
    return posts;
  } catch (err) {
    throw new Error('Error fetching posts');
  }
};

const addPost = async (postData) => {
  try {
    const addedPost = await Posts.insertOne(postData);
    return addedPost;
  } catch (err) {
    throw new Error('Error fetching posts');
  }
};

const editPost = async (postId, postData, userId) => {
  try {
    const post = await Posts.updateOne(
      {
        _id: ObjectId(postId),
        userId: ObjectId(userId),
      },
      { $set: postData }
    );
    return post;
  } catch (err) {
    throw new Error('Error updating post');
  }
};

const deletePost = async (postId, userId) => {
  try {
    const deletedPost = await Posts.deleteOne({
      _id: ObjectId(postId),
      userId: ObjectId(userId),
    });
    return deletedPost;
  } catch (err) {
    throw new Error('Error deleting post');
  }
};

module.exports = {
  getPosts,
  addPost,
  editPost,
  deletePost,
};
