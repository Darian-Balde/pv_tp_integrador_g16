import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { syncFavoritesFromStorage } from '../store/FavoritesSlice';
import { syncCartFromStorage } from '../store/CartSlice';

/**
 * Hook personalizado para sincronizar favoritos y carrito entre pestañas
 * Escucha cambios en localStorage y actualiza el estado de Redux
 */
export const useStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      try {
        // Sincronizar favoritos
        if (event.key === 'favorites') {
          const newFavorites = event.newValue ? JSON.parse(event.newValue) : [];
          dispatch(syncFavoritesFromStorage(newFavorites));
        }
        
        // Sincronizar carrito
        if (event.key === 'cart') {
          const newCart = event.newValue ? JSON.parse(event.newValue) : [];
          dispatch(syncCartFromStorage(newCart));
        }
      } catch (error) {
        console.error('Error al sincronizar datos:', error);
        
        // En caso de error, sincronizar con arrays vacíos según la clave
        if (event.key === 'favorites') {
          dispatch(syncFavoritesFromStorage([]));
        }
        if (event.key === 'cart') {
          dispatch(syncCartFromStorage([]));
        }
      }
    };

    // Agregar el listener para eventos de storage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
};
