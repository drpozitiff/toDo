import axios from 'axios';
import moment from 'moment';

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
                }).catch((err)=>{console.log('creation err',err)});
            if (resId !== "CREATION_ERROR") {
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
        if (resId !== "EDITING_ERROR") {
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
    const newChangelogObject = {
        ...changelogObject,
        date: moment().format('llll'),
        id: new Date().getTime()
    }
    return async dispatch => {
        const resStatus = await axios.post('http://localhost:3001/articles/addToChangelog', {newChangelogObject})
            .then(res => {
                return res.data.message
            }).catch((err)=>{console.log('add to changelog err',err)});
        if(resStatus !== "ADD_TO_CHANGELOG__ERROR") {
            dispatch ({
                type: 'ADD_CHANGELOG',
                newChangelogObject
            });
        } else {
            dispatch ({
                type: 'ADD_CHANGELOG_FAIL'
            });
        }
    };
};

export const getChangelog = () => {
    return async dispatch => {
        await axios.get('http://localhost:3001/articles/getChangelog')
        .then(res => {
            dispatch({
                type: 'FETCH_CHANGELOG',
                payload: res.data
            })
        }).catch((err)=>{console.log('getChangelog err',err)});
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
            const response = await fetch('http://localhost:3001/articles/getArticles',
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

export const setIsAuth = (isAuth) => {
    return {
        type: "SET_AUTH",
        isAuth
    };
};

export const setUserId = (userId) => {
    return {
        type: "SET_USER_ID",
        userId
    };
};

export const saveUserData = (userData) => {
    return {
        type: "SAVE_USER_DATA",
        payload: userData
    }
};

export const getBases = () => {
    return async dispatch => {
        await axios.get('http://localhost:3001/fish/getBases')
            .then(res => {
                dispatch({
                    type: 'GET_BASES',
                    payload: res.data.bases
                })
            }).catch((err)=>{console.log('getBases err',err)});
    };
};

export const getFishInfo = (baseID) => {
    return async dispatch => {
        await axios.get(`http://localhost:3001/fish/getFishBase?baseId=${baseID}`)
            .then(res => {
                dispatch({
                    type: 'GET_FISH_INFO',
                    payload: res.data.fishBase
                })
            }).catch((err)=>{console.log('getFishInfo err',err)});
    };
};

export const getUserFishInfo = (baseID) => {
    return async dispatch => {
        await axios.get(`http://localhost:3001/fish/getUserFishInfo?baseId=${baseID}`)
            .then(res => {
                dispatch({
                    type: 'GET_USER_FISH_INFO',
                    payload: res.data.userFishInfo
                })
            }).catch((err)=>{console.log('getUserFishInfo err',err)});
    };
};

export const resetUserFishInfo = () => {
    return {
        type: "RESET_USER_FISH_INFO",
        payload: []
    }
};

export const setCurrentBase = (baseId) => {
    return {
        type: "SET_CURRENT_BASE",
        payload: baseId
    }
};