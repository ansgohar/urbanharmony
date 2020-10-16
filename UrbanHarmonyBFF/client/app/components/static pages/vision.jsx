import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import * as config from '../../../config/config';

class Vision extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: ''
        }
    }

    fetchAbout() {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        const host = `http://${config.host}:${config.cms_port}`;
        const path = `${host}/dynamictexts`;
        const query = `${path}?location=about`;

        fetch(query, options)
            .then(res => res.json())
            .then(body => this.setState({about: body[0].details}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchAbout();
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding greyish-background">
                    <h2 className="sec-h2 add-padding">رؤيتنا و أهدافنا</h2>
                    <div className="add-margin" style={{fontSize: "20px"}}>
                        <ReactMarkdown source={this.state.about}/>
                    </div>
                </div>
            </div>
        );


    }
}

export default connect()(Vision);
