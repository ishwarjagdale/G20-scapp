import React from "react";
import Cats from "../components/Cats";
import {UilSpinner} from "@iconscout/react-unicons";
import {getNearby} from "../api/home";
import {notify} from "../components/notifier";

class Nearby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            permission: false
        };
    }

    componentDidMount() {
        navigator.permissions.query({name: "geolocation"}).then((res) => {
            if(res.state === "granted") {
                this.setState({permission: true})
                navigator.geolocation.getCurrentPosition((res) => {
                    this.setState({coords: res.coords})
                    getNearby(this.state.coords).then((res) => {
                        if(res.status === 200) {
                            this.setState({places: res.data.response, loaded: true});
                        }
                    })
                }, () => {}, {
                    enableHighAccuracy: true,
                    timeout: 10000
                })
            }
        })

    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll pb-20"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block"}>Nearby Places</span>
                        {this.state.coords && <span className={"inline-flex pb-6 text-sm flex-1"}>Accuracy: {this.state.coords.accuracy}</span>}
                        {
                            this.state.permission ?
                                this.state.loaded ?
                                    this.state.places.length ?
                                        this.state.places.map((p, i) =>
                                            <Cats key={p.id} p={p} i={i} length={this.state.places.length} />
                                        )
                                        :
                                        <span className={"text-sm block"}>{
                                            this.state.coords.accuracy > 100 ?
                                                "accuracy too high":
                                                "no places nearby"
                                        }</span>
                                    :
                                    <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                                :
                            <span>Please enable location access</span>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Nearby;
