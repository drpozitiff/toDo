import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {showSnackbar, hideSnackbar, setCookie, saveUserData} from "../actions/index";
import connect from "react-redux/es/connect/connect";

const registration = async (registrationObject, registrationType, showSnackbar, setUsernameErrorMsg, setEmailErrorMsg, setPasswordErrorMsg, handleOpenClose, setIsAuth, saveUserData) => {
    await axios.post(`http://localhost:3001/auth/${registrationType}`, registrationObject)
        .then(res => {
            const userData = {
                userName: res.data.candidate.username,
                userEmail: res.data.candidate.email
            };
            showSnackbar({
                severity: 'success',
                message: res.data.message
            });
            (registrationType === "login") && setIsAuth(true);
            handleOpenClose(false);
            saveUserData(userData);
        }).catch(err => {
            showSnackbar({
                severity: 'error',
                message: err.response.data.message
            });
            const errors = err.response.data.errors;
            for(let i = 0; i < errors.length; i++){
                if (errors[i]['param'] === 'username'){
                    setUsernameErrorMsg(errors[i]['msg']);
                    break;
                } else if (errors[i]['param'] !== 'username'){
                    setUsernameErrorMsg('');
                }
            }

            for(let i = 0; i < errors.length; i++){
                if (errors[i]['param'] === 'email') {
                    setEmailErrorMsg(errors[i]['msg']);
                    break;
                } else if (errors[i]['param'] !== 'email'){
                    setEmailErrorMsg('');
                }
            }

            for(let i = 0; i < errors.length; i++){
                if(errors[i]['param'] === 'password'){
                    setPasswordErrorMsg(errors[i]['msg']);
                    break;
                } else if(errors[i]['param'] !== 'password'){
                    setPasswordErrorMsg('');
                }
            }
            console.log('login error ui', err.response.data.errors)
        });
};

const RegistrationForm = ({isLogin, showSnackbar, handleOpenClose, setIsAuth, saveUserData}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const registrationObject = {
        "username": username,
        "email": email,
        "password": password
    };

    return (
        <Form>
            <Form.Group controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control as="input" placeholder="Enter username" value={username} onChange = {event => {setUsername(event.target.value)}} />
            </Form.Group>
            <div className="errorMessage">{usernameErrorMsg}</div>
            {
                isLogin &&
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control as="input" type="email" placeholder="Enter email" value={email} onChange = {event => {setEmail(event.target.value)}} />
                </Form.Group>
            }
            <div className="errorMessage">{emailErrorMsg}</div>

            <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control as="input" type="password" placeholder="Password" value={password} onChange = {event => {setPassword(event.target.value)}} />
            </Form.Group>
            <div className="errorMessage">{passwordErrorMsg}</div>

            <div className="regMenu">
                {
                    !isLogin &&
                    <Button variant="outline-secondary" className="signUpBtn btn" onClick={() => {
                        registration(registrationObject, "login", showSnackbar, setUsernameErrorMsg, setEmailErrorMsg, setPasswordErrorMsg, handleOpenClose, setIsAuth, saveUserData);
                    }}>Login</Button>
                }
                {
                    isLogin &&
                    <Button variant="outline-secondary" className="signUpBtn btn" onClick={() => {
                        registration(registrationObject, "registration", showSnackbar, setUsernameErrorMsg, setEmailErrorMsg, setPasswordErrorMsg, handleOpenClose, setIsAuth, saveUserData);
                    }}>Sign up</Button>
                }
            </div>
        </Form>
    );
};

const mapStateToProps = (state) => {
    const isSnackbarOpen = state.users.isSnackbarOpen;
    return {
        isSnackbarOpen: isSnackbarOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSnackbar: (message) => dispatch(showSnackbar(message)),
        hideSnackbar: () => dispatch(hideSnackbar()),
        setIsAuth: (cookie) => dispatch(setCookie(cookie)),
        saveUserData: (userData) => dispatch(saveUserData(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);