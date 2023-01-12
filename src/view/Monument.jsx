import React from "react";
import {
    UilAngleLeft,
    UilAngleRight,
    UilMultiply
} from "@iconscout/react-unicons";
import FallBackImage from "./../images/fallback.png";
import {getMonument} from "../api/home";

class Monument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
            paras: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Purus non enim praesent elementum facilisis leo vel fringilla. Sed vulputate mi sit amet mauris. Ac turpis egestas maecenas pharetra convallis posuere morbi. Nam at lectus urna duis convallis convallis tellus id. Nunc sed id semper risus in. Ornare lectus sit amet est. Nunc sed augue lacus viverra vitae congue eu. Tristique et egestas quis ipsum suspendisse. Est sit amet facilisis magna etiam tempor orci eu. Tempor commodo ullamcorper a lacus vestibulum. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Mauris a diam maecenas sed enim ut sem viverra aliquet. At tellus at urna condimentum mattis. Amet volutpat consequat mauris nunc congue nisi"
                ,
                "Leo urna molestie at elementum eu facilisis sed. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Ornare aenean euismod elementum nisi quis eleifend. Cras semper auctor neque vitae tempus quam. Pellentesque dignissim enim sit amet venenatis urna cursus. Enim sit amet venenatis urna cursus. Et tortor at risus viverra adipiscing at. Metus dictum at tempor commodo. Mi bibendum neque egestas congue quisque egestas diam. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Malesuada bibendum arcu vitae elementum. Sed adipiscing diam donec adipiscing tristique risus nec. Vitae ultricies leo integer malesuada nunc vel risus. Tellus rutrum tellus pellentesque eu tincidunt. Et magnis dis parturient montes nascetur. Eu tincidunt tortor aliquam nulla facilisi cras"
                ,
                "At tempor commodo ullamcorper a lacus. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Viverra suspendisse potenti nullam ac tortor vitae. Sed enim ut sem viverra aliquet eget sit. At auctor urna nunc id. Sit amet porttitor eget dolor morbi non. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Tortor vitae purus faucibus ornare suspendisse. In hendrerit gravida rutrum quisque non."
                ,
                "Enim ut sem viverra aliquet eget. At risus viverra adipiscing at in. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Urna neque viverra justo nec. Magna eget est lorem ipsum. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero. Vestibulum lectus mauris ultrices eros in. Lacus viverra vitae congue eu. Imperdiet nulla malesuada pellentesque elit. Curabitur gravida arcu ac tortor dignissim convallis aenean."
                ,
                "Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Aliquam etiam erat velit scelerisque in dictum non. Enim blandit volutpat maecenas volutpat blandit aliquam. Vivamus arcu felis bibendum ut tristique et egestas quis. Duis at consectetur lorem donec massa sapien faucibus et molestie. Cursus vitae congue mauris rhoncus aenean vel. Ipsum suspendisse ultrices gravida dictum fusce ut. Diam phasellus vestibulum lorem sed."
            ]
        };
    }

    componentDidMount() {
        getMonument(this.props.data, true).then((res) => {
            if(res.status === 200) {
                this.setState({...res.data.response});
            }
        })
    }

    render() {
        if(this.state.name)
        return (
            <>
                <div className={"flex flex-col bg-white md:bg-transparent md:max-w-md lg:max-w-xl flex-col w-full h-full overflow-hidden fixed top-0 md:relative"}>
                    <div className={"flex border-b z-10 items-center justify-between w-full p-6"}>
                        <div className={"font-Poppins w-full flex justify-end items-center"}>
                            <button onClick={this.props.close} className={"rounded-full bg-white p-2"}><UilMultiply size={'24px'}/></button>
                        </div>
                    </div>
                    <div className={"flex flex-col w-full h-full overflow-y-scroll pt-2"}>
                        <img src={this.state.images[this.state.imageIndex] || FallBackImage} alt={this.state.name} className={"w-full object-cover md:rounded-2xl max-h-[200px]"} onError={(e) => e.target.src = FallBackImage} />
                        <div className={"flex items-center justify-center h-[20px] m-2"}>
                            {
                                this.state.images.length ?
                                    <>
                                        <button onClick={() => {this.setState({imageIndex: Math.max(0, this.state.imageIndex - 1)})}} className={"rounded-full mr-2"}>
                                            <UilAngleLeft size={'24px'} />
                                        </button>
                                        {
                                            [Array(this.state.images.length).fill(0).map((k, i) => {
                                                if(i === 0)
                                                    return <span key={i.toString()} className={"line ml-1"} />
                                                return <span key={i.toString()} className={"dot ml-1"} />
                                            })]
                                        }
                                        <button onClick={() => {this.setState({imageIndex: Math.min(this.state.images.length - 1, this.state.imageIndex + 1)})}} className={"rounded-full ml-2"}>
                                            <UilAngleRight size={'24px'} />
                                        </button>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>
                        <div className={"flex flex-col w-full pt-2 px-4 md:px-2"}>
                            <span className={"font-[600] pb-4 text-xl font-Poppins"}>{this.state.name}</span>
                            {/*{*/}
                            {/*    this.state.paras.map((para) =>*/}
                            {/*    <p className={"pb-4 text-justify font-Merriweather text-sm leading-7"}>*/}
                            {/*        {para}*/}
                            {/*    </p>*/}
                            {/*    )*/}
                            {/*}*/}
                                <p className={"pb-4 text-justify font-Merriweather text-sm leading-7"}>
                                    {this.state.description}
                                </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default Monument;
