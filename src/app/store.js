import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../utils/articleSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
