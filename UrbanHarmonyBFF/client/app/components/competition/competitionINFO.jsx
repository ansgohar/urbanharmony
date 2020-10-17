import React from 'react';
import {connect} from 'react-redux';
import {getCompetitionID} from '../../actions/index.js'
import * as queryString from "query-string";
import ReactMarkdown from 'react-markdown';
import Image from '../image.jsx'

class CompetitionInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getCmpID();
    }

    getCmpID() {
        let parsed = queryString.parse(this.props.location.search);
        fetch('/competition/' + parsed.competition, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getCompetitionID(data))
            );
    }

    render() {
        return (
            typeof this.props.competitionID === 'undefined' ? <div/> : this.props.competitionID.map(compID => <CmpID
                competition={compID} key={compID.id}/>)
        );
    }
}

class CmpID extends React.Component {
    constructor(props) {
        super(props);
        this.getAllCmp();
        this.state = {
            cmp: []
        }


    }


    getAllCmp() {
        fetch('/competition', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                this.setState({cmp: data})
            });
    }

    checkDates(givenDate1, givenDate2) {
        let dateObj = new Date();

        let currentDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            dateObj.getHours(),
            dateObj.getMinutes(),
            dateObj.getSeconds(),
            dateObj.getMilliseconds()
        );

        let b = givenDate1.split(/\D+/);
        let a = givenDate2.split(/\D+/);

        let givenDate1Obj = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        let givenDate2Obj = new Date(Date.UTC(a[0], --a[1], a[2], a[3], a[4], a[5], a[6]));

        return (givenDate1Obj < givenDate2Obj ? false : true);
    }

    render() {

        let prevCmp = 0;

        for (let i = 0; i < this.state.cmp.length; i++) {
            if (this.props.competition.title === this.state.cmp[i].title) {
                if (this.props.competition.id != this.state.cmp[i].id) {
                    if (this.checkDates(this.props.competition.deadline, this.state.cmp[i].deadline)) {
                        prevCmp = this.state.cmp[i].id;
                    }
                }
            }
        }
        if (prevCmp === 0) {
            return (
                <div className="col-xs-12 newscard-container nopadding-mobile page-margin">
                    <div className="col-xs-12 news-leftSide nopadding-mobile">
                        <Image src={this.props.competition.image}/>
                    </div>
                    <div className="col-xs-12 news-leftSide">
                        <h2> {this.props.competition.title}</h2>
                        <ReactMarkdown source={this.props.competition.description}/>
                        <h3> القوانين : </h3>
                        <ReactMarkdown source={this.props.competition.rules}/>
                        <h3> الجوائز : </h3>
                        <p>{this.props.competition.awards}</p>
                        <h3> الفائزون : </h3>
                        <CompetitionWinners contestants={this.props.competition.contestants}/>
                        <h3> الحكام : </h3>
                        <ReactMarkdown source={this.props.competition.judges}/>
                        <p>المزيد من التفاصيل و الاشتراك: <a href={this.props.competition.url} target="_blank">اضغط هنا</a></p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-xs-12 newscard-container nopadding-mobile page-margin">
                    <div className="col-xs-12 news-rightSide nopadding-mobile">
                        <Image src={this.props.competition.image}/>
                    </div>
                    <div className="col-xs-12 news-leftSide">
                        <h2> {this.props.competition.title}</h2>
                        <ReactMarkdown source={this.props.competition.description}/>
                        <h3> القوانين : </h3>
                        <ReactMarkdown source={this.props.competition.rules}/>
                        <h3> الجوائز : </h3>
                        <p>{this.props.competition.awards}</p>
                        <h3> الفائزون : </h3>
                        <CompetitionWinners contestants={this.props.competition.contestants}/>
                        <h3> الحكام : </h3>
                        <ReactMarkdown source={this.props.competition.judges}/>
                        <a className="read-more" href={"/competitionInfo?competition=" + prevCmp}>الارشيف</a>
                    </div>
                </div>
            );
        }
    }
}

let CompetitionWinners = (props) => {
    if (!props.contestants || props.contestants.length === 0) {
        return (<div></div>);
    }

    let winners = props.contestants
        .filter(contestant => contestant.status !== 'applied' && contestant.status !== 'accepted')
        .map(contestant => <div className='col-xs-12'>
            <div className="row">
                <p>اسم الفائز: {contestant.name}</p>
                <p>المركز: {contestant.status === 'first' ? 'اﻷول' : (contestant.status === 'second' ? 'الثانى' : 'الثالث')}</p>
            </div>
        </div>);

    return (<div>{winners.length === 0 ? <p>لم يحددوا بعد</p> : winners}</div>);
};

const mapStateToProps = (state) => ({
    competitionID: state.competitionID,
});

export default connect(mapStateToProps)(CompetitionInfo);