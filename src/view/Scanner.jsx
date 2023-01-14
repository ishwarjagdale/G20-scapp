import React from "react";
import QrReader from "react-web-qr-reader";
import {UilMultiply, UilQrcodeScan} from "@iconscout/react-unicons";
import FallBackImage from "../images/fallback.png";
import {getMonument} from "../api/home";

class Scanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stop: false,
            data: null,
            qr: null
        };

        this.onScan = this.onScan.bind(this);
        this.addToVisited = this.addToVisited.bind(this);
    }

    onScan(r) {
        if(r.data.length !== 0)
        getMonument(r.data, true).then((res) => {
            if(res.status === 200) {
                this.setState({data: res.data.response, qr: r.data});
            }
        })
    }

    addToVisited(id) {
        let visited = new Set(JSON.parse(localStorage.getItem('visited')) || []);
        visited.add(id);
        localStorage.setItem('visited', JSON.stringify(Array(...visited)));
    }

    render() {
        return (
            <>
                <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex absolute top-0 z-10 items-center justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-end items-center"}>
                            <button onClick={this.props.toggleScanner} className={"rounded-full bg-white p-2"}><UilMultiply size={'20px'}/></button>
                        </div>
                    </div>
                    {
                        !this.state.stop && <QrReader
                            delay={500}
                            className={"scanner"}
                            showViewFinder={true}
                            onScan={this.onScan}
                            onError={(err) => { console.log(err) }}
                        />
                    }
                    <div className={"flex flex-col p-4 items-center w-full rounded-t-2xl bg-white h-full -mt-4 z-20 overflow-y-scroll"}>
                        {
                            !this.state.data ?
                                <div className={"m-auto flex flex-col items-center"}>
                                    <UilQrcodeScan size={'72px'} color={"gray"}/>
                                    <span className={"font-Poppins font-[500] my-4"}>Scan QR code to know more!</span>
                                </div>
                                :
                                // <span className={"m-auto font-Poppins font-[500] text-sm"}>{this.state.qr.data}</span>
                                <div onClick={() => {
                                    this.props.selectMonument(this.state.data.id)
                                    this.addToVisited(this.state.data.id);
                                    this.props.toggleScanner()
                                }} className={"rounded-none hover:bg-white cursor-pointer w-full"}>
                                    <img src={this.state.data.images[0]} alt={this.state.data.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage}/>
                                    <div className={"flex flex-col items-start font-Poppins my-2"}>
                                        <div className={"flex items-center"}>
                                            <span className={"text-sm font-medium"}>{this.state.data.name}</span>
                                        </div>
                                        <p className={"mt-2 text-sm text-gray-700 text-justify text-ellipsis overflow-hidden max-h-[100px]"}>
                                            {this.state.data.description}
                                        </p>
                                    </div>
                                    <button className={"w-full transition-all duration-100 ease-in border-2 border-black font-Poppins font-[500] rounded-lg mt-4 active:scale-[1.1!important] active:bg-black active:text-white py-2"}>
                                        Read More
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }

}

export default Scanner;
