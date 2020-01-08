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

        let date = new Date();
        
        let currentCompetition = this.props.competition;
        console.info(currentCompetition);
        if (currentCompetition && date <= (new Date(currentCompetition.deadline))) {
        return (
        <div className="cardText col-xs-12">
            <h2> {currentCompetition.title}</h2>
            <ReactMarkdown source={currentCompetition.description} />
            <ReactMarkdown source={currentCompetition.rules} />
            <p>{currentCompetition.awards}</p>
            <ReactMarkdown source={currentCompetition.judges} />
            <a href={`/competitionInfo?competition=${currentCompetition.id}`}>للمزيد من التفاصيل اضغط هنا</a>
        </div>
        )
        }

		/*if (this.props.competition){
			if ((new Date()) <= (new Date(this.props.competition.deadline))){
                return (
				<div>
                    <div className="cardText col-xs-12">
                        <h2> {this.props.competition.title}</h2>
                        <ReactMarkdown source={this.props.competition.description} />
                        <ReactMarkdown source={this.props.competition.rules} />
                        <p>{this.props.competition.awards}</p>
                        <ReactMarkdown source={this.props.competition.judges} />
                    </div>
                </div>
					   );
		    }
        } else {
            return (<div><h1>لا يوجد مسابقات حالية</h1></div>)
        }*/

        return (<h1>لا يوجد مسابقات حاليا</h1>)
	}
}

export default connect()(CurrentCompetition);