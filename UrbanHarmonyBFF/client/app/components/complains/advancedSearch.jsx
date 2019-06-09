import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { getComplainsSurveyList } from '../../actions/index.js'
import Governorates from './governorates.jsx'
import searchResults from './searchResults.jsx';

import { Field, reduxForm, change, reset } from 'redux-form'
import * as queryString from "query-string";

class AdvancedSearchForm extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="col-xs-12 col-sm-10 advancedsearch-cont Adv-Search" id={this.props.compID} >

                        <Governorates governorates={this.props.governorates} regions={this.props.regions} />

                        <div className="col-xs-12">
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
                        <div className="col-xs-12 advanced-btn-submit">
                            <div className="col-xs-2 searchbar-btn no-padding"><button className="btn btn-info submitFormBtn" disabled={pristine || submitting} type="submit" >بحث</button></div>
                        </div>
                    </div>
                </form>
            </div>

        );

    }

}


export default reduxForm({
    form: 'advSearchComplains',  // a unique identifier for this form
    // validate // <--- validation function given to redux-form
})(AdvancedSearchForm)