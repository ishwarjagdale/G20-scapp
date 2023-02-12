import {useEffect, useState} from "react";
import {getNearby, getPopulars} from "../api/home";
import {calculateDistance} from "./constants";

function PopularPlaces() {

    const [populars, setPopulars] = useState(false);
    const [current, setCurrent] = useState(0);
    const [coordinates, setCoordinates] = useState(null)

    const rotatePops = () => {
        if(populars) {
            setCurrent((current + 1) % (populars.length))
        }
    }

    useEffect(() => {
        navigator.permissions.query({name: "geolocation"}).then((res) => {
            if(res.state === "granted") {
                navigator.geolocation.watchPosition((res) => {
                    if(res.coords.accuracy <= 100)
                    setCoordinates(res.coords)
                }, () => {}, {
                    enableHighAccuracy: true, timeout: 10000
                })
            }
        })
    }, [])

    useEffect(() => {
        getPopulars().then((res) => {
            if(res.status === 200) {
                setPopulars(res.data.response)
            }
        })
    }, [])

    useEffect(() => {
        setTimeout(rotatePops, 5000)
    })

    if(populars)
    return <>
        <div className={"flex items-center mx-2 mb-4"}>
            <span className={"font-[600] font-Poppins text-sm"}>Popular Places</span>
        </div>
        <div className={"flex mb-8"}>
            <div className={"flex flex-col justify-end relative w-full"}>
                <a href={`/monument/${populars[current].id}`}><img src={populars[current].images[0]} className={"w-full h-[150px] rounded-xl object-cover"}  alt={""}/></a>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center"}>
                        <a href={`/monument/${populars[current].id}`} className={"font-[500] font-Poppins p-2 text-sm"}>{populars[current].name}</a>
                        {
                            (coordinates && (populars[current].lat && populars[current].long)) ?
                                <>
                                    <span className={"dot w-[3px!important] h-[3px!important] mx-2"} />
                                    <span className={"font-medium"}>{Math.round(calculateDistance(coordinates.latitude, coordinates.longitude, populars[current].lat, populars[current].long))} km</span>
                                </> : <></>
                        }
                    </div>
                    <div className={"flex items-center justify-end mx-2 transition-all duration-300 ease-in"}>
                        {
                            Array(populars.length).fill(0).map((i, j) => {
                                if(j === current) {
                                    return <span className={`line ${j === populars.length - 1 ? '' : 'mr-1'}`} />
                                } else
                                    return <span className={`dot ${j === populars.length - 1 ? '' : 'mr-1'}`} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </>

    return <></>
}

export default PopularPlaces;
