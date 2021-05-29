import classes from './PriorityIcon.module.css';
import {FC} from 'react';
import {Priority} from '../../models/todo';

const PriorityIcon: FC<{ priority: Priority }> = (props) => {
    const getPriorityClassColor = (priority: string) => {
        return classes[priority];
    };
    const priorityClassColor = getPriorityClassColor(props.priority.toLowerCase());

    return <div className={`${classes.square} ${priorityClassColor}`}/>;
};

export default PriorityIcon;
