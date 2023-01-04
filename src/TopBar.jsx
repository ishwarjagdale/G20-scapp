import React from "react";
import {
    UilBars,
    UilLanguage, UilMultiply,
    UilSearch
} from "@iconscout/react-unicons";

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearch: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    toggleSearch() {
        this.setState({showSearch: !this.state.showSearch})
    }

    closeSearch(e) {
        if(e.type === "keydown" && e.key === 'Escape')
            this.setState({showSearch: false});
        else if(e.type === "keydown" && e.key === "Enter")
            this.props.toggleSearch(e);
        else if(e.type === 'blur')
            this.setState({showSearch: false});
        console.log(e);
    }

    render() {
        return (
            <div className={"flex items-center border-b justify-between w-full p-6"}>
                <button className={"p-2"}><UilBars size={'24px'}/></button>
                <div className={"flex flex-1 items-center justify-end"}>
                    {
                        this.state.showSearch && <input onChange={this.props.search} onKeyDown={this.closeSearch} onBlur={this.closeSearch} type={"text"} required={true} autoFocus={true} className={"flex font-Poppins outline-none flex-1 p-2 px-4"} placeholder={"Search..."} />
                    }
                    <button onClick={this.toggleSearch} className={"p-2"}>
                        {
                            this.state.showSearch ?
                                <UilMultiply size={'24px'}/>
                                :
                                <UilSearch size={'24px'}/>
                        }
                    </button>
                    <div className={"p-2"}/> {/*spacer*/}
                    <button onClick={this.props.toggleLanguage} className={"p-2"}><UilLanguage size={'24px'}/></button>
                </div>
            </div>
        );
    }
}

export default TopBar;
