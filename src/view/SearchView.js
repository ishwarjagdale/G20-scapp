import React from "react";
import {UilMultiply} from "@iconscout/react-unicons";

class SearchView extends React.Component {

    render() {
        return (
            <>
                <div className={"flex flex-col bg-white md:bg-transparent md:max-w-md flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex items-center border-b justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-between items-center"}>
                            <span className={"font-[600] text-lg block"}>Search</span>
                            <button onClick={this.props.toggleSearch} className={"p-2"}><UilMultiply size={'24px'}/></button>
                        </div>
                    </div>
                    <div className={"p-4 font-Poppins"}>
                        <div className={"flex items-center text-md pb-4 block"}>
                            <span className={"font-[500]"}>Searching for: </span>
                            <span className={"font-[600] mx-2"}>{this.props.search.query}</span>
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
