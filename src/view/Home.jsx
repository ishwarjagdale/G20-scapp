import {UilMap} from "@iconscout/react-unicons";
import React from "react";
import FallBackImage from "../images/fallback.png";
import {useOutletContext} from "react-router-dom";


function Categories({categories}) {
    const select = useOutletContext();

    return Object.keys(categories).map((k, j) => {
        return <div key={j} className={"p-4 font-Poppins"}>
            <div className={"flex pb-4 block items-center justify-between"}>
                <span className={"font-[600] text-md capitalize"}>{k.replaceAll('-', ' ')}</span>
                <a href={`/category/${k}`} className={"text-sm hover:bg-transparent font-[500] text-gray-600"}>View all</a>
            </div>
            <div className={"overflow-x-scroll hide-scroll"}>
                <div className={"flex w-fit"}>
                    {
                        categories[k].map((p, i) => {
                            return <>
                                <div key={i.toString()} onClick={() => select(p.name)} className={"cursor-pointer w-[300px]"}>
                                    <img src={p.image} alt={p.name} className={"w-[300px] flex-1 h-[150px] border rounded-xl object-cover"} onError={() => FallBackImage}/>
                                    <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                                        <div className={"flex items-center"}>
                                            <span className={"font-medium"}>{p.name}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    categories[k].length - 1 !== i && <div key={i + 'b'} className={"p-2"} />
                                }
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    })
}
function Populars({popular, length, current}) {

    const select = useOutletContext();

    return <div className={"p-4 font-Poppins"}>
        <span className={"font-[600] text-md pb-4 block"}>Popular Places</span>
        <div onClick={() => select(popular.name)} className={"cursor-pointer"}>
            <img src={popular.image} alt={popular.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"}  onError={() => FallBackImage} />
            <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                <div className={"flex items-center"}>
                    <span className={"font-medium"}>{popular.name}</span>
                    <span className={"mx-2"}>-></span>
                    <span className={"font-medium"}>2 km</span>
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

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            populars: [
                {
                    "name": "Ajanta Caves",
                    "image": "https://images.indianexpress.com/2018/12/ajanta-1.jpg"
                },
                {
                    "name": "Bibi ka Maqbara",
                    "image": "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_513/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rtja0mohpuw3xfghkpia/BibiKaMaqbaraFast-TrackTicketinAurangabad.webp"
                },
                {
                    "name": "Bell Tower",
                    "image": "https://lh3.ggpht.com/p/AF1QipMPEq9I4Tr8_GDCpvkDcAMQwkM_ICj3s2PJ32AJ"
                },
            ],
            categories: {
                "historical-places": [
                    {
                        "name": "Ajanta Caves",
                        "image": "https://images.indianexpress.com/2018/12/ajanta-1.jpg"
                    },
                    {
                        "name": "Bibi ka Maqbara",
                        "image": "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_513/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rtja0mohpuw3xfghkpia/BibiKaMaqbaraFast-TrackTicketinAurangabad.webp"
                    },
                    {
                        "name": "Bell Tower",
                        "image": "https://lh3.ggpht.com/p/AF1QipMPEq9I4Tr8_GDCpvkDcAMQwkM_ICj3s2PJ32AJ"
                    },
                ],
                "sight-seeing": [
                    {
                        "name": "Ajanta Caves",
                        "image": "https://images.indianexpress.com/2018/12/ajanta-1.jpg"
                    },
                    {
                        "name": "Bibi ka Maqbara",
                        "image": "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_513/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rtja0mohpuw3xfghkpia/BibiKaMaqbaraFast-TrackTicketinAurangabad.webp"
                    },
                    {
                        "name": "Bell Tower",
                        "image": "https://lh3.ggpht.com/p/AF1QipMPEq9I4Tr8_GDCpvkDcAMQwkM_ICj3s2PJ32AJ"
                    },
                ]
            }
        }

        this.autoRotate = this.autoRotate.bind(this);
    }

    autoRotate() {
        setTimeout(() => {
            this.setState({current: (this.state.current + 1) % this.state.populars.length})
            this.autoRotate();
        }, 5000)
    }

    componentDidMount() {
        this.autoRotate();
    }

    render() {
        return (
            <div className={"h-fit overflow-y-scroll"}>
                <div className={"flex justify-between font-Poppins p-6 text-white bg-slate-900 rounded-xl drop-shadow m-2 mx-4"}>
                    <div className={"flex flex-col"}>
                        <span className={"text-xl font-normal"}>Welcome to</span>
                        <span className={"text-2xl font-bold"}>Aurangabad!</span>
                    </div>
                    <UilMap/>
                </div>
                <Populars popular={this.state.populars[this.state.current]} length={this.state.populars.length} current={this.state.current} />
                <Categories categories={this.state.categories} />

            </div>
        )
    }

}

export default Home;
