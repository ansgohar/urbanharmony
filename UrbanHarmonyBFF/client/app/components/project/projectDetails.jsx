import React from 'react';
import { connect } from 'react-redux';
import { getProjectID } from '../../actions/index.js'
import * as queryString from "query-string";
import Image from '../image.jsx'


class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    getPrjID() {
        var parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        console.log(this.props.location);
        fetch('/project/id/' + parsed.project, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getProjectID(data))
            );

    }

    componentDidMount() {
        this.getPrjID();
    }


    render() {
        if (this.props.hide) {
            return null;
        }
        return (
            <PrjID record={this.props.projectDetail} />

        );
    }
}

class PrjID extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.hide) {
            return null;
        }
        return (
            <div className="col-xs-12 newscard-container nopadding-mobile page-margin">
                <div className="col-xs-12 news-rightSide nopadding-mobile">
                </div>
                <div className="col-xs-12 news-leftSide">
                    {/* <div className="col-xs-12 col-sm-9 news-leftSide"> */}
                    <h2>{this.props.record.title}</h2>
                    <h3>{this.props.record.place}</h3>
                    <p>{this.props.record.detail}</p>
                    
                    {/* <img className="inline-image" src={this.props.record.imageBefore} /> */}
                    <Image src={this.props.record.imageBefore} class={"inline-image-new"}/> 
                    <Image src={this.props.record.imageBefore2} class={"inline-image-new"}/> 
                    {/* <img className="inline-image" src={this.props.record.imageAfter} /> */}
                    <Image src={this.props.record.imageAfter} class={"inline-image-new"}/> 
                    <Image src={this.props.record.imageAfter2} class={"inline-image-new"}/> 
                    {/* <div className="col-xs-12 no-padding">
                        <a href="#" className="share-btn"></a>
                        <a href="#" className="pdf-btn"></a>
                    </div> */}
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    projectDetail: state.projectDetail,
});

const PrjDetailContainer = connect(
    mapStateToProps
)(ProjectDetails);


export default PrjDetailContainer;