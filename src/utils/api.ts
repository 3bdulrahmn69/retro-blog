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
export const getAllPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    return response.data;
  } catch (e) {
    console.error('Error fetching posts:', e);
    return [];
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    return response.data;
  } catch (e) {
    console.error('Error fetching post:', e);
    return null;
  }
};

export const createPost = async (postData: unknown, token: string) => {
  try {
    const response = await axios.post('http://localhost:3000/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error('Error creating post:', e);
    return null;
  }
};
