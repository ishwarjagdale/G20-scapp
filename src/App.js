import React from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {Outlet} from "react-router-dom";
import SearchView from "./view/SearchView";
import LanguagesView from "./view/LanguagesView";
import Scanner from "./view/Scanner";

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
            },
            showScanner: false
        }

        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleScanner = this.toggleScanner.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.search = this.search.bind(this);
    }

    toggleScanner() {
        this.setState({showScanner: !this.state.showScanner});
    }

    toggleLanguage() {
        this.setState({showLanguages: !this.state.showLanguages});
    }

    search(e) {
        this.setState({search: {...this.state.search, query: e.target.value}})
    }

    toggleSearch() {
        this.setState({search: {...this.state.search, showSearch: !this.state.search.showSearch}});
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
                    <BottomBar toggleScanner={this.toggleScanner} />
                </div>
                {
                    this.state.showScanner &&
                    <Scanner />
                }
                {
                    this.state.showLanguages &&
                    <LanguagesView selectedLanguage={this.state.selectedLanguage} toggleLanguage={this.toggleLanguage} languagesAvailable={this.state.languagesAvailable} selectLanguage={this.selectLanguage} />
                }
                {
                    this.state.search.showSearch &&
                    <SearchView search={this.state.search} toggleSearch={this.toggleSearch}/>
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
