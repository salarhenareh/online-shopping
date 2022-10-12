import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useCart, useCartActions } from "../../Providers/CartProvider/CartProvider";
import "./CartPage.css";

const CartPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const decHandler = (cartItem) => {
    dispatch({ type: "DEC_FROM_CART", payload: cartItem });
  };

  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>cart is empty</h2>
        </main>
      </Layout>
    );

  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => (
              <div className="cartItem" key={item.name}>
                <div className="itemImg">
                  <img src={item.image} alt={item.name}></img>
                </div>
                <div>{item.name}</div>
                <div>{item.offPrice * item.quantity}</div>
                <div className="btnGroup">
                  <button onClick={() => decHandler(item)}>
                    {" "}
                    {item.quantity === 1 ? "Remove" : "-"}
                  </button>
                  <button>{item.quantity}</button>
                  <button onClick={() => incHandler(item)}>+</button>
                </div>
              </div>
            ))}
          </section>
          <CartSummary />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = () => {
  const { cart, total } = useCart();
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cartSummary">
      <h2>Cart Summary</h2>
      <div className="summaryItem">
        <p>Original Total Price</p>
        <p>{originalTotalPrice}$</p>
      </div>

      <div className="summaryItem">
        <p>Cart Discount</p>
        <p>{originalTotalPrice - total}$</p>
      </div>
      <hr />

      <div className="summaryItem">
        <p>Net Price</p>
        <p>{total}$</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Go To Checkout
        </button>
      </Link>
    </section>
  );
};
