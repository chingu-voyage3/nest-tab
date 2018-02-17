import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export function TaskDetails(props) {
    const hour = Math.trunc(props.todoItem.workTime/60);
    const minute = props.todoItem.workTime%60;
    const workStat = hour === 0 ? "Worked "+minute+" minutes on this task."
          : "Worked "+hour+" hour and "+minute+" minutes on this task."

    return(
      <div className="taskDetails" id={"taskDetails" + props.todoItem.id}>
        <textarea onChange={props.handleDescription(props.todoItem.id)} placeholder="Write some details..."
        value={props.todoItem.description}>
        </textarea>
        <p>
          {!props.todoItem.workTime 
          ? "You haven't logged any time working on this."
          : workStat}
        </p>
        <p className="remove" onClick={props.removeTask(props.todoItem.id)}>
          <span><i className="material-icons">delete</i></span> Delete this task
        </p>
      </div>
    );
}

export function InputForm(props) {
  return(
        <form onSubmit={props.handleSubmit}>
          <input type="text" onChange={props.handleChange} value={props.stateValue} />
          <button>Add To-Do</button>
        </form>
  )
}

export function TodoList(props) {
  let list = props.todoList;

  if (props.filter === "undone") {
    list = list.filter(item => !item.isDone)
  } else if (props.filter === "done") {
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

export default TodoList;