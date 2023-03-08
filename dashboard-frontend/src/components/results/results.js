import React from "react"
import './results.css';

const Results = () => {

    const Result = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th className="second">Commit: </th>
                    </tr>
                    <tr className="head">
                        <th className="second">Vulnerability</th>
                        <th className="third">Affected URL</th>
                        <th className="fourth">Severity</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="second">Error based SQL Injection</td>
                        <td className="third">www.google.com</td>
                        <td className="fourth">High</td>
                    </tr>
                    <tr>
                        <td className="second">XSS</td>
                        <td className="third">www.google.com</td>
                        <td className="fourth">High</td>
                    </tr>

                </tbody>

            </table>
        )
    }

    return (
        <div className="w-full">
            <Result />
            <Result />
        </div>
    )
}

export default Results
