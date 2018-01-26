import React from 'react';
import icon from "../assets/icons/icon.png";
import "../styles/AppButtons.css";

function AppButtons(props) {
    return(
        <div className="appButtons">
            <ul>
                {props.listOfApps.map((item, index) => 
                    <li id={item.app} onClick={props.handleClick(item)} key={index}>
                        <img src={icon} alt="Click to Open/Close app"/>
                        <p>{item.title}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AppButtons;