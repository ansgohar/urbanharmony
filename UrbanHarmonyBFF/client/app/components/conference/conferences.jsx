import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class Conferences extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding greyish-background">
                    <h2 className="sec-h2 add-padding">الندوات والمؤتمرات</h2>
                    <div className="add-margin">
                        <table className="default-table no-border-table">
                            <tr className="table-row">
                                <td className="table-data table-header">عنوان المؤتمر </td>
                                {/* <td className="table-data">{this.props.record.channel}</td> */}
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> تاريخ المؤتمر </td>
                                {/* <td className="table-data">{this.props.record.title}</td> */}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );


    }
}

export default connect()(Conferences);
