import _ from "lodash";
import * as data from "../../data";

const ProductReducer = (state, action) => {

  switch (action.type) {
    case "search": {
      const Value = action.event.target.value;
      if (Value === "") {
        return state;
      } else {
        const searchedProducts = state.filter((p) =>
          p.title.toLocaleLowerCase().includes(Value.toLocaleLowerCase())
        );
        return searchedProducts;
      }
    }

    case "filter": {
      const Value = action.event;
      if (Value === "") {
        return data.products;
      } else {
        const genderProducts = data.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(Value.toLocaleLowerCase())
        );

        return genderProducts;
      }
    }

    case "checked": {
      const checkedProducts = [];
      let tickedProducts = [];
      const Value = action.event;

      if (Value.length === 1) {
        return state;
      } else {
        let i = 1;
        while (i < Value.length) {
          const foundProducts = state.filter((p) =>
            p.title.includes(Value[i])
          );
          let j = 1;
          while (j < foundProducts.length + 1) {
            checkedProducts.push(foundProducts[j - 1]);
            tickedProducts = [
              ...new Set([...checkedProducts, ...foundProducts]),
            ]; //Merge 2 Arrays without Duplicates
            j++;
          }
          i++;
        }
        return tickedProducts;
      }
    }

    default:
      return state;
  }
};

export default ProductReducer;
