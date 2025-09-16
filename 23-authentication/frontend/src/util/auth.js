import authService from '../services/authService';


export function tokenLoader() {
  return authService.getUserToken();
}

export function checkAuthLoader() {
  const token = authService.getUserToken();

  if (!token) {
    throw Error('Not authenticated!');
  }
}
