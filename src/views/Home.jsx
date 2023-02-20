import QRBanner from "../images/zz.jpg";
import {UilQrcodeScan} from "@iconscout/react-unicons";
import PopularPlaces from "../components/PopularPlaces";
import Categories from "../components/Categories";
import {useEffect} from "react";
import {Link} from "react-router-dom";

function Home() {

    useEffect(() => {
        console.log(process.env)
        document.title = "Home | Smart Scan"
    }, [])

    return (
        <div className={"flex flex-col justify-between overflow-scroll m-2  ml-2 lg:ml-0 w-full lg:w-1/4 relative "}>
            <div className={"pb-24 lg:pb-0"}>
                {/*greeting marquee*/}
                <span className={"font-Poppins mb-4 text-sm font-[500] lg:hidden text-center lg:text-left block"}>Aurangabad Smart City presents Smart Scan</span>

                <div className={"lg:hidden p-6 font-Poppins bg-[#1f1f1f] text-white rounded-2xl mb-2"}>
                    <marquee className="text-xl flex font-normal">Welcome to Aurangabad!
                        <div className="px-4 inline-block"></div>
                        औरंगाबाद में आपका स्वागत है
                        <div className="px-4 inline-block"></div>
                        औरंगाबादमध्ये आपले स्वागत आहे
                    </marquee>
                </div>

                {/*greeting marquee ends*/}
                <a href={"/scanner"}><img className={"lg:hidden mb-6 rounded-2xl h-[150px] w-full object-cover"} src={QRBanner} alt={"scan qr"}/></a>
                {/*image banner ends*/}

                {/*popular places*/}
                <PopularPlaces/>

                {/*categories*/}
                <Categories/>


            </div>
            <div className={"fixed lg:sticky bottom-0 left-0 bg-white p-2 lg:p-0 w-full"}>
                <Link to={"/scanner"} className={" flex p-4 justify-center items-center bg-[#1f1f1f] w-full rounded-full text-white font-Poppins"}>
                    <UilQrcodeScan size={'24px'}/><span className={"text-sm font-[600] mx-4"}>Scan QR code</span>
                </Link>
            </div>
        </div>
    )
}

export default Home
