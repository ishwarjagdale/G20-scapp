import React from "react";
import {Cats} from "./Category";
import {getMonuments} from "../api/home";
import {UilSpinner} from "@iconscout/react-unicons";

class Saved extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            places: [],
            loaded: false
        }
    }

    componentDidMount() {
        getMonuments(JSON.parse(localStorage.getItem('saved')) || []).then((res) => {
            this.setState({places: res.data.response, loaded: true})
        })
    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll pb-20"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block"}>Saved Places</span>
                        {
                            this.state.loaded ?
                                this.state.places.length ?
                                    this.state.places.map((p, i) =>
                                        <Cats key={p.id} p={p} i={i} length={this.state.places.length} />
                                    )
                                    :
                                    <span className={"text-sm"}>No saved places</span>
                                :
                                <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Saved;
