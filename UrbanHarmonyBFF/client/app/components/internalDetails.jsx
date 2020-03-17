import React from 'react';
import { connect } from 'react-redux';
import { getInternalByID } from '../actions/index.js'
import * as queryString from "query-string";
import ReactMarkdown from 'react-markdown';
import Image from '../components/image.jsx'


class DetailInternal extends React.Component {
    constructor(props) {
        super(props);
    }

    getDetailID() {
        var parsed = queryString.parse(this.props.location.search);
        //console.log(parsed);
        //console.log(this.props.location);
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

    // convertDateToArabic(date) {
    //     if (date) {
    //         let arabicDate = new Date(date);
    //         return arabicDate.toLocaleDateString('ar-EG');
    //     }
    //     else {
    //         return '' };

    // }

    render() {
       function convertDateToArabic(date) {
            if (date) {
                let arabicDate = new Date(date);
                //console.log(arabicDate);
                //console.log(arabicDate.toLocaleDateString('ar-EG'));
                return arabicDate.toLocaleDateString('ar-EG');
            }
            else {
                return date };
            }

        if (this.props.hide) {
            return null;
        }
        return (
            <div className="tile conferenceCard col-xs-12 col-xm-10 page-margin">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 news-rightSide nopadding-mobile">
                        
                            {this.props.record.newImage1 === 'http://localhost:1337' ? '' : <div className="image-container-16x5"><Image src={this.props.record.newImage1} /></div>}
                        
                        
                    </div>
                    <div className="col-xs-12 news-leftSide">
                        <h3>{this.props.record.title}</h3>
                        <span className="author">كتبه: جهاز التنسيق الحضاري </span>
                        <h5>تاريخ النشر : {convertDateToArabic(this.props.record.DatePublished)}</h5>
                        <ReactMarkdown source={this.props.record.p1} />
                        {this.props.record.newImage2 === 'http://localhost:1337' ? '' : <div className="image-container-4x3"><Image src={this.props.record.newImage2} /></div>} 
                        <ReactMarkdown source={this.props.record.p2} />
                        
                            {this.props.record.newImage3 === 'http://localhost:1337' ? '' : <div className="image-container-4x3"><Image src={this.props.record.newImage3} /></div>} 
                        
                        <ReactMarkdown source={this.props.record.p3} />
                        
                            {this.props.record.newImage4 === 'http://localhost:1337' ? '' : <div className="image-container-4x3"><Image src={this.props.record.newImage4} /></div>}
                        
                        <ReactMarkdown source={this.props.record.p4} />
                        
                            {this.props.record.newImage5 === 'http://localhost:1337' ? '' : <div className="image-container-4x3"><Image src={this.props.record.newImage5} /></div>}                   
                        
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