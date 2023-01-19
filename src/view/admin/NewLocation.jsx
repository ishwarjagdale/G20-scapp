import React from "react";
import FallBackImage from "./../../images/fallback.png";
import {
    UilEye,
    UilEyeSlash,
    UilMultiply,
    UilPlusCircle, UilSpinner
} from "@iconscout/react-unicons";
import {isValid} from "all-iso-language-codes";
import {deleteImage, editMonument, newLocation} from "../../api/adminAPI";
import QRCode from "react-qr-code";
import withRouter from "../../components/withRouter";
import Language from "../../components/Language";
import ImagePagination from "../../components/imagePagination";

class NewLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
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
            category: "",
            public: false,
            showLanguages: false,
            loading: this.props.params.id,
        };

        this.formData = new FormData();

        this.addLanguage = this.addLanguage.bind(this);
        this.setFile = this.setFile.bind(this);
        this.removeLanguage = this.removeLanguage.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.handleIndex = this.handleIndex.bind(this);
    }

    handleIndex(index) {
        this.setState({imageIndex: index});
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

    setLanguage(data) {
        let lang = this.state.descriptions;
        lang[data.code] = {
            name: data.name,
            description: data.description,
            audio: data.audio
        }
        this.setState({descriptions: lang})
    }

    removeLanguage(code) {
        let desc = this.state.descriptions;
        delete desc[code];
        this.setState({descriptions: desc})
    }

    setFile(file, f) {
        let reader = new FileReader()
        reader.onload = f;
        console.log(file);
        reader.readAsDataURL(file)
    }

    submitForm(e) {
        e.preventDefault();
        console.log(e);
        if(e.type === 'click') {

            if(this.state.id)
                this.formData.append('id', this.state.id);

            this.formData.append('name', this.state.name)
            this.formData.append('coordinates', this.state.coordinates)
            this.formData.append('category', this.state.category)
            this.formData.append('public', this.state.public)

            this.setState({updating: true});


            newLocation(this.formData).then((res) => {
                if(res.status === 200) {

                    this.formData = new FormData();

                    console.log(res.data);
                    if(this.state.id)
                        window.alert(res.data.message);
                    else
                        window.location.href = `/admin/edit/${res.data.monument_id}`;
                }
            }).catch((e) => {
                console.log(e);
                window.alert(e.response.data);
            }).finally(() => {
                this.setState({updating: false})
            })
        }
    }

    componentDidMount() {
        if(this.props.params.id) {
            editMonument(this.props.params.id).then((res) => {
                if(res.status === 200) {
                    this.setState({...this.state, ...res.data, loading: false})
                }
            }).catch((err) => {
                console.log(err);
                alert(err.response.data.message);
            })
        }

    }

    render() {
        if(this.state.loading)
            return <div className={"w-full h-full flex items-center justify-center"}>
                <UilSpinner size={'24px'} />
            </div>
        return (
            <div className={"w-full h-full flex flex-wrap overflow-y-scroll flex-col md:flex-row"} >
                <div className={"flex flex-col w-full max-w-md h-full overflow-hidden justify-between"}>
                    <div className={"flex flex-col flex-1 overflow-y-scroll h-full p-2"}>

                        {/* Image */}
                        <div className={"flex flex-col w-full md:px-4 relative"}>
                            { this.state.images[this.state.imageIndex] && <button onClick={() => {
                                if(this.state.id) {
                                    deleteImage(this.state.id, this.state.images[this.state.imageIndex]).then((res) => {
                                        if(res.status === 200) {
                                            alert("image deleted")
                                        }
                                    }).catch((err) => {console.log(err); alert(err.response.data.message)})
                                }
                                let images = this.state.images;
                                images.splice(this.state.imageIndex, 1);
                                this.formData.delete(`image-${this.state.imageIndex}`);
                                this.setState({images: images, imageIndex: Math.min(this.state.imageIndex, images.length - 1)})
                            }} className={"absolute right-6 p-2 top-2 bg-black hover:bg-slate-700"}><UilMultiply size={'16px'} color={"white"}/></button>}
                            <button onClick={() => document.getElementById('imageInput').click()} className={"w-full h-fit scale-98 rounded-2xl"}>
                                <input id={'imageInput'} onChange={ (e) => {
                                    for(let file of e.target.files) {
                                        this.setFile(file, (f) => {
                                            this.formData.append(`image-${this.state.images.length}`, file)
                                            this.setState({images: [...this.state.images, f.target.result]})
                                        })
                                    }
                                } } type={"file"} hidden={true} multiple={true}/>
                                <img src={this.state.images[this.state.imageIndex] || FallBackImage} className={"w-full h-[150px] object-cover rounded-2xl"} alt={""} />
                            </button>
                            <ImagePagination handleIndex={this.handleIndex}  length={this.state.images.length} imageIndex={this.state.imageIndex} />
                        </div>

                        <div className={"flex flex-col w-full p-2 md:px-4"}>
                            <div className={"flex flex-1 flex-col font-Poppins text-sm md:text-md"}>
                                <span className={"font-[500] pb-2"}>Name<span className={'text-red-500'}>*</span></span>
                                <input defaultValue={this.state.name} onChange={(e) => this.setState({name: e.target.value})} name={'name'} type={"text"} placeholder={"name of the location"} className={"py-2 mb-6 w-full outline-none border-b text-sm focus-visible:border-black"} required={true}/>
                                <span className={"font-[500] pb-2"}>Coordinates</span>
                                <input defaultValue={this.state.coordinates} onChange={(e) => this.setState({coordinates: e.target.value})} name={'coordinates'} type={"text"} placeholder={"longitude, latitude"} className={"py-2 mb-6 w-full text-sm outline-none border-b focus-visible:border-black"}/>
                                <span className={"font-[500] pb-2"}>Category<span className={'text-red-500'}>*</span></span>
                                <input defaultValue={this.state.category} required={true} onChange={(e) => {this.setState({category: e.target.value})}} name={'category'} type={"text"} placeholder={"this is visible on app"} className={"py-2 text-sm mb-6 pb-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>
                                {
                                    this.state.id && <>
                                        <span className={"font-[500] pb-2"}>QR Code</span>
                                        <div className={"flex justify-center h-fit mb-8"}><QRCode className={"w-[100px] h-[100px] aspect-square"} value={this.state.id}/></div>
                                    </>
                                }
                                {
                                    this.state.id && <button onClick={() => {this.setState({showLanguages: !this.state.showLanguages})}} className={"md:hidden hover:bg-slate-700 p-3 px-8 bg-[#e4e4e4] text-sm font-[500] mt-auto font-Poppins rounded-xl"}>Add Languages</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"flex items-center p-4"} title={this.state.public ? 'Make private' : 'Make public'}>
                        <button onClick={() => {this.setState({public: !this.state.public})}} className={"w-fit hover:bg-[#d3d3d3] mr-2 p-3 bg-[#e4e4e4] rounded-xl"}>
                            {
                                this.state.public ? <UilEye size={'16px'}/>
                                    :
                                    <UilEyeSlash size={'16px'} />
                            }
                        </button>
                        <button id={"subBtn"} onClick={this.submitForm} type={"submit"} className={"w-full hover:bg-slate-700 p-3 px-8 bg-slate-900 text-white text-sm font-[500] font-Poppins rounded-xl"}>
                            {
                                this.state.updating ?
                                    <div className={"flex flex-1 animate-spin items-center justify-center"}>
                                        <UilSpinner size={'16px'} color={'white'} />
                                    </div>
                                    :
                                    this.state.id ? "Update" : "Save"
                            }
                        </button>
                    </div>
                </div>
                {
                    this.state.id &&
                    <div className={`${this.state.showLanguages ? 'absolute' : 'hidden md:flex'} flex-col w-full flex-1 h-full overflow-y-scroll bg-white`}>
                        <div className={"flex flex-col flex-1 overflow-y-scroll h-full justify-between p-2"}>
                            <div className={"flex flex-col w-full flex-wrap p-2 md:px-4"}>
                                <div className={"flex flex-1 flex-col font-Poppins text-sm md:text-md"}>
                                    <span className={"font-[500] pb-2"}>Language Code</span>
                                    <div className={"flex flex-1 items-end font-Poppins py-2 text-sm md:text-md"}>
                                        <input id={'languageCodeInput'} max={2} name={'languageCode'} type={"text"} placeholder={"Enter language code (en, hi, de, fr)"} maxLength={2} className={"text-sm py-2 flex-1 max-w-[500px] outline-none border-b focus-visible:border-black"}/>
                                        <button onClick={this.addLanguage} className={"w-fit p-2 mx-2 rounded-xl"}><UilPlusCircle size={'24px'}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex flex-col flex-1 h-full overflow-y-scroll mt-4"}>
                                {
                                    Object.keys(this.state.descriptions).map((k) =>
                                        <Language k={k} mon_id={this.state.id} desc={this.state.descriptions[k]} setLanguage={this.setLanguage} removeLanguage={this.removeLanguage} />
                                    )
                                }
                            </div>
                            <button onClick={() => {this.setState({showLanguages: !this.state.showLanguages})}} className={"hover:bg-slate-700 md:hidden p-3 m-4 px-8 bg-[#e4e4e4] text-sm font-[500] mt-auto font-Poppins rounded-xl"}>Go back</button>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default withRouter(NewLocation);
