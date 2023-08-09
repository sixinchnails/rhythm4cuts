import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

export default class UserVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    async componentDidMount() {
        await this.getMediaStream(); // 웹캠 스트림 가져오기
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

    getNicknameTag() {
        const { streamManager } = this.props;
        if (streamManager && streamManager.stream) {
            return JSON.parse(streamManager.stream.connection.data).clientData;
        }
        return "";
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div className="streamcomponent">
                    <OpenViduVideoComponent
                        streamManager={this.props.streamManager}
                        videoRef={this.videoRef}
                    />
                    <div>
                        <p>{this.getNicknameTag()}</p>
                    </div>
                </div>
            </div>
        );
    }
}