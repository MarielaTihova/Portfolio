import React from 'react';
import PropTypes from 'prop-types';




const Project = (props) => {
    const project = props.project;
    // console.log("User2", user.bookReviews);
    return (

        <div>
            {/*<mark className="bg-warning text-white">*/}
            <b> {project.name}</b>

        </div>


    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
}
export default Project;