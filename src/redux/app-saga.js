import {call, put, takeEvery} from 'redux-saga/effects';
import {setEnv} from 'src/redux/app-slice';
import {setProfile} from 'src/redux/persist-slice';
import APP_ACTION_TYPES from 'src/redux/app-saga-action-types';
import Api from 'src/utils/service';
import {API_URLS} from 'src/utils/constants';

// Saga Workers
export function* initSetEnvWorker(action) {
  yield put(setEnv(action.payload));
}

export function* initWebsiteAddWorker(action) {
  const params = {
    site: action.payload.site,
  };

  try {
    const response = yield call(Api, {
      url: API_URLS.WEBSITE_ADD,
      params,
    });
    action.payload.onSuccess(response);
  } catch (error) {
    console.log(error);
  }
}

export function* initWebsiteGetWorker(action) {
  const url = API_URLS.WEBSITE_GET;
  url['URI'] = url['URI'].split('?')[0] + '?page='+action.payload.page;

  try {
    const response = yield call(Api, {
      url: url,
    });
    action.payload.onSuccess(response);
  } catch (error) {
    console.log(error);
  }
}

// Saga Watchers
export function* initSetEnvWatcher() {
  yield takeEvery(APP_ACTION_TYPES.INIT_SET_ENV, initSetEnvWorker);
}
export function* initWebsiteAddWatcher() {
  yield takeEvery(APP_ACTION_TYPES.INIT_WEBSITE_ADD, initWebsiteAddWorker);
}
export function* initWebsiteGetWatcher() {
  yield takeEvery(APP_ACTION_TYPES.INIT_WEBSITE_GET, initWebsiteGetWorker);
}