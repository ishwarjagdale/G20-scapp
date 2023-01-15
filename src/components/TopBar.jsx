import React from "react";
import {
    UilBars
} from "@iconscout/react-unicons";

class TopBar extends React.Component {

    render() {
        return (
            <div className={"flex items-center border-b justify-between w-full p-6"}>
                <span onClick={() => window.location.href = "/"} className={"cursor-pointer font-Poppins whitespace-nowrap font-bold text-lg"}>LOGO</span>
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
