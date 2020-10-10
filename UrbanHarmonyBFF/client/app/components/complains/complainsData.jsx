import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { getComplainsSurveyList } from '../../actions/index.js'
import * as config from "../../../config/config";

class ComplainsData extends React.Component {
    constructor(props) {
        super(props);
        this.getData();

        this.state = {
            petitionList: []
        };
    }

    getData() {
        fetch('/complains/', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsSurveyList(data))
        );
    }

    componentDidMount() {
        const path = '/complains/petition';
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch(path, options)
            .then(res => res.json())
            .then(body => this.setState({petitionList: body}))
            .catch(error => console.error(error));
    }

    translateStatus(value) {
        if(value == 'No') {
            return 'لا يوجد';
        }
        else {
            return 'يوجد';
        }
    }

    on(petitionData) {
        if (petitionData) {
            if (petitionData.commiteeDate && petitionData.commiteeDate !== '' && petitionData.commiteeDate !== ' ')
                document.getElementById('commiteeDateSec').innerHTML = (new Date(petitionData.commiteeDate)).toLocaleDateString('ar-EG');
            if (petitionData.owner && petitionData.owner !== '' && petitionData.owner !== ' ')
                document.getElementById('ownerSec').innerHTML = petitionData.owner;
            if (petitionData.ownerType && petitionData.ownerType !== '' && petitionData.ownerType !== ' ')
                document.getElementById('ownerTypeSec').innerHTML = petitionData.ownerType;
            if (petitionData.committeDesicion && petitionData.committeDesicion !== '' && petitionData.committeDesicion !== ' ')
                document.getElementById('committeDesicionSec').innerHTML = petitionData.committeDesicion;
            if (petitionData.recommendation && petitionData.recommendation !== '' && petitionData.recommendation !== ' ')
                document.getElementById('recommendationSec').innerHTML = petitionData.recommendation;
            if (petitionData.buildingPhoto && petitionData.buildingPhoto.url && petitionData.buildingPhoto.url !== '' && petitionData.buildingPhoto.url !== ' '){
                document.getElementById('hiddenPictureSec').style.display = 'block';
                document.getElementById('buildingPhotoSec').href = `http://${config.host}:${config.cms_port}${petitionData.buildingPhoto.url}`;
            } else {
                document.getElementById('hiddenPictureSec').style.display = 'none';
            }
        }

        document.getElementById('overlaySec').style.display = 'block';
    }

    off() {
        document.getElementById('commiteeDateSec').innerHTML = '-';
        document.getElementById('ownerSec').innerHTML = '-';
        document.getElementById('ownerTypeSec').innerHTML = '-';
        document.getElementById('committeDesicionSec').innerHTML = '-د';
        document.getElementById('recommendationSec').innerHTML = '-';
        document.getElementById('buildingPhotoSec').href = '#';

        document.getElementById('overlaySec').style.display = 'none';
    }

    render() {
        const columns = [{
            Header: 'رقم التوثيق',
            id: 'registrationNO',
            type: Number,
            accessor: d => {
                if (d.registrationNO === " " || d.registrationNO === null || d.registrationNO === undefined){
                    return Number(0);
                } else{
                    return Number(d.registrationNO);
                }
            },
        },
        {
            Header: 'نوع المبنى',
            type: String,
            accessor: 'type'
        },
        {
            Header: 'العنوان',
            type: String,
            accessor: 'address'
        },
	    {
            Header: 'المحافظة',
            type: String,
            accessor: 'governorate'
        },
		{
            Header: 'المنطقة الرئيسية',
            type: String,
            accessor: 'mainArea'
        },
		{
            Header: 'المنطقة الفرعية',
            type: String,
            accessor: 'subArea'
        },
        {
            Header: 'اسم المبنى',
            type: String,
            accessor: 'buildingName'
        },
        {
            Header: 'رقم المبنى',
            type: Number,
            accessor: 'buildingNo'
        },
        {
            Header: 'حالة التظلم',
            type: String,
            accessor: 'status',
            Cell: props => {
                let surveyID = props.original.id;
                let petitionData = this.state.petitionList.filter(doc =>
                    doc.surveylist && doc.surveylist.id && doc.surveylist.id === surveyID);

                if (petitionData.length) {
                    return(<span><a onClick={() => {this.on(petitionData[0]);}}>{this.translateStatus(props.value)}</a></span>);
                } else {
                    return (<span>{this.translateStatus(props.value)}</span>);
                }
            }
        }]

        let overlayStyle = {
            position: 'fixed',
            display: 'none',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
            cursor: 'pointer'
        };

        let cardStyle = {
            backgroundColor: 'white',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            width: '50%',
            height: '65%',
            overflow: 'scroll',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zindex: 1
        };

        let containerStyle = {
            direction: 'rtl',
            padding: '2px 16px'
        };

        return (
            <React.Fragment>
                <div id='overlaySec' style={overlayStyle}>
                    <div style={cardStyle}>
                        <div style={containerStyle}>
                            <h1>معلومات عن التظلم</h1>
                            <a className='btn btn-danger' onClick={() => this.off()}>اغلاق الواجهة</a>
                            <hr/>
                            <p>مقدم التظلم:</p>
                            <p id='ownerSec'>-</p>
                            <hr/>
                            <p>صفة المقدم:</p>
                            <p id='ownerTypeSec'>-</p>
                            <hr/>
                            <p>تاريخ الجلسة:</p>
                            <p id='commiteeDateSec'>-</p>
                            <hr/>
                            <p>قرار اللجنة:</p>
                            <p id='committeDesicionSec'>-</p>
                            <hr/>
                            <p>توصية اللجنة:</p>
                            <p id='recommendationSec'>-</p>
                            <hr/>
                            <div id='hiddenPictureSec'>
                                <p>صورة المبني:</p>
                                <a id='buildingPhotoSec' target='_blank' href='#'>فتح الصورة</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 result-table">
                    <ReactTable
                        data={this.props.surveyList}
                        columns={columns}
                        defaultPageSize={100}
                        previousText='قبل'
                        nextText='بعد'
                        loadingText='تحميل...'
                        noDataText='لا يوجد نتائج'
                        pageText='صفحة'
                        ofText='من'
                        rowsText='صفوف'
                    />
                </div>
            </React.Fragment>
        );

    }

}

export default connect()(ComplainsData);