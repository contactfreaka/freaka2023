import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import deliveryPin from "../data/deliveryPin.json";
import Router from "next/router";
import cartValue from "../data/cart.json";
import { RxCross1 } from "react-icons/rx";
import Modal from "react-modal";
import QuantityToggle from "@/components/quantityToggle";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "../styles/cart.module.css";

const Cart = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartData, setCartData] = useState(cartValue);
  const [cartString, setCartString] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");
  const [delivery, setDelivery] = useState(0);
  const [active, setActive] = useState(false);
  const [dist, setDist] = useState(0);
  const [findPin, setFindPin] = useState(false);
  const fetchGeocode = () => {
    console.log(cartTotal);
    if (pin.length == 6) {
      return fetch("https://geocode.maps.co/search?q=" + pin + "%20India")
        .then((response) => response.json())
        .then((data) => {
          if (data.length != 0) {
            setFindPin(true);
            //console.log(data[0]['lat'], data[0]['lon']);
            var dlon = ((76.819 - data[0]["lon"]) * Math.PI) / 180;
            var dlat = ((30.663 - data[0]["lat"]) * Math.PI) / 180;
            var tmp =
              Math.sin(dlat / 2) * Math.sin(dlat / 2) +
              Math.cos((30.663 * Math.PI) / 180) *
                Math.cos((data[0]["lat"] * Math.PI) / 180) *
                Math.sin(dlon / 2) *
                Math.sin(dlon / 2);
            tmp = 6371 * 2 * Math.asin(Math.sqrt(tmp));
            setDist(tmp);
            setFindPin(true);

            if (tmp > 500) {
              setStatus("Sorry we cannot deliver to your location");
              setActive(false);
              setIsOpen(true);
            } else {
              if (cartTotal?.toFixed(2) > 800) {
                setDelivery(0);
                setStatus(
                  "Delivery available! Free shipping on orders above Rs.800"
                );
                deliveryPin.pop();
                deliveryPin.pop();
                deliveryPin.push(parseInt(pin));
                deliveryPin.push(0);
                setActive(true);
              } else {
                if (tmp <= 8) {
                  setDelivery(0);
                  setStatus("Delivery available! Free shipping");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(0);
                  setActive(true);
                }
                if (tmp > 8 && tmp <= 10) {
                  setDelivery(30);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(30);
                  setActive(true);
                }
                if (tmp > 10 && tmp <= 20) {
                  setDelivery(70);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(70);
                  setActive(true);
                }
                if (tmp > 20 && tmp <= 40) {
                  setDelivery(80);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(80);
                  setActive(true);
                }
                if (tmp > 40 && tmp <= 60) {
                  setDelivery(90);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(90);
                  setActive(true);
                }
                if (tmp > 60 && tmp <= 100) {
                  setDelivery(110);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(110);
                  setActive(true);
                }
                if (tmp > 100 && tmp <= 300) {
                  setDelivery(130);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(130);
                  setActive(true);
                }
                if (tmp > 300 && tmp <= 500) {
                  setDelivery(145);
                  setStatus("Delivery available! Shipping charges updated");
                  deliveryPin.pop();
                  deliveryPin.pop();
                  deliveryPin.push(parseInt(pin));
                  deliveryPin.push(145);
                  setActive(true);
                }
              }
            }
          } else {
            setFindPin(false);
            setStatus("Invalid delivery pincode!");
            setActive(false);
            setIsOpen(false);
          }
        });
    } else {
      setFindPin(false);
      setStatus("Invalid delivery pincode!");
      setActive(false);
      setIsOpen(false);
    }
  };
  const checkPin = () => {
    fetchGeocode();
    // for (const property in pinData) {
    //     if(pinData[property]['pin'].includes(parseInt(pin))===true) {
    //         setDelivery(pinData[property]['delivery']);
    //         setStatus(pinData[property]['status']);
    //         deliveryPin.pop();
    //         deliveryPin.pop();
    //         deliveryPin.push(parseInt(pin));
    //         deliveryPin.push(pinData[property]['delivery']);
    //         setActive(true);
    //         find = true;
    //         break;
    //     }
    // }
    // if(find==false) {
    //     setStatus('Sorry we cannot deliver to your location');
    //     setActive(false);
    //     setIsOpen(true);
    // }
  };
  const proceedToCheckout = () => {
    if (active) {
      Router.push("/checkout");
    }
  };
  useEffect(() => {
    var subTotal = 0;
    var dummy = 0;
    var cartDetails = "";
    cartData.map((item) => {
      subTotal = subTotal + item.quantity * item.price;
      dummy = dummy + item.quantity;
      cartDetails =
        cartDetails +
        "Product:" +
        item.product +
        "=Quantity:" +
        item.quantity +
        ", ";
    });
    setCartTotal(subTotal);
    setTaxes(0.05 * subTotal);
    setTotalQuantity(dummy);
    setCartString(cartDetails);
  }, [cartData, checkPin, totalQuantity, cartTotal]);
  useEffect(() => {
    checkPin();
  }, [cartTotal, totalQuantity, pin]);

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
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }
  function redirectChat() {
    const url =
      "Hi, I would like to place an order. \nItems: " +
      cartString +
      "\nDelivery pincode: " +
      pin;
    const encodedURL = encodeURIComponent(url);
    console.log(
      "https://web.whatsapp.com/send/?phone=918580672935&text=" + encodedURL
    );
    window.open(
      "https://web.whatsapp.com/send/?phone=918580672935&text=" + encodedURL,
      "_blank"
    );
  }
  function removeItem(index, quantity, price) {
    setCartTotal(cartTotal - quantity * price);
    setTaxes(taxes - 0.05 * quantity * price);
    var newCartData = [...cartData];
    newCartData.splice(index, 1);
    setCartData(newCartData);
    setTotalQuantity(totalQuantity - quantity);
    setDeleteModalIsOpen(false);
  }

  return (
    <>
      <Head>
        <title>FREAKA - Cart</title>
        <meta name="description" content="A healthyish food venture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar quantity={totalQuantity} left={"15vmax"} right={"15vmax"} />
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
          <FiAlertTriangle /> Your zipcode lies outside our deliverable zone. To
          place an order, talk to our sales team.
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
          <button
            style={{ cursor: "pointer", border: "none" }}
            onClick={redirectChat}
            className="button orange"
          >
            <p>Yes</p>
          </button>
          <button
            style={{ cursor: "pointer", border: "none" }}
            onClick={closeModal}
            className="button white"
          >
            <p>No</p>
          </button>
        </div>
      </Modal>
      <div className="component">
        {cartTotal === 0 ? (
          <div style={{ textAlign: "center" }}>
            <div className={styles["empty-heading"]}>Your cart is empty</div>
            <p className={styles["empty-text"]}>
              Looks like you have not added anything to your cart. Go ahead and
              explore our menu.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/menu" className="button orange">
                <p>Place an order!</p>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                textAlign: "center",
                paddingTop: "0.5vmax",
                fontSize: "2.5vmax",
                fontWeight: "700",
                color: "#333333",
              }}
            >
              Shopping Cart
            </div>
            <br />
            <br />
            <table style={{ width: "100%", textAlign: "center" }}>
              <tr
                style={{
                  fontSize: "1.5vmax",
                  fontWeight: "700",
                  color: "#333333",
                }}
              >
                <th style={{ textAlign: "left", paddingBottom: "1vmax" }}>
                  <b>Product</b>
                </th>
                <th style={{ paddingBottom: "1vmax" }}>
                  <b>Price</b>
                </th>
                <th style={{ paddingBottom: "1vmax" }}>
                  <b>Quantity</b>
                </th>
                <th style={{ paddingBottom: "1vmax" }}>
                  <b>Total</b>
                </th>
                <th style={{ paddingBottom: "1vmax" }}>
                  <b>Remove</b>
                </th>
              </tr>
              <tr>
                <td>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                </td>
                <td>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                </td>
                <td>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                </td>
                <td>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                </td>
                <td>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                </td>
              </tr>
              {cartData.map((item, index) => {
                //console.log(item, index);
                const setDecrease = () => {
                  if (item.quantity > 1) {
                    setCartTotal(cartTotal - item.price);
                    setTotalQuantity(totalQuantity - 1);
                    setTaxes(taxes - 0.05 * item.price);
                  }
                  item.quantity = Math.max(1, item.quantity - 1);
                };
                const setIncrease = () => {
                  item.quantity = item.quantity + 1;
                  setCartTotal(cartTotal + item.price);
                  setTaxes(taxes + 0.05 * item.price);
                  setTotalQuantity(totalQuantity + 1);
                };
                return (
                  <>
                    <br />
                    <tr key={item.id}>
                      <td style={{ textAlign: "left" }}>
                        <b>{item.product}</b>
                      </td>
                      <td>₹ {item.price}</td>
                      <td>
                        <QuantityToggle
                          quantity={item.quantity}
                          setIncrease={setIncrease}
                          setDecrease={setDecrease}
                        />
                      </td>
                      <td>
                        <b>
                          ₹{" "}
                          {item.price == "FREE"
                            ? 0
                            : item.quantity * item.price}
                        </b>
                      </td>
                      <td>
                        <RxCross1
                          style={{ cursor: "pointer" }}
                          onClick={openDeleteModal}
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>
                        <div style={{ border: "1px solid #E0E0E0" }}></div>
                      </td>
                      <td>
                        <div style={{ border: "1px solid #E0E0E0" }}></div>
                      </td>
                      <td>
                        <div style={{ border: "1px solid #E0E0E0" }}></div>
                      </td>
                      <td>
                        <div style={{ border: "1px solid #E0E0E0" }}></div>
                      </td>
                      <td>
                        <div style={{ border: "1px solid #E0E0E0" }}></div>
                      </td>
                    </tr>
                    <Modal
                      isOpen={deleteModalIsOpen}
                      onRequestClose={closeDeleteModal}
                      style={customStyles}
                    >
                      <button
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          float: "right",
                        }}
                        onClick={closeDeleteModal}
                      >
                        <RxCross1 />
                      </button>
                      <br />
                      <h3>
                        <FiAlertTriangle /> Are you sure you want to remove this
                        item from cart?
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
                        <button
                          style={{ cursor: "pointer", border: "none" }}
                          onClick={() =>
                            removeItem(item.id, item.quantity, item.price)
                          }
                          className="button orange"
                        >
                          <p>Yes</p>
                        </button>
                        <button
                          style={{ cursor: "pointer", border: "none" }}
                          onClick={closeDeleteModal}
                          className="button white"
                        >
                          <p>No</p>
                        </button>
                      </div>
                    </Modal>
                  </>
                );
              })}
            </table>

            <br />
            <br />
            <div
              style={{
                border: "1px solid #828282",
                borderRadius: "5px",
                padding: "1vmax",
                background: "rgba(168, 188, 161, 0.3)",
              }}
            >
              <p className={styles.payment}>
                <b>Payment Method: </b>Pay on Delivery (Cash/Card). Cash on
                delivery (COD) available. Card/Net banking acceptance subject to
                device availability.
              </p>
            </div>
            <br />
            <br />

            <div className="delivery-bill">
              <div>
                <div className={styles.heading}>Delivery</div>
                <div className={styles["pincode-container"]}>
                  <p className={styles["pincode-text"]}>
                    Enter Pincode to check if delivery is available
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <div style={{ display: "flex", gap: "2vmax" }}>
                    <input
                      type="number"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      style={{
                        paddingLeft: "0.5vmax",
                        fontSize: "1.2vmax",
                        width: "60%",
                      }}
                    />
                    <div
                      onClick={checkPin}
                      style={{ cursor: "pointer" }}
                      className="button orange"
                    >
                      <p>Check!</p>
                    </div>
                  </div>
                  <div className={styles["pincode-status"]}>{status}</div>
                </div>
              </div>
              <div>
                <div className={styles.heading}>Total Bill</div>
                <div
                  style={{
                    border: "1px solid #828282",
                    borderRadius: "5px",
                    padding: "1vmax",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className={styles.text}>
                      <b>Cart Subtotal</b>
                    </p>
                    <p className={styles.text}>
                      ₹{" "}
                      {cartData[0]["price"] == "FREE"
                        ? 0
                        : cartTotal.toFixed(2)}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className={styles.text}>Taxes</p>
                    <p className={styles.text}>
                      ₹ {cartData[0]["price"] == "FREE" ? 0 : taxes.toFixed(2)}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className={styles.text}>Shipping Charge</p>
                    <p className={styles.text}>₹ {delivery.toFixed(2)}</p>
                  </div>
                  <div style={{ border: "1px solid #E0E0E0" }}></div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      className={styles.text}
                      style={{
                        padding: "1vmax 0 0 0",
                      }}
                    >
                      <b>Total Amount</b>
                    </p>
                    <p
                      className={styles.text}
                      style={{
                        padding: "1vmax 0 0 0",
                      }}
                    >
                      <b>
                        ₹{" "}
                        {cartData[0]["price"] == "FREE"
                          ? delivery
                          : (cartTotal + delivery + taxes).toFixed(2)}
                      </b>
                    </p>
                  </div>
                </div>
                <div
                  onClick={proceedToCheckout}
                  style={
                    active
                      ? {
                          cursor: "pointer",
                          marginTop: "1vmax",
                          width: "99.7%",
                          textAlign: "center",
                        }
                      : {
                          cursor: "not-allowed",
                          marginTop: "1vmax",
                          width: "99.7%",
                          textAlign: "center",
                        }
                  }
                  className={active ? "orange button" : "orange button tooltip"}
                >
                  <span
                    style={active ? { display: "none" } : {}}
                    className="tooltiptext"
                  >
                    Enter delivery pincode!
                  </span>
                  <p>Proceed to checkout</p>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div>
              <p className="cancellation-title">
                <u>
                  <b>
                    <i>CANCELLATION:</i>
                  </b>
                </u>
              </p>
              <p className="cancellation-description">
                In case of an emergency, you can always change your delivery day
                to another day. All cancellations need to be done 48 hours(two
                days) before the delivery day. Any cancellation after that would
                unfortunately not be refunded.
              </p>
              <p className="cancellation-title">
                <u>
                  <b>
                    <i>REFUND POLICY:</i>
                  </b>
                </u>
              </p>
              <p className="cancellation-description">
                All our items are freshly prepared after receiving the order. We
                do not offer any refunds unless you receive a damaged package.
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
