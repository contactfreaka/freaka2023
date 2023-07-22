import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import cartValue from '../data/cart.json';

const ErrorPage = () => {

    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
      var totalQuantity = 0;
      cartValue.map((item) => {
        totalQuantity = totalQuantity + item.quantity;
      });
      setQuantity(totalQuantity);
    }, [cartValue])

    useEffect(() => {
        setTimeout(() => {
            Router.push("/menu");
        }, 3000);
    }, [])

    return (
        <div>
            <Head>
                <title>FREAKA - ErrorPage</title>
                <meta name="description" content="A healthyish food venture" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar quantity={quantity} left={"15vmax"} right={"15vmax"}/>
            <div style={{textAlign: 'center', padding: '1vmax', paddingBottom: '5vmax', paddingTop: '2vmax'}}>
                <div class="lds-ripple"><div></div><div></div></div>
                <div><h2><b>Redirecting back to the Menu</b></h2></div>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage;