import React from "react";
import {Link} from "react-router-dom";
import {UilBookmark, UilEstate, UilHistory, UilLocationPoint, UilQrcodeScan} from "@iconscout/react-unicons";

class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            touchStart: null,
            touchEnd: null
        };

        this.updatePath = this.updatePath.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    updatePath() {
        switch (window.location.pathname) {
            case '/':
                this.setState({index: 0}); break;
            case '/visited-places':
                this.setState({index: 2}); break;
            case '/saved':
                this.setState({index: 3}); break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.updatePath();
    }

    touchStart(e) {
        this.setState({touchStart: e.targetTouches[0].clientY})
    }

    touchMove(e) {
        this.setState({touchEnd: e.targetTouches[0].clientY})
    }

    touchEnd() {
        let touchStart = this.state.touchStart;
        let touchEnd =this.state.touchEnd;
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd;
        if(distance < -50) {
            this.props.toggleMenu();
        }
    }

    render() {
        return (
            <div onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} onClick={this.updatePath} className={"z-20 flex border font-Poppins text-sm flex-col absolute bg-white bottom-0 rounded-2xl drop-shadow-xl p-4 px-2 w-full"}>
                <div onClick={this.props.toggleMenu} className={"cursor-pointer flex w-full p-2 items-center justify-center"}>
                    <span className={"line w-[50px!important]"}/>
                </div>
                <Link onClick={this.props.toggleMenu} to={"/"} className={`flex w-full p-4 rounded-xl items-center`}>
                    <UilEstate size={"24px"} />
                    <span className={"ml-4 font-[500]"}>Home</span>
                </Link>
                <button onClick={() => window.alert("Feature coming soon!")} className={`flex rounded-xl w-full p-4 items-center`}>
                    <UilLocationPoint size={"24px"} />
                    <span className={"ml-4 font-[500]"}>Nearby</span>
                </button>
                <button onClick={this.props.toggleScanner} className={"flex rounded-xl w-full p-4 items-center rounded-xl"}>
                    <UilQrcodeScan size={"24px"} />
                    <span className={"ml-4 font-[500]"}>Scan QR code</span>
                </button>
                <Link onClick={this.props.toggleMenu} to={"/visited-places"} className={`flex w-full p-4 rounded-xl items-center`}>
                    <UilHistory size={"24px"} />
                    <span className={"ml-4 font-[500]"}>History</span>
                </Link>
                <Link onClick={this.props.toggleMenu} to={"/saved"} className={`flex w-full p-4 rounded-xl items-center`}>
                    <UilBookmark size={"24px"} />
                    <span className={"ml-4 font-[500]"}>Saved</span>
                </Link>
            </div>
        );
    }
}

export default BottomBar;
