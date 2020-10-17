import React from 'react';
import { connect } from 'react-redux';
import { getCompetitionOfTheMonth } from '../../actions/index'
import ReactMarkdown from 'react-markdown';


class CompetitionOfTheMonth extends React.Component {
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
                {this.props.showTitle === "true" ? <h2> {this.props.competition.title}</h2> : null}

                <ReactMarkdown source={this.props.competition.description} />
            </div>
        );
    }

}

export default connect()(CompetitionOfTheMonth);