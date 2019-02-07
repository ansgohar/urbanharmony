import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getCompetitionOfTheMonth } from '../../actions/index'
import ReactMarkdown from 'react-markdown';

class CurrentCompetition extends React.Component {
    constructor(props) {
        super(props);
    }

    competitionOfTheMonth() {
        fetch('/competition/current')
            .then(res => res.json())
            .then(data => this.props.dispatch(getCompetitionOfTheMonth(data)));
    }
    componentDidMount() {
        this.competitionOfTheMonth();
    }
    render() {
        return (
            <div className="cardText col-xs-12">
                <h2> {this.props.competition.title}</h2>
                <ReactMarkdown source={this.props.competition.description} />
                <ReactMarkdown source={this.props.competition.rules} />
                <ReactMarkdown source={this.props.competition.judges} />
            </div>
        );
    }

}

export default connect()(CurrentCompetition);