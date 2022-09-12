import { configureStore } from '@reduxjs/toolkit';
import DataSlice from './features/DataSlice';

export default configureStore({
  reducer: {
    data: DataSlice,
  },
  devTools: true,
});
