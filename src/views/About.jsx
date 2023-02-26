import Navigation from "../components/Navigation";

function About() {
    return (
        <div className={"h-full w-full flex flex-col items-start"}>
            <Navigation />
            <div className={"flex flex-col lg:flex-row w-full h-full justify-start lg:justify-center items-start relative overflow-hidden"}>
                <div className={"py-8 lg:py-24 p-4 font-Poppins text-left lg:text-justify overflow-y-scroll max-w-screen-lg"}>
                    <span className={"break-words"}>
                        This software was developed by <b>Aurangabad Smart City Development Corporation Limited</b> with the help of students from the <b>Deogiri Institute of Engineering and Management Studies, Aurangabad</b>.<br/><br/>
                        This web application is named Smart Scan and has all the information in the text as well as audio regarding the gates and monuments which provides a cultural heritage to our city.
                        <br/><br/>Aurangabad Smart City appreciates the huge help from
                        <br/><b className={'my-1 block'}>The Archaeological Survey of India,
                        <br/>The State Archaeological Survey of Maharashtra,
                        <br/>The Indian National Trust for Art and Cultural Heritage (INTACH),
                        <br/>and Author Dr. Dulari Qureshi</b> with her book "The Glorious Aurangabad"
                        <br/>for providing all the information regarding the Gates and Monuments of The City.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About;
