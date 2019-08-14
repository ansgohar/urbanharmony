import React from 'react';
import { connect } from 'react-redux';
import { getCompetitionID } from '../../actions/index.js'
import * as queryString from "query-string";
import ReactMarkdown from 'react-markdown';


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
                    <div className="image-container-16x5"style={this.props.competition.image === "http://localhost:1337/uploads/682a2fc6d5df46b88703a6e88b0c04d4.jpg" ? {backgroundImage: 'url("/assets/images/no-image-4x3.png")', backgroundRepeat:'no-repeat', backgroundPosition:'center' }: {backgroundImage: 'none' }}>  
                        <img src={(this.props.competition.image) !== "http://localhost:1337/uploads/682a2fc6d5df46b88703a6e88b0c04d4.jpg" ? this.props.competition.image: null} /> </div>
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