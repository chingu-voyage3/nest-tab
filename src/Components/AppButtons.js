import React from 'react';

import "../styles/AppButtons.css";

function AppButtons(props) {
    return(
        <div className="appButtons">
            <ul>
                {props.listOfApps.map((item, index) => 
                    <li id={item.app} onClick={props.handleClick(item)} key={index} title="Click to open/close app">
                        <a href="#">
                            <img src={item.icon} alt="Click to Open/Close app"/>
                            {item.title}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AppButtons;