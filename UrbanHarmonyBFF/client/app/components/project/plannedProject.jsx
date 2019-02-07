import React from 'react';
import { getPlannedProject } from '../../actions/index'
import { connect } from 'react-redux';

class PlannedProject extends React.Component {
    constructor(props) {
        super(props);
    }

    getPlanned() {
        fetch('/project/planned', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getPlannedProject(data))
            );

    }
    componentDidMount() {
        this.getPlanned();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let projects = this.props.plan;
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

export default connect()(PlannedProject);
