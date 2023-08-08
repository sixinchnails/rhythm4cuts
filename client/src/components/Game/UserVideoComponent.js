import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

export default class UserVideoComponent extends Component {

getNicknameTag() {

    if (this.props.streamManager && this.props.streamManager.connection && this.props.streamManager.connection.data) {
        try {
            return JSON.parse(this.props.streamManager.connection.data).clientData;
        } catch (error) {
            console.error('Error parsing connection data:', error);
        }
    }
    return "Nickname Unavailable";
}

render() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            {this.props.streamManager !== undefined ? (
                <div className="streamcomponent" style={{ width: "100%", height: "100%" }}>
                    <OpenViduVideoComponent streamManager={this.props.streamManager} />
                    <div>
                        <p>{this.getNicknameTag()}</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
}