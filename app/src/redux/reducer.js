export function actionCreate(type, content) {
    return {
        type: type,
        content: content
    }
}
const initialState = {
    game: {
        mention: false
    },
    poetry: {
        searchValue: '',
        item: 'all',
        currentPage: 0,
        currentStartPage: 0
    }
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'SET_POINT_DETAIL':
            return Object.assign(
                {},
                state,
                {culture: Object.assign({}, state.culture, action.content)}
            );
        case 'SET_POETRY_SEARCH_VALUE':
            newState.poetry.searchValue = action.content;
            return newState;
        case 'SET_POETRY_SEARCH_ITEM':
            newState.poetry.item = action.content
            return newState;
        case 'SET_POETRY_DATA':
            console.log(action.content);
            newState.poetry.data = action.content.data;
            newState.poetry.currentPage = action.content.currentPage;
            newState.poetry.currentStartPage = action.content.currentStartPage;
            return newState;
        case 'SET_POETRY_PAGE':
            console.log(action.content);
            newState.poetry.data.currentPage = action.content.currentPage;
            newState.poetry.data.currentStartPage = action.content.currentStartPage;
            return newState;
        case 'SET_POETRY_CURRENT_PAGE':
            console.log(action.content);
            newState.poetry.data.currentPage = action.content
            return newState;
        case 'SET_POETRY_CURRENT_START_PAGE':
            console.log(action.content);
            newState.poetry.data.currentStartPage = action.content
            return newState;
        default:
            return newState;
    }
}