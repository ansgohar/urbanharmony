import React from 'react';
import { getAllDoneProject } from '../../actions/index'
import { connect } from 'react-redux';
import Image from '../image.jsx'

class AllDoneProject extends React.Component {
    constructor(props) {
        super(props);
    }

    getAllDone() {
        fetch('/project/all/done', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getAllDoneProject(data))
            );

    }
    componentDidMount() {
        this.getAllDone();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let projects = this.props.alldone;
        return projects.map(a => {
            return <Done record={a} key={a.id} />
        })
    }
}

class Done extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-12 newscard-container nopadding-mobile">
                <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                    <div className="image-container-4x3">
                        {/* <img src={this.props.record.image} /> */}
                        <Image src={this.props.record.image} /> 
                    </div>
                </div>
                <div className="col-xs-12 col-sm-9 news-leftSide">
                    <h3>{this.props.record.title}</h3>
                    <p>{this.props.record.event}</p>
                    {/* <div className="col-xs-12 no-padding">
                        <a href="#" className="share-btn"></a>
                        <a href="#" className="pdf-btn"></a>
                    </div> */}
                    <a class="read-more" href={"/projectDetail?project=" + this.props.record.id}>المزيد</a>
                </div>
            </div>
        );
    }
}

export default connect()(AllDoneProject);
