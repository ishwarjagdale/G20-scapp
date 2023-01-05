import React from "react";
import FallBackImage from "../images/fallback.png";

class Saved extends React.Component {
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
            ]
        }
    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block"}>Saved Places</span>
                        {
                            this.state.populars.map((p, i) => {
                                return <>
                                    <div key={i} className={"cursor-pointer"}>
                                        <img src={p.image} alt={p.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={() => FallBackImage}/>
                                        <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                                            <div className={"flex items-center"}>
                                                <span className={"font-medium"}>{p.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.populars.length - 1 !== i && <div key={i + 'b'} className={"pb-2"} />
                                    }
                                </>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Saved;
