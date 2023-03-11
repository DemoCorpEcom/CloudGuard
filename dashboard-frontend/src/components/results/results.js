import React, { useState, useEffect } from "react"
import './results.css';
import axios from 'axios';

const Results = () => {

    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.get("http://localhost:5000/api/results");
            const groupedData = groupBy(results.data, 'commitId');
            setData(groupedData);
        };
        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center mainDiv">
            <div className="w-[65%] flex flex-row">
                <div className="flex-1">
                    {data &&
                        Object.keys(data).map((commitId) => {
                            return (
                                <table className="bg-white rounded">
                                    <thead>
                                        <tr>
                                            <th className="second">Commit: {commitId}</th>
                                        </tr>
                                        <tr className="head">
                                            <th className="second">Vulnerability</th>
                                            <th className="third">Affected URL</th>
                                            <th className="fourth">Severity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data[commitId].map((item) => {
                                                const severity = item.severity;
                                                return (
                                                    <tr>
                                                        <td className="second text-red-600">{item.vulnerability}</td>
                                                        <td className="third">{item.affectedUrl}</td>
                                                        <td className={
                                                            severity === "high" ? "fourth text-white bg-red-500 text-center rounded" : null}
                                                        >
                                                            {severity}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Results
