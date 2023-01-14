import React from "react";
import {
    UilAngleLeft,
    UilAngleRight, UilBookmark,
    UilMultiply, UilPlay, UilPlayCircle, UilShareAlt, UilVolume
} from "@iconscout/react-unicons";
import FallBackImage from "./../images/fallback.png";
import {getMonument} from "../api/home";
import {getNativeName} from "all-iso-language-codes";
import {getAllAudioUrls} from "google-tts-api";

class Monument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
            pos: 0,
            play: false
        };
        this.autoRotate = this.autoRotate.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.speech = this.speech.bind(this);
    }

    changeLanguage(code) {
        getMonument(this.props.data, true, code).then((res) => {
            if(res.status === 200) {
                this.setState({...res.data.response});
                // this.setState({audio: getAllAudioUrls(res.data.response.description, {
                //         lang: this.state.language,
                //         slow: false,
                //         host: 'https://translate.google.com',
                //         timeout: 10000
                //     })})
                this.speech(code, res.data.response.description);
            }
        }).then(this.autoRotate);
    }

    autoRotate(val=1, ms=5000, recur=true) {
        setTimeout(() => {
            this.setState({imageIndex: (this.state.imageIndex + val) % this.state.images.length})
            if(recur) this.autoRotate();
        }, ms)
    }

    speech(code, text) {
        let synth = window.speechSynthesis;
        synth.cancel();
        let u = new SpeechSynthesisUtterance(text);
        console.log(code, synth.getVoices().filter((v) => v.lang.includes(code))[0]);
        u.voice = synth.getVoices().filter((v) => v.lang.includes(code))[0]
        u.lang = code;
        u.rate = 1;
        synth.speak(u)
    }

    componentDidMount() {
        this.changeLanguage(this.state.language)
    }

    render() {
        if(this.state.name)
        return (
            <>
                <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md lg:max-w-xl flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex border-b z-10 items-center justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-end items-center"}>
                            <button onClick={this.props.close} className={"rounded-full bg-white p-2"}><UilMultiply size={'24px'}/></button>
                        </div>
                    </div>
                    <div className={"flex flex-col w-full items-center h-full overflow-y-scroll md:pt-2"}>
                        <img src={this.state.images[this.state.imageIndex] || FallBackImage} alt={this.state.name} className={"w-full object-cover md:rounded-2xl max-h-[200px]"} onError={(e) => e.target.src = FallBackImage} />
                        <div className={"flex items-center justify-center h-[20px] m-2"}>
                            {
                                this.state.images.length > 1 ?
                                    <>
                                        <button onClick={() => this.setState({imageIndex: Math.max(0, this.state.imageIndex - 1)})} className={"rounded-full mr-2"}>
                                            <UilAngleLeft size={'24px'} />
                                        </button>
                                        {
                                            [Array(this.state.images.length).fill(0).map((k, i) => {
                                                if(i === this.state.imageIndex)
                                                    return <span key={i.toString()} className={"line ml-1"} />
                                                return <span key={i.toString()} className={"dot ml-1"} />
                                            })]
                                        }
                                        <button onClick={() => this.setState({imageIndex: Math.min(this.state.images.length - 1, this.state.imageIndex + 1)})} className={"rounded-full ml-2"}>
                                            <UilAngleRight size={'24px'} />
                                        </button>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>
                        <div className={"flex flex-col w-full pt-2 px-4 md:px-2"}>
                            <div className={"flex items-center pb-4 justify-between w-full"}>
                                <span className={"font-[600] text-xl font-Poppins"}>{this.state.name}</span>
                                <div className={"flex items-center"}>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(window.location.href + `monument/${this.state.id}`).then(r => alert('Link copied to clipboard'))
                                    }} className={"p-2 mr-2"}><UilShareAlt size={'24px'} /></button>
                                    <button onClick={() => {
                                        let bookmarks = JSON.parse(localStorage.getItem('saved')) || []
                                        bookmarks.indexOf(this.state.id) === -1 ? bookmarks.push(this.state.id) : bookmarks.splice(bookmarks.indexOf(this.state.id), 1);
                                        localStorage.setItem('saved', JSON.stringify(bookmarks))
                                        window.alert(bookmarks.indexOf(this.state.id) !== -1 ? `Saved for later!` : `Removed from saved!`);
                                    }} className={"p-2"}><UilBookmark size={'24px'} /></button>
                                </div>
                            </div>
                            <div className={"w-full overflow-x-scroll whitespace-nowrap pt-2 pb-4"}>
                                {
                                    this.state.languages.map((code) =>
                                    <button onClick={() => this.changeLanguage(code)} key={code} className={"p-2 px-4 mr-2 text-sm rounded-md bg-[#e4e4e4]"}>
                                        {
                                            getNativeName(code)
                                        }
                                        {/*<ReactCountryFlag countryCode={lookup.countries({languages: code})} svg style={{width: "1.5rem", height: "auto"}} />*/}
                                    </button>
                                    )
                                }
                            </div>
                            <p className={"pb-4 text-justify font-Merriweather text-sm leading-7"}>
                                {this.state.description}
                            </p>
                        </div>
                        {
                            // this.state.audio &&
                            // <audio id={"audio"} playsInline={true} autoPlay={this.state.play} controls={true}
                            //  onEnded={() => {
                            //     this.setState({pos: this.state.pos === this.state.audio.length - 1 ? 0 : this.state.pos + 1})
                            // }} className={"absolute bottom-10 center"}
                            // />
                            <button onClick={() => {
                                !window.speechSynthesis.paused ? window.speechSynthesis.pause() : window.speechSynthesis.resume()
                            }} className={"absolute bottom-10 center p-4 rounded-full bg-black"}><UilVolume color={'#FFF'}/></button>
                        }
                    </div>
                </div>
            </>
        );
    }

}

export default Monument;
