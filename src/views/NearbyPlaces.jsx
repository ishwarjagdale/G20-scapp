import {UilQrcodeScan} from "@iconscout/react-unicons";
import {useEffect, useState} from "react";
import {getNearby} from "../api/home";
import {calculateDistance} from "../components/constants";

function NearbyPlaces() {

    const [coords, setCoords] = useState(null);
    const [permission, setPermission] = useState(false);
    const [nearby, setNearby] = useState([]);

    useEffect(() => {
        navigator.permissions.query({name: "geolocation"}).then((res) => {
            if(res.state === "granted") {
                setPermission(true)
                navigator.geolocation.getCurrentPosition((res) => {
                    setCoords(res.coords)
                    getNearby(res.coords).then((res) => {
                        if(res.status === 200) {
                            setNearby(res.data.response);
                        }
                    })
                }, () => {}, {
                    enableHighAccuracy: true, timeout: 10000
                })
            }
        })
    }, [])


    useEffect(() => {
        document.title = "Nearby Places"
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
                        permission ? nearby.map((c) => {
                            return <div className={"flex flex-col mb-2 justify-end relative w-full"}>
                                <a href={`/monument/${c.id}`}><img src={c.images[0]}
                                                                   className={"w-full h-[150px] rounded-xl object-cover"}
                                                                   alt={""}/></a>
                                <div className={"flex items-center"}>
                                    <a href={`/monument/${c.id}`} className={"font-[500] font-Poppins p-2 text-sm"}>{c.name}</a>
                                    <span className={"mx-2 dot"} />
                                    <span className={"font-medium"}>{Math.round(calculateDistance(coords.latitude, coords.longitude, Number.parseFloat(c.lat), Number.parseFloat(c.long)))} km</span>
                                </div>
                            </div>
                        })

                            :

                            <span className={"text-sm p-2"}>Allow access to location.</span>
                    }
                </div>
            </div>
            <div className={"fixed lg:relative bottom-0 left-0 bg-white p-2 lg:p-0 w-full"}>
                <a href={"/scanner"} className={" flex p-4 justify-center items-center bg-[#1f1f1f] w-full rounded-full text-white font-Poppins"}>
                    <UilQrcodeScan size={'24px'}/><span className={"text-sm font-[600] mx-4"}>Scan QR code</span>
                </a>
            </div>
        </div>
    )
}

export default NearbyPlaces;
