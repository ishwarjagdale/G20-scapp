import React from "react";
import {
    UilBars
} from "@iconscout/react-unicons";
import LOGO from "../images/logo.png";

class TopBar extends React.Component {

    render() {
        return (
            <div className={"flex items-center border-b justify-between w-full p-6"}>
                <span onClick={() => window.location.href = "/"} className={"cursor-pointer font-Poppins whitespace-nowrap w-[48px] font-bold text-lg"}><img src={LOGO} alt={"Smart Scan"} /></span>
                <div className={"flex flex-1 items-center justify-end"}>
                    {/*<button onClick={this.props.toggleSearch} className={"p-2"}>*/}
                    {/*    <UilSearch size={'24px'}/>*/}
                    {/*</button>*/}
                    <div className={"p-2"}/>
                    {/*<button onClick={this.props.toggleLanguage} className={"p-2"}><UilLanguage size={'24px'}/></button>*/}
                    <button onClick={this.props.toggleMenu} className={"p-2"}><UilBars size={'24px'}/></button>
                </div>
            </div>
        );
    }
}

export default TopBar;
