import React from 'react';
import NewsRecord from './result.jsx'
import { retrieveDetail } from '../actions/index.js'
import { retrieveArticle } from '../actions/index'
import { connect } from 'react-redux';

class NewsResult extends React.Component {
    constructor(props) {
        super(props);
    }

    getArticle() {
        fetch('/articles/3', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(retrieveArticle(data))
            );
    }


    componentDidMount() {
        this.getArticle();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        return (
            this.renderAuthors()
        )
    }

    renderAuthors() {
        let news = this.props.articles;
        let sortedNews = news;
        console.log(news);
        console.log(sortedNews);
        sortedNews.sort((a, b) => (a.DatePublished < b.DatePublished) ? 1 : -1)
        return sortedNews.map(a => {
            console.log(a)
            return <NewsRecord record={a} key={a.id} />;
        });
    }
}

export default connect()(NewsResult);
