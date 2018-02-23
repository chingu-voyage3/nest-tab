import React from 'react';
import "../styles/AppViewer.css";

//Brings/Removes the chosen app in view
function AppViewer(props) {
    const backgroundColor = {backgroundColor: props.app.color};
    return(
        <div className={props.shouldView ? "appContainer active" : "appContainer"} style={backgroundColor}>
            {props.shouldView && props.app.component}
        </div>
    );
}

export default AppViewer;