import axios from 'axios';

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
// Define a Post type
type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  isDeleted?: boolean;
};

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
    // Return null if post is deleted
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
    // Add isDeleted: false to new posts
    const postWithDeleteFlag = {
      ...postData,
      isDeleted: false,
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
    // Ensure isDeleted flag is preserved/set correctly
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
    // First get the current post data
    const currentPost = await axios.get(`http://localhost:3000/posts/${id}`);

    if (!currentPost.data) {
      return null;
    }

    // Update the post with isDeleted: true
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
