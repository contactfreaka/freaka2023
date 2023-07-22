import Image from "next/image";
import Link from "next/link";
import styles from "../styles/hero.module.css";

const Hero = () => {
  return (
    <>
      {/* <div style={{position: 'absolute', right: 0, top: 0, width: '50%', zIndex: '-1'}}>
            <Image src="https://ik.imagekit.io/kzzakkvwc/Bg.svg?updatedAt=1683752604015" alt="bg design" width={50} height={50} layout="responsive" />
        </div> */}

      <div className={`component ${styles["hero-container"]}`}>
        <div>
          <p className={styles["heading-text"]}>Healthy & Tasty Food</p>
          <div id="heading" className={styles.heading}>
            Can&apos;t say no to these bites?{" "}
            <div className={styles["heading-img"]}>
              <Image
                alt="group of stars"
                src="https://ik.imagekit.io/kzzakkvwc/group.svg?updatedAt=1683719311754"
                width={5}
                height={5}
                layout="responsive"
              />
            </div>
          </div>
          <p className={styles.text}>
            You have got to try these yummy, healthy & versatile snacks (at
            least once)!
          </p>
          <div className={styles.links}>
            <Link href="#about" className="button orange">
              <p>Show more</p>
            </Link>
            <Link href="/menu" className="button white">
              <p>Place an order!</p>
            </Link>
          </div>
        </div>
        <div>
          <Image
            alt="Hero section image of healthy diet"
            src="https://ik.imagekit.io/kzzakkvwc/Image_01.png?updatedAt=1687678515728"
            width={5}
            height={5}
            layout="responsive"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
