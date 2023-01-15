import React from "react";
import {
    UilBookmark,
    UilMultiply, UilShareAlt, UilSpinner
} from "@iconscout/react-unicons";
import FallBackImage from "./../images/fallback.png";
import {getMonument} from "../api/home";
import {getNativeName} from "all-iso-language-codes";
import ImagePagination from "../components/imagePagination";

class Monument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
        };
        this.autoRotate = this.autoRotate.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(code) {
        getMonument(this.props.data, true, code).then((res) => {
            if(res.status === 200) {
                this.setState({...res.data.response});
            }
        }).then(this.autoRotate);
    }

    autoRotate(val=1, ms=5000, recur=true) {
        setTimeout(() => {
            this.setState({imageIndex: (this.state.imageIndex + val) % this.state.images.length})
            if(recur) this.autoRotate();
        }, ms)
    }

    componentDidMount() {
        this.changeLanguage(this.state.language)
    }

    render() {
        if(this.state.name)
        return <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md lg:max-w-xl flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
            <div className={"flex border-b z-10 items-center justify-between w-full p-6"}>
                <div className={"font-Poppins w-full flex justify-between items-center"}>
                    <span onClick={() => window.location.href = "/"} className={"md:hidden cursor-pointer font-Poppins whitespace-nowrap font-bold text-lg"}>LOGO</span>
                    <button onClick={this.props.close} className={"rounded-full bg-white p-2"}><UilMultiply size={'24px'}/></button>
                </div>
            </div>
            <div className={"flex flex-col w-full items-center h-full overflow-y-scroll md:pt-2"}>
                <img src={this.state.images[this.state.imageIndex] || FallBackImage} alt={this.state.name} className={"w-full object-cover md:rounded-2xl max-h-[200px]"} onError={(e) => e.target.src = FallBackImage} />
                <ImagePagination setState={this.setState} length={this.state.images.length} imageIndex={this.state.imageIndex} />
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
                    this.state.audio &&
                    <audio id={"audio"} src={this.state.audio} playsInline={true} controls={true} className={"absolute bottom-10 center"}
                    />
                }
            </div>
        </div>

        return <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md lg:max-w-xl items-center justify-center flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
            <UilSpinner size={'24px'} />
        </div>
    }

}

export default Monument;
