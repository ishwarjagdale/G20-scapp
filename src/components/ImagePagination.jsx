import {UilAngleLeft, UilAngleRight} from "@iconscout/react-unicons";

function ImagePagination({k, length, current, setCurrent}) {
    return (
        <div key={k} className={"flex h-fit m-2 justify-center items-center"}>
            {
                length > 1 && <>
                    <button className={"p-1"} onClick={() => setCurrent(Math.max(0, current - 1))}>
                        <UilAngleLeft size={"24px"} />
                    </button>
                    {
                        Array(length).fill(0).map((i, j) => {
                            if(j === current) {
                                return <span key={j} className={`line ${j === length - 1 ? '' : 'mr-1'}`} />
                            } else
                                return <span key={j} className={`dot ${j === length - 1 ? '' : 'mr-1'}`} />
                        })
                    }
                    <button className={"p-1"} onClick={() => setCurrent(Math.min(current + 1, length - 1))}>
                        <UilAngleRight size={"24px"} />
                    </button>
                </>
            }
        </div>
    )
}

export default ImagePagination;
