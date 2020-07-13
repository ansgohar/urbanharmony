import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { getConferences } from '../../actions/index.js';
import * as fetch from 'node-fetch';
import * as config from '../../../config/config';

class Conferences extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            conferencesList:[]
        }

    }


    getConferences() {

        let url = `http://${config.host}:${config.backend_port}/conferencesList`;
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

            let conferenceDate = conference.date ? event.toLocaleDateString('ar-EG', options) : " غير متوفر " ;

            return <TableRow title={conference.title} conferenceType={conferenceType} key={conference.id} conferenceDate={conferenceDate} details={conference.details} link={conference.link} photos={conference.photos} pdfs={conference.pdfs}/>
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

        let pdfs = undefined;
        if (this.props.pdfs && this.props.pdfs.length !== 0) {
            pdfs = this.props.pdfs.map(pdf => {
                return <a className="row" href={`http://${config.host}:${config.cms_port}${pdf.url}`} target="_blank"> تحميل الملف</a>
            });
        }

        let photos = undefined;
        if (this.props.photos && this.props.photos.length !== 0) {
            photos = this.props.photos.map(photo => {
                return <img className="col" src={`http://${config.host}:${config.cms_port}${photo.url}`} height="300" width="300"/>
            });
        }
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
                            
                            {this.props.details ? <tr className="table-row">
                                <td className="table-data table-header">تفاصيل</td>
                                <ReactMarkdown source={this.props.details}/>
                            </tr> : ''}

                            {this.props.link ? <tr className="table-row">
                                <td className="table-data table-header">تفاصيل اخرى</td>
                                <a href={this.props.link} target="_blank">انقر هنا</a>
                            </tr> : ''}

                            {photos ? <tr className="table-row">
                                <td className="table-data table-header">صور</td>
                                <div className="row">
                                    {photos}
                                </div>
                            </tr> : ''}

                            {pdfs ? <tr className="table-row">
                                <td className="table-data table-header">ملفات</td>
                                {pdfs}
                                </tr> : ''}
                        </table>
        );
    }
}

export default connect()(Conferences);
