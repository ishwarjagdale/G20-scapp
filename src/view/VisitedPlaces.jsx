import React from "react";
import {UilFacebookF, UilInstagram, UilShare, UilShareAlt, UilSpinner, UilTwitter} from "@iconscout/react-unicons";
import FallBackImage from "../images/fallback.png";
import {getMonuments} from "../api/home";
import {notify} from "../components/notifier";

class VisitedPlaces extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            visitedIDS: JSON.parse(localStorage.getItem('visited')) || [],
            places: [],
            loaded: false,
            share: {}
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
                <div className={"h-fit overflow-y-scroll pb-20"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block"}>Visited Places</span>
                        {
                            this.state.loaded ?
                                this.state.places.length ?
                                    this.state.places.map((p, i) => {
                                        return <div key={p.id} className={`cursor-pointer ${this.state.places.length - 1 !== i ? 'pb-2' : ''}`} onClick={() => this.revealShare(i)}>
                                            <img src={p.images[0] || FallBackImage} alt={p.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage}/>
                                            <div className={"flex flex-col font-Poppins text-sm my-2"}>
                                                <span className={"font-medium"}>{p.name}</span>
                                                {
                                                    this.state.current === i && <>
                                                        <textarea onChange={(e) => {
                                                            let shares = this.state.share;
                                                            shares[p.id] = e.target.value
                                                            this.setState({share: shares})
                                                        }} maxLength={500} className={"w-full h-[100px] border rounded p-2 mt-4 mb-2"} placeholder={"Write your experience and share it!"} />
                                                        <button onClick={() => {
                                                            if(navigator.share)
                                                            navigator.share({
                                                                title: p.name,
                                                                text: p.description,
                                                                url: `${process.env.REACT_APP_API_URL}/share/${p.id}`
                                                            }).then(() => this.setState({current: -1}))
                                                            else navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/share/${p.id}`).then(() => notify("Link Copied to Clipboard", 'success'))
                                                        }} className={"flex text-white bg-[#1f1f1f] p-2 text-sm items-center justify-center rounded-2xl"}>
                                                            <span className={"mr-2"}>Share</span><UilShare size={'16px'} />
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
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
