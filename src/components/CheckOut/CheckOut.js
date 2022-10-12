import "./CheckOut.css";
import { useCart } from "../../Providers/CartProvider/CartProvider";
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

const CheckOut = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length) {
    return (
      <main>
        <NavLink to="/">The cart is empty, go to shopping</NavLink>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="cartCenter" key="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>chechout detail</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>Tel : {auth.phoneNumber}</p>
            </section>
            <section className="cartSummary">
              {cart &&
                cart.map((c) => {
                  return (
                    <div >
                      {c.name}*{c.quantity} : {c.quantity * c.offPrice}$
                    </div>
                  );
                })}
              <hr />
              <div>total price : {total}$</div>
            </section>
          </>
        ) : (
          <p>please login</p>
        )}
      </section>
    </main>
  );
};

export default CheckOut;
