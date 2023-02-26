import {UilQrcodeScan} from "@iconscout/react-unicons";
import {useEffect, useState} from "react";
import {getMonuments} from "../api/home";
import FallbackImage from "../images/fallback.png";
import {Link} from "react-router-dom";

function SavedPlaces() {

    const saved = JSON.parse(localStorage.getItem('saved')) || []
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMonuments(saved).then((res) => {
            if (res.status === 200) {
                setPlaces(res.data.response)
                setLoading(false);
            }
        })
    }, [])


    useEffect(() => {
        document.title = "Saved Places | Smart Scan"
    }, [])

    return (
        <div className={"flex flex-col justify-between overflow-scroll m-2  ml-2 lg:ml-0 w-full lg:w-1/4 relative "}>
            <div className={"pb-24 lg:pb-0"}>
                <div className={"flex items-center mx-2 mb-4"}>
                    <span className={"font-[600] font-Poppins text-sm capitalize text-xl"}>Saved Places</span>
                </div>
                <div className={"flex flex-col mb-8"}>
                    {
                        !loading ? places.length ? places.map((c, i) => {
                            return <div className={"flex flex-col mb-2 justify-end relative w-full"}>
                                <Link to={`/monument/${c.id}`}><img src={c.images[0]} onError={(e) => e.target.src = FallbackImage}
                                     className={"w-full h-[150px] rounded-xl object-cover"}
                                                  alt={""}/></Link>
                                <div className={"flex items-center justify-between"}>
                                    <Link to={`/monument/${c.id}`}
                                          className={"font-[500] font-Poppins p-2 text-sm"}>{c.name}</Link>
                                </div>
                            </div>
                        })
                                :
                                <span className={"text-sm p-2"}>You haven't saved any monument yet!</span>
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

export default SavedPlaces;
