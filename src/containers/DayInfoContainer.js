import React, { Component } from 'react';
import DayInfo from "../Components/DayInfo";

class DayInfoContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={this.props.showHide}>
                <DayInfo />
            </div>
        )
    }
}

export default DayInfoContainer;