const { db } = require('../../../db/mongo');
const { ObjectId } = require('mongodb');

const Posts = db.collection('posts');

const getPosts = async (includeUser = false) => {
  try {
    if (includeUser) {
      const posts = await Posts.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]).toArray();
      posts.forEach(
        (post) => (post.user = { username: post.user[0].username })
      );

      return posts;
    } else {
      return await Posts.find({}).toArray();
    }
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
