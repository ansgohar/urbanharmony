import React from 'react';
import {getNews} from '../actions/index'
import {connect} from 'react-redux';
import Image from '../components/image.jsx'
import * as config from '../../config/config';

class TopNews extends React.Component {
    constructor(props) {
        super(props);
    }

    async firstNews() {
        await fetch('/articles', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getNews(data))
            );

    }

    componentDidMount() {
        this.firstNews();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let rec = this.props.news;
        return (
            <News rec={this.props.news}/>

        );
    }
}

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="carouselContent">
                <div className="thumb-cont">
                    {this.props.rec.newImage1 && this.props.rec.newImage1 !== `http://${config.host}:${config.cms_port}/` ?
                        <Image class={"thumb-img-news"} src={this.props.rec.newImage1}/> : ''}
                    <h2 className="h2NewsTop">{this.props.rec.title}</h2>
                </div>

                <p>{this.props.rec.article}</p>
                <a target="_self" href={`/detail/?news=${this.props.rec.id}`}>الخبر</a>
            </div>
        );
    }
}


export default connect()(TopNews);