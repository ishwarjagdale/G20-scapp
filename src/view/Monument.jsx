import React from "react";
import {
    UilAngleLeft,
    UilAngleRight, UilBookmark,
    UilMultiply, UilShareAlt
} from "@iconscout/react-unicons";
import FallBackImage from "./../images/fallback.png";
import {getMonument} from "../api/home";
import {getNativeName} from "all-iso-language-codes";

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
        return (
            <>
                <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md lg:max-w-xl flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex border-b z-10 items-center justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-end items-center"}>
                            <button onClick={this.props.close} className={"rounded-full bg-white p-2"}><UilMultiply size={'24px'}/></button>
                        </div>
                    </div>
                    <div className={"flex flex-col w-full h-full overflow-y-scroll md:pt-2"}>
                        <img src={this.state.images[this.state.imageIndex] || FallBackImage} alt={this.state.name} className={"w-full object-cover md:rounded-2xl max-h-[200px]"} onError={(e) => e.target.src = FallBackImage} />
                        <div className={"flex items-center justify-center h-[20px] m-2"}>
                            {
                                this.state.images.length > 1 ?
                                    <>
                                        <button onClick={() => this.autoRotate(-1, 0, false)} className={"rounded-full mr-2"}>
                                            <UilAngleLeft size={'24px'} />
                                        </button>
                                        {
                                            [Array(this.state.images.length).fill(0).map((k, i) => {
                                                if(i === this.state.imageIndex)
                                                    return <span key={i.toString()} className={"line ml-1"} />
                                                return <span key={i.toString()} className={"dot ml-1"} />
                                            })]
                                        }
                                        <button onClick={() => this.autoRotate(1, 0, false)} className={"rounded-full ml-2"}>
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
                                    <button className={"p-2 mr-2"}><UilShareAlt size={'24px'} /></button>
                                    <button onClick={() => {
                                        let bookmarks = JSON.parse(localStorage.getItem('saved')) || []
                                        bookmarks.indexOf(this.state.id) === -1 ? bookmarks.push(this.state.id) : bookmarks.splice(bookmarks.indexOf(this.state.id), 1);
                                        localStorage.setItem('saved', JSON.stringify(bookmarks))
                                        window.alert(bookmarks.indexOf(this.state.id) !== -1 ? `Saved for later!` : `Removed from saved!`);
                                    }} className={"p-2"}><UilBookmark size={'24px'} /></button>
                                </div>
                            </div>
                            {/*{*/}
                            {/*    this.state.paras.map((para) =>*/}
                            {/*    <p className={"pb-4 text-justify font-Merriweather text-sm leading-7"}>*/}
                            {/*        {para}*/}
                            {/*    </p>*/}
                            {/*    )*/}
                            {/*}*/}
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
                    </div>
                </div>
            </>
        );
    }

}

export default Monument;
