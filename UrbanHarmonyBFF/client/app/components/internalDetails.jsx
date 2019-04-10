import React from 'react';
import { connect } from 'react-redux';
import { getInternalByID } from '../actions/index.js'
import * as queryString from "query-string";
import ReactMarkdown from 'react-markdown';


class DetailInternal extends React.Component {
    constructor(props) {
        super(props);
    }

    getDetailID() {
        var parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        console.log(this.props.location);
        fetch('/internalnews/id/' + parsed.news, {
            method: 'GET'
        }).then(res => res.json()

        )
            .then(data => this.props.dispatch(getInternalByID(data))
            );

    }

    componentDidMount() {
        this.getDetailID();
    }


    render() {
        if (this.props.hide) {
            return null;
        }
        return (
            <DetailID record={this.props.internalDetail} />

        );
    }
}

class DetailID extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.hide) {
            return null;
        }
        return (
            <div className="tile conferenceCard col-xs-12 col-xm-10 page-margin">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 news-rightSide nopadding-mobile">
                        <div className="image-container-16x5">
                            <img src={this.props.record.image} />
                        </div>
                    </div>
                    <div className="col-xs-12 news-leftSide">
                        <h3>{this.props.record.title}</h3>
                        <span className="author">   كتبة  {this.props.record.author} </span>
                        <h5>تاريخ النشر : {this.props.record.DatePublished}</h5>
                        <ReactMarkdown source={this.props.record.fullarticle} />
                    </div>
                </div>

            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    internalDetail: state.internalDetail,
});

const DetailContainer = connect(
    mapStateToProps
)(DetailInternal);


export default DetailContainer;