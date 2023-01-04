import React from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {Outlet} from "react-router-dom";
import {UilMultiply, UilSearch} from "@iconscout/react-unicons";
import ReactCountryFlag from "react-country-flag";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            showLanguages: false,
            selectedLanguage: JSON.parse(localStorage.getItem("languagePreference")) || {
                countryCode: "US",
                language: "English"
            },
            languagesAvailable: [
                {
                    countryCode: "US",
                    languageCode: 'en',
                    language: "English"
                },
                {
                    countryCode: "IN",
                    languageCode: 'hi',
                    language: "हिंदी"
                },
                {
                    countryCode: "DE",
                    languageCode: 'de',
                    language: "German"

                },
                {
                    countryCode: "JP",
                    languageCode: 'ja',
                    language: "Japanese"
                }
            ],
            search: {
                showSearch: false,
                query: 'hi'
            }
        }

        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.search = this.search.bind(this);
    }

    toggleLanguage() {
        this.setState({showLanguages: !this.state.showLanguages});
    }

    search(e) {
        this.setState({search: {...this.state.search, query: e.target.value}})
    }

    toggleSearch() {
        this.setState({search: {...this.state.search, showSearch: !this.state.search}});
    }

    selectLanguage(language) {
        localStorage.setItem("languagePreference", JSON.stringify(language))
        document.documentElement.lang = language.languageCode.toLowerCase();
        this.setState({selectedLanguage: language})
        setTimeout(this.toggleLanguage, 200);
    }

    render() {
        return (
            <div className={"flex w-full h-full items-center justify-center"}>
                <div className={"flex max-w-md flex-col w-full h-full overflow-hidden"}>
                    <TopBar toggleLanguage={this.toggleLanguage} toggleSearch={this.toggleSearch} search={this.search} />
                    <Outlet/>
                    <BottomBar />
                </div>
                {
                    (this.state.showLanguages || this.state.search.showSearch) &&
                    <div className={"flex bg-white md:bg-transparent max-w-md flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                        {
                            this.state.showLanguages &&
                            <div className={"flex absolute bg-white md:bg-transparent max-w-md flex-col w-full h-full overflow-hidden top-0 md:relative"}>
                                <div className={"flex items-center border-b justify-between w-full p-6"}>
                                    <div className={" font-Poppins"}>
                                        <span className={"font-[600] text-lg block"}>Choose a language</span>
                                    </div>
                                    <button onClick={this.toggleLanguage} className={"p-2"}><UilMultiply size={'24px'}/></button>
                                </div>
                                <div className={"p-4 h-fit overflow-y-scroll"}>
                                    <ul className={"flex flex-col items-start w-full font-[500] text-sm font-Poppins"}>
                                        {
                                            this.state.languagesAvailable.map((l, i) => {
                                                return <li onClick={() => this.selectLanguage(l)} id={l.countryCode} className={`p-4 mb-1 ${this.state.selectedLanguage.language === l.language ? "bg-green-200" : ""} hover:bg-[#e4e4e4] w-full`} key={i}>
                                                    <ReactCountryFlag countryCode={l.countryCode} svg style={{width: "1.5rem", height: "auto"}} />
                                                    <span className={"ml-4"}>{l.language}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        }
                        {
                            this.state.search.showSearch &&
                            <div className={"flex absolute bg-white md:bg-transparent max-w-md flex-col w-full h-full overflow-hidden top-0 md:relative"}>
                                <div className={"flex items-center border-b justify-between w-full p-6"}>
                                    <div className={"font-Poppins flex items-center"}>

                                    </div>
                                    <button onClick={this.toggleSearch} className={"p-2"}><UilMultiply size={'24px'}/></button>
                                </div>
                                <div className={"p-4 font-Poppins"}>
                                    <div className={"flex items-center text-md pb-4 block"}>
                                        <span className={"font-[500]"}>Searching for: </span>
                                        <span className={"font-[600] mx-2"}>{this.state.search.query}</span>
                                    </div>
                                </div>
                                <div className={"overflow-y-scroll"}>
                                    <div className={"p-4 flex flex-col h-full items-start"}>
                                        <span className={"font-Poppins text-sm m-auto"}>Looks like nothing's there!</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    this.state.selected &&
                    <div className={"flex bg-white md:bg-transparent md:max-w-md lg:max-w-screen-lg flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    </div>
                }
            </div>
        )
    }
}

export default App;
