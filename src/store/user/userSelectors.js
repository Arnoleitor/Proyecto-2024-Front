import { useSelector } from 'react-redux';

export const useGetUser = ()  => {
  const userData = useSelector((state) => state.user);
  return userData;
};