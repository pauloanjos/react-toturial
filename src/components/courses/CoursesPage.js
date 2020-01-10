import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(err => {
                console.err("load courses failed" + err);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(err => {
                console.err("load authors failed" + err);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        );
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

/**
 * This functions determines what state is passed to out component via props
 * @param {*} state
 * @param {*} ownProps
 * This should be specific. Request only the data the component needs
 */
function mapStateToProps(state) {
    return {
        courses: state.courses.map(course => {
            return {
                ...course,
                // ^We need this ternary operator because the calls are asynchronous and the author data may not be available yet
                authorName:
                    state.authors.length === 0
                        ? []
                        : state.authors.find(
                              author => author.id === course.authorId
                          ).name
            };
        }),
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(
                courseActions.loadCourses,
                dispatch
            ),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}

/**
 * When mapDispatchToProps is omitted, the component gets a dispatch prop injected automatically
 */
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
