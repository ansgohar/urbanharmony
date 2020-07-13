import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import * as config from '../../../config/config';

class Study extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xs-12" style={{width: '100%', margin: '15px'}}>
                <div className="card" style={{width: '100%', padding: '30px'}}>
                    <div className="card-body">
                        <h3 className="card-title">{this.props.researchName}</h3>
                        <h4 class="card-subtitle mb-2 text-muted">{this.props.researcher}</h4>
                        <hr />
                        <ul className="list-group list-group-flush" style={{paddingLeft: '40px'}}>
                            <li className="list-group-item">
                                <h6>نبذة:</h6>
                                <ReactMarkdown className='card-text' source={this.props.brief} />
                            </li>
                            <li className="list-group-item">
                                <h6>تاريخ النشر:</h6>
                                <p>{(new Date(this.props.publicationDate)).toLocaleDateString('ar-EG')}</p>
                            </li>
                            <li className="list-group-item">
                                <h6>دار النشر:</h6>
                                <p>{this.props.publishingHouse}</p>
                            </li>
                            <li className="list-group-item">
                                <h6>البحث:</h6>
                                <a href={`http://${config.host}:${config.cms_port}${this.props.url}`} target='_blank'>انقر هنا لفحص ملف البحث</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;