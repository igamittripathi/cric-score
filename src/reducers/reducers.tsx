import { combineReducers } from 'redux'

export const rootReducer =  combineReducers({
    team:()=>{
        return "state" 
    },
})
export type RootState = ReturnType<typeof rootReducer>;