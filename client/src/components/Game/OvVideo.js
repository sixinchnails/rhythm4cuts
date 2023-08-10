import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    async getMediaStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            this.videoRef.current.srcObject = stream;
            if (this.props.streamManager.addStream) {
                this.props.streamManager.addStream(stream);
            } else {
                console.error('Error: addStream method not found in streamManager');
            }
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    addStreamToManager() {
        if (
            this.props &&
            !!this.videoRef &&
            this.props.streamManager &&
            this.props.streamManager.addVideoElement
        ) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidUpdate() {
        this.addStreamToManager();
    }

    componentDidMount() {
        this.addStreamToManager();
        this.getMediaStream();
    }

    render() {
        return (
            <video
                autoPlay={true}
                ref={this.videoRef}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} // 스타일을 추가하여 크기 조절
            />
        );
    }
}
