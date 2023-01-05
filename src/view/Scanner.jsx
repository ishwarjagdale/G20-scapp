import React from "react";
import QrReader from "react-web-qr-reader";

class Scanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // navigator.permissions.query({name: "camera"}).then(r => console.log(""));
    }

    render() {
        return (
            <>
                <div className={"flex absolute bg-white md:bg-transparent max-w-md flex-col w-full h-full overflow-hidden top-0 md:relative"}>
                    <QrReader
                        delay={500}
                        onScan={() => {}}
                        onError={() => {}}
                    />
                </div>
            </>
        );
    }

}

export default Scanner;
