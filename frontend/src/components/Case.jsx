import React from "react";
import { useNavigate } from "react-router-dom";

function Case({ caseData }) {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`/casedetails`, { state: { caseData } });
    };

    return (
        <tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
            <td>{caseData.id}</td>
            <td>{caseData.gender}</td>
            <td>{caseData.birth_date}</td>
            <td>{caseData.scan_date}</td>
            <td>{caseData.risk}</td>
            <td>{caseData.decision}</td>
        </tr>
    );
}

export default Case;