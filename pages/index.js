import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Hero from "@/components/hero";
import Order from "@/components/order";
import Footer from "@/components/footer";
import cartValue from "../data/cart.json";
import { useEffect, useState } from "react";
import FreeSample from "@/components/freeSample";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <title>FREAKA</title>
        <meta name="description" content="A healthyish food venture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar quantity={quantity} left={"15vmax"} right={"15vmax"} />
      <Hero />
      <About />
      <Order />
      <Footer />
      <FreeSample />
    </>
  );
}
