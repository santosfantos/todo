import {FC} from 'react';

import ReactConfirmAlert from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ConfirmModal: FC<{ title: string, onConfirm: () => void, onCancel: () => void }> = (props) => {
    return <div>
        <ReactConfirmAlert
            title={props.title || "Confirm to submit"}
            message="Are you sure ?"
            buttons={[
                {
                    label:   'Yes',
                    onClick: () => props.onConfirm()
                },
                {
                    label:   'No',
                    onClick: () => props.onCancel()
                }
            ]}
            onClickOutside={props.onCancel}
        />
    </div>
}

export default ConfirmModal;
