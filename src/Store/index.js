import {configureStore} from '@reduxjs/toolkit';
import isDark from './slices/';
// import Leagues from '../redux/reducers/leagues';
// import Profile from '../redux/reducers/profile';
import NewUserCheckReducer from './Reducers/NewUserCheckReducer';
import LeaguesReducer from './Reducers/League';
import CoinReducer from './Reducers/CoinReducer';
import SingleLeagueReducer from './Reducers/SingleLeagueReducer';
import SingleStoryReducer from './Reducers/SingleStoryReducer';
import DraftStoriesReducer from './Reducers/DraftStoriesReducer';
import StoriesReducer from './Reducers/StoriesReducer';
import BookmarkStoriesReducer from './Reducers/BookmarkStoriesReducer';
import CoinHistoryReducer from './Reducers/CoinHistoryReducer';
import ScreenReducer from './Reducers/ScreenReducer.js';
import AuthReducer from './Reducers/AuthReducer';
import UserStoriesReducer from './Reducers/UserStoriesReducer';

export const Store = configureStore({
  reducer: {
    isDark: isDark,
    leagues: LeaguesReducer,
    // userAuth: AuthReducer,
    userCheck: NewUserCheckReducer,
    Coin: CoinReducer,
    SingleLeague: SingleLeagueReducer,
    SingleStory: SingleStoryReducer,
    DraftStories: DraftStoriesReducer,
    StoriesReducer: StoriesReducer,
    BookmarkStoriesList: BookmarkStoriesReducer,
    CoinsHistory: CoinHistoryReducer,
    ScreenReducer: ScreenReducer,
    AuthReducer: AuthReducer,
    UserStoriesReducer: UserStoriesReducer,
  },
});
