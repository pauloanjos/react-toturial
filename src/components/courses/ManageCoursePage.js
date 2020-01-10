import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";

function ManageCoursePage(props) {
    const { courses, authors, loadAuthors, loadCourses } = props;
    // useEffect with [] is equivalent to component did mount. The [] says that the effect runs only once when the component is rendered
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(err => {
                console.err("load courses failed" + err);
            });
        }
        if (authors.length === 0) {
            loadAuthors().catch(err => {
                console.err("load authors failed" + err);
            });
        }
    }, []);

    return (
        <>
            <h2>Manage Course</h2>
        </>
    );
}

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired
};

/**
 * This functions determines what state is passed to out component via props
 * @param {*} state
 * @param {*} ownProps
 * This should be specific. Request only the data the component needs
 */

// TODO: read this comment
// the bound actions passed in on props takes precedence over the imported functions with the same name
// this is true because the function scope takes precedence over module scope
// javascript will look for the given name and find it in the function scope first, so it will not look in the module scope
function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
};

/**
 * When mapDispatchToProps is omitted, the component gets a dispatch prop injected automatically
 */
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
