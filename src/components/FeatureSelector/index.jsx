import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";

const FeatureSelector = ({ data, ...props }) => {
    const [isGoing, setIsGoing] = useState(true);
    const [numberOfGuests, setNumberOfGuests] = useState(2);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
    };

    const handleInputChange = (event) => {
        setIsGoing(event.target.checked);
    };

    const handleGuestChange = (event) => {
        setNumberOfGuests(event.target.value);
    };

    const formTestData = [
        { fieldName: "MPG", dataType: "number" },
        { fieldName: "HorsePower", dataType: "number" },
        { fieldName: "Weight", dataType: "string" },
        { fieldName: "Acceleration", dataType: "number" },
    ];

    return (
        <>
            <pre>{data.headers.map((v) => v + "\n")}</pre>

            <form className={classes.form} onSubmit={handleSubmit}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Datatype</th>
                            <th>Use?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formTestData.map((v) => (
                            <tr key={v.fieldName}>
                                <td>{v.fieldName}</td>
                                <td>{v.dataType}</td>
                                <td>
                                    <input
                                        name="isGoing"
                                        type="checkbox"
                                        checked={isGoing}
                                        onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};

FeatureSelector.propTypes = {
    data: PropTypes.shape({
        headers: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }),
};

export { FeatureSelector };
