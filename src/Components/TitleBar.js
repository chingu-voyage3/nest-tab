import React from 'react';
import '../styles/TitleBar.css'

function TitleBar(props) {
    return(
        <div className="title-bar">
            <p className="input-button" onClick={props.toggleInput} title="Add item">
                <i class="material-icons">add</i>
            </p>
            <h3>{props.title}</h3>
            <p className="filter-button" onClick={props.toggleFilter} title="Filter List">
                <i class="material-icons">filter_list</i>
            </p>
        </div>
    )
}

export default TitleBar;