import React from 'react';
import { connect } from 'react-redux';
import * as queryString from "query-string";
import { getGlobalSearch } from '../../actions/index.js'
// import { NavLink } from 'react-router-dom';

class GlobalSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.SearchResult();
    }

    SearchResult() {
        var parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        console.log(parsed.query);
        console.log(this.props.location);
        fetch('/globalsearch/' + parsed.query, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getGlobalSearch(data))

        );
    }

    render() {
        if (this.props.globalsearch.length === 0) {
            return null;
        }

        return (
            <div id="search-resultpage" class="row search-resultpage">

                <div class="col-xs-12 no-padding sec6">

                    <div class="filter-container">

                        <h2 class="sec-h2">نتيجة البحث</h2>
                        {this.renderPage()}
                    </div>
                </div>
            </div>
        );

    }


    renderPage() {
        if (this.props.globalsearch.length > 0) {
            let search = this.props.globalsearch;
            return search.map(a => {
                return <GSP record={a} key={a.id} />

            })

        }
    }
}

class GSP extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (



            <div class="tite conferenceCard col-xs-12">
                <div class="col-xs-12">
                    <h3 class="sec-h3">نتيجة البحث في {this.props.record.contentType}</h3>
                </div>
                <div class="col-xs-12 newscard-container nopadding-mobile">
                    <div class="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div class="image-container-16x9">
                            <img src={this.props.record.image} />
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <h3>{this.props.record.title}</h3>
                        <p>{this.props.record.details}</p>
                        {/* <a href="#">اقرأ المزيد</a> */}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    globalsearch: state.globalsearch
});

export default connect(mapStateToProps)(GlobalSearchPage);