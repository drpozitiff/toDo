const defaultState = {
    articles: [],
    changelog: [],
    editableArticle: {},

};

const articles = (state = defaultState, action) => {
    switch (action.type) {
        case 'DELETE_ARTICLE': {
            const newState = JSON.parse(JSON.stringify(state));
            // const newState = Object.assign({}, state);
            newState.articles = newState.articles.filter((element) => {
                return element.id !== action.resId;
            });
            return newState;
        }
        case 'CREATE_ARTICLE': {
            const newState = JSON.parse(JSON.stringify(state));
            if(action.formObject.name && action.formObject.desc && action.formObject.title) {
                newState.articles.push(action.formObject);
            }
            return newState;
        }
        case 'CHANGE_STATUS': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.articles = newState.articles.map(article => {
                if (article.id === action.resId) {
                    article.status = "Completed";
                }
                return article;
            });
            return newState;
        }
        case 'TAKE_ARTICLE': {
            let newState = JSON.parse(JSON.stringify(state));
            let formObject = newState.articles
                .filter(function (el) {
                    return el.id === action.id;
                });
            newState.editableArticle = formObject[0];
            return newState;
        }
        case 'EDIT_ARTICLE': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.articles = state.articles.filter((element) => {
                return element.id !== action.formObject.id;
            });
            if(action.formObject.name && action.formObject.desc && action.formObject.title) {
                newState.articles.push(action.formObject);
            }
            newState.editableArticle = {};
            return newState;
        }
        case 'ADD_CHANGELOG': {
            const {changelogAction, title} = action.changelogObject;
            let newChangeLogObject = {
                id: new Date().getTime(),
                changelogAction: changelogAction,
                title: title,
                date: new Date().toLocaleString()
            };
            let newState = JSON.parse(JSON.stringify(state));
            newState.changelog.push(newChangeLogObject);
            return newState;
        }
        case 'FETCH_POSTS':
            return {...state, articles: action.payload};
        case 'EDIT_FAIL':
            console.log('Editing failed');
            return state;

        default:
            return state;
    }
};
export default articles;