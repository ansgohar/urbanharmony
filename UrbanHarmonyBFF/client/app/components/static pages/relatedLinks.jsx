import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import * as config from '../../../config/config';

class RelatedLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: ''
        }
    }

    fetchSources() {
        const host = `http://${config.host}:${config.cms_port}`;
        const path = `${host}/dynamictexts`;
        const query = `${path}?location=related`;

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch(query, options)
            .then(res => res.json())
            .then(body => this.setState({links: body[0].details}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchSources();
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding greyish-background">
                    <h2 className="sec-h2 add-padding">مواقع ذات صلة</h2>
                    <div className="add-margin">
                        <div className="col-sm-6 section-right-side related-links">
                            <ReactMarkdown source={this.state.links} />
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default connect()(RelatedLinks);
