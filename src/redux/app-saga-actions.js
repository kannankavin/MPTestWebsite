import APP_ACTION_TYPES from 'src/redux/app-saga-action-types';

export const initSetEnv = ({ENV}) => ({
  type: 'APP_REDUCER/initSetEnv',
  payload: ENV,
});

export const initWebsiteAdd = ({site, onSuccess}) => ({
  type: 'APP_REDUCER/initWebsiteAdd',
  payload: {site, onSuccess},
});

export const initWebsiteGet = ({page,onSuccess}) => ({
  type: 'APP_REDUCER/initWebsiteGet',
  payload: {page,onSuccess},
});
