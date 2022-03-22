import React from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";

const FeatureSelector = ({ data, ...props }) => {
    return <pre>{data.headers.map((v) => v + "\n")}</pre>;
};

FeatureSelector.propTypes = {
    data: PropTypes.shape({
        headers: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }),
};

export { FeatureSelector };
