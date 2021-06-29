import React, {Component} from 'react';
import _ from 'underscore';
import {addNewArticle, openForm, closeForm, editArticle, toChangelog} from "../actions/index";
import connect from "react-redux/es/connect/connect";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            desc:'',
            title: '',
            priority: '',
            status: '',
            mode: '',
            date: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    save = () => {
        const {editArticle, editableArticle, addNewArticle, toChangelog} = this.props;
        const {id, name, desc, title, priority, status} = this.state;
        if (!name || !desc || !title || !priority) {
            console.log('no value');
        } else if (!name.trim() || !desc.trim() || !title.replace( /\s/g, "")) {
            console.log('empty value');
        } else if  (!_.isEmpty(editableArticle)) {
            editArticle({
                "id" : id,
                "name" : name,
                "desc" : desc,
                "title" : title,
                "status" : status,
                "date" : new Date().toLocaleString(),
                "priority" : priority
            });
            toChangelog({
                changelogAction: 'Edited',
                title: title
            });
        } else {
            addNewArticle({
                "id" : new Date().getTime(),
                "name" : name,
                "desc" : desc,
                "title" : title,
                "status" : "Active",
                "date" : new Date().toLocaleString(),
                "priority" : priority
            });
            toChangelog({
                changelogAction: 'Created',
                title: title
            });
        }
    };

    clearForm = () => {
        this.setState({
            name: '',
            title: '',
            desc: '',
            priority: '',
            id: '',
            status: '',
            date: ''
        });
    };

    fillForm = (obj) => {
        this.setState({
            id: obj.id,
            name: obj.name,
            title: obj.title,
            desc: obj.desc,
            priority: obj.priority,
            status: obj.status,
            mode: !_.isEmpty(obj) ? 'EDIT' : 'CREATE'
        });
    };
    componentWillReceiveProps (nextProps, nextState) {
        const {editableArticle} = nextProps;
        this.fillForm(editableArticle);
    }

    componentDidMount () {
        const {editableArticle} = this.props;
        this.fillForm(editableArticle);
    }

    render() {
        const {name, desc, title, priority} = this.state;
        const {editableArticle, closeForm} = this.props;
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control as="input" value={title} onChange={(event) => {this.setState({title: event.target.value})}} />
                    <Form.Label>Name:</Form.Label>
                    <Form.Control as="input" value={name} onChange={this.handleChange} />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" style={{resize:"none"}} rows="6" value={desc} onChange={(event) => {this.setState({desc: event.target.value})}}>''</Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Priority:</Form.Label>
                    <div>
                        <Form.Check inline label="High" name="contact" type="radio" id="priorityChoice1" value="High" checked={!(priority === "Medium" || priority === "Low")} onChange={(event)=>
                            this.setState({
                                priority: event.target.value
                            })
                        }/>
                        <Form.Check inline label="Medium" name="contact" type="radio" id="priorityChoice2" value="Medium" checked={priority === "Medium"} onChange={(event)=>
                            this.setState({
                                priority: event.target.value
                            })
                        }/>
                        <Form.Check inline label="Low" name="contact" type="radio" id="priorityChoice3" value="Low" checked={priority === "Low"} onChange={(event)=>
                            this.setState({
                                priority: event.target.value
                            })
                        }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <Button variant="outline-secondary" className="btn margin10" onClick={() => {
                        this.clearForm();
                        closeForm();
                    }}>Cansel
                    </Button>
                    <Button variant="outline-secondary" className="btn margin10" onClick={() => {
                        this.save();
                        this.clearForm();
                        closeForm();
                        }}>{!_.isEmpty(editableArticle) ? "Edit" : "Create"}
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addNewArticle: (formObject) => dispatch(addNewArticle(formObject)),
        openForm: () => dispatch(openForm()),
        editArticle: (formObject) => dispatch(editArticle(formObject)),
        closeForm: () => dispatch(closeForm()),
        toChangelog: (changelogObject) => dispatch(toChangelog(changelogObject))
    }
};
export default connect(null, mapDispatchToProps)(ArticleForm)
