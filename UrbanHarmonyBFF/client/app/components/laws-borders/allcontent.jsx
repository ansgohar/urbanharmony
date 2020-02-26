import React from 'react';
import { connect } from 'react-redux';
import LawsPage from './laws.jsx'
import Borders from './borders.jsx'
import Guidelines from './guidelines.jsx'


class LawsBordersPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }

  render() {
    return (
      <div id="borders-page" class="row borders-page">
        <div class="col-xs-12 no-padding ">
          <h2 class="sec-h2"> القوانين و إشتراطات</h2>
          <div class="col-xs-12 tabs-container no-padding">
            <div class="col-xs-12 filter-tabs">
              <ul class="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                <li class="active">
                  <a data-toggle="tab" href="#menu1">القوانين</a>
                </li>
                <li>
                  <a data-toggle="tab" href="#menu2">حدود و إشتراطات</a>
                </li>
                <li>
                  <a data-toggle="tab" href="#menu3" id="1">الأدلة الإرشادية</a>
                </li>
              </ul>
            </div>
            <div class="tab-content">
              <div id="menu1" class="tab-pane fade col-xs-12 no-padding active in">
                <div class="col-xs-12 col-sm-10 limitheader-cont">
                  <div class="col-xs-12">
                    <h2 class="col-xs-12">القوانين والعقوبات المترتبة على مخالفة قواعد البناء في المناطق المتميزة</h2>
                  </div>
                </div>
                <LawsPage laws={this.props.laws} hide={this.props.laws.length === 0} />
              </div>

              <div id="menu2" class="tab-pane fade col-xs-12 no-padding">
                <div class="col-xs-12 col-sm-10 limitheader-cont">
                  <div class="col-xs-12">
                    <h2 class="col-xs-12">الحدود والإشتراطات للمناطق المتميزة داخل جمهورية مصر العربية</h2>
                  </div>
                </div>
                <Borders borders={this.props.borders} hide={this.props.borders.length === 0} />
              </div>


              <div id="menu3" class="tab-pane fade col-xs-12 no-padding">
                <div class="col-xs-12 col-sm-10 limitheader-cont">
                  <div class="col-xs-12">
                    <h2 class="col-xs-12">الادلة الارشادية</h2>
                  </div>
                </div>
                <Guidelines guidelines={this.props.guidelines} hide={this.props.guidelines.length === 0} />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  laws: state.laws,
  borders: state.borders,
  guidelines: state.guidelines
});

export default connect(mapStateToProps)(LawsBordersPage);