import ImagePagination from "../components/ImagePagination";
import React, {useEffect, useState} from "react";
import {UilBookmark, UilPause, UilPlay, UilShareAlt, UilSpinner} from "@iconscout/react-unicons";
import {getMonument} from "../api/home";
import {useParams} from "react-router-dom";
import {languages} from "../components/constants";
import {getEnglishName, getNativeName} from "all-iso-language-codes";
import ReactCountryFlag from "react-country-flag";
import {notify} from "../components/notifier";
import {UisBookmark} from "@iconscout/react-unicons-solid";
import FallbackImage from "../images/fallback.png";

function Monument() {

    const [imageIndex, setImageIndex] = useState(0);
    const [monument, setMonument] = useState(null);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioTrack, setAudioTrack] = useState(0);
    const params = useParams();
    const [saved, setSaved] = useState((JSON.parse(localStorage.getItem('saved')) || []).indexOf(params.monument_id) !== -1);
    const [loading, setLoading] = useState(false);

    const toggleAudio = () => {
        document.getElementById('audio').paused ?
            document.getElementById('audio').play()
            :
            document.getElementById('audio').pause()

        setAudioPlaying(!document.getElementById('audio').paused)

    }

    useEffect(() => {
        window.addEventListener('blur', (e) => {
            document.getElementById('audio').pause()
            setAudioPlaying(!document.getElementById('audio').paused)
        })
    }, [])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if(urlParams.get('src') === "qr") {
            let visited = new Set(JSON.parse(localStorage.getItem('visited')) || []);
            visited.add(params.monument_id);
            localStorage.setItem('visited', JSON.stringify(Array(...visited)));
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        getMonument(params.monument_id, true).then((res) => {
            if (res.status === 200) {
                setMonument(res.data.response);
                setLoading(false);
                rotatePops();
                document.title = res.data.response.name + " | Smart Scan"
            }
        })
    }, [])

    const rotatePops = () => {
        if(monument.images)
            setImageIndex((imageIndex + 1) % (monument.images.length))
        setTimeout(rotatePops, 3000)
    }

    const changeLanguage = (code) => {
        setLoading(true)
        getMonument(params.monument_id, true, code).then((res) => {
            if(res.status === 200) {
                setMonument(res.data.response);
                setLoading(false);
                document.title = res.data.response.name + " | Smart Scan"
            }
        })
    }

    if (monument)
        return (
            <div className={"overflow-scroll m-2 ml-2 lg:ml-0 w-full lg:w-2/4 relative pb-8"}>
                <span className={"font-Poppins mb-4 font-[500] text-center lg:text-left block"}>Aurangabad Smart City presents Smart Scan</span>
                <img src={monument.images[imageIndex]} onError={(e) => e.target.src = FallbackImage} className={"max-h-[200px] flex w-full object-cover rounded-xl"} alt={""}/>
                <ImagePagination current={imageIndex} length={monument.images.length} setCurrent={setImageIndex}/>
                <div className={"flex mt-0 mx-2 lg:mt-0 flex-wrap justify-between items-center"}>
                    <span className={"text-xl font-Poppins font-[600]"}>{monument.name}</span>
                    <div className={"flex items-center ml-auto"}>
                        <button onClick={() => {
                            if(navigator.share) {
                                navigator.share({
                                    title: monument.name,
                                    text: monument.description.slice(0, 250) + "...\n",
                                    url: `${process.env.REACT_APP_API_URL}/share/${monument.id}`
                                }).then(() => {}, notify)
                            } else navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/share/${monument.id}`).then(() => notify("Link Copied to Clipboard", 'success'))
                        }} className={"mx-2"}><UilShareAlt size={'24px'}/></button>
                        <button onClick={() => {
                            let bookmarks = JSON.parse(localStorage.getItem('saved')) || []
                            bookmarks.indexOf(monument.id) === -1 ? bookmarks.push(monument.id) : bookmarks.splice(bookmarks.indexOf(monument.id), 1);
                            localStorage.setItem('saved', JSON.stringify(bookmarks))
                            notify(bookmarks.indexOf(monument.id) !== -1 ? `Saved for later!` : `Removed from saved!`, 'success');
                            setSaved(bookmarks.indexOf(monument.id) !== -1)
                        }} className={"mx-2"}>
                            {
                                saved ?
                                    <UisBookmark size={'24px'} />
                                    :
                                    <UilBookmark size={'24px'}  />
                            }
                        </button>
                    </div>
                </div>
                {
                    <div className={"flex mb-4 items-center mt-6 overflow-x-scroll"}>
                        {
                            monument.languages.length > 1 && Object.keys(languages).filter((v) => monument.languages.includes(v)).map((l, i) => {
                                return <button title={getEnglishName(l)} key={i} onClick={() => changeLanguage(l)}
                                    className={`flex p-2 min-w-fit px-4 items-center mx-1 rounded-md ${monument.language_code === l ? 'bg-[#1f1f1f] text-white' : 'hover:bg-[#d3d3d3] bg-[#e4e4e4]'}`}>
                                    <ReactCountryFlag countryCode={languages[l]} svg
                                                      style={{width: "1rem", marginRight: "0.5em", height: "auto"}}/>
                                    <span className={"font-Poppins inline-block text-sm"}>{getNativeName(l)}</span>
                                </button>
                            })
                        }
                    </div>
                }
                {
                    loading ?
                        <>
                            <div className={"w-full my-16 flex items-center justify-center"}>
                                <UilSpinner size={'24px'} />
                            </div>
                        </>
                        :
                        <>
                            {
                                monument.audio && <div className={"mt-2 text-white p-4 px-6 rounded-full bg-[#1f1f1f] items-center flex mb-4 w-full"}>
                                    <audio preload={'auto'} onPlay={() => setAudioPlaying(true)} onEnded={() => {setAudioPlaying(false); setAudioTrack(0)}} onTimeUpdate={(e) => setAudioTrack(e.target.currentTime)} src={monument.audio} id={'audio'} autoPlay={true} />
                                    <button onClick={toggleAudio} className={"hover:bg-slate-900"}>
                                        {
                                            !audioPlaying ?
                                                <UilPlay size={'18px'}/>
                                                :
                                                <UilPause size={'18px'}/>
                                        }
                                    </button>
                                    <input onChange={(e) => document.getElementById('audio').currentTime = e.target.value} id={'seeker'} type={'range'} min={0} max={document.getElementById('audio')?.duration} value={audioTrack || 0} className={"mx-4 flex-1"} />
                                    <span className={"text-xs font-Poppins"}>{Math.floor(audioTrack / 60 || 0)}:{Math.floor(audioTrack % 60 || 0).toString().padStart(2, '0')} / {Math.floor(document.getElementById('audio')?.duration / 60 || 0)}:{Math.floor(document.getElementById('audio')?.duration % 60 || 0).toString().padStart(2, '0')}</span>
                                </div>
                            }
                            <p style={{whiteSpace: "break-spaces"}}
                               className={`p-2 pb-4 text-justify break-words font-Merriweather text-sm leading-8`}>
                                {monument.description || "No information available"}
                            </p>
                        </>
                }
            </div>
        )
}

export default Monument
