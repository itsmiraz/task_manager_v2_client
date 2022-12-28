import { createSlice } from "@reduxjs/toolkit";



const taskss = {
    name: 'miraj',
    details:'hello'
}


export const taskSlice = createSlice({
    name: 'tasks',
    initialState: { value: taskss },
    reducers: {
        
    }

})

export default taskSlice.reducer;