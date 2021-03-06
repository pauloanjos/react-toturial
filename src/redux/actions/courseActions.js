import * as types from "./actionsTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}
/**
 * Redux thunk injects dispatch so we don't have to
 */
export function loadCourses() {
    return function(dispatch) {
        return courseApi
            .getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses));
            })
            .catch(err => {
                throw err;
            });
    };
}
