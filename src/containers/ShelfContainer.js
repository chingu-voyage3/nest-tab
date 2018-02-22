import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TitleBar from '../Components/TitleBar';
import FilterSwitches from '../Components/FilterSwitches';
import { ShelfInput } from '../Components/Shelf';
import { ShelfList } from '../Components/Shelf';
import "../styles/Shelf.css";
const urlMetadata = require('url-metadata');

class ShelfContainer extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('shelfList') == null) {
            //Creates local storage entry if it doesn't exists already
            localStorage.setItem('shelfList', JSON.stringify([]));
        }

        this.state = {
            inputUrl: "",
            shelfList: JSON.parse(localStorage['shelfList']),
            filter: "undone",
            showInput: false,
            showFilter: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.markChecked = this.markChecked.bind(this);
        this.updateMeta = this.updateMeta.bind(this);
        this.filterList = this.filterList.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputUrl: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        //Constructs object for a new item
        const item = {
            id: this.state.shelfList.length + 1,
            checked: false,
            url: this.state.inputUrl.startsWith("http") ? this.state.inputUrl : "http://"+this.state.inputUrl,
            title: null,
            description: null,
            icon: null
        }

        urlMetadata("https://cors-anywhere.herokuapp.com/"+this.state.inputUrl).then(
            (metadata) => {
                //Updates the item object when meta is available
                const itemWithMeta = Object.assign({}, item, {
                    title: metadata.title,
                    description: metadata.description,
                    icon: metadata.image
                });
                this.updateMeta(itemWithMeta);
            },
            function(error) {
                console.log(error);
            }
        );

        if (this.state.inputUrl !== "") {
            this.setState({
                shelfList: this.state.shelfList.concat(item),
                inputUrl: ""
            });
        }
    }

    updateMeta(meta) {
        this.setState({
            shelfList: this.state.shelfList.map(
                item => item.id === meta.id ? meta : item
            )
        })
    }

    markChecked = param => event => {
        const { shelfList } = this.state;

        this.setState({
            shelfList: shelfList.map(
                item => item.id === param
                ? Object.assign({}, item, {checked: !item.checked}) : item
            )
        });
    }

    filterList(event) {
        event.preventDefault();

        //Adding/removing class for highlighting
        document.querySelector("a.active").classList.remove("active");
        event.target.classList.add("active");

        this.setState({
            filter: event.target.name
        })
    }

    toggleInput(event) {
        //Shows/hides the input box
        event.target.classList.toggle("active");
        this.setState({
            toggleInput: !this.state.toggleInput
        })
    }

    toggleFilter(event) {
        //Shows/hides the filter buttons
        event.target.classList.toggle("active");
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    componentDidUpdate() {
        localStorage.setItem("shelfList", JSON.stringify(this.state.shelfList));
        // localStorage.removeItem("shelfList"); --For clearing all data in dev!!
    }

    render() {
        return(
            <Scrollbars style={{width: 450, height: 400}}>
                <div className="shelf">
                    <TitleBar title="Shelf" toggleInput={this.toggleInput} toggleFilter ={this.toggleFilter}/>
                    {this.state.toggleInput && <ShelfInput value={this.state.inputUrl} handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />}
                    {this.state.showFilter && <FilterSwitches filterList={this.filterList}/>}
                    <ShelfList shelfList={this.state.shelfList} markChecked={this.markChecked} filter={this.state.filter}/>
                </div>
            </Scrollbars>
        );
    }
}

export default ShelfContainer;