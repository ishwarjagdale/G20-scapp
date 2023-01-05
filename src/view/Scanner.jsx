import React from "react";
import QrReader from "react-web-qr-reader";
import {UilMultiply, UilQrcodeScan} from "@iconscout/react-unicons";
import FallBackImage from "../images/fallback.png";

class Scanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stop: false,
            data: {
                "name": "Ajanta Caves",
                "image": "https://images.indianexpress.com/2018/12/ajanta-1.jpg"
            },
            qr: null
        };
    }

    render() {
        return (
            <>
                <div className={"flex absolute bg-black md:bg-transparent max-w-md flex-col w-full h-full overflow-hidden top-0 md:relative"}>
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
                            onScan={(res) => { this.setState({qr: res}) }}
                            onError={(err) => { console.log(err) }}
                        />
                    }
                    <div className={"flex flex-col p-4 items-center w-full rounded-t-2xl bg-white h-full -mt-4 z-20 overflow-y-scroll"}>
                        {
                            !this.state.qr ?
                                <div className={"m-auto flex flex-col items-center"}>
                                    <UilQrcodeScan size={'72px'} color={"gray"}/>
                                    <span className={"font-Poppins font-[500] my-4"}>Scan QR code to know more!</span>
                                </div>
                                :
                                this.state.qr === "ajanta-caves-1234" && <div className={"cursor-pointer w-full"}>
                                    <img src={this.state.data.image} alt={this.state.data.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={() => FallBackImage}/>
                                    <div className={"flex flex-col items-start font-Poppins my-2"}>
                                        <div className={"flex items-center"}>
                                            <span className={"text-sm font-medium"}>{this.state.data.name}</span>
                                        </div>
                                        <p className={"mt-2 text-sm text-gray-700 text-justify text-ellipsis overflow-hidden max-h-[100px]"}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
