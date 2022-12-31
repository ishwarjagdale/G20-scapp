import React from "react";
import {UilBars, UilLanguage, UilSearch} from "@iconscout/react-unicons";

class TopBar extends React.Component {
    render() {
        return (
            <div className={"flex items-center border-b rounded-b-2xl w-full justify-between p-6"}>
                <button className={"p-2"}><UilBars size={'24px'}/></button>
                <div className={"flex items-center"}>
                    <button className={"p-2"}><UilSearch size={'24px'}/></button>
                    <div className={"p-2"}/> {/*spacer*/}
                    <button className={"p-2"}><UilLanguage size={'24px'}/></button>
                </div>
            </div>
        );
    }
}

export default TopBar;
