import {FC, FormEvent} from 'react';

import classes from './Button.module.css';

const Button: FC<{ onClick: (event: FormEvent) => void }> = (props) => {
    return <button className={classes.button} onClick={props.onClick}
                   type='button'>{props.children}</button>
}

export default Button;
