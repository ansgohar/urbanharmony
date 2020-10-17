import React, {Component} from 'react';
import JournalsEntry from './journalsEntry.jsx';

class Journals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews() {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch('/articles/999999', options)
            .then(res => res.json())
            .then(body => {
                body.sort((a, b) => a.DatePublished < b.DatePublished ? 1 : -1);
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
              {this.state.data.map(val => <JournalsEntry record={val} key={val.id} />)}
          </div>
        );
    }
}

export default Journals;