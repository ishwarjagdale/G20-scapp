import React, {useEffect, useState} from "react";
import {
    UilBars,
    UilEstate,
    UilMultiply,
    UilPlusCircle,
    UilSignout, UilUserCircle
} from "@iconscout/react-unicons";
import {Link, Outlet} from "react-router-dom";
import {isSecure, logOut} from "../../api/adminAPI";
import LOGO from "../../images/logo.png";

function Admin() {

    const [activeSide, setActiveSide] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        logOut().then((res) => {
            if(res.status === 200) {
                localStorage.removeItem('user');
            }
        }).catch((e) => {
            console.log(e);
            localStorage.removeItem('user');
        }).finally(() => {
            window.location.href = "/login";
        })
    }

    useEffect(() => {
        isSecure().then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            setUser(res.data);
        }).catch((e) => {
            console.log(e);
            window.location.href = "/login";
        })
    }, [])

    if(user)
    return (
        <div className={"flex flex-col w-full h-full mx-auto overflow-hidden md:max-w-screen-2xl"}>
            <div className={"flex h-fit min-h-[80px] items-center border-b justify-between w-full p-6"}>
                <span onClick={() => window.location.href = "/"} className={"cursor-pointer font-Poppins whitespace-nowrap w-[48px] font-bold text-lg"}><img src={LOGO} alt={"Smart Scan"} /></span>
                <button onClick={() => setActiveSide(!activeSide)} className={"ml-auto p-2 md:hidden"}>
                    {
                        activeSide ?
                            <UilMultiply size={'24px'}/>
                            :
                            <UilBars size={'24px'}/>
                    }
                </button>
                <div className={"items-center hidden md:flex ml-auto"}>
                    <span className={"font-Poppins mr-2 font-[500] text-sm"}>{user.email}</span>
                    <UilUserCircle size={'24px'} />
                </div>
            </div>
            <div className={"flex w-full h-full py-2 md:py-4 relative overflow-hidden"}>
                <div className={`${activeSide ? 'absolute' : 'hidden md:block'} z-50 bg-white md:relative w-full h-full p-2 md:min-w-fit md:max-w-sm`}>
                    <Link to={"/admin/new"} onClick={() => setActiveSide(!activeSide)} className={"font-Poppins w-full h-[60px] hover:bg-slate-700 scale-98 flex items-center p-4 px-8 text-white bg-slate-900 rounded-2xl"}>
                        <UilPlusCircle size={'24px'} />
                        <span className={"mx-4 text-sm md:text-md"}>New Location</span>
                    </Link>
                    <hr className={"m-4"}/>
                    <ul className={"flex flex-col overflow-hidden w-full"}>
                        <li>
                            <Link to={'/admin'} onClick={() => setActiveSide(!activeSide)} className={`font-Poppins w-full h-[60px] scale-98 flex items-center p-4 px-8 rounded-2xl`}>
                                <UilEstate size={'24px'} />
                                <span className={"mx-4 mt-1 text-sm md:text-sm"}>Dashboard</span>
                            </Link>
                        </li>
                    </ul>
                    <hr className={"m-4"}/>
                    <ul className={"flex flex-col overflow-hidden w-full"}>
                        <li>
                            <button onClick={handleLogout} className={"font-Poppins w-full h-[60px] scale-98 flex items-center p-4 px-8 rounded-2xl"}>
                                <UilSignout size={'24px'} />
                                <span className={"mx-4 mt-1 text-sm md:text-md"}>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <Outlet/>

            </div>
        </div>
    );

}

export default Admin;
