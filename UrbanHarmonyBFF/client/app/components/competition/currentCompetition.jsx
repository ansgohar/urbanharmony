import React from 'react';
import { connect } from 'react-redux';
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

        let date = new Date();

        let currentCompetition = null;

        if (Array.isArray(this.props.competition) && this.props.competition.length !== 0) {
            let nearestDate = new Date(this.props.competition[0].deadline);
            currentCompetition = this.props.competition[0];

            for (let i = 0; i < this.props.competition.length; ++i) {
                let checkDate = new Date(this.props.competition[i].deadline);
                if (checkDate < nearestDate) {
                    currentCompetition = this.props.competition[i];
                }
            }
        } else {
            currentCompetition = this.props.competition;
        }

        if (currentCompetition && date <= (new Date(currentCompetition.deadline))) {
        return (
                <div className="cardText row">
                    <h2> {currentCompetition.title}</h2>
                    <ReactMarkdown source={currentCompetition.description} />
                    <ReactMarkdown source={currentCompetition.rules} />
                    <p>{currentCompetition.awards}</p>
                    <ReactMarkdown source={currentCompetition.judges} />
                    <a href={`/competitionInfo?competition=${currentCompetition.id}`}>للمزيد من التفاصيل اضغط هنا</a>
                </div>
        )
        }
        return (<h1>لا يوجد مسابقات حاليا</h1>)
	}
}

export default connect()(CurrentCompetition);