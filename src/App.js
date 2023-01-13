import React from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {Outlet} from "react-router-dom";
import SearchView from "./view/SearchView";
import LanguagesView from "./view/LanguagesView";
import Scanner from "./view/Scanner";
import Monument from "./view/Monument";
import {UilQrcodeScan} from "@iconscout/react-unicons";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            showLanguages: false,
            selectedLanguage: JSON.parse(localStorage.getItem("languagePreference")) || {
                countryCode: "US",
                language: "English",
                languageCode: 'en'
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
            search: false,
            showScanner: false,
            bottomMenu: false
        }

        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleScanner = this.toggleScanner.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.selectMonument = this.selectMonument.bind(this);
        this.deselectMonument = this.deselectMonument.bind(this);
        this.toggleBottom = this.toggleBottom.bind(this);
    }

    toggleBottom() {
        this.setState({bottomMenu: !this.state.bottomMenu})
    }

    toggleScanner() {
        this.setState({showScanner: !this.state.showScanner});
    }

    toggleLanguage() {
        this.setState({showLanguages: !this.state.showLanguages});
    }

    toggleSearch() {
        this.setState({search: !this.state.search});
    }

    selectLanguage(language) {
        localStorage.setItem("languagePreference", JSON.stringify(language))
        document.documentElement.lang = language.languageCode.toLowerCase();
        this.setState({selectedLanguage: language})
        setTimeout(this.toggleLanguage, 200);
        window.location.reload();
    }

    selectMonument(mon) {
        this.setState({selected: mon});
        console.log(this.state.selected)
    }

    deselectMonument() {
        this.selectMonument(false);
    }

    render() {
        return (
            <div className={"flex w-full h-full items-center justify-center"}>
                <div className={"flex max-w-md flex-col w-full h-full overflow-hidden relative"}>
                    <TopBar toggleMenu={this.toggleBottom} toggleLanguage={this.toggleLanguage} toggleSearch={this.toggleSearch} search={this.search} />
                    <Outlet context={this.selectMonument}/>
                    { this.state.bottomMenu ? <BottomBar toggleMenu={this.toggleBottom} toggleScanner={this.toggleScanner}/> : <></>}
                </div>
                {
                    this.state.showScanner ?
                    <Scanner selectMonument={this.selectMonument} toggleScanner={this.toggleScanner} select={this.selectLanguage}/>
                        :
                    <button onClick={this.toggleScanner} className={"z-10 bg-slate-900 active:bg-slate-700 p-4 px-8 drop-shadow-2xl flex items-center rounded-full absolute bottom-[20px]"}>
                        <UilQrcodeScan size={'24px'} color={"#FFF"} />
                        <span className={"font-Poppins text-white ml-4 font-[600] text-sm"}>Scan QR code</span>
                    </button>
                }
                {
                    this.state.showLanguages &&
                    <LanguagesView selectedLanguage={this.state.selectedLanguage} toggleLanguage={this.toggleLanguage} languagesAvailable={this.state.languagesAvailable} selectLanguage={this.selectLanguage} />
                }
                {
                    this.state.search &&
                    <SearchView toggleSearch={this.toggleSearch} select={this.selectLanguage}/>
                }
                {
                    this.state.selected &&
                    <Monument data={this.state.selected} close={this.deselectMonument} />
                }
            </div>
        )
    }
}

export default App;
