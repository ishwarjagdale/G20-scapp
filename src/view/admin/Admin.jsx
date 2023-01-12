import React from "react";
import {
    UilBars,
    UilEstate,
    UilMultiply,
    UilPlusCircle,
    UilSetting,
    UilSignout, UilUserCircle
} from "@iconscout/react-unicons";
import {Link, Outlet} from "react-router-dom";
import {isSecure, logOut} from "../../api/adminAPI";

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSidebar: false,
            path: '/admin',
            user: null
        };

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleSidebar() {
        this.setState({activeSidebar: !this.state.activeSidebar});
    }

    handleLogout() {
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

    componentDidMount() {
        isSecure().then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            this.setState({user: res.data});
        }).catch((e) => {
            console.log(e);
            window.location.href = "/login";
        })
    }

    render() {
        if(this.state.user)
        return (
            <>
                <div className={"flex flex-col w-full h-full overflow-hidden md:max-w-screen-2xl"}>
                    <div className={"flex h-fit min-h-[80px] items-center border-b justify-between w-full p-6"}>
                        <button onClick={this.toggleSidebar} className={"ml-auto p-2 md:hidden"}>
                            {
                                this.state.activeSidebar ?
                                    <UilMultiply size={'24px'}/>
                                    :
                                    <UilBars size={'24px'}/>
                            }
                        </button>
                        <div className={"items-center hidden md:flex ml-auto"}>
                            <span className={"font-Poppins mr-2 font-[500] text-sm"}>{this.state.user.email}</span>
                            <UilUserCircle size={'24px'} />
                        </div>
                    </div>
                    <div className={"flex w-full h-full py-2 md:py-4 relative overflow-hidden"}>
                        <div className={`${this.state.activeSidebar ? 'absolute' : 'hidden md:block'} bg-white md:relative w-full h-full p-2 md:min-w-fit md:max-w-sm`}>
                            <Link to={"/admin/new"} onClick={this.toggleSidebar} className={"font-Poppins w-full h-[60px] hover:bg-slate-700 scale-98 flex items-center p-4 px-8 text-white bg-slate-900 rounded-2xl"}>
                                <UilPlusCircle size={'24px'} />
                                <span className={"mx-4 text-sm md:text-md"}>New Location</span>
                            </Link>
                            <hr className={"m-4"}/>
                            <ul className={"flex flex-col overflow-hidden w-full"}>
                                <li>
                                    <Link to={'/admin'} onClick={this.toggleSidebar} className={`font-Poppins w-full h-[60px] scale-98 flex items-center p-4 px-8 rounded-2xl`}>
                                        <UilEstate size={'24px'} />
                                        <span className={"mx-4 mt-1 text-sm md:text-sm"}>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/settings'} onClick={this.toggleSidebar} className={`font-Poppins w-full h-[60px] scale-98 flex items-center p-4 px-8 rounded-2xl`}>
                                        <UilSetting size={'24px'} />
                                        <span className={"mx-4 mt-1 text-sm md:text-md"}>Settings</span>
                                    </Link>
                                </li>
                            </ul>
                            <hr className={"m-4"}/>
                            <ul className={"flex flex-col overflow-hidden w-full"}>
                                <li>
                                    <button onClick={this.handleLogout} className={"font-Poppins w-full h-[60px] scale-98 flex items-center p-4 px-8 rounded-2xl"}>
                                        <UilSignout size={'24px'} />
                                        <span className={"mx-4 mt-1 text-sm md:text-md"}>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                            <Outlet/>

                    </div>
                </div>
            </>
        );
    }

}

export default Admin;
