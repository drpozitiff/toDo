import React, {Component, Fragment} from 'react';
import ActiveArticleList from './ActiveArticleList';
import ChangeLog from './ChangeLog';
import ArticleForm from './ArticleForm';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import connect from "react-redux/es/connect/connect";
import {openForm, closeForm, fetchPosts} from "../actions/index";
import 'bootstrap/dist/css/bootstrap.css';
import SnackbarMessage from './SnackbarMessage';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import User from './User'

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeLog: [
                {
                    action: '',
                    title: '',
                    date: ''
                }
            ]
        };
    }

    getStyle = () => {
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


    componentWillMount () {
        this.props.fetchPosts();
    }
    render () {
        const {changeLog} = this.state;
        const {isFormOpen, openForm, closeForm, editableArticle, isAuth} = this.props;

        return (
            <Fragment>

                <Container maxWidth="lg" className='wrapper'>
                    <Grid container spacing={4} justifyContent="center" sx={{ flexGrow: 1 }}>
                        <Grid item xs={6} md={4} lg={4}>
                            <Typography variant="h5">Active</Typography>
                            <ActiveArticleList status={'Active'}/>
                        </Grid>
                        <Grid item xs={6} md={4} lg={4}>
                            <Typography variant="h5">Complete</Typography>
                            <ActiveArticleList status={'Completed'}/>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            {isAuth &&
                                <Button
                                    onClick={() => {openForm()}}
                                    className="add-new-article"
                                    style={{
                                        textAlign: "center",
                                        color: 'black'
                                    }}
                                >
                                    <div className="addIcon"><AddIcon  fontSize="small"/></div>
                                    <Typography variant="h6">Create new article</Typography>
                                </Button>
                            }
                            {isAuth && <User/>}
                            <Typography sx={{mt: 2.5}} variant="h5">Change Log:</Typography>
                            <ChangeLog changeLog={changeLog}/>
                        </Grid>
                    </Grid>
                </Container>
                <Modal
                    open={isFormOpen}
                    onClose={() => closeForm()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={this.getStyle()}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <ArticleForm editableArticle={editableArticle} />
                        </Typography>
                    </Box>
                </Modal>
                <SnackbarMessage/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const isFormOpen = state.users.isFormOpen;
    const isAuth = state.users.isAuth;
    const editableArticle = state.articles.editableArticle;
    return {
        isFormOpen: isFormOpen,
        isAuth: isAuth,
        editableArticle: editableArticle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openForm: () => dispatch(openForm()),
        closeForm: () => dispatch(closeForm()),
        fetchPosts: () => dispatch(fetchPosts())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles)