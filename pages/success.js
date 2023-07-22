import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { BsFillBagCheckFill } from "react-icons/bs";
import cartValue from "../data/cart.json";

const ErrorPage = () => {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        cartValue.pop();
        setTimeout(() => {
            Router.push("/");
        }, 5000);
    }, [])

    return (
        <div>
            <Head>
                <title>FREAKA - Success</title>
                <meta name="description" content="A healthyish food venture" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar quantity={quantity} left={"15vmax"} right={"15vmax"}/>
            <div style={{textAlign: 'center', padding: '1vmax'}}>
                <BsFillBagCheckFill style={{fontSize: '5vmax'}} />
                <div><h2><b>Your order was placed successfully!</b></h2></div>
                <div><h2>Your invoice will be downloaded shortly.</h2></div>
                <div><h2>Redirecting back to Home</h2></div>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage;