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
            accessor: 'status'
        }]

        return (

            <div className="col-xs-12 result-table">
                <ReactTable
                    data={this.props.surveyList}
                    columns={columns}
                    defaultPageSize={5}
                />
            </div>
        );

    }

}

export default connect()(ComplainsData);