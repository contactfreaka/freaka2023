import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import item from "../../../data/item.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QuantityToggle from "@/components/quantityToggle";
import Head from "next/head";
import { BsCart3 } from "react-icons/bs";
import Modal from "react-modal";
import { RxCross1 } from "react-icons/rx";
import { FcCheckmark } from "react-icons/fc";
import cartValue from "../../../data/cart.json";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import FreeSample from "@/components/freeSample";
import styles from "../../../styles/item.module.css";

const ProductDetail = () => {
  const router = useRouter();
  const productId = router.query.productId;

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    var dummy = 0;
    cartValue.map((item) => {
      dummy = dummy + item.quantity;
    });
    setTotalQuantity(dummy);
  }, [quantity, cartValue]);

  const [searchObject, setSearchObject] = useState("");
  const [searchCart, setSearchCart] = useState("");

  useEffect(() => {
    setSearchObject(item.find((item) => item.code == productId));
    setSearchCart(cartValue.find((item) => item.productId == productId));
  }, []);
  useEffect(() => {
    if (searchCart) {
      setQuantity(searchCart?.quantity);
    } else {
      setQuantity(1);
    }
  }, [searchCart]);
  const setDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };
  const setIncrease = () => {
    setQuantity(quantity + 1);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    var data = {
      productId: productId,
      product: searchObject?.title,
      price: searchObject?.price,
      quantity: quantity,
    };
    if (searchCart) {
      var index = cartValue.map((item) => item.productId).indexOf(productId);
      cartValue.splice(index, 1);
      cartValue.push(data);
    } else {
      cartValue.push(data);
    }
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    // height: "400px",
  };

  return (
    <>
      <Head>
        <title>FREAKA - Item</title>
        <meta name="description" content="A healthyish food venture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar quantity={totalQuantity} left={"15vmax"} right={"15vmax"} />
      <div className={`component ${styles["item-details"]}`}>
        <div className={styles["slider-container"]}>
          <Slide>
            {searchObject &&
              searchObject?.image.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={{ ...divStyle }}>
                      <img src={item} className={styles["slider-img"]} />
                    </div>
                  </div>
                );
              })}
          </Slide>
        </div>
        <div className={styles["details-container"]}>
          <div className={styles.heading}>In stock</div>
          <div className={styles["item-title"]}>{searchObject?.title}</div>
          <p className={styles.description}>{searchObject?.description}</p>
          <p className={styles.ingredients}>
            <b>Key Ingredients: </b>
            {searchObject?.ingredients}
          </p>
          <div style={{ border: "1px solid #E0E0E0" }}></div>
          <div className={styles.price}>₹ {quantity * searchObject?.price}</div>
          <p className={styles.quantity}>Quantity</p>
          <div className={styles["quantity-toggler-container"]}>
            <QuantityToggle
              quantity={quantity}
              setIncrease={setIncrease}
              setDecrease={setDecrease}
            />
            <div
              style={{ cursor: "pointer" }}
              onClick={openModal}
              className="button orange"
            >
              <p>
                <BsCart3 /> Add to cart!
              </p>
            </div>
          </div>
          <br />
          <div style={{ border: "1px solid #E0E0E0" }}></div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <button
              style={{ all: "unset", cursor: "pointer", float: "right" }}
              onClick={closeModal}
            >
              <RxCross1 />
            </button>
            <br />
            <h3>
              <FcCheckmark /> Item added to cart successfully!
            </h3>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2vmax",
              }}
            >
              <Link href="/menu" className="button orange">
                <p>Continue Shopping</p>
              </Link>
              <Link href="/cart" className="button white">
                <p>Checkout</p>
              </Link>
            </div>
          </Modal>
        </div>
      </div>
      <div className="component">
        <div className={styles["description-heading"]}>Description</div>
        <div
          className={styles["description-text"]}
          dangerouslySetInnerHTML={{ __html: searchObject?.details }}
        />
      </div>
      <Footer />
      <FreeSample />
    </>
  );
};

export default ProductDetail;
