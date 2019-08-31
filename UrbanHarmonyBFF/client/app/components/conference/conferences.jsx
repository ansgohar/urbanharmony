import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { getConferences } from '../../actions/index.js';
import * as fetch from 'node-fetch';

class Conferences extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            conferencesList:[]
        }

    }


    getConferences() {

        let url = 'http://localhost:3000/conferencesList';
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        
        fetch(url, options)
            .then(res => res.json())
            .then(c =>{
                this.setState(prevState =>{
                    return{
                        conferencesList: c
                    }
                    
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.getConferences();
    }

    render() {

        function setConference(conference){

            let conferenceType = (conference.type === "Seminar" ? "ندوة" : "مؤتمر داخلي")

            var event = new Date (conference.date)

            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            let conferenceDate = event.toLocaleDateString('ar-EG', options);

            return <TableRow title={conference.title} conferenceType={conferenceType} key={conference.id} conferenceDate={conferenceDate} />
        }

       

        return(
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding greyish-background">
                    <h2 className="sec-h2 add-padding">الندوات والمؤتمرات</h2>
                    <div className="add-margin">
                        {this.state.conferencesList.map(setConference)}
                    </div>
                </div>
            </div>
        )
        


    }
}

class TableRow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){



        return(
            <table className="default-table no-border-table">
                            <tr className="table-row">
                                <td className="table-data table-header" >عنوان المؤتمر </td>
                                {this.props.title}
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header" > تاريخ المؤتمر </td>
                                {this.props.conferenceDate.toString()}
                            </tr>

                                <tr className="table-row">
                                <td className="table-data table-header"> نوع المؤتمر </td>
                                {this.props.conferenceType}
                            </tr>
                            
                        </table>
        );
    }
}

export default connect()(Conferences);
