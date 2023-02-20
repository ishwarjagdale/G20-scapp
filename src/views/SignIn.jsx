import {logIn} from "../api/home";
import {notify} from "../components/notifier";
import {useState} from "react";
import Navigation from "../components/Navigation";

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (e) => {
        e.preventDefault();
        logIn({
            email: email,
            password: password
        }).then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location.href = "/smart-scan/admin";
            }
        }).catch((e) => {
            console.log(e);
            notify(e.response.data.message, 'failed');
        })
    }

    return (
        <div className={"h-full w-full flex flex-col items-start"}>
            <Navigation />
            <div className={"flex w-full h-full relative overflow-hidden"}>
                <div className={"flex w-full h-full items-center justify-center"}>
                    <form onSubmit={handleLogIn} className={"flex flex-col justify-center rounded-xl md:border p-4 md:py-8 max-w-sm w-full font-Poppins text-sm md:text-md"}>
                        <span className={"font-[500] mb-8 text-lg"}>Log In</span>
                        <input onChange={(e) => setEmail(e.target.value)} name={'email'} type={"email"} placeholder={"Email"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                        <input onChange={(e) => setPassword(e.target.value)} name={'password'} type={"password"} placeholder={"Password"} className={"pb-2 mb-6 w-full outline-none border-b focus-visible:border-black"} required={true}/>
                        <button type={"submit"} className={"w-full p-2 border rounded-xl  hover:bg-slate-700 text-white bg-slate-900"}>Log in</button>
                    </form>
                </div>
            </div>


        </div>
    );

}

export default SignIn;
