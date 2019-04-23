import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
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
                                    <td className="table-data"> قلعة صلاح الدين- صلاح سالم- القاهرة</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">ص . ب</td>
                                    <td className="table-data">ص.ب 55 القلعة</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">الرمز البريدي</td>
                                    <td className="table-data"> رمز بريدي 11411- القاهرة</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">  التليفون </td>
                                    <td className="table-data">25145558 - 25145557-25145553 / (202)</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header"> فاكس </td>
                                    <td className="table-data">25145552  (202)</td>
                                </tr>

                                <tr className="table-row">
                                    <td className="table-data table-header">البريد الإكتروني </td>
                                    <td className="table-data">info@urbanharmony.org</td>
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
