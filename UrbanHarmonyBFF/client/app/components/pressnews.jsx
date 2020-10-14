import React from 'react';
import { getPressNews } from '../actions/index'
import { connect } from 'react-redux';
import Image from '../components/image.jsx'
import * as config from '../../config/config';

class MorePressNews extends React.Component {
    constructor(props) {
        super(props);
    }

    async getNews() {
        await fetch('/articles', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getPressNews(data))
            );

    }

    componentDidMount() {
        this.getNews();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let news = this.props.pressNews;
        let sortedNews = news;
        sortedNews.sort((a, b) => (a.DatePublished < b.DatePublished) ? 1 : -1)
        return sortedNews.map(a => {
            return <Press record={a} key={a.id} />;
        });
    }
}

class Press extends React.Component {
    constructor(props) {
        super(props);
    }

  

    render() {

        function convertDateToArabic(date) {
            if (date) {
                let arabicDate = new Date(date);
                return arabicDate.toLocaleDateString('ar-EG');
            }
            else {
                return date };
            }

        return (
            <div className="tile pressCard col-xs-12 nopadding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                            {this.props.record.image && this.props.record.image.url ? <div className="image-container-4x3"><Image src={`http://${config.host}:${config.cms_port}/${this.props.record.image.url}`} /></div> : ''}
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <span className="cardCat">صحافة</span>
                        <h3>{this.props.record.title}</h3>
                        <span className="author">   كتبة  {this.props.record.author} </span>
                        {this.props.record && this.props.record.DatePublished ? <h5 className="h5news">تاريخ النشر : {convertDateToArabic(this.props.record.DatePublished)}</h5> : ''}
                        <p>{this.props.record.article}</p>
                        {this.props.record && this.props.record.linkURL ? <a target="_blank" href={this.props.record.linkURL}>مصدر الخبر</a> : ''}
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(MorePressNews);