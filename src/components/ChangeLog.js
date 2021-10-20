import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'underscore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {getChangelog} from "../actions/index";


class ChangeLog extends Component {
    componentWillMount () {
        this.props.getChangelog();
    }
    render () {
        const {changelog} = this.props;
        const changelogElements = changelog.map(changelog => (
            changelog.changelogAction &&
                <TableRow key={changelog.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{changelog.changelogAction}</TableCell>
                    <TableCell align="right">{changelog.title}</TableCell>
                    <TableCell sx={{fontSize: 12}} align="right">{changelog.date}</TableCell>
                </TableRow>
            )
        );
        return(
            <TableContainer sx={{mt: 2.5}} component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Action</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!_.isEmpty(changelog) ? changelogElements  :  <TableRow><TableCell>No data</TableCell><TableCell> </TableCell><TableCell> </TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

const mapStateToProps = (state) => {
    const changelog = state.articles.changelog;
    return {
        changelog: changelog
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChangelog: () => dispatch(getChangelog())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLog)