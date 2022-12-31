import React from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {Outlet} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className={"flex max-w-md flex-col w-full h-full overflow-hidden"}>
                <TopBar />
                <Outlet/>
                <BottomBar />
            </div>
        )
    }
}

export default App;
