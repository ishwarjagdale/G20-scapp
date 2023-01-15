import React from "react";
import {getEnglishName} from "all-iso-language-codes";
import {UilMultiply, UilSave, UilVolume} from "@iconscout/react-unicons";
import {manageLanguage} from "../api/adminAPI";

class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.desc.name || "",
            description: this.props.desc.description || "",
            audio: null
        };

        this.formData = new FormData();

        this.deleteLanguage = this.deleteLanguage.bind(this);
        this.saveLanguage = this.saveLanguage.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    setFile(file, f) {
        let reader = new FileReader()
        reader.onload = f;
        console.log(file);
        reader.readAsDataURL(file)
    }

    saveLanguage(e) {
        e.preventDefault();
        if(e.type === 'click') {
            this.formData.append('language', this.props.k)
            this.formData.append('name', this.state.name)
            this.formData.append('description', this.state.description)

            manageLanguage("POST", this.props.mon_id, this.formData).then((res) => {
                if(res.status === 200) {
                    this.props.setLanguage({code: this.props.k, name: this.state.name, description: this.state.description, audio: this.state.audio})
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }
    }

    deleteLanguage() {
        if(window.confirm("Are you sure?")) {
            manageLanguage("DELETE", this.props.mon_id, {
                language: this.props.k
            }).then((res) => {
                if(res.status === 200) {
                    this.props.removeLanguage(this.props.k);
                    alert(res.data.message)
                }
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }
    }

    render() {
        return (
            <div id={`desc-${this.props.k}`} className={"w-full mb-6"}>
                <div className={"flex rounded-md bg-[#e4e4e4] p-2 px-4 items-center justify-between"}>
                    <span onClick={(e) => {document.getElementById(`desc-${this.props.k}`).children[1].classList.toggle('hidden')}}  className={"cursor-pointer font-Poppins text-sm"}>{this.props.k} - {getEnglishName(this.props.k)}</span>
                    <div className={"flex items-center"}>
                        {
                            (this.state.name !== this.props.desc.name || this.state.description !== this.props.desc.description || this.state.audio) &&
                            <button type={"submit"} onClick={this.saveLanguage} className={"p-2 mr-2"}><UilSave size={'18px'} /></button>
                        }
                        <button onClick={this.deleteLanguage} className={"p-2"}><UilMultiply size={'18px'} /></button>
                    </div>
                </div>
                <div className={"flex flex-1 flex-col mt-6 px-2 md:px-4 font-Poppins text-sm md:text-md"}>

                    <span className={"font-[500] pb-2"}>Name<span className={'text-red-500'}>*</span></span>
                    <input defaultValue={this.state.name} onChange={(e) => this.setState({name: e.target.value})} name={`name-${this.props.k}`} type={"text"} placeholder={`Name in ${getEnglishName(this.props.k)}`} className={"py-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>

                    <span className={"font-[500] pb-2"}>Description<span className={'text-red-500'}>*</span></span>
                    <textarea defaultValue={this.state.description} onChange={(e) => this.setState({description: e.target.value})} name={'description'} placeholder={"Write something about it..."} className={"py-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>

                    <div className={"flex items-center"}>
                        <button onClick={() => document.getElementById(`audio-${this.props.k}`).click()} className={"w-fit p-2 bg-[#e4e4e4] font-Poppins rounded-xl"}>
                            <UilVolume size={'24px'} />
                            <input id={`audio-${this.props.k}`} onChange={(e) => {
                                this.formData.append('audio', e.target.files[0])
                                this.setFile(e.target.files[0], (f) => {this.setState({audio: f.target.result})})
                            }} accept={'audio/mp3'} type={"file"} hidden={true} multiple={false} />
                        </button>
                        {
                            this.props.desc.audio || this.state.audio ? <audio className={"mx-2"} src={this.state.audio || this.props.desc.audio} controls={true} /> : <span className={"w-fit text-sm leading-6 p-2 px-4 mx-2 font-Poppins rounded-xl"}>Choose an audio</span>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Language
