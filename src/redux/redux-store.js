import {combineReducers, legacy_createStore} from "redux"
import QuestPageReducer from "./QuestPageReducer"

let reducers = combineReducers({
    questPage: QuestPageReducer,
});

let store = legacy_createStore(reducers);

export default store;