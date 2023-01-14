import React from "react";
import {getAllMonuments} from "../../api/adminAPI";
import FallbackImage from "./../../images/fallback.png"
import {Link} from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            monuments: []
        };
    }

    componentDidMount() {
        getAllMonuments().then((res) => {
            if(res.status === 200) {
                this.setState({monuments: res.data.response});
            }
        })
    }

    render() {
        return (
            <>
                <div className={"w-full h-full flex flex-col overflow-y-scroll"}>
                    <div className={"flex font-Poppins p-4 flex-wrap md:px-6"}>
                        <span className={"font-[600] mr-2 text-slate-900 text-4xl"}>Welcome,</span>
                        <span className={"font-[600] text-slate-500 text-4xl"}>{this.state.user.name.split(" ")[0]}</span>
                    </div>
                    <div className={"flex flex-col w-full font-Poppins mt-4 md:mt-8 p-4 flex-wrap md:px-6"}>
                        <span className={"font-[500] font-Poppins"}>Monuments</span>
                        <div className={"flex mt-4 w-full flex-wrap"}>
                            {
                                this.state.monuments.map((mon) =>
                                    <Link to={`/admin/edit/${mon.id}`} key={mon.id} className={"bg-white mb-4 md:mr-4 border w-full md:max-w-xs rounded-md"}>
                                        <img src={mon.images[0] || FallbackImage} className={"rounded-t-md w-full aspect-video"} alt={""} />
                                        <div className={"flex flex-col p-4"}>
                                            <span className={"text-sm font-[500] font-Poppins"}>{mon.name}</span>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;
