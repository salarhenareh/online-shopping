import Layout from "../../Layout/Layout";
import "../HomePage/HomePage.css";
import { GrFavorite } from "react-icons/gr";
import {
  useCart,
  useCartActions,
} from "../../Providers/CartProvider/CartProvider";
import { toast } from "react-toastify";
import { checkInCart } from "../../utils/CheckInCart";
import { useProducts } from "../../Providers/ProductProvider/ProductProvider";

const KidsPage= () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const products = useProducts();

  const addProductHandler = (product) => {
    toast.success(`${product.name} added to Cart!`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {products.map((product) => {
            return (
              <div key={product.name} className="product">
                <div className="productImg">
                  <img src={product.image} alt={product.name}></img>
                  <GrFavorite className="favoriteBtn" />
                </div>

                <div className="productDesc">
                  <p>{product.name}</p>
                  <p>Price: CA${product.offPrice}</p>
                  <div className="realPrice">
                    <p>CA${product.price}</p>
                    <p>({product.discount}% off)</p>
                  </div>
                </div>
                <button
                  onClick={() => addProductHandler(product)}
                  className={
                    checkInCart(cart, product) ? "inCartBtn" : "addCartBtn"
                  }
                >
                  {checkInCart(cart, product) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default KidsPage;
