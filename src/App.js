import {useEffect, useState} from "react";
import {UilQrcodeScan} from "@iconscout/react-unicons";
import Navigation from "./components/Navigation";
import {Outlet} from "react-router-dom";

function App() {

    const [langIndex, setLangIndex] = useState(0);

    const rotateLang = () => {
        setLangIndex((langIndex + 1) % 3);
    }

    useEffect(() => {
        setTimeout(rotateLang, 3000);
    }, )

    return (
        <div className={"h-full w-full flex flex-col items-start"}>
            <Navigation />
            <div className={"flex w-full h-full relative overflow-hidden"}>
                {/*hero section*/}
                <div className={"hidden lg:flex w-3/4 flex-col m-2 rounded-2xl items-center back-image"}>
                    <div className={"flex py-[200px] px-[100px] justify-between text-white font-Poppins flex-col h-full rounded-2xl w-full back-grad"}>
                        {/*welcome to aurangabad*/}
                        {
                            langIndex === 0 &&
                            <div className={"flex flex-col fadein-animate"} lang={'en'}>
                                <span className={"text-6xl font-normal ml-1"}>Welcome to</span>
                                <span className={"text-7xl font-bold"}>Aurangabad</span>
                            </div>
                        }
                        {
                            langIndex === 1 &&
                            <div className={"flex flex-col fadein-animate"} lang={'hi'}>
                                <span className={"text-7xl font-bold"}>औरंगाबाद</span>
                                <span className={"text-5xl font-normal mt-4 word-spacing-wide m-1"}>में आपका स्वागत है</span>
                            </div>
                        }
                        {
                            langIndex === 2 &&
                            <div className={"flex flex-col fadein-animate"} lang={'mr'}>
                                <span className={"text-7xl font-bold"}>औरंगाबाद</span>
                                <span className={"text-5xl font-normal word-spacing-wide mt-4 m-1"}>मध्ये आपले स्वागत आहे</span>
                            </div>
                        }
                        {/*welcome greeting ends*/}
                        <div>
                            <span className={"font-Poppins m-4 text-xl text-center lg:text-left block"}>Aurangabad Smart City presents Smart Scan</span>
                            <div className={"p-4 flex items-center mb-4"}>
                                <div className={"border rounded-xl p-4 mr-4"}>
                                    <UilQrcodeScan size={'24px'}/>
                                </div>
                                <span className={"text-xl"}>Scan QR to listen to the <br/>glorious history of Aurangabad</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*hero section ends*/}
                <Outlet />
            </div>


        </div>
    );
}

export default App;
