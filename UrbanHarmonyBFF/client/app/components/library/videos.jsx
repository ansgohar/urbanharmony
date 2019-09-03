import React from 'react';
import { connect } from 'react-redux';
import { getVideos } from '../../actions/index.js'


class AllVideos extends React.Component {
    constructor(props) {
        super(props);
        this.getAllVideos();
    }

    getAllVideos() {
        fetch('/videos', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => this.props.dispatch(getVideos(data))
        );
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        let video = this.props.videos;
        return video.map(a => {
            return <VID record={a} key={a.id} />;
        });
    }
}


class VID extends React.Component {
    constructor(props) {
        super(props);
    }

    convertDateToArabic(date) {
        if (date) {
            let arabicDate = new Date(date);
            return arabicDate.toLocaleDateString('ar-EG');
        }
        else {
            return '' };

    }

    render() {
        return (
            <div className="tile pressCard col-xs-12 padding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-4 news-rightSide nopadding-mobile">
                        <table className="default-table no-border-table">
                            <tr className="table-row">
                                <td className="table-data table-header">اسم القناة/الاذاعة </td>
                                <td className="table-data">{this.props.record.channel}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">اسم البرنامج</td>
                                <td className="table-data">{this.props.record.title}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> تاريخ البث </td>
                                <td className="table-data">{this.convertDateToArabic(this.props.record.date)}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> اسماء الضيوف </td>
                                <td className="table-data">{this.props.record.guests}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">موضوع اللقاء</td>
                                <td className="table-data">{this.props.record.description}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">معلومات أخرى  </td>
                                <td className="table-data">{this.props.record.MoreDetails}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="col-xs-12 col-sm-6 news-leftSide nopadding-mobile">
                        <iframe className="iframe-size" src={this.props.record.url} />
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default connect()(AllVideos);