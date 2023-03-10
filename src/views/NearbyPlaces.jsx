import {UilQrcodeScan} from "@iconscout/react-unicons";
import {useEffect, useState} from "react";
import {getNearby} from "../api/home";
import {calculateDistance} from "../components/constants";
import {notify} from "../components/notifier";
import FallbackImage from "../images/fallback.png";
import {Link} from "react-router-dom";

function NearbyPlaces() {

    const [coords, setCoords] = useState(null);
    const [permission, setPermission] = useState(false);
    const [nearby, setNearby] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        navigator.permissions.query({name: "geolocation"}).then((res) => {
            if(res.state === "granted") {
                setPermission(true)
            } else {
                notify("Require location access");
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((res) => {
            setCoords(res.coords)
            getNearby(res.coords).then((res) => {
                if(res.status === 200) {
                    setNearby(res.data.response);
                    setLoading(false)
                }
            })
        }, () => {}, {
            enableHighAccuracy: true, timeout: 10000
        })
    }, [])


    useEffect(() => {
        document.title = "Nearby Places | Smart Scan"
    }, [])

    return (
        <div className={"flex flex-col justify-between overflow-scroll m-2  ml-2 lg:ml-0 w-full lg:w-1/4 relative "}>
            <div className={"pb-24 lg:pb-0"}>
                <div className={"flex flex-col mx-2 mb-4"}>
                    <span className={"font-[600] font-Poppins text-sm capitalize text-xl"}>Nearby Places</span>
                    <span className={"text-sm"}>Accurate upto: {coords?.accuracy} m</span>
                </div>
                <div className={"flex flex-col mb-8"}>
                    {
                        permission ? !loading ? nearby.length ? nearby.map((c) => {
                            return <div className={"flex flex-col mb-2 justify-end relative w-full"}>
                                <Link to={`/monument/${c.id}`}><img src={c.images[0]} onError={(e) => e.target.src = FallbackImage}
                                                                   className={"w-full h-[150px] rounded-xl object-cover"}
                                                                   alt={""}/></Link>
                                <div className={"flex items-center"}>
                                    <Link to={`/monument/${c.id}`} className={"font-[500] font-Poppins p-2 text-sm"}>{c.name}</Link>
                                    <span className={"mx-2 dot"} />
                                    <span className={"font-medium text-sm"}>{Math.round(calculateDistance(coords.latitude, coords.longitude, Number.parseFloat(c.lat), Number.parseFloat(c.long)))} km</span>
                                </div>
                            </div>
                        }) :
                                <span className={"text-sm p-2"}>There are no location nearby within 5km distance.</span>
                            :

                                <>
                                    <div className={"flex items-center mx-2 mb-4"}>
                                        <span className={"font-[600] font-Poppins text-sm w-[200px] bg-[#e4e4e4]"}/>
                                    </div>
                                    <div className={"flex mb-8"}>
                                        <div className={"flex flex-col justify-end relative w-full"}>
                                            <div className={"w-full h-[150px] rounded-xl object-cover bg-[#e4e4e4]"}/>
                                            <span
                                                className={"font-[600] bg-[#e4e4e4] w-[200px] font-Poppins text-sm p-2 mt-2"}/>
                                        </div>
                                    </div>
                                </>

                            :

                            <span className={"text-sm p-2"}>Allow access to location.</span>
                    }
                </div>
            </div>
            <div className={"fixed lg:sticky bottom-0 left-0 bg-white p-2 lg:pb-0 lg:px-0 lg:pb-0 w-full"}>
                <Link to={"/scanner"} className={" flex p-4 justify-center items-center bg-[#1f1f1f] w-full rounded-full text-white font-Poppins"}>
                    <UilQrcodeScan size={'24px'}/><span className={"text-sm font-[600] mx-4"}>Scan QR code</span>
                </Link>
            </div>
        </div>
    )
}

export default NearbyPlaces;
