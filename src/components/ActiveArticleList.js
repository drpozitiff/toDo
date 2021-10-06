import React, {Component} from 'react';
import {connect} from 'react-redux';
import Article from './Article';

import {deleteArticle} from "../actions/index";
import {sortArticles} from "../helpers/index";

class ActiveArticleList extends Component {
    render () {
        const {list, deleteItem} = this.props;
        const articlesElements = list.map(article => (
                article.status && <div key={article.id}><Article article={article} deleteItem={deleteItem}/></div>
            )
        );
        return(
            <div>
                {articlesElements}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => dispatch(deleteArticle(id))
    }
};

const mapStateToProps = (state, ownProps) => {
    const articles = state.articles.articles;
    const status = ownProps.status;
    const list = sortArticles(status, articles);
    return {
        list: list
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveArticleList)
