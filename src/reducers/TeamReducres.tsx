export const TeamReducers = (state: any = {}, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SAVE_TEAM_INIT':
            return { ...state, ...action.payload };
            break;
        case 'SAVE_TEAM_SUCCESS':
            return { ...state, ...action.payload };
            break;
        default:
            return state;
            break; 
    }
}