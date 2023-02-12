import {UilQrcodeScan} from "@iconscout/react-unicons";
import {useEffect, useState} from "react";
import {getMonuments} from "../api/home";

function SavedPlaces() {

    const saved = JSON.parse(localStorage.getItem('saved')) || []
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        getMonuments(saved).then((res) => {
            if (res.status === 200) {
                setPlaces(res.data.response)
            }
        })
    }, [])


    useEffect(() => {
        document.title = "Saved Places"
    }, [])

    return (
        <div className={"flex flex-col justify-between overflow-scroll m-2  ml-2 lg:ml-0 w-full lg:w-1/4 relative "}>
            <div className={"pb-24 lg:pb-0"}>
                <div className={"flex items-center mx-2 mb-4"}>
                    <span className={"font-[600] font-Poppins text-sm capitalize text-xl"}>Saved Places</span>
                </div>
                <div className={"flex flex-col mb-8"}>
                    {
                        places.map((c, i) => {
                            return <div className={"flex flex-col mb-2 justify-end relative w-full"}>
                                <a href={`/monument/${c.id}`}><img src={c.images[0]}
                                     className={"w-full h-[150px] rounded-xl object-cover"}
                                                  alt={""}/></a>
                                <div className={"flex items-center justify-between"}>
                                    <a href={`/monument/${c.id}`}
                                          className={"font-[500] font-Poppins p-2 text-sm"}>{c.name}</a>
                                </div>
                            </div>
                        })
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

export default SavedPlaces;
