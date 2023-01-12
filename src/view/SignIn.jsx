import React from "react";
import {logIn} from "../api/home";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(e) {
        e.preventDefault();
        logIn(this.state).then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location.href = "/admin";
            }
        }).catch((e) => {
            console.log(e);
            window.alert(e.response.data.message);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleLogIn} className={"flex flex-col justify-center rounded-xl md:border p-4 md:py-8 max-w-sm w-full font-Poppins text-sm md:text-md"}>
                <span className={"font-[500] mb-8 text-lg"}>Log In</span>
                <input onChange={(e) => {this.setState({email: e.target.value})}} name={'email'} type={"email"} placeholder={"Email"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                <input onChange={(e) => {this.setState({password: e.target.value})}} name={'password'} type={"password"} placeholder={"Password"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                <button type={"submit"} className={"w-full p-2 border rounded-xl  hover:bg-slate-700 text-white bg-slate-900"}>Log in</button>
            </form>
        );
    }

}

export default SignIn;
