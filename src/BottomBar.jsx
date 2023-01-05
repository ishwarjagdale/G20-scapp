import React from "react";
import {Link} from "react-router-dom";
import {UilBookmark, UilEstate, UilHistory, UilLocationPoint, UilQrcodeScan} from "@iconscout/react-unicons";

class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };

        this.updatePath = this.updatePath.bind(this);
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

    render() {
        return (
            <div onClick={this.updatePath} className={"flex items-center border-t mt-auto justify-around p-4 w-full"}>
                <Link to={"/"} className={`flex flex-col p-4 items-center justify-center ${this.state.index === 0 ? 'after-dot' : ''}`}><UilEstate size={"24px"} /></Link>
                <Link to={"/"} className={`flex flex-col p-4 items-center justify-center ${this.state.index === 1 ? 'after-dot' : ''}`}><UilLocationPoint size={"24px"} /></Link>
                <button onClick={this.props.toggleScanner} className={"hover:bg-slate-900 p-4 mx-4 bg-slate-900 rounded-full"}><UilQrcodeScan color={'#fff'} size={"24px"} /></button>
                <Link to={"/visited-places"} className={`flex flex-col p-4 items-center justify-center ${this.state.index === 2 ? 'after-dot' : ''}`}><UilHistory size={"24px"} /></Link>
                <Link to={"/saved"} className={`flex flex-col p-4 items-center justify-center ${this.state.index === 3 ? 'after-dot' : ''}`}><UilBookmark size={"24px"} /></Link>
            </div>
        );
    }
}

export default BottomBar;
