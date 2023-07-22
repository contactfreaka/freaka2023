import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <div id="contact">
      <div className={`component ${styles.footer}`}>
        <div className={styles["logo-link"]}>
          <Image
            className={styles.logo}
            alt="Freaka logo"
            src="https://ik.imagekit.io/kzzakkvwc/logo.png?updatedAt=1683714509969&tr=w-350,h-350,fo-custom,cm-extract"
            layout="responsive"
            width="2"
            height="2"
          />
          <div className={styles.links}>
            <a
              href="https://www.facebook.com/profile.php?id=100091637283899&mibextid=ZbWKwL"
              target="_blank"
            >
              <BsFacebook style={{ fontSize: "2vmax", color: "#4267B2" }} />
            </a>
            <a href="https://www.instagram.com/freakafooods/" target="_blank">
              <BsInstagram style={{ fontSize: "2vmax", color: "#d62976" }} />
            </a>
          </div>
        </div>
        <div className={styles["contact-us"]}>
          <h2 className={styles["contact-heading"]}>Contact us</h2>
          <div style={{ display: "flex", gap: "0.5vmax" }}>
            <GrLocation style={{ fontSize: "1.5vmax", color: "#333333" }} />
            <div style={{ color: "#333333" }}>
              <p className={styles.text1}>
                Flat No. 506, Tower 6, Royale Estate
              </p>
              <p className={styles.text1}>Near Oxford Street, Zirakpur,</p>
              <p className={styles.text1}>Punjab - 140603</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5vmax", paddingTop: "1vmax" }}>
            <AiOutlinePhone
              style={{ fontSize: "1.5vmax", transform: "scaleX(-1)" }}
            />
            <div style={{ color: "#333333" }}>
              <p className={styles.text1}>+91 85806 72935</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5vmax", paddingTop: "1vmax" }}>
            <AiOutlineMail
              style={{ fontSize: "1.5vmax", transform: "scaleX(-1)" }}
            />
            <div style={{ color: "#333333" }}>
              <a
                className={styles["mail-link"]}
                href="mailto:contactfreaka@gmail.com"
              >
                contactfreaka@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles["quick-links-heading"]}>Quick Links</h2>
          <Link href="/#about">
            <p className={styles.text}>About</p>
          </Link>
          <Link href="/menu">
            <p className={styles.text}>Menu</p>
          </Link>
          <Link href="/contact">
            <p className={styles.text}>Contact</p>
          </Link>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "orange",
          padding: "1vmax 9vmax",
          color: "#FFF",
          fontFamily: "Inter",
        }}
      >
        Copyright©2023 M/S FREAKA FOODS. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
