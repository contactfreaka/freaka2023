import Image from "next/image";
import { useRouter } from "next/router";

const Menucard = ({ code, title, image, price }) => {
  const router = useRouter();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        console.log(code);
        if (parseInt(code / 1000) === 1) {
          router.push("/menu/item/" + code);
        }
      }}
    >
      <div
        style={{
          position: "relative",
          height: "15vmax",
          borderRadius: "6px",
        }}
      >
        <Image alt={title} src={image} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="dish-title">{title}</p>
      {price != 0 ? <p className="dish-price">₹{price}</p> : <></>}
    </div>
  );
};

export default Menucard;
