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

const loadPlugins = async (routeId) => {
  const url = `/plugins/${routeId}`;

  try {
    const { data } = await http.get(url);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'error', data: null };
  }
};

const updatePlugin = async (routeId, pluginId, diff) => {
  const url = `/plugins/${routeId}/${pluginId}`;

  try {
    await http.patch(url, diff);
    return { status: 'success'};
  } catch (error) {
    return { status: 'error' };
  }
};

const Service = {
  loadRoutes,
  loadPlugins,
  updatePlugin
};

export default Service;
