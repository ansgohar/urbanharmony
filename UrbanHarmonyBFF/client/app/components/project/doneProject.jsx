import React from 'react';
import { getDoneProject } from '../../actions/index'
import { connect } from 'react-redux';

class DoneProject extends React.Component {
    constructor(props) {
        super(props);
    }

    getDone() {
        fetch('/project/done', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getDoneProject(data))
            );

    }
    componentDidMount() {
        this.getDone();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let projects = this.props.done;
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

export default connect()(DoneProject);
