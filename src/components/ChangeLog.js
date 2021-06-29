import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'underscore';

class ChangeLog extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render () {
        const {changelog} = this.props;
        const changelogElements = changelog.map(changelog => (
            changelog.changelogAction &&
                <tr key={changelog.id}>
                    <td>{changelog.changelogAction}</td>
                    <td>{changelog.title}</td>
                    <td>{changelog.date}</td>
                </tr>
            )
        );
        return(
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Action</td>
                        <td>Title</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {!_.isEmpty(changelog) ? changelogElements  :  <tr><td>No data</td><td> </td><td> </td></tr>}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    const changelog = state.articles.changelog;
    return {
        changelog: changelog
    }
};

export default connect(mapStateToProps, null)(ChangeLog)