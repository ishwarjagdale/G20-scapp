import React from "react";
import FallBackImage from "./../../images/fallback.png";
import {UilMultiply, UilPlusCircle} from "@iconscout/react-unicons";
import {getEnglishName, isValid} from "all-iso-language-codes";
import {newLocation} from "../../api/adminAPI";

class NewLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            images: [],
            coordinates: "",
            descriptions: {
                en: {
                    name: "",
                    description: "",
                    audio: null
                }
            },
            category: ""
        };

        this.formData = new FormData();

        this.addLanguage = this.addLanguage.bind(this);
        this.setFile = this.setFile.bind(this);
        this.removeLanguage = this.removeLanguage.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    addLanguage() {
        let code = document.getElementById('languageCodeInput').value.toLowerCase();
        if(code === "") {
            window.alert("Enter a valid language code")
        }
        else if(!isValid(code)) {
            window.alert('Invalid language code!');
        } else {
            if(this.state.descriptions.hasOwnProperty(code)) {
                return
            }
            let data = {...this.state.descriptions}
            data[code] = {name: "", description: "", audio: null}
            this.setState({descriptions: data})
        }
        document.getElementById('languageCodeInput').value = "";
    }

    removeLanguage(code) {
        if(!window.confirm("Are you sure?"))
            return
        let desc = this.state.descriptions;
        delete desc[code];
        this.setState({descriptions: desc})
    }

    setFile(e, f) {
        let reader = new FileReader()
        reader.onload = f;
        console.log(e.target.files);
        reader.readAsDataURL(e.target.files[0])
    }

    submitForm(e) {
        e.preventDefault();

        Object.keys(this.state).forEach((k) => {
            this.formData.append(k, JSON.stringify(this.state[k]))
        })

        this.formData.delete('images');


        newLocation(this.formData).then((res) => {
            if(res.status === 200) {
                console.log(res.data);
                window.location.href = "/admin";
            }
        }).catch((e) => {
            console.log(e);
            window.alert(e.response.data);
        })
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className={"flex flex-col w-full h-full overflow-hidden justify-between"}>
                <div className={"flex flex-col flex-1 overflow-y-scroll h-full p-2"}>
                    <div className={"flex flex-col md:flex-row w-full md:px-4"}>
                        <button onClick={() => document.getElementById('imageInput').click()} className={"w-full h-fit scale-98 md:rounded-2xl"}>
                            <input id={'imageInput'} onChange={ (e) => this.setFile(e, (f) => {
                                this.formData.append(`image-${this.state.images.length}`, e.target.files[0])
                                this.setState({images: [...this.state.images, f.target.result]})
                            }) } type={"file"} hidden={true} multiple={false} />
                            <img src={this.state.images[0] || FallBackImage} className={"w-full h-[200px] md:h-[250px] object-cover md:rounded-2xl"} alt={""} />
                        </button>
                        <div className={"flex w-full md:w-fit flex-row md:flex-col flex-wrap"}>
                            {
                                this.state.images.length !== 4 &&
                                <button onClick={() => document.getElementById('filepicker').click()} className={"flex items-center justify-center m-2 md:mt-0 h-[50px] border-2 scale-98 rounded-md w-[100px]"}>
                                    <input id={'filepicker'} onChange={ (e) => {
                                        this.formData.append(`image-${this.state.images.length}`, e.target.files[0])
                                        this.setFile(e, (f) => {this.setState({images: [...this.state.images, f.target.result]})})
                                        e.target.value = null;
                                    }} type={"file"} hidden={true} multiple={false} />
                                    <UilPlusCircle size={'24px'} />
                                </button>
                            }
                            {
                                this.state.images.slice(1,).map((img) =>
                                    <button onClick={() => {
                                        let images = this.state.images;
                                        images.splice(images.indexOf(img), 1);
                                        this.setState({images: images})
                                    }} className={"w-fit m-2 md:mt-0 h-fit scale-98 rounded-md hover:bg-transparent"}>
                                        <img src={img || FallBackImage} className={"w-[100px] h-auto aspect-video object-cover rounded-md"} alt={""} />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className={"flex flex-col w-full flex-wrap pt-8 p-2 md:px-4"}>
                        <div className={"flex flex-1 flex-col font-Poppins text-sm md:text-md"}>
                            <input onChange={(e) => this.setState({name: e.target.value})} name={'name'} type={"text"} placeholder={"Name"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                            <input onChange={(e) => this.setState({coordinates: e.target.value})} name={'coordinates'} type={"text"} placeholder={"Longitude, Latitude"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"}/>
                        </div>
                        <div className={"flex flex-row-reverse items-end justify-between flex-wrap"}>
                            <input required={true} onChange={(e) => {this.setState({category: e.target.value})}} name={'category'} type={"text"} placeholder={"Category"} className={"mt-8 md:mt-4 pb-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>
                            <div className={"flex flex-1 items-end font-Poppins mt-4 text-sm md:text-md"}>
                                <input id={'languageCodeInput'} max={2} name={'languageCode'} type={"text"} placeholder={"Language Code (en, hi, de, fr)"} maxLength={2} className={"pb-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>
                                <button onClick={this.addLanguage} className={"w-fit p-2 mx-2 rounded-xl"}><UilPlusCircle size={'24px'}/></button>
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.descriptions).map((k) =>
                            <div key={k.toString()} className={"w-full mt-8 md:px-4"}>
                                <div className={"flex p-4 bg-[#e4e4e4] items-center justify-between"}>
                                    <span className={"font-Poppins text-sm"}>{k} - {getEnglishName(k)}</span>
                                    <button onClick={() => this.removeLanguage(k)} className={"p-2"}><UilMultiply size={'18px'} /></button>
                                </div>
                                <div className={"flex flex-1 flex-col mt-4 p-2 font-Poppins text-sm md:text-md"}>
                                    <input onChange={(e) => this.setState((state) => {state.descriptions[k].name = e.target.value})} name={`name-${k}`} type={"text"} placeholder={`Name (${k})`} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                                    <textarea onChange={(e) => this.setState((state) => {state.descriptions[k].description = e.target.value})} name={'description'} placeholder={"Write something about it..."} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                                    {/*<div className={"flex items-center"}>*/}
                                    {/*    <button onClick={() => document.getElementById(`audio-${k}`).click()} className={"w-fit p-2 bg-[#e4e4e4] font-Poppins rounded-xl"}>*/}
                                    {/*        <UilVolume size={'24px'} />*/}
                                    {/*        <input id={`audio-${k}`} onChange={(e) => this.setFile(e, (f) => {this.setState((state) => {state.descriptions[k].audio = f.target.result})})} accept={'audio/mp3'} type={"file"} hidden={true} multiple={false} />*/}
                                    {/*    </button>*/}
                                    {/*    <span className={"w-fit text-sm leading-6 p-2 px-4 mx-2 font-Poppins rounded-xl"}>*/}
                                    {/*        {"Choose an audio"}*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={"flex items-center p-4"}>
                    <button type={"submit"} className={"w-full hover:bg-slate-700 p-3 px-8 bg-slate-900 text-white text-sm font-[500] font-Poppins rounded-xl"}>Save</button>
                </div>
            </form>
        );
    }

}

export default NewLocation;
