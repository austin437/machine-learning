import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

const Finish = ({ name, ...props }) => {
    return (
        <>
            <Typography variant="h3" component="div" gutterBottom>
                Congratulations
            </Typography>
            <Typography variant="body1" gutterBottom>
                You have completed {name}!
            </Typography>
        </>
    );
};

Finish.propTypes = {
    name: PropTypes.string.isRequired,
};

export { Finish };
