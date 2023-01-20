import {useOutletContext} from "react-router-dom";
import FallBackImage from "../images/fallback.png";
import React from "react";
import {calculateDistance} from "./constants";

function Cats({p, length, i, coords=null}) {

    const con = useOutletContext();
    const select = con[0]

    return <div onClick={() => select(p.id)} className={`cursor-pointer ${length - 1 !== i ? 'pb-2' : ''}`}>
        <img src={p.images[0] || FallBackImage} alt={p.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage} />
        <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
            <div className={"flex items-center"}>
                <span className={"font-medium"}>{p.name}</span>
                {
                    coords &&
                    <>
                        <span className={"mx-2"}>-></span>
                        <span className={"font-medium"}>{Math.round(calculateDistance(coords.latitude, coords.longitude, Number.parseFloat(p.lat), Number.parseFloat(p.long)))} km</span>
                    </>
                }
            </div>
        </div>
    </div>
}

export default Cats;
