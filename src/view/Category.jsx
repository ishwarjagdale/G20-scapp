import React from "react";
import {getCategory} from "../api/home";
import {UilSpinner} from "@iconscout/react-unicons";
import withRouter from "../components/withRouter";
import Cats from "../components/Cats";


class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.params.category,
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        getCategory(this.state.category).then((res) => {
            if(res.status === 200) {
                this.setState({data: res.data.response, loaded: true})
            }
        })
    }

    render() {
        return (
            <>
                <div className={"h-fit overflow-y-scroll pb-20"}>
                    <div className={"p-4 font-Poppins"}>
                        <span className={"font-[600] text-lg pb-6 block capitalize"}>{this.state.category.replaceAll('-', ' ')}</span>
                        {
                            this.state.loaded ?
                                this.state.data.length ?
                                    this.state.data.map((p, i) =>
                                        <Cats key={p.id} p={p} length={this.state.data.length} i={i} />
                                    )
                                    :
                                    <></>
                                :
                                <span className={"w-full flex justify-center animate-spin"}><UilSpinner size={'20px'} /></span>
                        }
                    </div>
                </div>
            </>
        );
    }

}


export default withRouter(Category);
