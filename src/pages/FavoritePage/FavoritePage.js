import Layout from "../../Layout/Layout";
import {
  useFavorite,
  useFavoriteActions,
} from "../../Providers/FavoriteProvider/FavoriteProvider";
import "./FavoritePage.css";

const FavoritePage = () => {
  const { favorite } = useFavorite();
  const dispatchFavorite = useFavoriteActions();

  const removeHandler = (cartItem) => {
    dispatchFavorite({ type: "REMOVE_FROM_FAVORITE", payload: cartItem });
  };

  if (!favorite.length)
  return (
    <Layout>
      <main>
        <h2>favorite is empty</h2>
      </main>
    </Layout>
  );

  return (
    <Layout>
      <main className="container">
        <section className="favoriteCenter">
          <section className="favoriteItemList">
            {favorite.map((item) => (
              <div className="favoriteItem" key={item.name}>
                <div className="itemImg">
                  <img src={item.image} alt={item.name}></img>
                </div>
                <div>{item.name}</div>
                <div>{item.offPrice * item.quantity}</div>
                <div className="btnGroup">
                  <button onClick={() => removeHandler(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default FavoritePage;
