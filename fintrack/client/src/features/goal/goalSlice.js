import { createSlice } from '@reduxjs/toolkit';

const initialGoal = localStorage.getItem('budgetGoal') ? Number(localStorage.getItem('budgetGoal')) : 0;

const initialState = {
    budgetGoal: initialGoal,
    currentSpend: 0,
    progressPercent: 0,
};

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setGoal: (state, action) => {
            state.budgetGoal = action.payload;
            localStorage.setItem('budgetGoal', action.payload);
            
            if (state.budgetGoal > 0) {
                state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
            } else {
                state.progressPercent = 0;
            }
        },
        updateSpend: (state, action) => {
            state.currentSpend = action.payload;
            if (state.budgetGoal > 0) {
                state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
            } else {
                state.progressPercent = 0;
            }
        }
    }
});

export const { setGoal, updateSpend } = goalSlice.actions;
export default goalSlice.reducer;
