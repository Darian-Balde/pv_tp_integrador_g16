import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { syncFavoritesFromStorage } from '../store/FavoritesSlice';
import { syncCartFromStorage } from '../store/CartSlice';


export const useStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      try {
        if (event.key === 'favorites') {
          const newFavorites = event.newValue ? JSON.parse(event.newValue) : [];
          dispatch(syncFavoritesFromStorage(newFavorites));
        }
        if (event.key === 'cart') {
          const newCart = event.newValue ? JSON.parse(event.newValue) : [];
          dispatch(syncCartFromStorage(newCart));
        }
      } catch (error) {
        console.error('Error al sincronizar datos:', error);
        
        if (event.key === 'favorites') {
          dispatch(syncFavoritesFromStorage([]));
        }
        if (event.key === 'cart') {
          dispatch(syncCartFromStorage([]));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
};
