import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert , Button } from '@mui/material';
import { AlertContext } from '../../utils/Context/AlertContext';
import './Alert.css';

const AlertComponent = () => {
    const { alert, hideAlert } = useContext(AlertContext);

    if (!alert.visibility) {
        return null;
    }

    return (
        <Alert
            severity={alert.type}
            action={
                <Button color="inherit" size="small" onClick={hideAlert}>
                    Close
                </Button>
            }
        >
            {alert.message}
        </Alert>
    );
};

AlertComponent.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
};

export default AlertComponent;
