import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import {showSnackbar, hideSnackbar} from "../actions/index";
import connect from "react-redux/es/connect/connect";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SnackbarMessage = ({isSnackbarOpen, hideSnackbar, snackbarMessage, snackbarSeverity}) => {
    return (
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={()=>{hideSnackbar()}}
            onClick={()=>{hideSnackbar()}}
        >
            <Alert severity={snackbarSeverity}>{snackbarMessage}
                <IconButton
                    size="small"
                    variant="filled"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Alert>
        </Snackbar>
    );
};

const mapStateToProps = (state) => {
    const isSnackbarOpen = state.users.isSnackbarOpen;
    const snackbarSeverity = state.users.snackbarSeverity;
    const snackbarMessage = state.users.snackbarMessage;
    return {
        isSnackbarOpen: isSnackbarOpen,
        snackbarSeverity: snackbarSeverity,
        snackbarMessage: snackbarMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSnackbar: () => dispatch(showSnackbar()),
        hideSnackbar: () => dispatch(hideSnackbar())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarMessage);