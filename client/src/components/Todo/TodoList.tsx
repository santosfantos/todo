import React, {FC, useCallback, useContext, useEffect} from 'react';

import classes from './TodoList.module.css';

import TodoItem from './TodoItem';
import {TodosContext} from '../../store/todos-context';
import api from '../../api/api';

const TodoList: FC = () => {
    const {items, setItems, isLoading, setIsLoading, error, setError} = useContext(TodosContext);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await api.getTodos();
            setItems(response.data);
        }
        catch(error) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <section className={classes.todos}>
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && items.length > 0 && <ul>{items.map(
                item => <TodoItem key={item.id} todo={item}></TodoItem>)}</ul>}
            {!isLoading && !error && items.length === 0 && <p>Empty List</p>}
            {isLoading && <p>Loading...</p>}
        </section>
    )
}

export default TodoList;
