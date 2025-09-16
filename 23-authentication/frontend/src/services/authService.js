const USER_DATA_KEY = 'userData';

const authService = {
  setUserData: (userData) => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  },
  getUserData: () => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  getUserToken: () => {
    const userData = authService.getUserData();
    return userData ? userData.token : null;
  },
  headersWithToken: (headers = {}) => {
    const token = authService.getUserToken();
    return {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
  },
  removeUserData: () => {
    localStorage.removeItem(USER_DATA_KEY);
  },
};

export default authService;
