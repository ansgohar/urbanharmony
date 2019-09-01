import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { getComplainsSurveyList } from '../../actions/index.js'
import Governorates from './governorates.jsx'
import searchResults from './searchResults.jsx';

import { Field, reduxForm, change, reset } from 'redux-form'
import * as queryString from "query-string";

class SurveySearch extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle(id) {
        var e = document.getElementById(id);
        e.style.display = 'block';
        this.props.dispatch(reset('searchComplains'));
    }


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit} >

                    <div className="col-xs-12  col-sm-10 search-barcont">
                        <label className="fieldLabel col-xs-12">بحث برقم بتوثيق العقار<span className="requiredField">*</span></label>
                        <div className="col-xs-3 col-sm-2 searchbar-btn">
                            <button className="btn btn-info submitFormBtn" disabled={submitting} type="submit">بحث</button></div>
                        <div className="col-xs-9 col-sm-10 searchbar">
                            <Field className="input-search" component="input" name="registrationNumber" type="text" className="form-control" placeholder="" />
                        </div>
                        <br></br>
                        <div className="col-xs-12">
                            <p> يمكنك البحث باستخام احدى الاختيارات الاتية : </p>
                            <br></br>
                            <div className="col-xs-12 col-sm-8 street-name">
                                <label className="fieldLabel col-xs-12">إسم الشارع </label>
                                <Field className="input-search" component="input" name="streetName" type="text" className="form-control" placeholder="" />

                            </div>
                            <div className="col-xs-12 col-sm-2 no-padding building-no">
                                <label className="fieldLabel col-xs-12">إسم العقار </label>
                                <Field className="input-search" component="input" name="buildingName" type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col-xs-12 col-sm-2 no-padding building-no">
                                <label className="fieldLabel col-xs-12">رقم العقار </label>
                                <Field className="input-search" component="input" name="buildingNumber" type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );

    }

}

// export default connect()(SurveySearch);

export default reduxForm({
    form: 'searchComplains',  // a unique identifier for this form
    // validate // <--- validation function given to redux-form
})(SurveySearch)