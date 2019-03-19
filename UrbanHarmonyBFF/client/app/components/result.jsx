import React from 'react';
import { retrieveDetail } from '../actions/index.js'
import { connect } from 'react-redux';

class NewsRecord extends React.Component {
    constructor(props) {
        super(props);
        this.getDetail = this.getDetail.bind(this);
    }
    render() {
        return (
            <div className="tile pressCard col-xs-12 no-padding">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3">
                            <img src={this.props.record.image} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <span className="cardCat">صحافة</span>
                        <h3>{this.props.record.title}</h3>
                        <span className="author"> كتبة {this.props.record.author} </span>
                        <p>{this.props.record.article}</p>
                        <a target="_blank" href={this.props.record.linkURL}> مصدر الخبر</a>
                    </div>
                </div>
            </div>
        );
    }

    getDetail() {
        fetch('/articles/' + this.props.record.id, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.props.dispatch(retrieveDetail(data)));

    }
}

export default connect()(NewsRecord);
