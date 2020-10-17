import React from 'react';
import Incidents from './incidents.jsx';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='borders-page' className='row borders-page'>
                <div className="col-xs-12 no-padding">
                    <h2 className="sec-h2">المرصد الحضاري و الظبطية القضائية</h2>
                    <div className="col-xs-12 tabs-container no-padding">

                        <div className="col-xs-12 filter-tabs">
                            <ul className="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                <li className="active">
                                    <a data-toggle="tab" href="#menu1">المرصد الحضاري</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#menu2">الظبطية القضائية</a>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content">
                            <div id="menu1" className="tab-pane fade col-xs-12 no-padding active in">
                                <div className="col-xs-12 col-sm-10 limitheader-cont">
                                    <Incidents type={'incident'}/>
                                </div>
                            </div>

                            <div id="menu2" className="tab-pane fade col-xs-12 no-padding">
                                <div className="col-xs-12 col-sm-10 limitheader-cont">
                                    <Incidents type={'other'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index