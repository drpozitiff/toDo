import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Articles from './Articles'
import FishApp from './infofish/FishApp'
import Header from './Header';
import axios from 'axios';
import {saveUserData} from "../actions/index";

const getUserById = async (userId, dispatch) => {
    await axios.get(`http://localhost:3001/auth/getUserById?userId=${userId}`)
        .then(res => {
            const userData = {
                userName: res.data.username,
                userEmail: res.data.email
            };
            dispatch(saveUserData(userData))
        }).catch(err => {
            console.log('get user error', err)
        });
};

export const App = () => {
    const userId = useSelector((state) => state.users.userId);
    const dispatch = useDispatch();
    useEffect(() => {
        userId && getUserById(userId, dispatch);
    });

    return (<>
        <Header/>
        <Switch>
            <Route exact path="/" component={() => <Articles />} />
            <Route path="/infofish/FishApp"  component={FishApp}/>
        </Switch>
    </>
    )
};