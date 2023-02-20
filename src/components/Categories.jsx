import {useEffect, useState} from "react";
import {getCategories} from "../api/home";
import FallbackImage from "../images/fallback.png";
import {Link} from "react-router-dom";

function Categories() {

    const [cats, setCats] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {
            if(res.status === 200) {
                setCats(res.data.response);
            }
        })
    }, [])

    if(cats)
    return Object.keys(cats).map((c, i) => {
        if(cats[c].length)
        return <div key={i}>
            <div className={"flex items-center mx-2 mb-4 justify-between"}>
                <Link to={`/category/${c.replaceAll(' ', '-').toLowerCase()}`} className={"font-[600] font-Poppins text-sm"}>{c}</Link>
                <Link to={`/category/${c.replaceAll(' ', '-').toLowerCase()}`} className={"ml-4 text-xs font-Poppins"}>View all</Link>
            </div>
            <div className={"overflow-x-scroll mb-8 flex"}>
                {
                    cats[c].map((k, j) => {
                        return <div key={j} className={"flex flex-col justify-start mr-2 relative"}>
                            <Link to={`/monument/${k.id}`}><img src={k.images[0]} onError={(e) => e.target.src = FallbackImage} className={"min-h-[150px] max-h-[150px] min-w-[300px] min-w-[300px] rounded-xl object-cover object-top"}  alt={""}/></Link>
                            <Link to={`/monument/${k.id}`} className={"font-[500] w-fit font-Poppins p-2 text-sm"}>{k.name}</Link>
                        </div>
                    })
                }
            </div>
        </div>
        return <></>
    })

    return <>
        <div className={"flex items-center mx-2 mb-4 justify-between"}>
            <span className={"font-[600] bg-[#e4e4e4] w-[200px] font-Poppins text-sm p-2"}/>
        </div>
        <div className={"overflow-x-scroll mb-8 flex"}>
            <div className={"flex flex-col justify-end mr-2 relative"}>
                <div className={"bg-[#e4e4e4] min-h-[150px] max-h-[150px] min-w-[300px] min-w-[300px] rounded-xl object-cover object-top"}/>
                <span className={"font-[500] w-fit font-Poppins p-2 text-sm"}/>
            </div>
            <div className={"flex flex-col justify-end mr-2 relative"}>
                <div className={"bg-[#e4e4e4] min-h-[150px] max-h-[150px] min-w-[300px] min-w-[300px] rounded-xl object-cover object-top"}/>
                <span className={"font-[500] w-fit font-Poppins p-2 text-sm"}/>
            </div>
        </div>
    </>
}

export default Categories;
