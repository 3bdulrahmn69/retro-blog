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
