const defaultState = {
    articles: [],
    changelog: [],
    editableArticle: {},
    isFormOpen: false
};

const articles = (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_FORM': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.isFormOpen = true;
            return newState;
        }
        case 'CLOSE_FORM': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.isFormOpen = false;
            newState.editableArticle = {};
            return newState;
        }
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
                    article.status = "Accomplished";
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
            let newState = JSON.parse(JSON.stringify(state));
            newState.changelog.push(action.newChangelogObject);
            return newState;
        }
        case 'ADD_CHANGELOG_FAIL': {
            console.log('ADD_CHANGELOG_FAIL');
            return state;
        }
        case 'FETCH_CHANGELOG': {
            return {...state, changelog: action.payload};
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