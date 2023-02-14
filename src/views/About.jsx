import Navigation from "../components/Navigation";

function About() {
    return (
        <div className={"h-full w-full flex flex-col items-start"}>
            <Navigation />
            <div className={"flex flex-col lg:flex-row w-full h-full relative overflow-hidden"}>
                {/*hero section*/}
                <div className={"flex h-[300px] lg:h-[98%] flex-1 lg:w-1/2 flex-col m-2 rounded-2xl items-center diems-image"}>
                    <div className={"flex justify-between text-white font-Poppins flex-col h-full rounded-2xl w-full full-grad"} />
                </div>
                {/*hero section ends*/}
                <div className={"flex overflow-scroll m-2 ml-2 lg:ml-0 lg:w-1/2 relative "}>
                    <div className={"pb-24 p-2 lg:pb-0 font-Poppins text-justify"}>
                        <span>Smart Scan is developed by students of <b>Deogiri Institute of Engineering and Management Studies</b></span>
                        <span><br/>for the tourism of Aurangabad Smart City.</span><br/><br/>
                        <span>This application was developed by Computer Science Department, under the guidance of
                            <ul className={"lg:p-2 py-2 pb-4 lg:ml-4"}>
                                <li className={"pb-1 font-[600]"}>Director Dr. Ulhas Shiurkar</li>
                                <li className={"pb-1 font-[600]"}>HOD CSE - Mr. Kalyankar S. B</li>
                                <li className={"pb-1 font-[600]"}>HOD Civil - Dr.G.R.Gandhe</li>
                                <li className={"pb-1 font-[600]"}>Prof. Rahat Khan</li>
                                <li className={"pb-1 font-[600]"}>Prof. Prachi Joshi</li>
                            </ul>
                        </span>
                        <span>The members of the team involved in the development of Smart Scan are as follows:</span><br/>
                        <div className={"lg:p-2 py-2 lg:ml-4"}>
                            <span className={"font-[600]"}>Lead Developers</span>
                            <ul className={"pb-2"}>
                                <li className={""}>Ishwar Jagdale</li>
                            </ul>
                            <span className={"block mt-2 font-[600]"}>Backend Developers</span>
                            <ul className={"pb-2"}>
                                <li className={""}>Suraj Shelke</li>
                                <li className={""}>Vivek Khadse</li>
                                <li className={""}>Sagar Sankpal</li>
                            </ul>
                            <span className={"block mt-2 font-[600]"}>Server Administrator</span>
                            <ul className={"pb-2"}>
                                <li className={""}>Ganesh Sonawne</li>
                            </ul>
                            <span className={"block mt-2 font-[600]"}>Database and Support</span>
                            <ul className={"pb-2"}>
                                <li className={""}>Pratik Kulkarni</li>
                                <li className={""}>Kunal Pagore</li>
                                <li className={""}>Kalyan Kathar</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default About;
