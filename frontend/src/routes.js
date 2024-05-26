import axios from 'axios';

const baseURL = 'http://localhost:5000';

const api = axios.create({
  baseURL,
});

const routes = {
  tasksPath: () => `${baseURL}/api/tasks`,
  taskPath: (id) => `${baseURL}/api/tasks/${id}`,
  cardsPath: () => `${baseURL}/api/cards`,
  cardPath: (id) => `${baseURL}/api/cards/${id}`,
  tasksDelCompPath: () => `${baseURL}/api/tasks/complited`,
  settingsSetPath: () => `${baseURL}/api/settings`,
};

export { api, routes };