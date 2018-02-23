import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TitleBar from '../Components/TitleBar';
import FilterSwitches from '../Components/FilterSwitches';
import { InputForm } from '../Components/To-Do';
import { TodoList } from '../Components/To-Do';
import "../styles/ToDo.css";

class TodoAppContainer extends Component {
    constructor(props) {
      super(props);
      if (localStorage.getItem('todos') == null) {
        //Creates local storage entry if it doesn't exists already
        localStorage.setItem('todos', JSON.stringify([]));
      }
  
      this.state = {
        value: '',
        todoList: JSON.parse(localStorage['todos']),
        filter: "undone",
        toggleInput: false,
        toggleFilter: false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeTask = this.removeTask.bind(this);
      this.markDone = this.markDone.bind(this);
      this.expandTask = this.expandTask.bind(this);
      this.filterList = this.filterList.bind(this);
      this.toggleInput = this.toggleInput.bind(this);
      this.toggleFilter = this.toggleFilter.bind(this);
      
    }
  
    handleChange(event) {
      this.setState({
        value: event.target.value
      });  
    }
  
    handleSubmit(event) {
      event.preventDefault();

      //Constructs object for a new item
      const currentItem = {
        id: this.state.todoList.length + 1,
        title: this.state.value,
        isDone: false,
        description: '',
        workTime: 0
      };
  
      if(this.state.value !== '') {
        this.setState({
          todoList: this.state.todoList.concat(currentItem),
          value: ''
        });
      }    
    }
  
    markDone = param => event => {
      const newList = this.state.todoList.map( item => {
        if (item.id === param) {
          return Object.assign({}, item, {isDone: !item.isDone});
        }
        return item;
      });
  
      this.setState({
        todoList: newList
      });
    }
  
    removeTask = param => event => {
      //Deletes a specified item
      const { todoList } = this.state;
      this.setState({
        todoList: todoList.filter(
          item => item.id !== param
        )
      });
    }
  
    expandTask = param => event => {
      //Opens up the details of a todo item
      const ele = "taskDetails" + param;
      document.getElementById(ele).classList.toggle("expanded");
      event.target.classList.toggle("selected");
    }
  
    handleDescription = param => event => {
      const {todoList} = this.state;
      this.setState({
        todoList: todoList.map(
          item => (
            item.id === param ? Object.assign({}, item, {description: event.target.value})
          : item ) 
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
      //Shows/hides the filer buttons
      event.target.classList.toggle("active");
      this.setState({
        toggleFilter: !this.state.toggleFilter
      })
    }
  
    componentDidUpdate() {
      localStorage.setItem('todos', JSON.stringify(this.state.todoList));
    }
  
    render() {
      return(
        <Scrollbars style={{width: 450, height: 400}}> 
          <div className="todo-box">
            <TitleBar title="ToDo List" toggleInput={this.toggleInput} toggleFilter={this.toggleFilter}/>
            {this.state.toggleInput && <InputForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} stateValue={this.state.value}/>}
            {this.state.toggleFilter && <FilterSwitches filterList={this.filterList}/>}
            <TodoList todoList={this.state.todoList} filter={this.state.filter} markDone={this.markDone}
            removeTask={this.removeTask} expandTask={this.expandTask}
            handleDescription={this.handleDescription} toggleInput={this.toggleInput}/>
          </div>
        </Scrollbars>
      );
    }
}

export default TodoAppContainer;