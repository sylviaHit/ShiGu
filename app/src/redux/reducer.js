export function actionCreate(type, content) {
    return {
        type: type,
        content: content
    }
}
const initialState = {
    game: {
        mention: false
    }
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'SET_POINT_DETAIL':
            // newState.culture =
            return Object.assign(
                {},
                state,
                {culture: Object.assign({}, state.culture, action.content)}
            );
        default:
            return newState;
    }
}