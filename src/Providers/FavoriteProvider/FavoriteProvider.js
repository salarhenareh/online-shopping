import { createContext, useContext, useReducer } from "react";
import FavoriteReducer from "./FavoriteReducer"

const FavoriteContext = createContext();
const FavoriteContextDispatcher = createContext();

const initialState = {
  favorite: [],
  total: 0,
};

const FavoriteProvider = ({ children }) => {
  const [favorite, dispatch] = useReducer(FavoriteReducer, initialState);
  return (
    <FavoriteContext.Provider value={favorite}>
      <FavoriteContextDispatcher.Provider value={dispatch}>
        {children}
      </FavoriteContextDispatcher.Provider>
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;

export const useFavorite = () => useContext(FavoriteContext);
export const useFavoriteActions = () => useContext(FavoriteContextDispatcher);
