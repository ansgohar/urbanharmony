'use strict';

import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            competitions: this.props.competitions,
            name: '',
            email: '',
            phone: '',
            age: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        let endpoint = '/contestant';
        let options = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Node-Fetch'
            }
        };

        let response = null;

        try {
            response = await fetch(endpoint, options);
        } catch (e) {
            console.error(e);
            return window.alert('خطأ في التسجيل، برجاء المحاولة في وقت اخر');
        }

        if (!response) {
            window.alert('خطأ في التسجيل، برجاء المحاولة في وقت اخر');
        } else {
            window.alert('نجح التسجيل');
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>التسجيل في المسابقة</h1>
                <hr />
                <div className="form-group">
                    <label htmlFor="name">الاسم*</label>
                    <input className="form-control" type="text" name="name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">البريد الاكتروني</label>
                    <input className="form-control" type="email" name="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">الهاتف</label>
                    <input className="form-control" type="tel" name="phone" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">السن</label>
                    <input className="form-control" type="number" name="age" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary" type="submit" value="submit">تسجيل</button>
            </form>
        );
    }
}

export default Signup;