import React from 'react';
import { getAllPlannedProject } from '../../actions/index'
import { connect } from 'react-redux';

class AllPlannedProject extends React.Component {
    constructor(props) {
        super(props);
    }

    getAllPlanned() {
        fetch('/project/all/planned', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getAllPlannedProject(data))
            );

    }
    componentDidMount() {
        this.getAllPlanned();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let projects = this.props.allplanned;
        return projects.map(a => {
            return <Planned record={a} key={a.id} />
        })
    }
}

class Planned extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-12 newscard-container nopadding-mobile">
                <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                    <div className="image-container-4x3">
                        <img src={this.props.record.image}/>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-9 news-leftSide">
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

export default connect()(AllPlannedProject);
