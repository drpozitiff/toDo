import React from 'react';
import PostForm from './components/PostForm'
import Posts from './components/Posts'
import FetchedPosts from './components/FetchedPosts'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function ReduxApp() {
    return (
        <div className="container pt-3">
            <Navbar bg="light" expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="http://localhost:3000/">Articles</Nav.Link>
                        <Nav.Link href="http://localhost:3000/WebPage">Cars</Nav.Link>
                        <Nav.Link href="http://localhost:3000/ReduxApp">Async</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="row">
                <div className="col">
                    <PostForm />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>Синхронные посты</h2>
                    <Posts />
                </div>
                <div className="col">
                    <h2>Асинхронные посты</h2>
                    <FetchedPosts />
                </div>
            </div>
        </div>
    );
}

export default ReduxApp;