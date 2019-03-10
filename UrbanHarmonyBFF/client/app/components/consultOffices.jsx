import React from 'react';
import { connect } from 'react-redux';


class ConsultingOffices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tile conferenceCard col-xs-12 col-xm-10 page-margin">
                <div className="col-xs-12 newscard-container nopadding-mobile">
                    <div className="col-xs-12 news-rightSide nopadding-mobile">
                        <p>Testing offices</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => ({
    offices: state.offices,
});

export default connect(mapStateToProps)(ConsultingOffices);
