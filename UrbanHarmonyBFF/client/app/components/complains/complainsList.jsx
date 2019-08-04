import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { getComplainsList } from '../../actions/index.js'

class AllComplainsList extends React.Component {
    constructor(props) {
        super(props);
        this.getCmpList();
    }

    getCmpList() {
        fetch('/complains/list', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsList(data))
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
            accessor: d => d.registrationNO,
        },
        {
            Header: 'نوع المبنى',
            accessor: 'type'
        },
        {
            Header: 'العنوان',
            accessor: 'address'
        },
        {
            Header: 'قيمة',
            accessor: 'value'
        },
        {
            Header: 'حالة التظلم',
            accessor: 'status',
            Cell: props => <span>{this.translateStatus(props.value)}</span>
        }]

        return (

            <div className="col-xs-12 result-table">
                <ReactTable
                    data={this.props.complainsList}
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
export default connect()(AllComplainsList);