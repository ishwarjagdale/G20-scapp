import LOGO from "../images/logo.png";
import ASC_LOGO from "../images/asc.jpg";
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
        <div className={"flex w-full h-[100px] items-center justify-between py-6 px-4 lg:px-20"}>
            <a href={"/"} className={"p-2 flex items-center  rounded-lg bg-white"}>
                <img src={LOGO} className={"w-[42px] h-auto bg-none"} alt={"SMART SCAN"}/>
                <img src={ASC_LOGO} className={"w-[42px] mx-4 h-auto bg-none"} alt={"SMART SCAN"}/>
            </a>
            <button onClick={() => setMenuActive(!menuActive)} className={"lg:hidden p-2 rounded-md hover:bg-[#f1f1f1] inline-block"}><UilBars size={'24px'}/></button>
            <div className={`${!menuActive ? 'hidden' : ''} bg-white z-50 py-2 lg:flex fixed lg:relative bottom-0 left-0 border-t-2 lg:border-0 w-full lg:w-fit text-sm font-Poppins font-[500] rounded-2xl`}>
                <div onClick={() => setMenuActive(!menuActive)} className={"w-[50px] h-[4px] mx-auto bg-black rounded-xl lg:hidden m-2 mb-4"} />
                <Link to={"/"} onClick={() => setMenuActive(!menuActive)} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2 lg:hidden"}><UilEstate/></div>
                    <span className={"mx-2"}>Home</span>
                </Link>
                <Link to={"/nearby"} onClick={() => setMenuActive(!menuActive)} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2 lg:hidden"}><UilLocationPoint/></div>
                    <span className={"mx-2"}>Nearby</span>
                </Link>
                <Link to={"/visited-places"} onClick={() => setMenuActive(!menuActive)} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2 lg:hidden"}><UilHistoryAlt/></div>
                    <span className={"mx-2"}>Visited Places</span>
                </Link>
                <Link to={"/saved"} onClick={() => setMenuActive(!menuActive)} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2 lg:hidden"}><UilBookmark/></div>
                    <span className={"mx-2"}>Saved Places</span>
                </Link>
                <Link to={"/about"} onClick={() => setMenuActive(!menuActive)} className={"flex items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                    <div className={"mx-2 lg:hidden"}><UilAdjust/></div>
                    <span  className={"mx-2"}>About</span>
                </Link>
            </div>
        </div>
    )
}

export default Navigation;
