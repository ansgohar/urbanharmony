import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm, change } from 'redux-form'
import Dropzone from 'react-dropzone'
import { addImageToTheList } from '../../actions/index'

const validate = values => {
    const errors = {}
    if (!values.img1) {
        errors.img1 = 'مطلوب'
    } else {
        document.getElementById("img1").src = values.img1;
    }
    if (!values.img2) {
        errors.img2 = 'مطلوب'
    } else {
        document.getElementById("img2").src = values.img2;
    }

    if (!values.img3) {
        errors.img3 = 'مطلوب'
    } else {
        document.getElementById("img3").src = values.img3;
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <div>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched &&
                    ((error && <span style={{ color: 'red' }}>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

class UploadImages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div>
                {
                    (typeof this.props.token == "undefined") ?
                        <div>
                            <p>
                                ان كنت قد سجلت فى المسابقه برجاء التأكد من استخدام الرابط المرفق فى البريد الالكترونى
                            </p>
                        </div>
                        :

                        <div className="col-xs-12 competitionDetailsForm" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >

                                <div className="form-group">
                                    <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="img1">الرابط الأول<span className="requiredField">*</span></label>
                                    <div className="col-xs-12 col-sm-3 formField">
                                        <Field name="img1" component={renderField} type="text" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="img2">الرابط الثانى<span className="requiredField">*</span></label>
                                    <div className="col-xs-12 col-sm-3 formField">
                                        <Field name="img2" component={renderField} type="text" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="img3">الرابط الثالث<span className="requiredField">*</span></label>
                                    <div className="col-xs-12 col-sm-3 formField">
                                        <Field name="img3" component={renderField} type="text" className="form-control" placeholder="" />
                                    </div>
                                    <button type="submit" 
                                    onClick={() => this.props.dispatch(change('uploadImages', 'token',  this.props.token))} 
                                    disabled={pristine || submitting} className="btn btn-info submitFormBtn" >إشترك</button>
                                </div>
                                <div className="form-group">
                                    <img id="img1" width="200px"/>
                                    <img id="img2" width="200px"/>
                                    <img id="img3" width="200px"/>
                                </div>

                            </form>
                        </div>
                }
            </div>
        );
    }

}

export default reduxForm({
    form: 'uploadImages',  // a unique identifier for this form
    validate // <--- validation function given to redux-form
})(UploadImages)