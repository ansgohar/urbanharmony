import React from 'react';
import { connect } from 'react-redux';
import { getCompetitionID } from '../../actions/index.js'
import * as queryString from "query-string";
import ReactMarkdown from 'react-markdown';
import Image from '../image.jsx'


class CompetitionInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getCmpID();
    }

    getCmpID() {
        var parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        console.log(this.props.location);
        fetch('/competition/' + parsed.competition, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getCompetitionID(data))
            );
    }

    render() {
        return (
            typeof this.props.competitionID === 'undefined' ? <div /> : this.props.competitionID.map(compID => <CmpID competition={compID} key={compID.id} />)
        );
    }
}

class CmpID extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xs-12 newscard-container nopadding-mobile page-margin">
                <div className="col-xs-12 news-rightSide nopadding-mobile">
                    <div className="image-container-16x5">  
                    <Image src={this.props.competition.image} /> 
</div>
                        </div>
                <div className="col-xs-12 news-leftSide">
                    <h2> {this.props.competition.title}</h2>
                    <ReactMarkdown source={this.props.competition.description} />
                    <h3> القوانين : </h3>
                    <ReactMarkdown source={this.props.competition.rules} />
                    <h3> الجوائز : </h3>
                    <p>{this.props.competition.awards}</p>
                    <h3> الحكام : </h3>
                    <ReactMarkdown source={this.props.competition.judges} />
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    competitionID: state.competitionID,
});

export default connect(mapStateToProps)(CompetitionInfo);