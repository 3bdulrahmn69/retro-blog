import axios from 'axios';
import type { Post } from '../types/types';

export const userRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userData = {
      name,
      email,
      password,
    };

    const response = await axios.post(
      'http://localhost:3000/register',
      userData
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    const userData = {
      email,
      password,
    };

    const response = await axios.post('http://localhost:3000/login', userData);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Add blog posts API functions
export const getAllPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    // Filter out deleted posts
    const posts = response.data.filter((post: Post) => !post.isDeleted);
    return posts;
  } catch (e) {
    console.error('Error fetching posts:', e);
    return [];
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    const post = response.data;

    if (post && post.isDeleted) {
      return null;
    }

    return post;
  } catch (e) {
    console.error('Error fetching post:', e);
    return null;
  }
};

export const createPost = async (postData: Post, token: string) => {
  try {
    const postWithDeleteFlag = {
      ...postData,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    const response = await axios.post(
      'http://localhost:3000/posts',
      postWithDeleteFlag,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error('Error creating post:', e);
    return null;
  }
};

export const updatePost = async (id: string, postData: Post, token: string) => {
  try {
    const postWithDeleteFlag = {
      ...postData,
      isDeleted: postData.isDeleted || false,
      editedAt: new Date().toISOString(), // add an editedAt timestamp
    };

    const response = await axios.put(
      `http://localhost:3000/posts/${id}`,
      postWithDeleteFlag,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error('Error updating post:', e);
    return null;
  }
};

// New soft delete function
export const deletePost = async (id: string, token: string) => {
  try {
    const currentPost = await axios.get(`http://localhost:3000/posts/${id}`);

    if (!currentPost.data) {
      return null;
    }

    const deletedPost = {
      ...currentPost.data,
      isDeleted: true,
      deletedAt: new Date().toISOString(), // add a deletedAt timestamp
    };

    const response = await axios.put(
      `http://localhost:3000/posts/${id}`,
      deletedPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error('Error deleting post:', e);
    return null;
  }
};

// comment API functions
export const getCommentsByPostId = async (postId: string) => {
  try {
    // Get the post first to access its comments
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    const post = response.data;

    if (post && post.comments) {
      return post.comments;
    }
    return [];
  } catch (e) {
    console.error('Error fetching comments:', e);
    return [];
  }
};

export const addCommentToPost = async (
  postId: string,
  commentData: { content: string; userId: string; userName?: string },
  token: string
) => {
  try {
    // First get the current post
    const currentPostResponse = await axios.get(
      `http://localhost:3000/posts/${postId}`
    );
    const currentPost = currentPostResponse.data;

    if (!currentPost) {
      throw new Error('Post not found');
    }

    // Create new comment
    const newComment = {
      id: Date.now().toString(),
      content: commentData.content,
      userId: commentData.userId,
      userName: commentData.userName || 'Anonymous',
      createdAt: new Date().toISOString(),
    };

    // Add comment to post's comments array
    const updatedComments = [...(currentPost.comments || []), newComment];

    // Update the post with the new comment
    await axios.put(
      `http://localhost:3000/posts/${postId}`,
      {
        ...currentPost,
        comments: updatedComments,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return newComment;
  } catch (e) {
    console.error('Error adding comment:', e);
    return null;
  }
};
