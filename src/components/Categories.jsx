import {useEffect, useState} from "react";
import {getCategories} from "../api/home";

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
        return <div key={i}>
            <div className={"flex items-center mx-2 mb-4 justify-between"}>
                <span className={"font-[600] font-Poppins text-sm"}>{c}</span>
                <a href={`/category/${c.replaceAll(' ', '-').toLowerCase()}`} className={"ml-4 text-xs font-Poppins"}>View all</a>
            </div>
            <div className={"overflow-x-scroll mb-8 flex"}>
                {
                    cats[c].map((k, j) => {
                        return <div key={j} className={"flex flex-col justify-end mr-2 relative"}>
                            <a href={`/monument/${k.id}`}><img src={k.images[0]} className={"min-h-[150px] max-h-[150px] min-w-[300px] min-w-[300px] rounded-xl object-cover object-top"}  alt={""}/></a>
                            <a href={`/monument/${k.id}`} className={"font-[500] w-fit font-Poppins p-2 text-sm"}>{k.name}</a>
                        </div>
                    })
                }
            </div>
        </div>
    })
}

export default Categories;
