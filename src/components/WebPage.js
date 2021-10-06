import React from 'react';
import CarsList from '../containers/car-list'
import Details from '../containers/details'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';


const WebPage = () => (
    <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="http://localhost:3000/">Articles</Nav.Link>
                    <Nav.Link href="http://localhost:3000/WebPage">Cars</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <h2 className="container">Cars:</h2>
        <CarsList  />
        <hr />
        <h3 className="container">Details:</h3>
        <Details />
    </div>
);

export default WebPage;