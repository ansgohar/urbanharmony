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

        const buttonStyle = {
            marginLeft: '30px',
            borderRadius: '5px',
            marginBottom: '60px',
            marginTop: '20px'
        };

        const inputStyle = {
            marginBottom: '25px',
        };

        const labelStyle = {
            marginBottom: '10px'
        };

        const divStyle = {
            display: 'inline-block',
            width: '25%',
            marginTop: '30px'
        }

        return (
            <div className="col-xs-12 container">
                <form onSubmit={handleSubmit}>
                    <h3 style={{padding: '100px 10px 10px 10px', width:'100%'}}>برجاء ادخال محددات البحث</h3>

                    <div style={divStyle}>
                        <label htmlFor="registrationNumber" style={labelStyle}>بحث برقم بتوثيق العقار</label>
                        <Field className="input-search form-control" style={inputStyle} component="input" name="registrationNumber" type="text" placeholder="برجاء ادخال رقم التوثيق العقاري"/>
                    </div>
                    
                    <div style={divStyle}>
                        <label htmlFor="streetName" style={labelStyle}>العنوان</label>
                        <Field className="input-search form-control" style={inputStyle} component="input" name="streetName" type="text" placeholder="برجاء ادخال العنوان او جزء منه"/>
                    </div>
                    
                    <div style={divStyle}>
                        <label htmlFor="buildingName" style={labelStyle}>إسم العقار</label>
                        <Field className="input-search form-control" style={inputStyle} component="input" name="buildingName" type="text" placeholder="برجاء ادخال اسم العقار او جزء منه"/>
                    </div>

                    <div style={divStyle}>
                        <label htmlFor="buildingNumber" style={labelStyle}>رقم العقار</label>
                        <Field className="input-search form-control" style={inputStyle} component="input" name="buildingNumber" type="text" placeholder="برجاء ادخال رقم العقار"/>
                    </div>
                    
                    <div style={{textAlign: 'center', position: 'relative'}}>
                        <button disabled={pristine || submitting} type="submit" style={{paddingRight:"40px",paddingLeft:"40px", marginLeft: '30px', borderRadius: '5px', marginBottom: '60px', marginTop: '20px'}}>بحث</button>
                        <button disabled={submitting} type="submit" style={buttonStyle}>ارجاع جميع العقارات</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset} style={buttonStyle}>اخلاء جميع الخانات</button>
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