import Link from "next/link";
import styles from "../styles/order.module.css";

const Order = () => {
  return (
    <div className="order">
      <div className="ourMenu">
        <p className={styles.heading}>Our Menu</p>
        <p className={styles.description}>
          Delicious snacks ,with assured health benefits, made with simple,
          tried-and-wholesome ingredients. Oh, and excellent taste!
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/menu" className="button orange">
          <p>Place an order!</p>
        </Link>
      </div>
    </div>
  );
};

export default Order;
