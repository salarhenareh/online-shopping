import { useEffect, useState } from "react";
import { useProductsActions } from "../../Providers/ProductProvider/ProductProvider";
import "./CheckedBox.css";

const CheckedBox = ({ filter, getChecked, searched }) => {
  const dispatch = useProductsActions();
  const [checked, setChecked] = useState([""]);

  const checkedHandler = (e) => {
    if (e.target.checked) {
      if (checked.includes(e.target.value)) {
        console.log("hi");
      } else {
        checked.push(e.target.value);
        setChecked(checked);
      }
    } else {
      for (let i = 0; i < checked.length; i++) {
        if (checked[i] === e.target.value) {
          checked.splice(i, 1);
        }
      }
    }
    dispatch({ type: "filter", event: filter });
    dispatch({ type: "checked", event: checked });

    getChecked(checked);
  };

  return (
    <form className="checkedBoxContainer">
      <div>
        <input
          type="checkbox"
          name="clothes"
          value="clothes"
          onChange={checkedHandler}
        />
        <label>Clothes</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="dresses"
          value="dresses"
          onChange={checkedHandler}
        />
        <label>Dresses</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="shoes"
          value="shoes"
          onChange={checkedHandler}
        />
        <label>Shoes</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="face + body"
          value="face + body"
          onChange={checkedHandler}
        />
        <label>Face + Body</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="jewerllery"
          value="jewerllery"
          onChange={checkedHandler}
        />
        <label>Jewerllery</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="sunglasses"
          value="sunglasses"
          onChange={checkedHandler}
        />
        <label>Sunglasses</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="brands"
          value="brands"
          onChange={checkedHandler}
        />
        <label>Brands</label>
      </div>
    </form>
  );
};

export default CheckedBox;
