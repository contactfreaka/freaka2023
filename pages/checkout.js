import React from "react";
const { default: Navbar } = require("@/components/navbar");
const { default: Head } = require("next/head");
const { useState, useEffect, useRef } = require("react");
import Footer from "@/components/footer";
import cartValue from "../data/cart.json";
import deliveryPin from "../data/deliveryPin.json";
import { BsArrowRight } from "react-icons/bs";
import Modal from "react-modal";
import { RxCross1 } from "react-icons/rx";
import Router from "next/router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { ToWords } from "to-words";
import stateCode from "../data/stateCode.json";
import styles from "../styles/checkout.module.css";

function Checkout() {
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [cartData, setCartData] = useState("");
  const [PDFData, setPDFData] = useState("");

  const [supplyState, setSupplyState] = useState("");
  const [supplyStateCode, setSupplyStateCode] = useState("");
  const fetchState = () => {
    return fetch("https://api.postalpincode.in/pincode/" + deliveryPin[0])
      .then((response) => response.json())
      .then((data) => setSupplyState(data[0].PostOffice[0].State));
  };
  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    stateCode.map((item) => {
      if (item.State == supplyState) {
        setSupplyStateCode(item["State code"]);
      }
    });
  }, [supplyState]);

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
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    var dummy = 0,
      sub = 0;
    var cartDetails = "";
    if (cartValue[0].price == "FREE") {
      setQuantity(1);
      setSubtotal(0);
      setTaxes(0);
      cartDetails = "Product:" + "FREE Sample" + "=Quantity:" + "1" + ", ";
      setCartData(cartDetails);
    } else {
      cartValue.map((item) => {
        dummy = dummy + item.quantity;
        sub = sub + item.quantity * item.price;
        cartDetails =
          cartDetails +
          "Product:" +
          item.product +
          "=Quantity:" +
          item.quantity +
          ", ";
      });
      setQuantity(dummy);
      setSubtotal(sub);
      setTaxes(sub * 0.05);
      setCartData(cartDetails);
    }
  }, []);

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [addr1, setAddr1] = useState();
  const [addr2, setAddr2] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState(deliveryPin[0]);
  const [invoiceNum, setInvoiceNum] = useState(
    Math.floor(Math.random() * 100000000 + 100000000)
  );

  const invoice = useRef();

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  async function getPDF() {
    const element = invoice.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
    var temp = pdf.output();
    return temp;
  }

  useEffect(() => {
    getPDF().then(res => {
      var temp = res;
      setPDFData(temp);
    })
  }, [lname, fname, email, phone, addr1, addr2, city, pincode, cartData, taxes, supplyState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(PDFData);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        invoiceNum,
        fname,
        lname,
        email,
        phone,
        addr1,
        addr2,
        city,
        supplyState,
        pincode,
        cartData,
        taxes,
        PDFData
      }),
    })
      .then(async () => {
        Router.push("/success");
        const element = invoice.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
        pdf.save("invoice.pdf");
      })
      .catch((error) => alert(error));
  };

  const toWords = new ToWords();

  return (
    <>
      <Head>
        <title>FREAKA - Checkout</title>
        <meta name="description" content="A healthyish food venture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar quantity={quantity} left={"15vmax"} right={"15vmax"} />
      <div className="component">
        <div className={styles["checkout-heading"]}>Checkout Page</div>
        <br />
        <br />
        <div className={styles["checkout-container"]}>
          <div className={styles["shipping-container"]}>
            <div className={styles["shipping-heading"]}>Shipping Details</div>
            <form
              name="contact"
              method="POST"
              onSubmit={handleSubmit}
              data-netlify="true"
            >
              <input type="hidden" name="form-name" enctype="multipart/form-data" value="contact" />
              <div className={styles["input-row"]}>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>First name</p>
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Last name</p>
                  <input
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              <div className={styles["input-row"]}>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Email address</p>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Phone number</p>
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              <div className={styles["input-row"]}>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Address line 1</p>
                  <input
                    type="text"
                    name="addr1"
                    value={addr1}
                    onChange={(e) => setAddr1(e.target.value)}
                    required
                  />
                </div>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Address line 2</p>
                  <input
                    type="text"
                    name="addr2"
                    value={addr2}
                    onChange={(e) => setAddr2(e.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              <div className={styles["input-row"]}>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>City</p>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className={styles["row-item"]}>
                  <p className={styles["input-title"]}>Zip code</p>
                  <input
                    type="number"
                    name="pincode"
                    value={pincode}
                    disabled
                  />
                </div>
              </div>
              <input
                type="text"
                name="cartData"
                value={cartData}
                style={{ display: "none" }}
                disabled
              />
              <input
                type="text"
                name="invoiceNum"
                value={invoiceNum}
                style={{ display: "none" }}
                disabled
              />
              <input
                type="text"
                name="taxes"
                value={taxes}
                style={{ display: "none" }}
                disabled
              />
              <input
                type="text"
                name="supplyState"
                value={supplyState}
                style={{ display: "none" }}
                disabled
              />
              <input
                type="text"
                name="PDFData"
                value={PDFData}
                style={{ display: "none" }}
                disabled
              />
              <br />
              <div className={styles["btn-container"]}>
                <button className="orange button" type="submit">
                  <span className={styles["btn-text"]}>
                    Place an order <BsArrowRight />
                  </span>
                </button>
              </div>
              {/* <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                            >
                                <button style={{all: 'unset', cursor: 'pointer', float: 'right'}} onClick={closeModal}><RxCross1 /></button>
                                <br/>
                                <h3>Are you sure you want to confirm the order?</h3>
                                <br/>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2vmax'}}>
                                    <button style={{cursor: 'pointer', border: 'none'}} type="submit" className="button orange">
                                        <p>Yes</p>
                                    </button>
                                    <button style={{cursor: 'pointer', border: 'none'}} onClick={closeModal} className="button white">
                                        <p>No</p>
                                    </button>
                                </div>
                            </Modal> */}
            </form>
          </div>
          <div className={styles["item-container"]}>
            {cartValue.map((item) => {
              return (
                <>
                  <p className={styles["item-title"]}>
                    <b>
                      {item.product} X {item.quantity}
                    </b>
                  </p>
                  <p className={styles["item-title"]}>₹ {item.price}</p>
                  <div
                    style={{
                      border: "1px solid #E0E0E0",
                      marginBottom: "0.5vmax",
                    }}
                  ></div>
                </>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles["item-title"]}>Sub-total</p>
              <p className={styles["item-title"]}>₹ {subtotal?.toFixed(2)}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles["item-title"]}>Taxes</p>
              <p className={styles["item-title"]}>₹ {taxes?.toFixed(2)}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles["item-title"]}>Shipping</p>
              <p className={styles["item-title"]}>
                ₹ {deliveryPin[1]?.toFixed(2)}
              </p>
            </div>
            <div
              style={{ border: "1px solid #E0E0E0", marginBottom: "0.5vmax" }}
            ></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles.total}>Total</p>
              <p className={styles.total}>
                <b>₹ {(subtotal + deliveryPin[1] + taxes)?.toFixed(2)}</b>
              </p>
            </div>
            <br />
            <p className={styles.payment}>
              <b>Payment Method: </b>Pay on Delivery (Cash/Card). Cash on
              delivery (COD) available. Card/Net banking acceptance subject to
              device availability.
            </p>
          </div>
        </div>
        <br />
        <br />
        <div>
          <p className={styles["item-title"]}>
            <u>
              <b>
                <i>CANCELLATION:</i>
              </b>
            </u>
          </p>
          <p className={styles.description}>
            In case of an emergency, you can always change your delivery day to
            another day. All cancellations need to be done 48 hours(two days)
            before the delivery day. Any cancellation after that would
            unfortunately not be refunded.
          </p>
          <p className={styles["item-title"]}>
            <u>
              <b>
                <i>REFUND POLICY:</i>
              </b>
            </u>
          </p>
          <p className={styles.description}>
            All our items are freshly prepared after receiving the order. We do
            not offer any refunds unless you receive a damaged package.
          </p>
        </div>
      </div>
      <div style={{ opacity: "0", height: "0px" }}>
        <div ref={invoice} className="component">
          <div
            style={{
              paddingTop: "0.5vmax",
              color: "#333333",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "8%" }}>
              <Image
                style={{ borderRadius: "50%" }}
                alt="Freaka logo"
                src="https://ik.imagekit.io/kzzakkvwc/logo.png?updatedAt=1683714509969&tr=w-350,h-350,fo-custom,cm-extract"
                layout="responsive"
                width="2"
                height="2"
              />
            </div>
            <h3
              style={{
                fontSize: "2vmax",
                fontWeight: 700,
                textAlign: "center",
                width: "100%",
              }}
            >
              Tax Invoice
            </h3>
          </div>
          <div
            style={{
              paddingTop: "0.5vmax",
              color: "#333333",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: "Inter", fontSize: "1.25vmax" }}>
              <p>
                <b>Sold by:</b>
              </p>
              <p>M/S FREAKA FOODS</p>
              <p>Flat No. 506, Tower 6,</p>
              <p>Oxford Street, Zirakpur</p>
              <p>Punjab - 140603</p>
              <p>IN</p>
              <br />
              <p>
                <b>PAN No: </b>AYSPR4887J
              </p>
              <br />
              <p>
                <b>GST Registration No: </b>03AYSPR4887J1ZJ
              </p>
              <br />
              <p>
                <b>Order Number: </b>
                {invoiceNum}
              </p>
              <br />
              <p>
                <b>Order Date: </b>
                {new Date().toJSON().slice(0, 10)}
              </p>
            </div>
            <div
              style={{
                fontFamily: "Inter",
                fontSize: "1.25vmax",
                textAlign: "right",
              }}
            >
              <p>
                <b>Shipping Address:</b>
              </p>
              <p>
                {fname} {lname}
              </p>
              <p>{addr1}</p>
              <p>{addr2}</p>
              <p>
                {city} - {pincode}
              </p>
              <p>IN</p>
              <br />
              <p>
                <b>State/UT Code: </b>
                {supplyStateCode}
              </p>
              <br />
              <p>
                <b>Place of delivery: </b>
                {supplyState}
              </p>
              <br />
              <p>
                <b>Invoice Number: </b>
                {invoiceNum}
              </p>
              <br />
              <p>
                <b>Invoice Date: </b>
                {new Date().toJSON().slice(0, 10)}
              </p>
            </div>
          </div>
          <br />
          <br />
          <table className={styles.table}>
            <tr>
              <th>Sr No.</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Net Amount</th>
              <th>Tax Rate</th>
              <th>Tax Type</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
            </tr>
            {supplyState == "Punjab"
              ? cartValue.map((item, index) => {
                  var tax = 0.025 * item.price * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.product}</td>
                      <td>₹ {item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ₹{" "}
                        {item.price == "FREE" ? 0 : item.price * item.quantity}
                      </td>
                      <td>
                        2.5%
                        <br />
                        <br />
                        2.5%
                      </td>
                      <td>
                        CGST
                        <br />
                        <br />
                        SGST
                      </td>
                      <td>
                        ₹ {item.price == "FREE" ? 0 : tax?.toFixed(2)}
                        <br />
                        <br />₹ {item.price == "FREE" ? 0 : tax?.toFixed(2)}
                      </td>
                      <td>
                        ₹{" "}
                        {item.price == "FREE"
                          ? 0
                          : (tax + tax + item.price * item.quantity)?.toFixed(
                              2
                            )}
                      </td>
                    </tr>
                  );
                })
              : cartValue.map((item, index) => {
                  var tax = 0.05 * item.price * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.product}</td>
                      <td>₹ {item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ₹{" "}
                        {item.price == "FREE" ? 0 : item.price * item.quantity}
                      </td>
                      <td>5%</td>
                      <td>IGST</td>
                      <td>₹ {item.price == "FREE" ? 0 : tax?.toFixed(2)}</td>
                      <td>
                        ₹{" "}
                        {item.price == "FREE"
                          ? 0
                          : (tax + item.price * item.quantity)?.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
            {supplyState == "Punjab" ? (
              <tr>
                <td></td>
                <td>Shipping Charges</td>
                <td>₹ {(deliveryPin[1] / 1.05)?.toFixed(2)}</td>
                <td></td>
                <td>₹ {(deliveryPin[1] / 1.05)?.toFixed(2)}</td>
                <td>
                  2.5%
                  <br />
                  <br />
                  2.5%
                </td>
                <td>
                  CGST
                  <br />
                  <br />
                  SGST
                </td>
                <td>
                  ₹ {((0.025 * deliveryPin[1]) / 1.05)?.toFixed(2)}
                  <br />
                  <br />₹ {((0.025 * deliveryPin[1]) / 1.05)?.toFixed(2)}
                </td>
                <td>₹ {deliveryPin[1]}</td>
              </tr>
            ) : (
              <tr>
                <td></td>
                <td>Shipping Charges</td>
                <td>₹ {(deliveryPin[1] / 1.05)?.toFixed(2)}</td>
                <td></td>
                <td>₹ {(deliveryPin[1] / 1.05)?.toFixed(2)}</td>
                <td>5%</td>
                <td>IGST</td>
                <td>₹ {((0.05 * deliveryPin[1]) / 1.05)?.toFixed(2)}</td>
                <td>₹ {deliveryPin[1]}</td>
              </tr>
            )}
            <tr>
              <td
                style={{
                  border: "1px solid #333",
                  textAlign: "left",
                  padding: "8px",
                }}
                colSpan={7}
              >
                <b>TOTAL</b>
              </td>
              <td className={styles["total-amount"]}>
                <b>₹ {(taxes + (0.05 * deliveryPin[1]) / 1.05)?.toFixed(2)}</b>
              </td>
              <td className={styles["total-amount"]}>
                <b>₹ {(taxes + deliveryPin[1] + subtotal)?.toFixed(2)}</b>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                <b>
                  Amount in Words:{" "}
                  {deliveryPin[1] &&
                    subtotal &&
                    taxes &&
                    toWords.convert(
                      (deliveryPin[1] + subtotal + taxes)?.toFixed(2),
                      { currency: true }
                    )}
                </b>
              </td>
            </tr>
          </table>
          <br />
          <div
            style={{
              textAlign: "right",
              fontFamily: "Inter",
              fontSize: "1.5vmax",
              fontWeight: "600",
            }}
          >
            <p>For M/S FREAKA FOODS</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <Image
                  alt="authorised signatory"
                  src="https://ik.imagekit.io/kzzakkvwc/Divya_Rawat_transparent_signature_.png?updatedAt=1687800697702"
                  height="250"
                  width="200"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p>Authorised Signatory</p>
          </div>
          <br />
          <p
            style={{
              fontSize: "1.2vmax",
              fontFamily: "Inter",
              padding: "0 0 0.5vmax 0",
            }}
          >
            Whether tax is payable under reverse charge - No
          </p>
          <br />
          <br />
          <br />
          <p
            style={{
              fontSize: "1.2vmax",
              fontFamily: "Inter",
              padding: "0 0 0.5vmax 0",
              textAlign: "center",
            }}
          >
            <u>Thank you from M/S FREAKA FOODS</u>
          </p>
          <p
            style={{
              fontSize: "1.2vmax",
              fontFamily: "Inter",
              padding: "0 0 0.5vmax 0",
              textAlign: "center",
            }}
          >
            Note: Once you receive your package, kindly chill/refrigerate for
            atleast 2 hrs.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
