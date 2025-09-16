import { useRouteLoaderData } from 'react-router-dom';


export const useAuthToken = () => {
  const token = useRouteLoaderData('root');

  return token !== null;
};
