import React, { Component } from 'react';
const metaInspector = require('node-metainspector');

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
                    <li key={item.id}><a href={item.url} target="_blank">
                        {item.url}
                        </a>
                        <i onClick={props.removeItem(item.id)} className="material-icons">delete</i>
                    </li>
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
        this.removeItem = this.removeItem.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputUrl: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const meta = new metaInspector('https://cors-anywhere.herokuapp.com/'+this.state.inputUrl);
        meta.on("fetch", function() {
            console.log(meta.title);
            console.log(meta.description);
            console.log(meta.image);
        });
        meta.on("error", function(err) {
            console.log(err);
        });
        const item = {
            id: this.state.shelfList.length + 1,
            url: this.state.inputUrl,
            title: null,
            icon: null,
            checked: false
        }
        this.setState({
            shelfList: this.state.shelfList.concat(item),
            inputUrl: ""
        }, () => meta.fetch());
    }

    removeItem = param => event => {
        const { shelfList } = this.state;

        this.setState({
            shelfList: shelfList.filter(
                item => item.id != param
            )
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
                <ShelfList shelfList={this.state.shelfList} removeItem={this.removeItem}/>
            </div>
        );
    }
}

export default Shelf;