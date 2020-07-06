import React, {Component, Fragment} from 'react';
import Study from './study.jsx';

class Studies extends Component{
    constructor(props) {
        super(props);

        this.state = {
            studies: [],
            researchName: '',
            researcher: '',
            publicationDate: '',
            publishingHouse: ''
        }

        this.getStudies = this.getStudies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // TODO: Add search support from filterHandler
    getStudies() {
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

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let fields = '{researchName, researcher, publicationDate, publishingHouse, brief, research {url}}';
        let filters = 'limit: 100000, where: {';

        let searchFields = ['researchName', 'researcher', 'publicationDate', 'publishingHouse'];

        Object
        .keys(this.state)
        .forEach(item => {
            if (searchFields.includes(item)) {
                if (this.state[item] === '') {
                    let index = searchFields.indexOf(item);
                    searchFields.splice(index, 1);
                }
            }
        });

        for (let i = 0; i < searchFields.length; ++i) {
            if (i !== 0) {
                filters += `, `;
            }

            filters += `${searchFields[i]}${searchFields[i] !== 'publicationDate' ? '_contains: ' : ': '}"${this.state[searchFields[i]]}"`;
        }

        filters += '}';

        let query = `{ studies (${filters}) ${fields}}`;

        let path = '/studies/filter';
        let request = {
            method: 'POST',
            body: JSON.stringify({query: query}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        
        fetch(path, request)
            .then(response => response.json())
            .then(data => this.setState({studies: data[0].data.studies}))
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
                <div className="col-xs-12" style={{width: '100%', margin: '15px'}}>
                    <div className="card" style={{width: '100%', padding: '30px'}}>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <h1>بحث: </h1>
                                <hr />
                                <div className="row">
                                    <div className="form-group col-xs-6">
                                        <input className="form-control" type="text" name="researchName" onChange={this.handleChange} placeholder="اسم البحث"/>
                                    </div>
                                    <div className="form-group col-xs-6">
                                        <input className="form-control" type="text" name="researcher" onChange={this.handleChange} placeholder="اسم الباحث"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-6">
                                        <input className="form-control" type="date" name="publicationDate" onChange={this.handleChange} placeholder="تاريخ البحث"/>
                                    </div>
                                    <div className="form-group col-xs-6">
                                        <input className="form-control" type="text" name="publishingHouse" onChange={this.handleChange} placeholder="دار النشر"/>
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" value="submit">بحث</button>
                            </form>
                        </div>
                    </div>
                </div>
                {studies && studies.length !== 0 && studies}
                {!studies || studies.length === 0 && <div className='col-xs-12' style={{textAlign: 'center', margin: '50px'}}><div className='card'><div className='card-body'><h1 className='body-text'>لا يوجد دراسات</h1></div></div></div>}
            </div>
        );
    }
}

export default Studies;