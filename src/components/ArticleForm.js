import React, {Component} from 'react';
import _ from 'underscore';
import {addNewArticle, openForm, closeForm, editArticle, toChangelog, showSnackbar} from "../actions/index";
import connect from "react-redux/es/connect/connect";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            desc:'',
            title: '',
            priority: 'High',
            status: '',
            mode: 'CREATE',
            date: '',
            validationErrors: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    save = (clearForm, closeForm) => {
        const {editArticle, editableArticle, addNewArticle, toChangelog, showSnackbar} = this.props;
        const {id, name, desc, title, priority, status} = this.state;
        const errors = {};
        if (!name?.trim() || !desc?.trim() || !title?.trim()) {
            !name?.trim() ? errors.name = "Please, enter your name" : errors.name='';
            !desc?.trim() ? errors.desc = "Please, enter some description" : errors.desc='';
            !title?.trim() ? errors.title = "Please, enter title" : errors.title='';
            this.setState({
                validationErrors: errors
            });
        } else if  (!_.isEmpty(editableArticle)) {
            this.setState({
                validationErrors: {}
            });
            editArticle({
                "id" : id,
                "name" : name,
                "desc" : desc,
                "title" : title,
                "status" : status,
                "date" : moment().format('llll'),
                "priority" : priority,
            });
            showSnackbar({
                severity: 'success',
                message: 'Changes saved!'
            });
            toChangelog({
                changelogAction: 'Edited',
                title: title
            });
            clearForm();
            closeForm();
        } else {
            this.setState({
                validationErrors: {}
            });
            addNewArticle({
                "id" : new Date().getTime(),
                "name" : name,
                "desc" : desc,
                "title" : title,
                "status" : "Active",
                "date" : moment().format('llll'),
                "priority" : priority
            });
            showSnackbar({
                severity: 'success',
                message: 'Article added!'
            });
            toChangelog({
                changelogAction: 'Created',
                title: title
            });
            clearForm();
            closeForm();
        }
    };

    clearForm = () => {
        this.setState({
            name: '',
            title: '',
            desc: '',
            priority: 'High',
            id: '',
            status: '',
            date: '',
            mode: 'CREATE'
        });
    };

    fillForm = (obj) => {
        this.setState({
            id: obj.id,
            name: obj.name,
            title: obj.title,
            desc: obj.desc,
            priority: obj.priority || 'High',
            status: obj.status,
            mode: !_.isEmpty(obj) ? 'EDIT' : 'CREATE'
        });
    };
    // componentWillReceiveProps (nextProps, nextState) {
    //     const {editableArticle} = nextProps;
    //     this.fillForm(editableArticle);
    // }

    componentDidMount () {
        const {editableArticle} = this.props;
        this.fillForm(editableArticle);
    }

    render() {
        const {name, desc, title, priority, validationErrors, mode} = this.state;
        const {closeForm} = this.props;
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control as="input" value={title} onChange={(event) => {this.setState({title: event.target.value})}} />
                    {validationErrors.title && <div className="errorMessage">{validationErrors.title}</div>}
                    <Form.Label>Name:</Form.Label>
                    <Form.Control as="input" value={name} onChange={this.handleChange} />
                    {validationErrors.name && <div className="errorMessage">{validationErrors.name}</div>}
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" style={{resize:"none"}} rows="6" value={desc} onChange={(event) => {this.setState({desc: event.target.value})}}>''</Form.Control>
                    {validationErrors.desc && <div className="errorMessage">{validationErrors.desc}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Priority:</Form.Label>
                    <div>
                        <Form.Check inline label="High" name="contact" type="radio" id="priorityChoice1" value="High" checked={priority === "High"} onChange={(event)=>
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
                        console.log("state--", this.state)
                        this.clearForm();
                        console.log("after clearform func state--", this.state)
                        closeForm();
                    }}>Cansel
                    </Button>
                    <Button variant="outline-secondary" className="btn margin10" onClick={() => {
                        this.save(this.clearForm, closeForm);
                    }}>{mode === "EDIT" ? "Edit" : "Create"}
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
        toChangelog: (changelogObject) => dispatch(toChangelog(changelogObject)),
        showSnackbar: (message) => dispatch(showSnackbar(message))
    }
};
export default connect(null, mapDispatchToProps)(ArticleForm)
