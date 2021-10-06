import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {changeStatus, openForm, takeEditableArticle, toChangelog} from "../actions/index";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

class Article extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {article, deleteItem, changeStatus, openForm, takeEditableArticle, toChangelog, isAuth} = this.props;
        const container =
                <Card sx={{ minWidth: 200, mt: 2.5, maxWidth: 300 }}  className={article.priority}>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                            {article.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <b>Name:</b> {article.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <b>Status:</b> {article.status}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <b>Priority:</b> {article.priority}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {article.desc}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: -1.5 }}>
                            creation date: {article.date}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ButtonGroup>
                            {isAuth &&
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

                            </div>}
                        </ButtonGroup>
                    </CardActions>
                </Card>;
        return (
            <section>{container}</section>
        )
    }
}

const mapStateToProps = (state) => {
    const isAuth = state.users.isAuth;
    return {
        isAuth: isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id) => dispatch(changeStatus(id)),
        takeEditableArticle: (id) => dispatch(takeEditableArticle(id)),
        openForm: () => dispatch(openForm()),
        toChangelog: (changelogObject) => dispatch(toChangelog(changelogObject))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Article)
