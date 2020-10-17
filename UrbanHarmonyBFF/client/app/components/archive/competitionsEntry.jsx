import Image from '../image.jsx';
import React, {Component} from 'react';
import * as config from '../../../config/config.js';

class CompetitionsEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="col-xs-12 tite conferenceCard no-padding">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3">
                            {this.props.record.photo &&
                            this.props.record.photo.url && this.props.record.photo.url !==
                            `http://${config.host}:${config.cms_port}` || this.props.record.photo.url !==
                            'http://localhost:1337' ?
                                    <Image src={`http://${config.host}:${config.cms_port}${this.props.record.photo.url}`} />
                                : ''
                            }
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide">
                        <div className="col-xs-12 winner-name no-padding">
                            <div><span>المسابقة</span> {this.props.record.Title}</div>
                        </div>
                        <p> {this.props.record.Description} </p>
                        <a className="read-more" href={"/competitionInfo?competition="+this.props.record.id}>المزيد</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompetitionsEntry;