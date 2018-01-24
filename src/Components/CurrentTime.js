import React, { Component } from 'react';
import { formatTime } from "../utils/formatTime";

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
        return <div ClassName="time">{this.state.time}</div>
    }
}

export default CurrentTime;