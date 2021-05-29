import {FC, FormEvent, useContext, useRef} from 'react';

import classes from './NewTodo.module.css';

import {TodosContext} from '../../store/todos-context';
import api from '../../api/api';
import Todo, {Priority} from '../../models/todo';
import Button from '../UI/Button';

const NewTodo: FC = () => {
    const {addTodo, setIsLoading, setError} = useContext(TodosContext);
    const textInputRef                      = useRef<HTMLInputElement>(null);
    const prioritySelectRef                 = useRef<HTMLSelectElement>(null);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const enteredText      = textInputRef.current!.value;
        const selectedPriority = prioritySelectRef.current!.value as Priority;

        if(enteredText.trim().length === 0) {
            setError("Cant add empty task");
            return;
        }
        else {
            setError(null);
        }

        try {
            setIsLoading(true);

            const newTodo = new Todo(enteredText, selectedPriority);

            await api.addTodo(newTodo);

            addTodo(enteredText, selectedPriority);
            setIsLoading(false);
        }
        catch(error) {
            setError(error);
            setIsLoading(false);
        }
    }

    return (<form className={classes.form} onSubmit={submitHandler}>
        <label>My Todo List</label>
        <input type='text' id='task' ref={textInputRef}/>
        <div className={classes.actions}>
            <Button onClick={submitHandler}>Add Todo</Button>
            <div>
                <label>Priority</label>
                <select ref={prioritySelectRef}>
                    <option selected value={Priority.Low}>Low</option>
                    <option value={Priority.Medium}>Medium</option>
                    <option value={Priority.High}>High</option>
                </select>
            </div>
        </div>
    </form>)
}

export default NewTodo;
