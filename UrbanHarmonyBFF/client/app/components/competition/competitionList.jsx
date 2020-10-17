import React from 'react';
import { connect } from 'react-redux';
import { getAllCompetitions } from '../../actions/index'
import Image from '../image.jsx'

class CompetitionList extends React.Component {

    constructor(props) {
        super(props);
        this.getAllCompetitions();

    }

    getAllCompetitions() {
        fetch('/competition', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getAllCompetitions(data))
            );
    }
    render() {
        return (
            <div className="col-xs-12 winners">
                <h2>المسابقات</h2>
                {typeof this.props.allCompetitions === 'undefined' ?  <div/> : this.props.allCompetitions.map(
                    (comp) =>  {
                    
                    return this.checkDates(comp.deadline, (valid) => {
                        if (valid){
                            return <CompetitionEntry record={comp} key={comp.id}/>
                        }
                        else{
                            return <div></div>
                        }
                    });
                    
                }
                    )
                }
            </div>
        );
    }

    /**
     * Function that checks if a given date is larger than or equal the current date, does not consider time.
     * 
     * @param {string} givenDate            ISODate with the specified datetime in UTC <YYYY-mm-ddTHH:MM:ssZ>.
     * @param {function} callback           Callback function that takes a boolean as a parameter.
     * 
     * @return {function} Returns a callback function with either true/false value; false if given is smaller and true otherwise.
     */
    checkDates(givenDate, callback) {
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

        let b = givenDate.split(/\D+/);

        let givenDateObj = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        // remove the line below if current local time is ahead the actual value
        givenDateObj.setHours(givenDateObj.getHours()-2);
        
        return (givenDateObj < currentDate ? callback(false) : callback(true));
    }


}


class CompetitionEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xs-12 tite conferenceCard no-padding">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3"> 
                            <Image src={this.props.record.image} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide">
                        <div className="col-xs-12 winner-name no-padding">
                            <div><span>المسابقة</span> {this.props.record.title}</div>
                        </div>
                        <p> {this.props.record.description} </p>
                        <a className="read-more" href={"/competitionInfo?competition="+this.props.record.id}>المزيد</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(CompetitionList);
