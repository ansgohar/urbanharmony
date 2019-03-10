import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux'
import articles from './articles'
import detail from './detail'
import news from './news/firstnews'
import oneproject from './projects/firstproject'
import done from './projects/done'
import planned from './projects/planned'
import working from './projects/working'
import pressNews from './news/pressNews'
import internalnews from './news/iNews'
import allinternalnews from './news/ALLintNews'
import competition from './competition/competition'
import winners from './competition/winners'
import allCompetitions from './competition/allCompetitions'
import competitionID from './competition/competitionID'
import internalDetail from './news/intDetails'
import alldone from './projects/alldone'
import allworking from './projects/allworking'
import allplanned from './projects/allplanned'
import projectDetail from './projects/projectDetail'
import surveyList from './complain/surveylist'
import photos from './competition/photos'
import governorates from './complain/governorate'
import regions from './complain/regions'
import laws from './laws-borders/laws'
import borders from './laws-borders/borders'
import guidelines from './laws-borders/guidelines'
import complainsList from './complain/complainslist'
import globalsearch from './globalsearch'
import books from './library/books'

import { reducer as reduxFormReducer } from 'redux-form';

const reducers = combineReducers({
    articles,
    detail,
    news,
    oneproject,
    done,
    working,
    planned,
    pressNews,
    internalnews,
    allinternalnews,
    competition,
    allCompetitions,
    internalDetail,
    alldone,
    allplanned,
    allworking,
    projectDetail,
    surveyList,
    photos,
    governorates,
    regions,
    laws,
    borders,
    complainsList,
    globalsearch,
    winners,
    competitionID,
    books,
    guidelines,
    form: reduxFormReducer // mounted under "form"
})

export default reducers

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = configureStore();