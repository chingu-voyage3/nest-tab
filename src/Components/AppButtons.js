import React, { Component} from 'react';
import icon from "../assets/icons/icon.png";

function AppButtons(props) {
    return(
        <div className="appButtons">
            <ul>
                {props.listOfApps.map(item => 
                    <li name={item.app}>
                        <img src={icon} alt="Click to Open/Close app"/>
                        <p>{item.title}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AppButtons;