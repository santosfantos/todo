import {createContext, FC, useState} from 'react';
import Todo, {Priority} from '../models/todo';
import {sortBy} from 'lodash';

type TodosContextObj = {
    items: Todo[];
    error: string | null;
    isLoading: boolean;
    addTodo: (text: string, priority: Priority) => void;
    removeTodo: (id: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setItems: (todos: Todo[]) => void;
};

export const TodosContext = createContext<TodosContextObj>(
    {
        items:        [],
        error:        null,
        isLoading:    false,
        addTodo:      (text: string, priority: Priority) => {
        },
        removeTodo:   (id: string) => {
        },
        setIsLoading: (loading: boolean) => {
        },
        setError:     (error: string | null) => {
        },
        setItems:     (todos: Todo[]) => {
        }
    });

const TodosContextProvider: FC = (props) => {
    const [todos, setTodos]         = useState<Todo[]>([]);
    const [error, setError]         = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addTodoHandler = (todoText: string, priority: Priority) => {
        const newTodo = new Todo(todoText, priority);

        setTodos((prevTodos) => {
            let retVal = sortTodos(prevTodos.concat(newTodo));

            return retVal;
        });
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id);
        });
    };

    const setIsLoadingHandler = (loading: boolean) => {
        setIsLoading((prevState) => {
            return loading;
        });
    };

    const setErrorHandler = (error: string | null) => {
        setError((prevState) => {
            return error;
        });
    };

    const setItemsHandler = (todos: Todo[]) => {
        setTodos((prevState) => {
            let retVal = sortTodos(todos);

            return retVal;
        });
    };

    const contextValue: TodosContextObj = {
        items:        todos,
        error:        error,
        isLoading:    isLoading,
        addTodo:      addTodoHandler,
        removeTodo:   removeTodoHandler,
        setIsLoading: setIsLoadingHandler,
        setError:     setErrorHandler,
        setItems:     setItemsHandler
    }

    return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>
}

const sortTodos = (data: Todo[]) => {
    let retVal = sortBy(data, (element: Todo) => {
        const rank = {
            [Priority.Low]:    2,
            [Priority.Medium]: 1,
            [Priority.High]:   0
        };

        return rank[element.priority];
    });

    return retVal;
}

export default TodosContextProvider;
