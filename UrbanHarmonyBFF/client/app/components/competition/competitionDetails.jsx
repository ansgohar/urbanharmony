import React from 'react';
import { connect } from 'react-redux';
import CurrentCompetition from './currentCompetition.jsx'
import CompetitionList from './competitionList.jsx'
import CompetitionWinners from './competitionWinners.jsx'

class CompetitionDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="competition-details" className="row competition-details">
                <div className="col-xs-12 no-padding comp-banner">
                    <div className="image-container-16x5"> <img src="assets/images/sections/comp_big.png" alt="image" /> </div>
                </div>
                <div className="col-xs-12 no-padding ">
                    <h2 className="sec-h2">مسابقات</h2>
                    <div className="col-xs-12 tabs-container no-padding">
                        <div className="col-xs-12 filter-tabs">
                            <ul className="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                <li className="active"><a data-toggle="tab" href="#menu1">المسابقة/المسابقات الحالية</a></li>
                                <li><a data-toggle="tab" href="#menu2">مسابقات</a></li>
                                <li><a data-toggle="tab" href="#menu3" id="1">الفائزون في المسابقات</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div id="menu1" className="tab-pane fade col-xs-12 no-padding active in">
                                <div className="col-xs-12  infopannel-sec nopadding-mobile">
                                    <div className="col-xs-12 col-sm-10 infopannel-cont">
                                        <div className="col-xs-12 nopadding-mobile">
                                            <ul className="col-xs-12 nav nav-tabs">
                                                <li className="active"><a data-toggle="tab" href="#menu1tab1">معلومات عن المسابقة</a></li>
                                            </ul>
                                            <div className="col-xs-12 tab-content nopadding-mobile">
                                                <div id="menu1tab1" className="col-xs-12 tab-pane subtab fade in active">
                                                    <CurrentCompetition hide={this.props.competition.length === 0}
                                                        competition={this.props.competition} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu2" className="tab-pane fade col-xs-12 no-padding">
                                <CompetitionList
                                    allCompetitions={this.props.allCompetitions}
                                />
                            </div>
                            <div id="menu3" className="tab-pane fade col-xs-12 no-padding">
                                <CompetitionWinners winners={this.props.winners} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    competition: state.competition,
    allCompetitions: state.allCompetitions,
    winners: state.winners
});

export default connect(mapStateToProps)(CompetitionDetails);

