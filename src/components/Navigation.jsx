import LOGO from "../images/logo.png";
import {
    UilAdjust,
    UilBars, UilBookmark,
    UilEstate,
    UilHistoryAlt,
    UilLocationPoint
} from "@iconscout/react-unicons";
import {useState} from "react";
import {Link} from "react-router-dom";

function Navigation() {

    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className={"flex w-full h-[100px] items-center justify-between py-6 px-8 lg:px-20"}>
            <a href={"/"} className={"p-2 rounded-lg bg-white"}>
                <img src={LOGO} className={"w-[48px] h-auto"} alt={"LOGO"}/>
            </a>
            <button onClick={() => setMenuActive(!menuActive)} className={"lg:hidden p-2 rounded-md hover:bg-[#f1f1f1] inline-block"}><UilBars size={'24px'}/></button>
            <div className={`${!menuActive ? 'hidden' : ''} bg-white z-50 py-2 lg:flex fixed lg:relative bottom-0 left-0 border-t-2 lg:border-0 w-full lg:w-fit text-sm font-Poppins font-[500] rounded-2xl`}>
                <div className={"w-[50px] h-[4px] mx-auto bg-black rounded-xl lg:hidden mt-2 mb-4"} />
                <Link to={"/"} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2"}><UilEstate/></div>
                    <span className={"mx-2"}>Home</span>
                </Link>
                <Link to={"/nearby"} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2"}><UilLocationPoint/></div>
                    <span className={"mx-2"}>Nearby</span>
                </Link>
                <Link to={"/visited-places"} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2"}><UilHistoryAlt/></div>
                    <span className={"mx-2"}>Visited Places</span>
                </Link>
                <Link to={"/saved"} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2"}><UilBookmark/></div>
                    <span className={"mx-2"}>Saved Places</span>
                </Link>
                <Link to={"/about"} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2"}><UilAdjust/></div>
                    <span  className={"mx-2"}>About</span>
                </Link>
            </div>
        </div>
    )
}

export default Navigation;
