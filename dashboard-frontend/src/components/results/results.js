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

    useEffect(() => {
        console.log(data);
    }, [data]);

    const Result = ({ item }) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th className="second">Commit: {item.commitId}</th>
                    </tr>
                    <tr className="head">
                        <th className="second">Vulnerability</th>
                        <th className="third">Affected URL</th>
                        <th className="fourth">Severity</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="second">{item.vulnerability}</td>
                        <td className="third">{item.affectedUrl}</td>
                        <td className="fourth">{item.severity}</td>
                    </tr>

                </tbody>

            </table>
        )
    }

    return (
        <div className="w-full">
            {data &&
                Object.keys(data).map((commitId) => {
                    return (
                        <table>
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
                                        return (
                                            <tr>
                                                <td className="second">{item.vulnerability}</td>
                                                <td className="third">{item.affectedUrl}</td>
                                                <td className="fourth">{item.severity}</td>
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
    )
}

export default Results
