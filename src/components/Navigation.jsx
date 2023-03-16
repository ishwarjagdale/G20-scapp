import ASC_LOGO from "../images/asc.jpg";
import ANO_LOGO from "../images/another-logo.jpg";
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

    const [menuActive, setMenuActive] = useState(true);

    return (
        <div className={"flex w-full h-[100px] items-center justify-between py-6 px-4 lg:px-20"}>
            <Link to={"/"} className={"p-2 flex items-center  rounded-lg bg-white"}>
                <img src={ANO_LOGO} className={"w-[42px] mr-4 h-auto bg-none"} alt={"logo"}/>
                <img src={ASC_LOGO} className={"w-[42px] p-1 h-auto bg-none"} alt={"Aurangabad smart city"}/>
            </Link>
            <button onClick={() => setMenuActive(!menuActive)} className={"lg:hidden p-2 rounded-md hover:bg-[#f1f1f1] inline-block"}><UilBars size={'24px'}/></button>
            <div onClick={() => setMenuActive(!menuActive)} className={`${menuActive ? 'hidden': ''} bg-[rgba(0,0,0,0.2)] lg:bg-transparent flex flex-col justify-end z-50 lg:flex fixed lg:relative bottom-0 left-0 w-full h-full fixed lg:relative lg:w-fit lg:h-fit`}>
                <div className={`flex flex-col lg:flex-row lg:items-center items-start border-t-2 h-fit bg-white lg:border-0 w-full lg:w-fit text-sm font-Poppins font-[500] rounded-t-2xl`}>
                    <div onClick={() => setMenuActive(!menuActive)} className={"w-[50px] h-[4px] mx-auto bg-black rounded-xl lg:hidden m-2 mb-4"} />
                    <Link to={"/"} onClick={() => setMenuActive(!menuActive)} className={"flex w-full lg:w-fit items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                        <div className={"mx-2 lg:hidden"}><UilEstate/></div>
                        <span className={"mx-2"}>Home</span>
                    </Link>
                    <Link to={"/nearby"} onClick={() => setMenuActive(!menuActive)} className={"flex w-full lg:w-fit items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                        <div className={"mx-2 lg:hidden"}><UilLocationPoint/></div>
                        <span className={"mx-2"}>Nearby</span>
                    </Link>
                    <Link to={"/visited-places"} onClick={() => setMenuActive(!menuActive)} className={"flex w-full lg:w-fit items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                        <div className={"mx-2 lg:hidden"}><UilHistoryAlt/></div>
                        <span className={"mx-2"}>Visited Places</span>
                    </Link>
                    <Link to={"/saved"} onClick={() => setMenuActive(!menuActive)} className={"flex w-full lg:w-fit items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                        <div className={"mx-2 lg:hidden"}><UilBookmark/></div>
                        <span className={"mx-2"}>Saved Places</span>
                    </Link>
                    <Link to={"/about"} onClick={() => setMenuActive(!menuActive)} className={"flex w-full lg:w-fit items-center hover:bg-[#f1f1f1] rounded-xl p-4"}>
                        <div className={"mx-2 lg:hidden"}><UilAdjust/></div>
                        <span  className={"mx-2"}>About</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
