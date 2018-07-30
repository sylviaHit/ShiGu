export function actionCreate(type, content) {
    return {
        type: type,
        content: content
    }
}
const initialState = {
    game: {
        mention: false,
        blockade: 1,
        keyWords:['春', '江', '花', '月', '夜',
            '夏', '日', '湖', '水', '岸',
            '秋', '山', '风', '雨', '天',
            '冬', '朝', '海', '云', '关',
            '南', '窗', '柳', '色', '暖',
            '北', '庭', '鸟', '声', '寒',
            '西', '楼', '人', '心', '愁',
            '东', '家', '酒', '梦', '残'],
        data: {}
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
        case 'SET_GAME_DATA':
            console.log(action.content);
            newState.game.data = action.content
            return newState;
        default:
            return newState;
    }
}