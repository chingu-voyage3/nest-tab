import React, { Component } from 'react';
import { formatTime } from "../utils/formatTime";
import "../styles/CurrentTime.css";

class CurrentTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: formatTime()
        }
    }

    tick() {
        this.setState({
            time: formatTime()
        });
    }

    componentDidMount() {
        this.tickTick = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.tickTick);
    }

    render() {
        return(
            <div className="time"><p>{this.state.time}</p></div>
        );
    }
}

export default CurrentTime;