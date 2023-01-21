import {UilArchway, UilMap, UilQrcodeScan, UilSpinner} from "@iconscout/react-unicons";
import React, {useState} from "react";
import FallBackImage from "../images/fallback.png";
import {useOutletContext} from "react-router-dom";
import {getCategories, getPopulars} from "../api/home";
import {calculateDistance} from "../components/constants";
import QRImage from "../images/zz.jpg";


function Categories({categories, context}) {
    const con = useOutletContext();
    const select = con ? con[0] : context

    return Object.keys(categories).map((k) => {
        return <div key={k} className={"p-4 font-Poppins"}>
            <div className={"flex pb-4 block items-center justify-between"}>
                <span className={"font-[600] text-md capitalize"}>{k}</span>
                <a href={`/category/${k.replaceAll(' ', '-').toLowerCase()}`} className={"text-sm hover:bg-transparent font-[500] text-gray-600"}>View all</a>
            </div>
            <div className={"overflow-x-scroll hide-scroll"}>
                <div className={"flex w-fit"}>
                    {
                        categories[k].map((p, i) => {
                            return <div key={p.id} onClick={() => select(p.id)} className={`cursor-pointer w-[300px] ${categories[k].length - 1 !== i ? 'mr-4' : '' }`}>
                                <img src={p.images[0] || FallBackImage} alt={p.name} className={"w-[300px] flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage}/>
                                <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                                    <div className={"flex items-center"}>
                                        <span className={"font-medium"}>{p.name}</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    })
}
function Populars({popular, length, current, context}) {

    const con = useOutletContext();
    const select = con ? con[0] : context

    const [coordinates, setCoordinates] = useState(null);

    navigator.geolocation.watchPosition((res) => {
        if(res.coords.accuracy < 100)
        setCoordinates(res.coords)
    }, () => {}, {
        enableHighAccuracy: true,
        timeout: 10000
    })

    if(popular)
    return <div className={"p-4 font-Poppins"}>
        <span className={"font-[600] text-md pb-4 block"}>Popular Places</span>
        <div onClick={() => select(popular.id)} className={"cursor-pointer"}>
            <img src={popular.images[0] || FallBackImage} alt={popular.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"}  onError={(e) => e.target.src = FallBackImage} />
            <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                <div className={"flex items-center"}>
                    <span className={"font-medium"}>{popular.name}</span>
                    {
                        coordinates &&
                        <>
                            <span className={"mx-2"}>-></span>
                            <span className={"font-medium"}>{Math.round(calculateDistance(coordinates.latitude, coordinates.longitude, Number.parseFloat(popular.lat), Number.parseFloat(popular.long)))} km</span>
                        </>
                    }
                </div>
                <div className={"flex items-center"}>
                    {
                        [Array(length).fill(0).map((k, i) => {
                                if(i === current)
                                    return <span key={i.toString()} className={"line ml-1"} />
                                return <span key={i.toString()} className={"dot ml-1"} />
                        })]
                    }
                </div>
            </div>
        </div>
    </div>
}
function QRInfo({toggle, visible}) {
    const context = useOutletContext();
    const handleToggle = context?.length === 2 ? context[1] : toggle

    return <div onClick={handleToggle} className={`${visible === 1 ? 'flex' : 'hidden'} cursor-pointer h-[150px] bg-slate-900 text-white justify-between items-center border font-Poppins rounded-xl drop-shadow-sm m-2 mx-4`}>
        <img src={QRImage} className={"w-full rounded-xl object-cover h-full"} />
    </div>
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            populars: [],
            categories: {},
            popsLoaded: false,
            catsLoaded: false,
            page: 0
        }

        this.autoRotate = this.autoRotate.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    handlePage() {
        setTimeout(() => {
            this.setState({page: this.state.page === 0 ? 1 : 0});
            this.handlePage();
        }, 3000)
    }

    autoRotate() {
        setTimeout(() => {
            this.setState({current: (this.state.current + 1) % this.state.populars.length})
            this.autoRotate();
        }, 5000)
    }

    componentDidMount() {
        // this.handlePage();
        getPopulars().then((res) => {
            if(res.status === 200) {
                this.setState({populars: res.data.response, popsLoaded: true})
            }
        }).then(this.autoRotate);
        getCategories().then((res) => {
            if(res.status === 200) {
                this.setState({categories: res.data.response, catsLoaded: true})
            }
        })

        // if(this.state.populars.length) this.autoRotate();
    }

    render() {
        return (
            <div className={"h-fit overflow-y-scroll pb-20"}>
                <div className={`flex justify-between font-Poppins p-6 text-white bg-slate-900 rounded-xl drop-shadow m-2 mx-4`}>
                    <div className={"flex flex-col w-10/12"}>
                        <marquee className={"text-xl flex font-normal"}>
                            Welcome to Aurangabad!
                            {/*<div className={"px-4 inline-block"} />*/}
                            {/*オーランガバードへようこそ*/}
                            <div className={"px-4 inline-block"} />
                            औरंगाबाद में आपका स्वागत है
                            {/*<div className={"px-4 inline-block"} />*/}
                            {/*அவுரங்காபாத் வரவேற்கிறோம்*/}
                            <div className={"px-4 inline-block"} />
                            औरंगाबादमध्ये आपले स्वागत आहे
                            {/*<div className={"px-4 inline-block"} />*/}
                            {/*Willkommen in Aurangabad*/}
                        </marquee>
                    </div>
                    <UilMap size={'24px'}/>
                </div>
                <QRInfo toggle={this.props.toggleScanner} visible={1} />
                {
                    this.state.popsLoaded ?
                        <Populars context={this.props.context} popular={this.state.populars[this.state.current]} length={this.state.populars.length} current={this.state.current} />
                        :
                        <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                }
                {
                    this.state.catsLoaded ?
                        <Categories context={this.props.context} categories={this.state.categories} />
                        :
                        <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                }
            </div>
        )
    }

}

export default Home;
