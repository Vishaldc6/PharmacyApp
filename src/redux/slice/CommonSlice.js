import {createSlice} from '@reduxjs/toolkit';
import {darkThemeColors, lightThemeColors} from '../../styles/colors';

const initState = {
  isDarkMode: false,
  colors: lightThemeColors,
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: initState,
  reducers: {
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      state.colors = action.payload ? darkThemeColors : lightThemeColors;
    },
  },
});

export const {setTheme} = CommonSlice.actions;
export default CommonSlice.reducer;
