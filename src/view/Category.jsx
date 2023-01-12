import React from "react";
import FallBackImage from "./../images/fallback.png";
import {useOutletContext, useParams} from "react-router-dom";
import {getCategory} from "../api/home";


function Cats({p, length, i}) {

    const select = useOutletContext();

    return <>
        <div key={i} onClick={() => select(p.id)} className={"cursor-pointer"}>
            <img src={p.images[0] || FallBackImage} alt={p.name} className={"w-full flex-1 h-[150px] border rounded-xl object-cover"} onError={(e) => e.target.src = FallBackImage} />
            <div className={"flex items-center justify-between font-Poppins text-sm my-2"}>
                <div className={"flex items-center"}>
                    <span className={"font-medium"}>{p.name}</span>
                </div>
            </div>
        </div>
        {
            length - 1 !== i && <div key={i + 'b'} className={"pb-2"} />
        }
    </>
}

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.params.category,
            data: []
        };
    }

    componentDidMount() {
        getCategory(this.state.category).then((res) => {
            if(res.status === 200) {
                this.setState({data: res.data.response})
            }
        })
    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block capitalize"}>{this.state.category.replaceAll('-', ' ')}</span>
                        {
                            this.state.data.map((p, i) =>
                                <Cats p={p} length={this.state.data.length} i={i} />
                            )
                        }
                    </div>
                </div>
            </>
        );
    }

}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    )

}

export default withRouter(Category);
export {Cats};
