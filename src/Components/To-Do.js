import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Scrollbars } from 'react-custom-scrollbars';
import TitleBar from './TitleBar';
import FilterSwitches from './FilterSwitches';

class TaskDetails extends Component {
  render() {
    const hour = Math.trunc(this.props.todoItem.workTime/60);
    const minute = this.props.todoItem.workTime%60;
    const workStat = hour == 0 ? "Worked "+minute+" minutes on this task."
          : "Worked "+hour+" hour and "+minute+" minutes on this task."
    return(
      <div className="taskDetails" id={"taskDetails" + this.props.todoItem.id}>
        <textarea onChange={this.props.handleDescription(this.props.todoItem.id)} placeholder="Write some details..."
        value={this.props.todoItem.description}>
        </textarea>
        <p>
          {!this.props.todoItem.workTime 
          ? "You haven't logged any time working on this."
          : workStat}
        </p>
        <p className="remove" onClick={this.props.removeTask(this.props.todoItem.id)}>
          <span><i className="material-icons">delete</i></span> Delete this task
        </p>
      </div>
    );
  }
}

function InputForm(props) {
  return(
      <Fade view={props.view}>
        <form onSubmit={props.handleSubmit}>
          <input type="text" onChange={props.handleChange} value={props.stateValue} />
          <button>Add To-Do</button>
        </form>
      </Fade>
  )
}

function Fade(props) {
  return(
    <CSSTransition in={props.view} timeout={1000} classNames="fade">
      {props.children}
    </CSSTransition>
  )
}

function TodoList(props) {
  let list = props.todoList;

  if (props.filter == "undone") {
    list = list.filter(item => !item.isDone)
  } else if (props.filter == "done") {
    list = list.filter(item => item.isDone)
  }

  return(
    <ul>
      <TransitionGroup>
        {list.map((item, index) => 
        <CSSTransition key={item.id} timeout={300} classNames="fade">
          <div className="itemContainer">
            <li key={item.id} id={item.id}>
              <span onClick={props.markDone(item.id)} className={"status " + (item.isDone ? "done" : "")}>
                <i onClick={props.markDone(item.id)} className="material-icons">check_circle</i>
              </span>
                {item.title}
              <span className="expandTask" onClick={props.expandTask(item.id)}>
                <i className="material-icons">expand_more</i>
              </span>
            </li>
            <TaskDetails todoItem={item} handleDescription={props.handleDescription} removeTask={props.removeTask}/>
          </div>
        </CSSTransition>)}
      </TransitionGroup>
    </ul>
  );
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('todos') == null) {
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
    const currentItem = {
      id: this.state.todoList.length + 1,
      title: this.state.value,
      isDone: false,
      description: '',
      workTime: 0
    };

    if(this.state.value != '') {
      this.setState({
        todoList: this.state.todoList.concat(currentItem),
        value: ''
      });
    }    
  }

  markDone = param => event => {
    const newList = this.state.todoList.map( item => {
      if (item.id == param) {
        return Object.assign({}, item, {isDone: !item.isDone});
      }
      return item;
    });

    this.setState({
      todoList: newList
    });
  }

  removeTask = param => event => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(
        item => item.id != param
      )
    });
  }

  expandTask = param => event => {
    const ele = "taskDetails" + param;
    document.getElementById(ele).classList.toggle("expanded");
    event.target.classList.toggle("selected");
  }

  handleDescription = param => event => {
    const {todoList} = this.state;
    this.setState({
      todoList: todoList.map(
        item => (
          item.id == param ? Object.assign({}, item, {description: event.target.value})
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
    event.target.classList.toggle("active");
    this.setState({
      toggleInput: !this.state.toggleInput
    })
  }

  toggleFilter(event) {
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
        {/* <CSSTransitionGroup transitionName="watch-tower" transitionEnterTimeout={1000} */}
        {/* // transitionLeaveTimeout={1000}> */}
          <TitleBar title="ToDo List" toggleInput={this.toggleInput} toggleFilter={this.toggleFilter}/>
          {this.state.toggleInput && <InputForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} stateValue={this.state.value} view={this.state.toggleInput}/>}
          {this.state.toggleFilter && <FilterSwitches filterList={this.filterList}/>}
          <TodoList todoList={this.state.todoList} filter={this.state.filter} markDone={this.markDone}
          removeTask={this.removeTask} expandTask={this.expandTask}
          handleDescription={this.handleDescription}/>
          {/* </CSSTransitionGroup> */}
        </div>
      </Scrollbars>
    );
  }
}

export default TodoApp;