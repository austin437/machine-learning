import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useSideEffects = () => {
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        (param) => (event) => {
            event.preventDefault();
            navigate("/process-data", param);
        },
        [navigate]
    );

    return { handleSubmit };
};

export { useSideEffects };
