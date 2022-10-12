const FavoriteReducer = (state, action) => {
    switch (action.type) {
  
      case "ADD_TO_FAVORITE": {
        const updatedFavorite = [...state.favorite];
        const updatedItemIndex = updatedFavorite.findIndex(
          (item) => item.id === action.payload.id
        );
  
        if (updatedItemIndex < 0) {
          updatedFavorite.push({ ...action.payload, quantity: 1 });
  
        } else {
          const updatedItem = { ...updatedFavorite[updatedItemIndex] };
          updatedItem.quantity++;
          updatedFavorite[updatedItemIndex] = updatedItem;
        }
        return {
          ...state,
          favorite: updatedFavorite,
          total: state.total + action.payload.offPrice,
        };
      }

      case "REMOVE_FROM_FAVORITE": {
        const updatedFavorite = [...state.favorite];
        const updatedItemIndex = updatedFavorite.findIndex(
          (item) => item.id === action.payload.id
        );
        const filteredFavorite = updatedFavorite.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          favorite: filteredFavorite,
          total: state.total - action.payload.offPrice,
        };
      }
  
      
      default:
        return state;
    }
  };
  
  export default FavoriteReducer;
  