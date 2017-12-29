import React, { Component } from 'react';

function ShelfInput(props) {
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

function ShelfList(props) {
    return(
        <div className="shelfList">
            <ul>
                {props.shelfList.map(item =>
                    <li><a href={item.url} target="_blank">
                        {item.url}
                    </a></li>
                )}
            </ul>
        </div>
    );
}

class Shelf extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('shelfList') == null) {
            localStorage.setItem('shelfList', JSON.stringify([]));
        }

        this.state = {
            inputUrl: "",
            shelfList: JSON.parse(localStorage['shelfList'])
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputUrl: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = {
            url: this.state.inputUrl,
            title: null,
            icon: null,
            checked: false
        }
        this.setState({
            shelfList: this.state.shelfList.concat(item),
            inputUrl: ""
        });
    }

    componentDidUpdate() {
        localStorage.setItem("shelfList", JSON.stringify(this.state.shelfList));
    }

    render() {
        return(
            <div className="shelf">
                <ShelfInput value={this.state.inputUrl} handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
                <ShelfList shelfList={this.state.shelfList} />
            </div>
        );
    }
}

export default Shelf;