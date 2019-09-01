import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getWinners } from '../../actions/index'

class CompetitionWinners extends React.Component {

    constructor(props) {
        super(props);
        this.getAllWinners();

    }

    getAllWinners() {
        fetch('/competition/winners', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getWinners(data))
            );
    }
    render() {
        return (
            <div className="col-xs-12 winners">
                <h2>الفائزون</h2>
                {typeof this.props.winners === 'undefined' ? <div /> : this.props.winners.map(compWin => <Winner record={compWin} key={compWin.id} />)}
            </div>
        );
    }
}


class Winner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-12 tite conferenceCard no-padding">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                    <div className="image-container-4x3" style={this.props.record.image === "http://localhost:1337" ? {backgroundImage: 'url("/assets/images/no-image-4x3.png")', backgroundRepeat:'no-repeat', backgroundPosition:'center' }: {backgroundImage: 'none' }}>  
                        <img src={(this.props.record.image) !== "http://localhost:1337" ? this.props.record.image: null} /> </div>
                        </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide">
                        <div className="col-xs-12 winner-name no-padding">
                            <div><span>إسم الفائز</span>{this.props.record.name}</div>
                            <div><span>المسابقة</span>{this.props.record.competitionName}</div>
                        </div>
                        <p> {this.props.record.description} </p>
                        <a className="read-more" href={"/competitionInfo?competition="+this.props.record.compID}>المزيد</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(CompetitionWinners);
