import axios from 'axios';
const env = {
  host: process.env.REACT_APP_HOST_URL,
  useAuth: process.env.REACT_APP_USE_AUTH,
  user: process.env.REACT_APP_AUTH_USER,
  pass: process.env.REACT_APP_AUTH_PASS
};

export const getData = async (query = {}, page = 0) => {
  const url = `${env.host}/api/stores?q=${JSON.stringify(query)}&limit=10&page=${page}`;
  console.log(url);
  let auth = {};
  if (env.useAuth) {
    auth = {
      username: env.user,
      password: env.pass
    };
  }
  const out = await axios.get(url, { auth: auth });
  return out.data;
};
