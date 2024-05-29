import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

export type DataSource = {
    name: string;
    id: string
};

export type RootState = {
    keyValue: {
        currentDataSource: DataSource;
    };
};

const initialState: RootState = {
    keyValue: {
        currentDataSource: {
            name: '',
            id: ''
        },
    },
};

const keyValueSlice = createSlice({
    name: 'keyValue',
    initialState,
    reducers: {
        setCurrentDataSource: (state, action: PayloadAction<DataSource>) => {
            state.keyValue.currentDataSource = action.payload;
        },
    },
});

export const { setCurrentDataSource } = keyValueSlice.actions;

const store = configureStore({
    reducer: {
        keyValue: keyValueSlice.reducer,
    },
});

export default store;