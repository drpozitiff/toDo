import React, {Component, Fragment} from 'react';
import ActiveArticleList from './ActiveArticleList';
import ChangeLog from './ChangeLog';
import ArticleForm from './ArticleForm';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import connect from "react-redux/es/connect/connect";
import {openForm, closeForm, fetchPosts} from "../actions/index";
import {Loader} from '../helpers/Loader'
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

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
    componentWillMount () {
        this.props.fetchPosts();
    }
    render () {
        const {changeLog} = this.state;
        const {isFormOpen, openForm, editableArticle, fetchPosts, loading} = this.props;
        const  loadingButton = () => {
            if (loading){
                return <Loader />
            } else {
                return <Button
                    variant="outline-info"
                    style={{padding:'0.25rem', marginTop:'1rem'}}
                    onClick={() => fetchPosts()}
                >Refresh</Button>
            }
        };

        return (
            <Fragment>
                <div className="container">
                    <h1 className="jumbotron">My first react application</h1>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Articles</Nav.Link>
                                <Nav.Link href="/WebPage">Cars</Nav.Link>
                                <Nav.Link href="/ReduxApp">Async</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {loadingButton()}
                    <div className="card card-text" style={{margin:'20px', backgroundColor:'#F5F5F5'}}>
                        <button onClick={() => {
                            openForm();
                        }} className="btn float-right">Add</button>
                    </div>
                    {isFormOpen && <ArticleForm editableArticle={editableArticle} />} {/*-----------------Form is here---------------------*/}
                    <div  style={{display: 'flex', width: '90%'}}>
                        <div className="cardBlocks">
                            <h3>Active</h3>
                            <ActiveArticleList status={'Active'}/>
                        </div>
                        <div className="cardBlocks">
                            <h3>Complite</h3>
                            <ActiveArticleList status={'Completed'}/>
                        </div>
                        <div className="cardBlocks">
                            <h3>Change Log:</h3>
                            <ChangeLog changeLog={changeLog}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const loading = state.articles.loading;
    const isFormOpen = state.articles.isFormOpen;
    const editableArticle = state.articles.editableArticle;
    return {
        isFormOpen: isFormOpen,
        editableArticle: editableArticle,
        loading: loading
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