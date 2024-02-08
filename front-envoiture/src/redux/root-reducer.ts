import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from './reducer/search-reducer';
import chatReducer from './reducer/chat-reducer';
import userReducer from './reducer/auth-reducer';
import accountReducer from './reducer/account-reducer';
import ridesReducer from './reducer/ride-reducer';
import reviewReducer from './reducer/review-reducer';
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const searchReducerPersistConfig = {
  key: 'search',
  storage,
};

const chatReducerPersistConfig = {
  key: 'chat',
  storage,
};

const authUserPersistConfig = {
  key: 'user',
  storage,
};

const accountPersistConfig = {
  key: 'account',
  storage,
};

const ridesPersistConfig = {
  key: 'rides',
  storage,
};

const reviewPersistConfig = {
  key: 'review',
  storage,
};

export const rootReducer = combineReducers({
  chat: persistReducer(chatReducerPersistConfig, chatReducer),
  search: persistReducer(searchReducerPersistConfig, searchReducer),
  authUser: persistReducer(authUserPersistConfig, userReducer),
  account: persistReducer(accountPersistConfig, accountReducer),
  rides: persistReducer(ridesPersistConfig, ridesReducer),
  review: persistReducer(reviewPersistConfig, reviewReducer),
});
