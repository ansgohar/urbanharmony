import React from 'react';
import { connect } from 'react-redux';

import WorkingProject from './workingProject.jsx';
import PlannedProject from './plannedProject.jsx';
import DoneProject from './doneProject.jsx';

import AllDoneProject from './allDoneProjects.jsx';
import AllPlannedProject from './allPlannedProjects.jsx';
import AllWorkingProject from './allWorkingProjects.jsx';

class MoreProjects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding ">
                    <h2 className="sec-h2">المشروعات</h2>
                    <div className="col-xs-12 tabs-container no-padding">
                        <div className="col-xs-12 filter-tabs">
                            <ul className="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                <li className="active"><a data-toggle="tab" href="#menu1">مشروعات جارية</a></li>
                                <li><a data-toggle="tab" href="#menu2">مشروعات مقترحة</a></li>
                                 <li><a data-toggle="tab" href="#menu3" id="1">مشروعات تمت</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">

                            <div id="menu1" className="tab-pane fade col-xs-12 no-padding active in">
                                <div className="col-xs-12 tite conferenceCard" >
                                    <AllWorkingProject hide={this.props.allworking.length === 0}
                                        allworking={this.props.allworking} />
                                </div>
                            </div>
                            <div id="menu2" className="tab-pane fade col-xs-12 no-padding">
                                <div className="tile pressCard col-xs-12">

                                    <AllPlannedProject hide={this.props.allplanned.length === 0}
                                        allplanned={this.props.allplanned} />
                                </div>

                            </div>
                            <div id="menu3" className="tab-pane fade col-xs-12 no-padding">
                                <div className="tile newsCard col-xs-12">
                                    <AllDoneProject hide={this.props.alldone.length === 0}
                                        alldone={this.props.alldone} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    allworking: state.allworking,
    alldone: state.alldone,
    allplanned: state.allplanned
});

const projectContainer = connect(
    mapStateToProps
)(MoreProjects);


export default projectContainer;
