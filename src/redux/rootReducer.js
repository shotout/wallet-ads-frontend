import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { reduxKey } from '../config';
// slices
import appSessionReducer from './slices/appSession';
import userAccessReducer from './slices/userAccess';
import appToolsReducer from './slices/appTools';
import modalSuccess from './modal/modalSuccess';
// ----------------------------------------------------------------------

//mfs
import generalReducer from './general';
import userReducer from './userState';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userAccessPersistConfig = {
  key: reduxKey.userAccess,
  storage,
  keyPrefix: 'redux-',
  whitelist: ['appAccessSignature', 'userProfile'],
};

const rootReducer = combineReducers({
  appSession: appSessionReducer,
  userAccess: persistReducer(userAccessPersistConfig, userAccessReducer),
  appTools: appToolsReducer,
  modalSuccess,
  generalReducer,
  userReducer
});

export { rootPersistConfig, rootReducer };
