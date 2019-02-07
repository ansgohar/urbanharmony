import React from 'react';
import { getWorkingProject } from '../../actions/index'
import { connect } from 'react-redux';

class WorkingProject extends React.Component {
    constructor(props) {
        super(props);
    }

    getProject() {
        fetch('/project/working', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getWorkingProject(data))
            );

    }
    
    componentDidMount() {
        this.getProject();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let projects = this.props.work;
        return projects.map(a => {
            return <Project record={a} key={a.id} />
        })
    }
}

class Project extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-12 col-sm-4 projectCardContainer">
                <div className="projectCard col-xs-12 col-sm-12">
                    <p>مشاركات إجتماعية</p>
                    <h3>{this.props.record.title}</h3>
                    <p>{this.props.record.event}</p>
                    <a href={"/projectDetail?project=" + this.props.record.id}>المزيد</a>
                    <br/>
                </div>
            </div>
        );
    }
}

export default connect()(WorkingProject);
