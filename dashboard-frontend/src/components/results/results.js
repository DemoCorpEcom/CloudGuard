import React, { useState, useEffect } from "react"
import './results.css';
import axios from 'axios';
import ViewLinks from "./popup";

const Results = () => {

    const high = "fourth text-white bg-red-500 text-center rounded"
    const medium = "fourth text-white bg-orange-500 text-center rounded"
    const low = "fourth text-white bg-yellow-500 text-center rounded"

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.get("http://192.168.49.2:30003/api/results");
            setData(results.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className="flex items-center justify-center mainDiv h-full">
            <div className="w-[65%] flex flex-row h-full">
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
                                            <th className="third">Affected URLs</th>
                                            <th className="fourth">Severity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(data[commitId]).map((item) => {

                                                const it = data[commitId][item];
                                                const severity = it[0].severity;

                                                return (
                                                    <tr>
                                                        <td className="second text-red-600">{it[0].vulnerability}</td>
                                                        <td className="third"><ViewLinks data={it} /></td>
                                                        <td className={
                                                            severity === "high" ? high : severity === "medium" ? medium : low}
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
