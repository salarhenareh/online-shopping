import { createContext, useContext, useReducer } from "react";
import * as data from "../../data";
import ProductReducer from "./ProductReducer";

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(ProductReducer, data.products);
  return (
    <ProductContext.Provider value={products}>
      <ProductContextDispatcher.Provider value={dispatch}>
        {children}
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProducts = () => useContext(ProductContext);
export const useProductsActions = () => useContext(ProductContextDispatcher);
