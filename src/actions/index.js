import axios from 'axios';

export const select = (id) => {
    return {
        type: "CAR_SELECTED",
        id: id
    }
};

export const deleteArticle = (id) => {
    return async dispatch => {
        const resId = await axios.post('http://localhost:3001/articles/deleteArticle', {id})
            .then(res => {
                return res.data.id
            }).catch((err)=>{console.log('delete err',err)});
        dispatch ({
            type: "DELETE_ARTICLE",
            resId
        })
    };
};


export const addNewArticle = (formObject) => {
        return async dispatch => {
            const resId = await axios.post('http://localhost:3001/articles/createArticle', {formObject})
                .then(res => {
                    return res.data
                }).catch((err)=>{console.log('create err',err)});
            if (resId !== "Fatal error!") {
                dispatch({
                    type: "CREATE_ARTICLE",
                    formObject
                })
            } else {
                console.log('fail');
                dispatch({
                    type: "CREATE_FAIL"
                })
            }

        };
};

export const editArticle = (formObject) => {
    return async dispatch => {
        const resId = await axios.post('http://localhost:3001/articles/editArticle', {formObject})
            .then(res => {
                return res.data
            }).catch((err)=>{console.log('edit err',err)});
        console.log('resId',resId);
        if (resId !== "Fatal error!") {
            dispatch({
                type: "EDIT_ARTICLE",
                formObject
            })
        } else {
            console.log('fail');
            dispatch({
                type: "EDIT_FAIL"
            })
        }
    };
};

export const openForm = () => {
    return {
        type: "OPEN_FORM"
    }
};

export const closeForm = () => {
    return {
        type: "CLOSE_FORM"
    }
};

export const changeStatus = (id) => {
    return async dispatch => {
        const resId = await axios.post('http://localhost:3001/articles/changeStatus', {id})
            .then(res => {
                return res.data.id
            }).catch((err)=>{console.log('changeStatus err',err)});
        dispatch ({
            type: "CHANGE_STATUS",
            resId
        })
    };
};

export const takeEditableArticle = (id) => {
    return {
        type: "TAKE_ARTICLE",
        id: id
    }
};

export const toChangelog = (changelogObject) => {
    return {
        type: 'ADD_CHANGELOG',
        changelogObject: changelogObject
    }
};

export function showLoader() {
    return {
        type: 'SHOW_LOADER'
    }
}

export function hideLoader() {
    return {
        type: 'HIDE_LOADER'
    }
}

export const saveAll = (articles) => {
  return {
      type:'FETCH_POSTS',
      payload: articles
  }
};

export function fetchPosts() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            // const data = {
            //     name: 'name',
            //     name2: 'name2'
            // };
            const response = await fetch('http://localhost:3001/articles',
                {
                    // mode: 'no-cors',
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    // body: JSON.stringify(data)
                });
            const articles = await response.json();
            setTimeout (()=> {
                // dispatch({type:FETCH_POSTS, payload:articles});
                dispatch(saveAll(articles));
                dispatch(hideLoader());
            }, 500);
        } catch (e) {
            dispatch(hideLoader());
        }
    }
}

export const showSnackbar = (message) => {
    return {
        type: "SHOW_SNACKBAR",
        payload: message
    };
};

export const hideSnackbar = () => {
    return {
        type: "HIDE_SNACKBAR"
    };
};

export const setCookie = (cookie) => {
    return {
        type: "SET_COOKIE",
        cookie
    };
};

export const setUserData = (userData) => {
    return {
        type: "SHOW_USER_DATA",
        payload: userData
    }
};