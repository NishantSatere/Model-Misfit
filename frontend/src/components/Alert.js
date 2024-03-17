import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../styles/alert_styles.css';

const AlertStack = () => {
    const [alerts, setAlerts] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessages, setSnackbarMessages] = useState([]);

    useEffect(() => {
        const knownUserTimer = setInterval(() => {
            createAlert('Known User Alert', 'info', 'known');
        }, 10000);

        const unknownUserTimer = setInterval(() => {
            createAlert('Unknown User Alert', 'warning', 'unknown');
        }, 5000);

        return () => {
            clearInterval(knownUserTimer);
            clearInterval(unknownUserTimer);
        };
    }, []);

    const createAlert = (message, type, userType) => {
        const newAlert = { id: Date.now(), message, type };
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
        setSnackbarMessages([message]);
        setSnackbarOpen(true);
        setTimeout(() => {
            removeAlert(newAlert.id);
            setSnackbarOpen(false);
        }, 10000);
    };

    const removeAlert = (id) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className="box" sx={{ flexGrow: 1, maxWidth: 752 }}>
            <List className="alert-list">
                {alerts.map((alert) => (
                    <ListItem key={alert.id} className="alert-item">
                        <ListItemText primary={alert.message} />
                        <IconButton edge="end" aria-label="delete" onClick={() => removeAlert(alert.id)}>
                            <DeleteIcon className="delete-icon" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessages.join('\n')}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default AlertStack;
