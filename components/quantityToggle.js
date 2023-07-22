import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import cartData from "../data/cart.json";

const QuantityToggle = ({ quantity, setIncrease, setDecrease }) => {
  return (
    <div className="quantity-toggle">
      <div
        onClick={setDecrease}
        className={
          cartData[0]?.price == "FREE" ? "not-allowed" : "icon-container"
        }
      >
        <AiOutlineMinus />
      </div>
      <h4 style={{ padding: "0.5vmax 1vmax" }}>{quantity}</h4>
      <div
        className={
          cartData[0]?.price == "FREE" ? "not-allowed" : "icon-container"
        }
        onClick={setIncrease}
      >
        <BsPlusLg />
      </div>
    </div>
  );
};

export default QuantityToggle;
