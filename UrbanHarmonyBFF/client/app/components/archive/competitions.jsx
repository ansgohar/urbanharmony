import React, {Component} from 'react';
import CompetitionsEntry from './competitionsEntry.jsx';
import * as config from '../../../config/config.js';

class Competitions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchCompetitions();
    }

    fetchCompetitions() {
        const host = `http://${config.host}:${config.cms_port}`;
        const path = `${host}/competitions`;
        const query = `${path}?_sort=deadline:desc`;

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch(query, options)
            .then(res => res.json())
            .then(body => {
                body.sort((a, b) => a.deadline < b.deadline ? 1 : -1);
                this.setState({data: body, loaded: true});
            })
            .catch(err => console.error(err));
    }


    render() {
        if (!this.state.loaded) {
            return(
                <div className="loading">
                    <img src="assets/Spinner-1s-200px.gif"/>
                    <h3> برجاء الانتظار ... </h3>
                </div>
            );
        }

        return(
            <div style={{marginTop: '200px'}}>
                {this.state.data.map(val => <CompetitionsEntry record={val} key={val.id} />)}
            </div>
        );
    }
}

export default Competitions;