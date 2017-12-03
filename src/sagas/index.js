import { all } from 'redux-saga/effects';
import { newsSagas } from './news';

export default function* rootSaga () {
    yield all(newsSagas);
}