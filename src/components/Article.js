import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {changeStatus, openForm, takeEditableArticle, toChangelog} from "../actions/index";
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Article extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {article, deleteItem, changeStatus, openForm, takeEditableArticle, toChangelog} = this.props;
        const container =
            <Card style={{width:'18rem', marginBottom: '20px'}}>
                <Card.Body  className={article.priority} style={{padding:'0.7rem'}}>
                    <Card.Header style={{backgroundColor:'white', padding:'0.1rem'}}>
                        <ButtonGroup>
                            <div style={{float:'right'}}>
                                <Button variant="outline-light" size="sm" style={{border:'none', color:'grey', float:'right'}} onClick={() => {
                                    deleteItem(article.id);
                                    toChangelog({
                                            changelogAction: 'Deleted',
                                            title: article.title
                                        }
                                    );
                                }}>Delete</Button>
                                {article.status === "Active" && <Button variant="outline-light" size="sm" style={{border:'none', color:'grey'}} onClick={() => {
                                    changeStatus(article.id);
                                    toChangelog({
                                            changelogAction: 'Completed',
                                            title: article.title
                                        }
                                    );
                                }}>Complete</Button>}
                                <Button variant="outline-light" size="sm" style={{border:'none', color:'grey'}} onClick={() => {
                                    openForm();
                                    takeEditableArticle(article.id);
                                }}>Edit</Button>
                            </div>
                        </ButtonGroup>
                    </Card.Header>
                    <Card.Title style={{padding:'0.4rem'}}>{article.title}</Card.Title>
                    <Card.Text style={{padding:'0.4rem'}}>{article.desc}</Card.Text>
                    <Card.Body>
                        <Card.Text className="nameStatusPriority"><b>Name:</b> {article.name}</Card.Text>
                        <Card.Text className="nameStatusPriority"><b>Status:</b> {article.status}</Card.Text>
                        <Card.Text className="nameStatusPriority"><b>Priority:</b> {article.priority}</Card.Text>
                    </Card.Body>
                    <Card.Footer style={{backgroundColor:'white', padding:'1px', float:'right'}}><small className="text-muted">creation date: {article.date}</small></Card.Footer>
                </Card.Body>
            </Card>;
        return (
            <section>{container}</section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id) => dispatch(changeStatus(id)),
        takeEditableArticle: (id) => dispatch(takeEditableArticle(id)),
        openForm: () => dispatch(openForm()),
        toChangelog: (changelogObject) => dispatch(toChangelog(changelogObject))
    }
};
export default connect(null, mapDispatchToProps)(Article)
