import React, {useEffect, useState} from "react";
import {deleteMonument, getAllMonuments} from "../../api/adminAPI";
import FallbackImage from "./../../images/fallback.png"
import {Link} from "react-router-dom";
import {UilTrash} from "@iconscout/react-unicons";
import {notify} from "../../components/notifier";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem('user'));
    const [monuments, setMonuments] = useState({});

    useEffect(() => {
        getAllMonuments().then((res) => {
            if(res.status === 200) {
                let cats = {};
                for (const monument of res.data.response) {
                    if(monument.category in cats) {
                        cats[monument.category].push(monument);
                    } else {
                        cats[monument.category] = [monument]
                    }
                }
                setMonuments(cats);
            }
        })
    }, [])

    const _deleteMonument = (id, cat) => {

    }

    return (
        <div className={"w-full h-full flex flex-col overflow-y-scroll"}>
            <div className={"flex font-Poppins p-4 flex-wrap md:px-6"}>
                <span className={"font-[600] mr-2 text-slate-900 text-4xl"}>Welcome,</span>
                <span className={"font-[600] text-slate-500 text-4xl"}>{user.name.split(" ")[0]}</span>
            </div>
            <div className={"flex flex-col w-full font-Poppins mt-4 md:mt-8 p-4 flex-wrap md:px-6"}>
                {
                    monuments && Object.keys(monuments).map((cat) =>
                        <div className={"flex flex-col w-full mb-4"}>
                            <span className={"font-[500] font-Poppins"}>{cat}</span>
                            <div className={"flex mt-4 w-full gap-4 md:grid grid-cols-3 flex-wrap"}>
                                {
                                    monuments[cat].map((mon) =>
                                        <div key={mon.id} className={"bg-white mb-4 md:mr-4 border w-full md:max-w-sm rounded-md"}>
                                            <Link to={`/admin/edit/${mon.id}`}>
                                                <img src={mon.images[0] || FallbackImage} className={"rounded-t-md w-full object-cover h-[150px]"} alt={""} />
                                            </Link>
                                            <div className={"flex items-center justify-between p-4"}>
                                                <Link to={`/admin/edit/${mon.id}`} className={"hover:bg-transparent text-sm font-[500] font-Poppins"}>{mon.name}</Link>
                                                <button onClick={() => {
                                                    if(window.confirm("Are you sure?")) {
                                                        deleteMonument(mon.id).then((res) => {
                                                            if(res.status === 200) {
                                                                notify("Deleted Successfully", 'success');
                                                                let list = Object.assign({}, monuments);
                                                                list[cat] = list[cat].filter((m) => m.id !== mon.id)
                                                                if(!list[cat].length) delete list[cat]
                                                                setMonuments(list);
                                                            }
                                                        }).catch((err) => {notify(err.response.data.message, 'failed')});
                                                    }
                                                }} className={"p-2 rounded hover:text-red-500 text-slate-500"}><UilTrash size={'16px'} /></button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;
