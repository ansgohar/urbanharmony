import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { getComplainsSurveyList } from '../../actions/index.js'

class ComplainsData extends React.Component {
    constructor(props) {
        super(props);
        this.getData();
    }

    getData() {
        fetch('/complains/', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsSurveyList(data))
        );
    }

    translateStatus(value) {
        if(value == 'No') {
            return 'لا يوجد';
        }
        else {
            return 'يوجد';
        }
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
            Header: 'قيمة',
            type: String,
            accessor: 'value'
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
            Cell: props => <span>{this.translateStatus(props.value)}</span>
        }]

        return (

            <div className="col-xs-12 result-table">
                <ReactTable
                    data={this.props.surveyList}
                    columns={columns}
                    defaultPageSize={5}
                    previousText='قبل'
                    nextText='بعد'
                    loadingText='تحميل...'
                    noDataText='لا يوجد نتائج'
                    pageText='صفحة'
                    ofText='من'
                    rowsText='صفوف'
                />
            </div>
        );

    }

}

export default connect()(ComplainsData);