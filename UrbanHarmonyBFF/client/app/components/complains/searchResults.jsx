import { getComplainsSurveyList } from '../../actions/index.js'
import * as queryString from "query-string";
import { reset } from 'redux-form';

export default (async function searchResults(values, dispatch) {
    console.log(values);

    if (values.streetName != null) {
        console.log(values.streetName);
        fetch('/complains/surveyAddress/' + values.streetName, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => dispatch(getComplainsSurveyList(data))

        );
    }

    else if (values != null && values.streetName == null) {
        let querySearch = queryString.stringify(values);
        console.log(querySearch);
        fetch('/complains/surveySearch/' + querySearch, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => dispatch(getComplainsSurveyList(data))

        );
    }
});


