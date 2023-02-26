import {UilQrcodeScan, UilShare} from "@iconscout/react-unicons";
import {useEffect, useState} from "react";
import {getMonuments} from "../api/home";
import {notify} from "../components/notifier";
import FallbackImage from "../images/fallback.png";
import {Link} from "react-router-dom";

function VisitedPlaces() {

    const visited = JSON.parse(localStorage.getItem('visited')) || [];
    const [places, setPlaces] = useState([]);
    const [current, setCurrent] = useState(0);
    const [shares, setShares] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMonuments(visited).then((res) => {
            if (res.status === 200) {
                setPlaces(res.data.response)
                setLoading(false);
            }
        })
    }, [])


    useEffect(() => {
        document.title = "Visited Places | Smart Scan"
    }, [])

    return (
        <div className={"flex flex-col justify-between overflow-scroll m-2  ml-2 lg:ml-0 w-full lg:w-1/4 relative "}>
            <div className={"pb-24 lg:pb-0"}>
                <div className={"flex items-center mx-2 mb-4"}>
                    <span className={"font-[600] font-Poppins text-sm capitalize text-xl"}>Visited Places</span>
                </div>
                <div className={"flex flex-col mb-8"}>
                    {
                        !loading ? places.length ? places.map((c, i) => {
                            return <div className={"flex flex-col mb-2 justify-end relative w-full"}>
                                <img onClick={() => setCurrent(i)} src={c.images[0]} onError={(e) => e.target.src = FallbackImage}
                                     className={"w-full h-[150px] rounded-xl object-cover"}
                                     alt={""}/>
                                <div className={"flex items-center justify-between"}>
                                    <span onClick={() => setCurrent(i)}
                                        className={"font-[500] font-Poppins p-2 text-sm"}>{c.name}</span>
                                </div>
                                {
                                    current === i && <>
                                        <textarea onChange={(e) => {
                                            let temp = shares;
                                            temp[c.id] = e.target.value
                                            setShares(temp)
                                        }} className={"font-Poppins text-sm min-h-[100px] w-full border rounded-md mt-2 p-2"} maxLength={1000} placeholder={"Write your experience and share it!"} />
                                        <button onClick={() => {
                                            if(navigator.share)
                                                navigator.share({
                                                    title: c.name,
                                                    text: `${shares[c.id]}\n`,
                                                    url: `${process.env.REACT_APP_API_URL}/share/${c.id}`
                                                }).then(() => setCurrent(-1))
                                            else navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/share/${c.id}`).then(() => notify("Link Copied to Clipboard", 'success'))
                                        }} className={"flex items-center p-2 rounded-full w-full bg-[#1f1f1f] my-2 text-white text-sm justify-center"}><span className={"mx-2 font-Poppins font-medium"}>Share</span><UilShare size={"16px"}/></button>
                                    </>
                                }
                            </div>
                        })
                            :
                            <span className={"text-sm p-2"}>You haven't visited any monument yet!</span>
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

export default VisitedPlaces;
