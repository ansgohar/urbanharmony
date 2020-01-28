import React, {Component, Fragment} from 'react';
import Study from './study.jsx';

class Studies extends Component{
    constructor(props) {
        super(props);

        this.state = {
            studies: []
        }

        this.getStudies = this.getStudies.bind(this);
    }

    // TODO: Add search support from filterHandler
    getStudies(query) {
        let path = '/studies';
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'ReactJS'
            }
        }

        fetch(path, request)
            .then(response => response.json())
            .then(data => this.setState({studies: data}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getStudies(null);
    }

    render() {

        let studies = this.state.studies.map(study => {
            return <Study researchName={study.researchName} researcher={study.researcher} brief={study.brief} publicationDate={study.publicationDate} publishingHouse={study.publishingHouse} url={study.research.url}/>
        });

        return (
            <div className="container">
                {studies && studies.length !== 0 && studies}
                {!studies || studies.length === 0 && <div className='col-xs-12' style={{textAlign: 'center', margin: '50px'}}><div className='card'><div className='card-body'><h1 className='body-text'>لا يوجد ابحاث</h1></div></div></div>}
            </div>
        );
    }
}

export default Studies;