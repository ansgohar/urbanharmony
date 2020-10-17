import Image from '../image.jsx';
import React, {Component} from 'react';
import * as config from '../../../config/config.js';

class JournalsEntry extends Component {
    constructor(props) {
        super(props);
    }

    convertDateToArabic(date) {
        if (date) {
            let arabicDate = new Date(date);
            return arabicDate.toLocaleDateString('ar-EG');
        } else {
            return date;
        }
    }

    render() {
        return (
            <div className="tile pressCard col-xs-12 nopadding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        {this.props.record.image && this.props.record.image.url ?
                            <div className="image-container-4x3"><Image
                                src={`http://${config.host}:${config.cms_port}/${this.props.record.image.url}`}/></div>
                            : ''
                        }
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <span className="cardCat">صحافة</span>
                        <h3>{this.props.record.title}</h3>
                        <span className="author">   كتبة {this.props.record.author} </span>
                        {this.props.record && this.props.record.DatePublished ? <h5 className="h5news">تاريخ النشر
                            : {this.convertDateToArabic(this.props.record.DatePublished)}</h5> : ''}
                        <p>{this.props.record.article}</p>
                        {this.props.record && this.props.record.linkURL ?
                            <a target="_blank" href={this.props.record.linkURL}>مصدر الخبر</a> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default JournalsEntry;