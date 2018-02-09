import React from 'react';
import "../styles/SetUserName.css";

function SetUserName(props) {
    return(
        <div className="askName">
            <h1>Hi there! What should I call you? :)</h1>
            <form onSubmit={props.submit}>
                <input type="text" value={props.name} onChange={props.change} />
                <button type="submit"><i className="material-icons">arrow_forward</i></button>
            </form>
        </div>
    )
}

export default SetUserName;