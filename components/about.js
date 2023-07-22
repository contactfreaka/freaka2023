import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player/lazy";
import styles from "../styles/about.module.css";

const About = () => {
  const [isOpen, setOpen] = useState(false);
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
  return (
    <>
      <div id="about" className={`component ${styles.about}`}>
        <div>
          <Image
            alt="About section image of healthy diet"
            src="https://ik.imagekit.io/kzzakkvwc/Image_02.jpg?updatedAt=1687681773563"
            width={50}
            height={50}
            layout="responsive"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div>
          <div className={styles["about-us-heading"]}>About us</div>
          <div className={`heading ${styles.title}`}>Welcome to Freaka!!!</div>
          <div className={styles.description}>
            We are a “healthyish” food venture dedicated to making “versatile
            snacks”. Versatile snacks? What? How?
          </div>
          <div className={styles.description}>
            We are committed to making snack options that can be consumed by
            everyone & anyone who loves healthy but delectable snacking options.
            Every snack is made with straightforward, nutrient-dense,
            tried-and-true ingredients that will perfectly support your fitness
            path and assist you in leading a balanced life.
          </div>
          <div className={styles["try-out"]}>
            Try some of our stuff and feel the difference!
          </div>
          <div className={styles["video-btn-container"]}>
            <div
              className={`button orange ${styles["video-btn"]}`}
              onClick={() => setOpen(true)}
            >
              <p>&#9658; &nbsp;Watch video</p>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
      >
        <ReactPlayer
          url="https://ik.imagekit.io/kzzakkvwc/0606__1__1_.mp4?updatedAt=1687643038457"
          controls={true}
          playing={true}
        />
      </ReactModal>
    </>
  );
};

export default About;
