import React from 'react';
import { getPressNews } from '../actions/index'
import { connect } from 'react-redux';

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
        let press = this.props.pressNews;
        return press.map(a => {
            return <Press record={a} key={a.id} />;
        });
    }
}

class Press extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="tile pressCard col-xs-12 nopadding-mobile">
            <div className="col-xs-12 newscard-container no-padding">
                <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                    <div className="image-container-4x3">
                        <img src={this.props.record.image} />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                    <span className="cardCat">صحافة</span>
                    <h3>{this.props.record.title}</h3>
                    <span className="author">   كتبة  {this.props.record.author} </span>
                    <h5>تاريخ النشر : {this.props.record.DatePublished}</h5>
                    <p>{this.props.record.article}</p>
                    <a target="_blank" href={this.props.record.linkURL}>مصدر الخبر</a>
                </div>
            </div>
        </div>
        );
    }
}


export default connect()(MorePressNews);