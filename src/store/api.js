import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 1000
});

const loadRoutes = async () => {
  const url = `/routes`;

  try {
    const { data } = await http.get(url);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'error', data: null };
  }
};

const loadPlugins = async (tab) => {
  const url = `/plugins/${tab}`;

  try {
    const { data } = await http.get(url);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'error', data: null };
  }
};

const Service = {
  loadRoutes,
  loadPlugins
};

export default Service;
