import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";

function Navbar({ quantity, left, right }) {
  return (
    <div>
      <ul className={styles.menu}>
        <li>
          <Link href="/">
            <Image
              style={{ borderRadius: "50%" }}
              alt="Freaka logo"
              src="https://ik.imagekit.io/kzzakkvwc/logo.png?updatedAt=1683714509969&tr=w-350,h-350,fo-custom,cm-extract"
              layout="responsive"
              width="2"
              height="2"
            />
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.menuItem} id={styles.menuItems}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/menu" className={styles.menuItem} id={styles.menuItems}>
            Menu
          </Link>
        </li>
        <li>
          <Link
            href="/#about"
            className={styles.menuItem}
            id={styles.menuItems}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            className={styles.menuItem}
            id={styles.menuItems}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3vmax" }}
            >
              <BsCart3 style={{ fontSize: "2vmax" }} />
              <div
                style={{
                  color: "white",
                  background: "orange",
                  fontWeight: "600",
                  fontSize: "1vmax",
                  borderRadius: "50%",
                  width: "1.5vmax",
                  height: "1.5vmax",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {quantity}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
