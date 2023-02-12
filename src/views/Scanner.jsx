import QrReader from "react-web-qr-reader";
import {getMonument} from "../api/home";
import {UilMultiply, UilQrcodeScan} from "@iconscout/react-unicons";
import {useNavigate} from "react-router-dom";

function Scanner() {
    const history = useNavigate();

    const onScan = (r) => {
        if(r.data.length !== 0) {
            window.location.href = r.data;
        }
    }

    return (
        <div className={"fixed top-0 left-0 h-full lg:relative flex flex-col overflow-scroll lg:m-2 rounded-xl lg:ml-0 w-full lg:w-1/4 "}>
            <button onClick={() => history(-1)} className={"lg:hidden z-50 rounded-full p-2 w-fit fixed right-0 top-0 m-4 bg-black"}>
                <UilMultiply size={'18px'} color={"white"} />
            </button>
            <div className={"bg-white"}>
                <QrReader className={"rounded-xl scanner"} onScan={onScan} onError={(err) => console.log(err)} delay={false} facingMode={"environment"} showViewFinder={true} />
            </div>
            <div className={"rounded-t-2xl flex flex-col justify-center items-center flex-1 z-10 p-4 -mt-10 border-t bg-white"}>
                <div className={"m-auto flex flex-col items-center pb-10"}>
                    <UilQrcodeScan size={'72px'} color={"gray"}/>
                    <span className={"font-Poppins font-[500] my-4"}>Scan QR code to know more!</span>
                </div>
            </div>
        </div>
    )
}

export default Scanner;
