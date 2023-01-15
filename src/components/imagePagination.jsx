import React from "react";
import {UilAngleLeft, UilAngleRight} from "@iconscout/react-unicons";

class ImagePagination extends React.Component {
    render() {
        return (
            <div className={"flex items-center justify-center h-[20px] m-2"}>
                {
                    this.props.length > 1 ?
                        <>
                            <button onClick={() => this.props.handleIndex(Math.max(0, this.props.imageIndex - 1))} className={"rounded-full mr-2"}>
                                <UilAngleLeft size={'24px'} />
                            </button>
                            {
                                [Array(this.props.length).fill(0).map((k, i) => {
                                    if(i === this.props.imageIndex)
                                        return <span key={i.toString()} className={"line ml-1"} />
                                    return <span key={i.toString()} className={"dot ml-1"} />
                                })]
                            }
                            <button onClick={() => this.props.handleIndex(Math.min(this.props.length - 1, this.props.imageIndex + 1))} className={"rounded-full ml-2"}>
                                <UilAngleRight size={'24px'} />
                            </button>
                        </>
                        :
                        <>
                        </>
                }
            </div>
        );
    }
}


export default ImagePagination;
