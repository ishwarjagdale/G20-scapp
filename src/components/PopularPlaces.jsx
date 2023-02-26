import {useEffect, useState} from "react";
import {getPopulars} from "../api/home";
import {calculateDistance} from "./constants";
import FallbackImage from "../images/fallback.png";
import {Link} from "react-router-dom";

function PopularPlaces() {

    const [populars, setPopulars] = useState(false);
    const [current, setCurrent] = useState(0);
    const [coordinates, setCoordinates] = useState(null)

    function rotatePops() {
        if(populars) {
            setCurrent((current + 1) % (populars.length))
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((res) => {
            if(res.coords.accuracy <= 100)
                setCoordinates(res.coords)
        }, () => {}, {
            enableHighAccuracy: true, timeout: 10000
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
        setTimeout(rotatePops, 3000)
    })

    if(populars)
    return <>
        <div className={"flex items-center mx-2 mb-4"}>
            <span className={"font-[600] font-Poppins text-sm"}>Popular Places</span>
        </div>
        <div className={"flex mb-8"}>
            <div className={"flex flex-col justify-end relative w-full"}>
                <Link to={`/monument/${populars[current].id}`}><img src={populars[current].images[0]} onError={(e) => e.target.src = FallbackImage} className={"w-full h-[150px] rounded-xl object-cover"}  alt={""}/></Link>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center"}>
                        <Link to={`/monument/${populars[current].id}`} className={"font-[500] font-Poppins p-2 text-sm"}>{populars[current].name}</Link>
                        {
                            (coordinates && (populars[current].lat > 0 && populars[current].long > 0)) ?
                                <>
                                    <span className={"dot w-[3px!important] h-[3px!important] mx-2"} />
                                    <span className={"font-medium text-sm"}>{Math.round(calculateDistance(coordinates.latitude, coordinates.longitude, populars[current].lat, populars[current].long))} km</span>
                                </> : <></>
                        }
                    </div>
                    <div className={"flex items-center justify-end mx-2 transition-all duration-300 ease-in"}>
                        {
                            Array(populars.length).fill(0).map((i, j) => {
                                if(j === current) {
                                    return <span key={j} className={`line ${j === populars.length - 1 ? '' : 'mr-1'}`} />
                                } else
                                    return <span key={j} className={`dot ${j === populars.length - 1 ? '' : 'mr-1'}`} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </>

    return <>
        <div className={"flex items-center mx-2 mb-4"}>
            <span className={"font-[600] font-Poppins text-sm w-[200px] bg-[#e4e4e4]"} />
        </div>
        <div className={"flex mb-8"}>
            <div className={"flex flex-col justify-end relative w-full"}>
                <div className={"w-full h-[150px] rounded-xl object-cover bg-[#e4e4e4]"}/>
                <span className={"font-[600] bg-[#e4e4e4] w-[200px] font-Poppins text-sm p-2 mt-2"}/>
            </div>
        </div>
    </>
}

export default PopularPlaces;
