import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import {Outlet} from "react-router-dom";

export default function BaseLayout  () {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
    
}
