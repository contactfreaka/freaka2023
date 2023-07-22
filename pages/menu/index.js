import Footer from "@/components/footer";
import Menucard from "@/components/menuCard";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Menudata from "../../data/menu.json";
import Upcomingdata from "../../data/upcoming.json";
import cartValue from "../../data/cart.json";
import { useEffect, useState } from "react";
import FreeSample from "@/components/freeSample";
import styles from "../../styles/order.module.css";

const Menu = () => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    var totalQuantity = 0;
    cartValue.map((item) => {
      totalQuantity = totalQuantity + item.quantity;
    });
    setQuantity(totalQuantity);
  }, [cartValue]);
  return (
    <>
      <Head>
        <title>FREAKA - Menu</title>
        <meta name="description" content="A healthyish food venture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar quantity={quantity} left={"15vmax"} right={"15vmax"} />
      <div className="order">
        <div className="ourMenu">
          <p className={styles.heading}>Our Menu</p>
          <p className={styles.description}>
            Delicious snacks ,with assured health benefits, made with simple,
            tried-and-wholesome ingredients. Oh, and excellent taste!
          </p>
        </div>
      </div>
      <div className="component dishes">
        {Menudata.map((item) => {
          return (
            <Menucard
              key={item.id}
              code={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          );
        })}
        {Upcomingdata.map((item) => {
          return (
            <div key={item.id} style={{ position: "relative" }}>
              <Menucard
                key={item.id}
                code={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
              <div className="overlayUpcoming">Coming Soon...</div>
            </div>
          );
        })}
      </div>
      <Footer />
      <FreeSample />
    </>
  );
};

export default Menu;
