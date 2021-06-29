import {CREATE_POST, FETCH_POSTS, SHOW_LOADER, HIDE_LOADER, SHOW_ALERT, HIDE_ALERT} from "./types";

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        });

        setTimeout(()=> {
                dispatch(hideAlert())
            },3000
        )
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchPosts() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const data = {
                name: 'someName',
                status: 'created'
            };
            const response = await fetch('http://localhost:3001/birds',
                {
                    // mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            const json = await response.json();
            setTimeout (()=> {
                dispatch({type:FETCH_POSTS, payload:json});
                dispatch(hideLoader());
            }, 1000);
        } catch (e) {
            dispatch(showAlert('Something wrong. ' + e));
            dispatch(hideLoader());
        }
    }
}