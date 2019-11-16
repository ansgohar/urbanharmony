'use strict';
import {React, Component} from 'react';
import {Field, reduxForm, } from 'redux-form';

class registerForm extends Component{

    constructor(props){
        super(props)
    }

    render() {

        const { handleSubmit, pristine, reset, submitting } = this.props;

        return(
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">التسجيل في المسابقة</h2>
                    <h5 className="card-subtitle mb-5 text-muted">برجاء ادخال بياناتك الشخصية</h5>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registrationForm'
})(registerForm);