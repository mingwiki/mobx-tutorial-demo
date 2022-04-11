import React from 'react';
import { createRoot } from 'react-dom/client';
import ObservableTodoStore from './store';
import { observable, action } from 'mobx'
import { observer } from "mobx-react-lite";
// import RenderCounter from 'react-render-counter';

const observableTodoStore = new ObservableTodoStore();

const TodoList = observer(({ store }) => {
  const onNewTodo = () => {
    // store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    store.pendingRequests++;
    setTimeout(action(() => {
      store.addTodo('Random Todo ' + Math.random());
      store.pendingRequests--;
    }), 100);
  }

  return (
    <div>
      {store.report}
      <ul>
        {store.todos.map(
          (todo, idx) => <TodoView todo={todo} key={idx} />
        )}
      </ul>
      {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
      <button onClick={onNewTodo}>New Todo</button>
      <small> (double-click a todo to edit)</small>
      {/* <RenderCounter /> */}
    </div>
  );
})

const TodoView = observer(({ todo }) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }

  const onRename = () => {
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  return (
    <li onDoubleClick={onRename}>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={onToggleCompleted}
      />
      {todo.task}
      {todo.assignee
        ? <small>{todo.assignee.name}</small>
        : null
      }
      {/* <RenderCounter /> */}
    </li>
  );
})


let root = createRoot(document.getElementById('reactjs-app'));

root.render(
  <TodoList store={observableTodoStore} />
)