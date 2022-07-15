import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    console.log(props.graphData);

    return (
        <a>{props.graphData.givenName} {props.graphData.surname} - {props.graphData.mail}</a>
    );
};
