import * as types from "../actions/actionsTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}
/**
 * Redux thunk injects dispatch so we don't have to
 */
export function loadAuthors() {
    return function(dispatch) {
        return authorApi
            .getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors));
            })
            .catch(err => {
                throw err;
            });
    };
}
