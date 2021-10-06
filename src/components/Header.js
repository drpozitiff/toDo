import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Nav } from 'react-bootstrap';
import connect from "react-redux/es/connect/connect";
import {setCookie, setUserData} from "../actions/index";
import axios from 'axios';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

const Header = ({isAuth, setCookie, setUserData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleOpenClose = (toggle) => {
        setIsOpen(toggle);
    };

    const setLogin = (isLogin) => {
        setIsLogin(isLogin);
    };


    const logout = async () => {
        await axios.post('http://localhost:3001/auth/logout')
            .then(res => {
                setCookie(false);
                setUserData({
                    userName: '',
                    userEmail: ''
                });
                console.log(res.data.message);
            }).catch(err => {
                console.log(err);
            });
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const getStyle = () => {
        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: "#ffffff",
                    color: "#212121"
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar>
                        <Stack direction="row" spacing={2}>
                            <div>
                                <IconButton
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}><Nav.Link
                                                            href="/"
                                                            className="navLink"
                                                        >Articles</Nav.Link></MenuItem>
                                                        <MenuItem onClick={handleClose}><Nav.Link
                                                            href="/WebPage"
                                                            className="navLink"
                                                        >Cars</Nav.Link></MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </Stack>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{marginLeft: '20px'}}>
                            Articles
                        </Typography>

                        <ButtonGroup variant="text" aria-label="text button group" className="buttonGroup">
                            { !isAuth &&
                                <Button variant="outline-secondary"
                                        style={{'border-right': 'none'}}
                                    onClick={() => {
                                        handleOpenClose(true);
                                        setLogin(false)
                                    }}
                                >Login</Button>
                            }
                            { !isAuth &&
                                <Button variant="outline-secondary"
                                    onClick={() => {
                                        handleOpenClose(true);
                                        setLogin(true);
                                    }}
                                >Sign up</Button>
                            }

                            { isAuth &&
                                <Button variant="outline-secondary"
                                        onClick={logout}
                                >Log out</Button>
                            }
                        </ButtonGroup>
                        <Modal
                            open={isOpen}
                            onClose={() => handleOpenClose(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={getStyle()}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <RegistrationForm handleOpenClose={handleOpenClose} isLogin={isLogin}/>
                                </Typography>
                            </Box>
                        </Modal>
                    </Toolbar></Container>
            </AppBar>
        </Box>
    );
};

const mapStateToProps = (state) => {
    const isAuth = state.users.isAuth;
    return {
        isAuth: isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCookie: (cookie) => dispatch(setCookie(cookie)),
        setUserData: (userData) => dispatch(setUserData(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)