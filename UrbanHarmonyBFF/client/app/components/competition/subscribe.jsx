import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm, change } from 'redux-form'
import Dropzone from 'react-dropzone'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'مطلوب'
    } else if (values.name.length > 15) {
        errors.name = 'الحد الاقصى 15 حرف'
    }

    if (!values.email) {
        errors.email = 'مطلوب'
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
                <input {...input} placeholder={label} type={type} className="form-control"/>
                {touched &&
                    ((error && <span style={{color:'red'}}>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
class Subscribe extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div className="col-xs-12 competitionDetailsForm" >
                <form className="form-horizontal" onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="Name">الاسم<span className="requiredField">*</span></label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field name="name" component={renderField} type="text" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="email">صورة شخصية</label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field name="file" component='input' type="hidden" />
                            <Dropzone
                                ref="dropzone"
                                onDrop={
                                    (acceptedFiles) =>
                                        acceptedFiles.forEach(file => {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                console.log(reader);
                                                const fileAsBinaryString = btoa(reader.result);

                                                this.props.dispatch(change('subscribe', 'file', fileAsBinaryString))
                                                //TODO: poor man hack try to find some more React style thing
                                                document.getElementById("previewImages").src = "data:image/jpeg;base64," + fileAsBinaryString;

                                            };
                                            reader.onabort = () => console.log('file reading was aborted');
                                            reader.onerror = () => console.log('file reading has failed');

                                            reader.readAsBinaryString(file);
                                        })
                                }
                                multiple={false}
                                accept='image/*'>
                                <img display="block" width="100%" id="previewImages" />
                            </Dropzone>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="email">السن</label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field component="input" name="age" type="text" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12"  >المهنة</label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field component="input" name="job" type="text" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12"  > البريد الإلكتروني<span className="requiredField">*</span></label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field component={renderField} name="email" type="email" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel col-sm-1 col-xs-12"  >المحمول</label>
                        <div className="col-xs-12 col-sm-3 formField">
                            <Field component="input" name="phone" type="text" className="form-control" placeholder="" />
                        </div>
                        <button type="submit" disabled={pristine || submitting} className="btn btn-info submitFormBtn" >إشترك</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'subscribe',  // a unique identifier for this form
    validate // <--- validation function given to redux-form
})(Subscribe)