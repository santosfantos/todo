import {truncate} from 'lodash';
import {FC, useContext, Fragment, useState} from 'react';

import classes from './TodoItem.module.css';

import ReactTooltip from "react-tooltip";

import api from '../../api/api';
import Todo from '../../models/todo';
import {TodosContext} from '../../store/todos-context';
import PriorityIcon from '../UI/PriorityIcon';
import ConfirmModal from '../UI/ConfirmModal';

const MAX_TEXT_LENGTH = 50;

const TodoItem: FC<{ todo: Todo }> = props => {
    const {setError, setIsLoading, removeTodo}    = useContext(TodosContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const onClickHandler = async () => {
        setShowConfirmModal(true);
    };

    const dismissModal = () => {
        setShowConfirmModal(false);
    };

    const deleteTodo = async () => {
        try {
            setIsLoading(true);

            await api.deleteTodo(props.todo.id);

            removeTodo(props.todo.id);
            setIsLoading(false);
        }
        catch(error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const trimmer = (text: string) => {
        return truncate(text, {length: MAX_TEXT_LENGTH});
    };

    return (<Fragment>
            {showConfirmModal &&
            <ConfirmModal title='You are about to delete task' onConfirm={deleteTodo} onCancel={dismissModal}/>}
            <li data-tip data-for={"item_" + props.todo.id} className={classes.item}
                onClick={onClickHandler}><PriorityIcon priority={props.todo.priority}/><p>{trimmer(props.todo.task)}</p>
            </li>
            {props.todo.task.length > MAX_TEXT_LENGTH &&
            <ReactTooltip id={"item_" + props.todo.id}>
                <span>{props.todo.task}</span>
            </ReactTooltip>}
        </Fragment>
    )
}

export default TodoItem;
