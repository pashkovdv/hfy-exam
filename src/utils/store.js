import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articleSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
