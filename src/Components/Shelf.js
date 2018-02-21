import React from 'react';
import EmptyNotifier from './EmptyNotifier';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export function ShelfInput(props) {
    return(
        <div className="shelfInput">
            <form onSubmit={props.handleSubmit}>
                <input type="text" onChange={props.handleChange}
                value={props.value} placeholder="Paste url here" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export function ShelfList(props) {
    let list = props.shelfList;

    if (props.filter === "undone") {
        list = list.filter(item => !item.checked);
        if (list.length < 1) {
            return(
                <EmptyNotifier/>
            )
        }
    } else if(props.filter === "done") {
        list = list.filter(item => item.checked);
    }

    return(
        <div className="shelfList">
            <ul>
                <TransitionGroup>
                    {list.map((item, index) =>
                        <CSSTransition key={item.id} timeout={300} classNames="swipe">
                            <li key={item.id}>
                                {item.title && <a href={item.url} target="_blank">{item.title}</a>}
                                <a href={item.url} target="_blank" className={item.title ? "url" : "url-unsolved"}>
                                {item.url}
                                </a>
                                <i onClick={props.markChecked(item.id)} className={item.checked ? "material-icons done" : "material-icons"}>check_circle</i>
                                {item.description && <p>{item.description}</p>}
                            </li>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </ul>
        </div>
    );
}