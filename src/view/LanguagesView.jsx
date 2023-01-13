import React from "react";
import {UilMultiply} from "@iconscout/react-unicons";
import ReactCountryFlag from "react-country-flag";

class LanguagesView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            languagesAvailable: {}
        };

    }

    render() {
            return (
                <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex items-center border-b justify-between w-full p-6"}>
                        <div className={" font-Poppins"}>
                            <span className={"font-[600] text-lg block"}>Choose a language</span>
                        </div>
                        <button onClick={this.props.toggleLanguage} className={"p-2"}><UilMultiply size={'24px'}/></button>
                    </div>
                    <div className={"p-4 h-full overflow-y-scroll"}>
                        <ul className={"flex flex-col items-start w-full font-[500] text-sm font-Poppins"}>
                            {
                                this.props.languagesAvailable.map((l, i) => {
                                    return <li onClick={() => this.props.selectLanguage(l)} id={l.countryCode} className={`p-4 mb-1 ${this.props.selectedLanguage.language === l.language ? "bg-green-200" : ""} hover:bg-[#e4e4e4] w-full`} key={i}>
                                        <ReactCountryFlag countryCode={l.countryCode} svg style={{width: "1.5rem", height: "auto"}} />
                                        <span className={"ml-4"}>{l.language}</span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
    }
}

export default LanguagesView;
