import React, {useState} from "react";
import {getEnglishName} from "all-iso-language-codes";
import {UilMultiply, UilSave, UilSpinner, UilVolume} from "@iconscout/react-unicons";
import {manageLanguage} from "../api/adminAPI";
import {notify} from "./notifier";
import ReactCountryFlag from "react-country-flag";
import {languages} from "./constants";

function Language({k, mon_id, setLanguage, removeLanguage, desc}) {

    const [name, setName] = useState(desc.name)
    const [description, setDescription] = useState(desc.description)
    const [audio, setAudio] = useState(desc.audio);
    const [upload, setUpload] = useState(null)
    const [uploading, setUploading] = useState(false);

    const formData = new FormData();

    const setFile = (file, f) => {
        let reader = new FileReader()
        reader.onload = f;
        console.log(file);
        reader.readAsDataURL(file)
    }

    const saveLanguage = (e) => {
        e.preventDefault();
        if(e.type === 'click') {
            formData.append('language', k)
            formData.append('name', name)
            formData.append('description', description)

            if(upload)
            formData.append(`audio`, upload)

            setUploading(true)
            manageLanguage("POST", mon_id, formData).then((res) => {
                if(res.status === 200) {
                    setLanguage({code: k, name: name, description: description, audio: audio})
                    setUpload(null)
                    setAudio(desc.audio)
                    notify(res.data.message, 'success');
                }
            }).catch((err) => {
                console.log(err)
                notify(err.response.data.message, 'failed')
            }).finally(() => setUploading(false))
        }
    }

    const deleteLanguage = () => {
        if(window.confirm("Are you sure?")) {
            manageLanguage("DELETE", mon_id, {
                language: k
            }).then((res) => {
                if(res.status === 200) {
                    removeLanguage(k);
                    notify(res.data.message, 'success');
                }
            }).catch((err) => {
                if(err.response.status === 404) {
                    removeLanguage(k);
                    notify(k + " language removed", 'success');
                } else {
                    console.log(err)
                    notify(err.response.data.message, 'failed')
                }
            })
        }
    }

    return (
        <div id={`desc-${k}`} className={"w-full mb-6"}>
            <div className={"flex rounded-md bg-[#e4e4e4] p-2 px-4 items-center justify-between"}>
                    <span onClick={() => {document.getElementById(`desc-${k}`).children[1].classList.toggle('hidden')}}  className={"cursor-pointer flex-1 font-Poppins text-sm"}>
                        <ReactCountryFlag countryCode={languages[k]} svg style={{width: "1rem", marginRight:"1em", height: "auto"}} />
                        {k} - {getEnglishName(k)}
                    </span>
                <div className={"flex items-center"}>
                    {
                        (name !== desc.name || description !== desc.description || upload) &&
                        (
                            !uploading ? <button type={"submit"} onClick={saveLanguage} className={"p-2 hover:bg-[#d3d3d3] rounded-full mr-2"}><UilSave size={'18px'} /></button>
                            :
                                <span className={"p-2 hover:bg-[#d3d3d3] animate-spin rounded-full mr-2"}><UilSpinner size={'18px'} /></span>
                        )
                    }
                    <button onClick={deleteLanguage} className={"p-2 hover:bg-[#d3d3d3] rounded-full"}><UilMultiply size={'18px'} /></button>
                </div>
            </div>
            <div className={"flex hidden flex-1 flex-col mt-6 px-2 md:px-4 font-Poppins text-sm md:text-md"}>

                <span className={"font-[500] pb-2"}>Name<span className={'text-red-500'}>*</span></span>
                <input defaultValue={name} onChange={(e) => setName(e.target.value)} name={`name-${k}`} type={"text"} placeholder={`Name in ${getEnglishName(k)}`} className={"py-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>

                <span className={"font-[500] pb-2"}>Description<span className={'text-red-500'}>*</span></span>
                <textarea defaultValue={description} onChange={(e) => setDescription(e.target.value)} name={'description'} placeholder={"Write something about it..."} className={"py-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>

                <div className={"flex items-center"}>
                    <button onClick={() => document.getElementById(`audio-${k}`).click()} className={"w-fit p-2 bg-[#e4e4e4] font-Poppins rounded-xl"}>
                        <UilVolume size={'24px'} />
                        <input id={`audio-${k}`} onChange={(e) => {
                            setUpload(e.target.files[0])
                            setFile(e.target.files[0], (f) => {setAudio(f.target.result)})
                        }} accept={'audio/mp3'} type={"file"} hidden={true} multiple={false} />
                    </button>
                    {
                        desc.audio || audio ? <audio className={"mx-2"} src={audio || desc.audio} controls={true} /> : <span className={"w-fit text-sm leading-6 p-2 px-4 mx-2 font-Poppins rounded-xl"}>Choose an audio</span>
                    }
                </div>
            </div>
        </div>
    )

}

export default Language
