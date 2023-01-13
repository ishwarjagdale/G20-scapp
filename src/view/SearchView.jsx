import React from "react";
import {UilMultiply} from "@iconscout/react-unicons";

class SearchView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: null
        }
    }


    render() {
        return (
            <>
                <div className={"flex z-50 flex-col bg-white md:bg-transparent md:max-w-md flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex items-center border-b justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-between items-center"}>
                            <input onChange={this.props.search} onKeyDown={this.closeSearch} onBlur={this.closeSearch} type={"text"} required={true} autoFocus={true} className={"flex font-Poppins outline-none flex-1 px-4 p-2"} placeholder={"Search..."} />
                            <button onClick={this.props.toggleSearch} className={"p-2"}><UilMultiply size={'24px'}/></button>
                        </div>
                    </div>
                    <div className={"p-4 font-Poppins"}>
                        <div className={"flex items-center text-md pb-4 block"}>
                            <span className={"font-[500]"}>Searching for: </span>
                            <span className={"font-[600] mx-2"}>{this.state.query}</span>
                        </div>
                    </div>
                    <div className={"overflow-y-scroll"}>
                        <div className={"p-4 flex flex-col h-full items-start"}>
                            <span className={"font-Poppins text-sm m-auto"}>Looks like nothing's there!</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default SearchView;
