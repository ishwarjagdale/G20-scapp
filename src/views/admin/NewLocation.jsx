import React, {useEffect, useState} from "react";
import {
    UilEye, UilEyeSlash,
    UilSpinner
} from "@iconscout/react-unicons";
import {getEnglishName} from "all-iso-language-codes";
import {editMonument, newLocation} from "../../api/adminAPI";
import QRCode from "react-qr-code";
import Language from "../../components/Language";
import {notify} from "../../components/notifier";
import {languages} from "../../components/constants";
import {useParams} from "react-router-dom";
import ImageUpload from "./ImageUpload";

function NewLocation() {

    const [name, setName] = useState("")
    const [images, setImages] = useState([])
    const [latitude, setLatitude] = useState(-1)
    const [longitude, setLongitude] = useState(-1)
    const [category, setCategory] = useState("");
    const [descriptions, setDescriptions] = useState({})
    const [showLanguages, setShowLanguages] = useState(false)

    const [isPublic, setPublic] = useState(true);

    const [id, setID] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(false);

    let formData = new FormData();

    const params = useParams();

    const addLanguage = (e) => {
        if(e.target.value === 0) return;

        let data = Object.assign({}, descriptions);
        data[e.target.value] = {name: "", description: "", audio: null}
        setDescriptions(data);

        e.target.value = 0;
    }

    const setLanguage = (data) => {
        let lang = Object.assign({}, descriptions);
        lang[data.code] = {
            name: data.name,
            description: data.description,
            audio: data.audio
        }
        setDescriptions(lang)
    }

    const removeLanguage = (code) => {
        let desc = Object.assign({}, descriptions);
        delete desc[code];
        setDescriptions(desc)
    }

    const submitForm = (e) => {
        e.preventDefault();
        if(e.type === 'click') {

            if(id)
                formData.append('id', id);

            formData.append('name', name)
            formData.append('longitude', longitude)
            formData.append('latitude', latitude)
            formData.append('category', category)

            formData.append('makePublic', isPublic)

            setUpdating(true);

            newLocation(formData).then((res) => {
                if(res.status === 200) {
                    formData = new FormData();
                    if(id)
                        notify(res.data.message, 'success');
                    else
                        window.location.href = `/admin/edit/${res.data.monument_id}`;
                }
            }).catch((e) => {
                console.log(e);
                notify(e.response.data, 'failed');
            }).finally(() => {

                setUpdating(false)
            })
        }
    }

    useEffect(() => {
        if (params.id) {
            setLoading(true)
            editMonument(params.id).then((res) => {
                if (res.status === 200) {
                    setName(res.data.name)
                    setCategory(res.data.category)
                    setImages(res.data.images)
                    setLatitude(res.data.latitude)
                    setLongitude(res.data.longitude)
                    setDescriptions(res.data.descriptions)
                    setPublic(res.data.public)
                    setID(res.data.id)
                    setLoading(false);
                }
            }).catch((err) => {
                console.log(err);
                notify(err.response.data.message, 'failed');
            })
        }
    }, [])

    if(loading)
        return <div className={"w-full h-full flex items-center justify-center"}>
            <UilSpinner size={'24px'} />
        </div>
    return (
        <div className={"w-full h-full flex flex-wrap overflow-y-scroll flex-col md:flex-row"} >
            <div className={"flex flex-col w-full max-w-md h-full overflow-hidden justify-between"}>
                <div className={"flex flex-col flex-1 overflow-y-scroll h-full p-2"}>

                    {/* Image */}
                    <ImageUpload id={id} images={images} setImages={setImages} />

                    <div className={"flex flex-col w-full p-2 md:px-4"}>
                        <div className={"flex flex-1 flex-col font-Poppins text-sm md:text-md"}>
                            <span className={"font-[500] pb-2"}>Name<span className={'text-red-500'}>*</span></span>
                            <input defaultValue={name} onChange={(e) => setName(e.target.value)} name={'name'} type={"text"} placeholder={"name of the location"} className={"py-2 mb-6 w-full outline-none border-b text-sm focus-visible:border-black"} required={true}/>
                            <span className={"font-[500] pb-2"}>Coordinates ( lat, long )</span>
                            <div className={"flex justify-between"}>
                                <input defaultValue={latitude} onChange={(e) => setLatitude(e.target.value)} name={'latitude'} type={"number"} placeholder={"latitude"} className={"py-2 mb-6 w-full text-sm outline-none border-b focus-visible:border-black"}/>
                                <input defaultValue={longitude} onChange={(e) => setLongitude(e.target.value)} name={'longitude'} type={"number"} placeholder={"longitude"} className={"py-2 mb-6 w-full text-sm outline-none border-b focus-visible:border-black"}/>
                            </div>
                            <span className={"font-[500] pb-2"}>Category<span className={'text-red-500'}>*</span></span>
                            <input defaultValue={category} required={true} onChange={(e) => {setCategory(e.target.value)}} name={'category'} type={"text"} placeholder={"this is visible on app"} className={"py-2 text-sm mb-6 pb-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>
                            {
                                id && <>
                                    <span className={"font-[500] pb-2"}>QR Code</span>
                                    <div className={"flex justify-center h-fit mb-8"}><QRCode className={"w-[100px] h-[100px] aspect-square"} value={window.location.protocol + "//" + window.location.host + "/monument/" + encodeURI(id) + "?src=qr"}/></div>
                                </>
                            }
                            {
                                id && <button onClick={() => {setShowLanguages(!showLanguages)}} className={"md:hidden hover:bg-slate-700 p-3 px-8 bg-[#e4e4e4] text-sm font-[500] mt-auto font-Poppins rounded-xl"}>Add Languages</button>
                            }
                        </div>
                    </div>
                </div>
                <div className={"flex items-center p-4"}>
                    <button title={isPublic ? "Is public" : "Is private"} onClick={() => {setPublic(!isPublic)}} className={"w-fit hover:bg-[#d3d3d3] mr-2 p-3 bg-[#e4e4e4] rounded-xl"}>
                        {
                            isPublic ? <UilEye size={'16px'}/>
                                :
                                <UilEyeSlash size={'16px'} />
                        }
                    </button>
                    <button id={"subBtn"} onClick={submitForm} type={"submit"} className={"w-full hover:bg-slate-700 p-3 px-8 bg-slate-900 text-white text-sm font-[500] font-Poppins rounded-xl"}>
                        {
                            updating ?
                                <div className={"flex flex-1 animate-spin items-center justify-center"}>
                                    <UilSpinner size={'16px'} color={'white'} />
                                </div>
                                :
                                id ? "Update" : "Save"
                        }
                    </button>
                </div>
            </div>
            {
                id &&
                <div className={`${showLanguages ? 'absolute' : 'hidden md:flex'} flex-col w-full flex-1 h-full overflow-y-scroll bg-white`}>
                    <div className={"flex flex-col flex-1 overflow-y-scroll h-full justify-between p-2"}>
                        <div className={"flex flex-col w-full flex-wrap p-2 md:px-4"}>
                            <div className={"flex flex-1 flex-col font-Poppins text-sm md:text-md"}>
                                <span className={"font-[500] pb-2"}>Language Code</span>
                                <div className={"flex flex-1 items-end font-Poppins py-2 text-sm md:text-md"}>
                                    <div className={"pr-4 rounded-md bg-[#e4e4e4]"}>
                                        <select className={"p-2 px-4 bg-transparent"} onChange={addLanguage}>
                                            <option value={0}>Choose a language</option>
                                            {
                                                descriptions && Object.keys(languages).filter((c) => !descriptions.hasOwnProperty(c)).map((code) =>
                                                    <option key={code} value={code}>{getEnglishName(code)}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    {/*<input id={'languageCodeInput'} max={2} name={'languageCode'} type={"text"} placeholder={"Enter language code (en, hi, de, fr)"} maxLength={2} className={"text-sm py-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>*/}
                                    {/*<button onClick={this.addLanguage} className={"w-fit p-2 mx-2 rounded-xl"}><UilPlusCircle size={'24px'}/></button>*/}
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col flex-1 h-full overflow-y-scroll mt-4"}>
                            {
                                Object.keys(descriptions).map((k) =>
                                    <Language key={k} k={k} mon_id={id} desc={descriptions[k]} setLanguage={setLanguage} removeLanguage={removeLanguage} />
                                )
                            }
                        </div>
                        <button onClick={() => {setShowLanguages(!showLanguages)}} className={"hover:bg-slate-700 md:hidden p-3 m-4 px-8 bg-[#e4e4e4] text-sm font-[500] mt-auto font-Poppins rounded-xl"}>Go back</button>
                    </div>
                </div>
            }
        </div>
    );

}

export default NewLocation;
