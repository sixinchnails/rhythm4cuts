import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.streamManager && this.props.streamManager !== prevProps.streamManager) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props.streamManager && this.props.streamManager.addVideoElement) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        } else {
            console.error('Error: addVideoElement method not found in streamManager');
        }
    }


    render() {
        return <video autoPlay={true} ref={this.videoRef} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />;
    }
}