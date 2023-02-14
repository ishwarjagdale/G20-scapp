import {useState} from "react";
import {updateUser} from "../../api/adminAPI";
import {notify} from "../../components/notifier";

function Settings() {

    let user = JSON.parse(localStorage.getItem('user'))

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdate = () => {
        let payload = {
            name: name,
            email: email,
        }
        updateUser(payload).then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                user = res.data.user
                notify("Changes saved successfully!", 'success');
            }
        }).catch((err) => notify(err.data.response, 'failed'))
    }

    const handlePassword = () => {
        if(password === confirmPassword) {
            updateUser({
                password: password
            }).then((res) => {
                if(res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    user = res.data.user
                    notify("Changes saved successfully!", 'success');
                }
            }).catch((err) => notify(err.data.response, 'failed'))
        } else {
            notify("Passwords doesn't match", 'failed')
        }
    }

    return (
        <>
            <div className={"w-full h-full flex flex-col overflow-y-scroll"}>
                <div className={"flex flex-col xl:max-w-[800px] w-full p-4 font-Poppins text-sm"}>
                    <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between form-element"}>
                        <div className={"flex flex-col mr-4"}>
                            <span className={"text-md mr-4"}>Name</span>
                            <p className={"text-xs"}>This name will be visible on your dashboard</p>
                        </div>

                        <input className={"text-sm mt-4 lg:mt-0"} onChange={(e) => setName(e.target.value)} type={"text"} name={'name'} placeholder={"Name"} defaultValue={name}/>

                    </div>
                    <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between form-element"}>
                        <div className={"flex flex-col mr-4"}>
                            <span className={"text-md mr-4"}>Email</span>
                            <p className={"text-xs"}>You need this access your account</p>
                        </div>

                        <input className={"text-sm mt-4 lg:mt-0"} onChange={(e) => setEmail(e.target.value)} type={"text"} name={'email'} placeholder={"Email"} defaultValue={email}/>

                    </div>
                    <button onClick={handleUpdate} className={"p-2 text-sm bg-black px-8 mt-4 hover:bg-slate-800 text-white rounded-xl"}>
                        Update
                    </button>
                    <hr className={"border-slate-400 my-4"}/>
                    <div className={"flex flex-col text-sm lg:text-[16px] py-4"}>
                        <div className={"flex w-full lg:items-center justify-between flex-col lg:flex-row form-element"}>
                            <div className={"flex flex-col mr-4"}>
                                <span className={"text-md mr-4"}>New Password</span>
                                {/*<p className={"text-[12px] lg:text-sm sec-text"}>You need this access your account</p>*/}
                            </div>

                            <input onChange={(e) => setPassword(e.target.value)} className={"text-sm mt-4 lg:mt-0"} type={"password"} name={'password'} placeholder={"Password"}/>

                        </div>
                        <div className={"flex w-full lg:items-center justify-between flex-col lg:flex-row form-element"}>
                            <div className={"flex flex-col mr-4"}>
                                <span className={"text-md mr-4"}>Confirm Password</span>
                                <p className={"text-xs"}>Make sure both password matches</p>
                            </div>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} className={"text-sm mt-4 lg:mt-0"} type={"password"} name={'confirm_password'} placeholder={"Confirm Password"}/>
                        </div>
                        <button onClick={handlePassword} className={"p-2 px-8 mt-4 bg-black hover:bg-slate-800 text-white rounded-xl text-sm"}>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings;
