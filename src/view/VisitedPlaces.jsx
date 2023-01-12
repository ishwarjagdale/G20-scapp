import React from "react";
import {UilFacebookF, UilInstagram, UilSpinner, UilTwitter} from "@iconscout/react-unicons";
import FallBackImage from "../images/fallback.png";
import {getMonuments} from "../api/home";

class VisitedPlaces extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            visitedIDS: JSON.parse(localStorage.getItem('visited')) || [],
            places: [],
            loaded: false
        }

        this.revealShare = this.revealShare.bind(this);
    }

    revealShare(i) {
        this.setState({current: i});
    }

    componentDidMount() {

        getMonuments(this.state.visitedIDS).then((res) => {
            this.setState({places: res.data.response, loaded: true})
        })

    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block"}>Visited Places</span>
                        {
                            this.state.loaded ?
                                this.state.places.length ?
                                    this.state.places.map((p, i) => {
                                        console.log(p)
                                        return <>
                                            <div key={p.id} className={"cursor-pointer"} onClick={() => this.revealShare(i)}>
                                                <img src={p.images[0] || FallBackImage} alt={p.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage}/>
                                                <div className={"flex flex-col font-Poppins text-sm my-2"}>
                                                    <span className={"font-medium"}>{p.name}</span>
                                                    {
                                                        this.state.current === i && <>
                                                            <textarea maxLength={500} className={"w-full h-[100px] border rounded p-2 mt-4 mb-2"} placeholder={"Write your experience and share it!"} />
                                                            <div className={"flex share-buttons text-gray-700 p-2 items-center justify-center"}>
                                                                <button className={"flex items-center p-2 mx-2 rounded-2xl"}>
                                                                    <UilFacebookF size={18}/>
                                                                </button>
                                                                <button className={"flex items-center p-2 mx-2 rounded-2xl"}>
                                                                    <UilTwitter size={18}/>
                                                                </button>
                                                                <button className={"flex items-center p-2 mx-2 rounded-2xl"}>
                                                                    <UilInstagram size={18}/>
                                                                </button>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                this.state.places.length - 1 !== i && <div key={i + 'b'} className={"pb-2"} />
                                            }
                                        </>
                                    })
                                    :
                                    <span className={"text-sm"}>No places visited</span>
                                :
                                <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default VisitedPlaces;
