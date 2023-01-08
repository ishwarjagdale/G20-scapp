import React from "react";
import {Cats} from "./Category";

class Saved extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            data: [
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
                            this.state.data.map((p, i) =>
                                <Cats p={p} i={i} length={this.state.data.length} />
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Saved;
