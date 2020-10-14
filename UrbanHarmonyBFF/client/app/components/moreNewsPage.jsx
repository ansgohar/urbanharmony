import React from 'react';
import { connect } from 'react-redux';
import MorePressNews from './pressnews.jsx';
import AllIntNews from './moreInternalNews.jsx'

class MoreNews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="news-home" className="row news-home">

                <div className="col-xs-12 no-padding sec6">
                    <h2 className="sec-h2">اخر الاخبار</h2>
                    <div className="filter-container">
                        <input type="radio" id="pressCard" name="color" value="pressCard" />
                        <label className="filter-pressBtn filterBtn  col-xs-6" htmlFor="pressCard">صحافة</label>
                        <input type="radio" id="newsCard" name="color" value="newsCard" checked/>
                        <label className="filter-newsCard filterBtn  col-xs-6" htmlFor="newsCard">أخبار</label>
                        <MorePressNews hide={this.props.pressNews.length === 0}
                            pressNews={this.props.pressNews} />
                        <AllIntNews hide={this.props.allinternalnews.length === 0}
                            allinternalnews={this.props.allinternalnews} />
                    </div>
                </div>

            </div>


        );
    }
}



const mapStateToProps = (state, ownProps) => ({
    pressNews: state.pressNews,
    allinternalnews: state.allinternalnews,
});

const MoreContainer = connect(
    mapStateToProps
)(MoreNews);


export default MoreContainer;
