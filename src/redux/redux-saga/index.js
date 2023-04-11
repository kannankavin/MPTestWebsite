import {all} from 'redux-saga/effects';
import {
  initSetEnvWatcher,
  initWebsiteAddWatcher, 
} from 'src/redux/app-saga';


export default function* rootSaga() {
  yield all([
    initSetEnvWatcher(),
    initWebsiteAddWatcher(),
  ]);
}