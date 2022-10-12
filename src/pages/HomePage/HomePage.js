import Layout from "../../Layout/Layout";
import "./HomePage.css";
import { BsFillHeartFill } from "react-icons/bs";
import {
  useCart,
  useCartActions,
} from "../../Providers/CartProvider/CartProvider";
import { toast } from "react-toastify";
import { checkInCart } from "../../utils/CheckInCart";
import { checkInFavorite } from "../../utils/CheckInFavorite";
import { useProducts } from "../../Providers/ProductProvider/ProductProvider";
import {
  useFavorite,
  useFavoriteActions,
} from "../../Providers/FavoriteProvider/FavoriteProvider";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const { favorite } = useFavorite();
  const dispatchFavorite = useFavoriteActions();

  const products = useProducts();

  const addProductHandler = (product) => {
    toast.success(`${product.name} added to Cart!`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const addFavoriteHandler = (favorite) => {
    dispatchFavorite({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {products.map((product) => {
            return (
              <div key={product.title} className="product">
                <div className="productImg">
                  <img src={product.image} alt={product.name}></img>
                  <div className="favoriteContainer">
                    <button
                      className="favoriteButton "
                      onClick={() => addFavoriteHandler(product)}
                    >
                      <BsFillHeartFill
                        className={
                          checkInFavorite(favorite, product)
                            ? "inFavorite"
                            : "addFavorite"
                        }
                      />
                    </button>
                  </div>
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

export default HomePage;
