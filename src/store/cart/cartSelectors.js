import { useSelector } from 'react-redux';

export const useGetCart = ()  => {
  const cartData = useSelector((state) => state.cart.items);
  return cartData;
};