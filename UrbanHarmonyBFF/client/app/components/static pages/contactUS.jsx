import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import * as config from "../../../config/config";

class ContactUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: []
        }
    }

    fetchInfo() {
        const host = `http://${config.host}:${config.cms_port}`;
        const path = `${host}/dynamictexts`;
        const query = `${path}?location=contact`;

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch(query, options)
            .then(res => res.json())
            .then(body => {
                const arr = body[0].details.split('\r\n');
                let buffer = [];

                for (let i = 1; i < arr.length; i+=2){
                    buffer.push(arr[i]);
                }

                this
                    .setState({
                        info: buffer
                    });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchInfo();
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding ">
                    <h2 className="sec-h2 add-padding">اتصل بنا </h2>
                    <div className="add-margin">
                        <h3> الجهاز القومي للتنسيق الحضاري</h3>
                        <div className="col-sm-6 section-right-side">
                            <table className="default-table">
                                <tr className="table-row">
                                    <td className="table-data table-header">العنوان </td>
                                    <td className="table-data">{this.state.info[0]}</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">ص . ب</td>
                                    <td className="table-data">{this.state.info[1]}</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">الرمز البريدي</td>
                                    <td className="table-data">{this.state.info[2]}</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">  التليفون </td>
                                    <td className="table-data">{this.state.info[3]}</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header"> فاكس </td>
                                    <td className="table-data">{this.state.info[4]}</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">البريد الإكتروني </td>
                                    <td className="table-data">{this.state.info[5]}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default connect()(ContactUs);
