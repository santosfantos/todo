import React from 'react';

import TodoList from './components/Todo/TodoList';
import NewTodo from './components/Todo/NewTodo';
import TodosContextProvider from './store/todos-context';

function App() {
    return (
        <TodosContextProvider>
            <NewTodo/>
            <TodoList/>
        </TodosContextProvider>
    );
}

export default App;
