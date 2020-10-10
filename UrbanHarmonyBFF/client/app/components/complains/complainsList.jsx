import React from 'react';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import {getComplainsList} from '../../actions/index.js'
import 'react-table/react-table.css';
import * as config from '../../../config/config';

class AllComplainsList extends React.Component {
    constructor(props) {
        super(props);
        this.getCmpList();
        this.getPetList();

        this.state = {
            petitionList: [],
            output: false

        }

        this.count = 0;
    }

    on(petitionData) {
        if (petitionData) {
            if (petitionData.commiteeDate && petitionData.commiteeDate !== '' && petitionData.commiteeDate !== ' ')
                document.getElementById('commiteeDate').innerHTML = (new Date(petitionData.commiteeDate)).toLocaleDateString('ar-EG');
            if (petitionData.owner && petitionData.owner !== '' && petitionData.owner !== ' ')
                document.getElementById('owner').innerHTML = petitionData.owner;
            if (petitionData.ownerType && petitionData.ownerType !== '' && petitionData.ownerType !== ' ')
                document.getElementById('ownerType').innerHTML = petitionData.ownerType;
            if (petitionData.committeDesicion && petitionData.committeDesicion !== '' && petitionData.committeDesicion !== ' ')
                document.getElementById('committeDesicion').innerHTML = petitionData.committeDesicion;
            if (petitionData.recommendation && petitionData.recommendation !== '' && petitionData.recommendation !== ' ')
                document.getElementById('recommendation').innerHTML = petitionData.recommendation;
            if (petitionData.buildingPhoto && petitionData.buildingPhoto.url && petitionData.buildingPhoto.url !== '' && petitionData.buildingPhoto.url !== ' '){
                document.getElementById('hiddenPicture').style.display = 'block';
                document.getElementById('buildingPhoto').href = `http://${config.host}:${config.cms_port}${petitionData.buildingPhoto.url}`;
            } else {
                document.getElementById('hiddenPicture').style.display = 'none';
            }
        }

        document.getElementById('overlay').style.display = 'block';
    }

    off() {
        document.getElementById('commiteeDate').innerHTML = '-';
        document.getElementById('owner').innerHTML = '-';
        document.getElementById('ownerType').innerHTML = '-';
        document.getElementById('committeDesicion').innerHTML = '-د';
        document.getElementById('recommendation').innerHTML = '-';
        document.getElementById('buildingPhoto').href = '#';

        document.getElementById('overlay').style.display = 'none';
    }

    getCmpList() {
        fetch('/complains/list', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => this.props.dispatch(getComplainsList(data))
        );
    }

    getPetList() {
        fetch('/complains/petition', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => {
                this.setState(() => {
                    return {
                        petitionList: data
                    }
                })
            }
        );
    }

    render() {
        const columns = [{
            Header: 'رقم التوثيق',
            type: Number,
            id: 'registrationNO',
            accessor: d => {
                if (d.registrationNO === " " || d.registrationNO === null || d.registrationNO === undefined) {
                    return Number(0);
                } else {
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
                Header: 'معلومات عن التظلم',
                Cell: props => {
                    let surveyID = props.original.id;
                    let petitionData = this.state.petitionList.filter(doc =>
                        doc.surveylist &&
                        doc.surveylist.id &&
                        doc.surveylist.id === surveyID);

                    if (petitionData.length) {
                        return (<span><a onClick={() => {this.on(petitionData[0]);}}>اظهار المعلومات</a></span>)
                    } else {
                        return (<span><a onClick={() => this.on(null)}>اظهار المعلومات</a></span>)
                    }
                }
            }
        ]

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

        let table = (
            <React.Fragment>
                <div id='overlay' style={overlayStyle}>
                    <div style={cardStyle}>
                        <div style={containerStyle}>
                            <h1>معلومات عن التظلم</h1>
                            <a className='btn btn-danger' onClick={() => this.off()}>اغلاق الواجهة</a>
                            <hr/>
                            <p>مقدم التظلم:</p>
                            <p id='owner'>-</p>
                            <hr/>
                            <p>صفة المقدم:</p>
                            <p id='ownerType'>-</p>
                            <hr/>
                            <p>تاريخ الجلسة:</p>
                            <p id='commiteeDate'>-</p>
                            <hr/>
                            <p>قرار اللجنة:</p>
                            <p id='committeDesicion'>-</p>
                            <hr/>
                            <p>توصية اللجنة:</p>
                            <p id='recommendation'>-</p>
                            <hr/>
                            <div id='hiddenPicture'>
                                <p>صورة المبني:</p>
                                <a id='buildingPhoto' target='_blank' href='#'>فتح الصورة</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 result-table">
                    <ReactTable
                        data={this.props.complainsList}
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

        return table;
    }
}

/*
1- Fetch Data, store data in a non changing state.
2- For each surveylist make a <a id="petition">
3- Make an onclick function passing the id of the <a> tag
4- When pressing the onclick search, search the petition, where the passed id to the function is equal to a petition
5- Get relavent data and alert
*/

export default connect()(AllComplainsList);