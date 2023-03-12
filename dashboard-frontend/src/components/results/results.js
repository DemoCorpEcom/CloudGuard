import React, { useState, useEffect } from "react"
import './results.css';
import axios from 'axios';

const Results = () => {

    const [data, setData] = useState({
        "54467b00418b3e7e4271710f119fa5c7fc1ad866": {
            "1": [
                {
                    "_id": "640c80bebd02cd923cd3ca6d",
                    "commitId": "54467b00418b3e7e4271710f119fa5c7fc1ad866",
                    "vulnerability": "Error based SQL injection",
                    "vulId": 1,
                    "affectedUrl": "http://192.168.1.7/dcp/product.php?id=1",
                    "severity": "high",
                    "__v": 0
                },
                {
                    "_id": "640c80bebd02cd923cd3ca6f",
                    "commitId": "54467b00418b3e7e4271710f119fa5c7fc1ad866",
                    "vulnerability": "Error based SQL injection",
                    "vulId": 1,
                    "affectedUrl": "http://192.168.1.7/dcp//product.php?id=2",
                    "severity": "high",
                    "__v": 0
                },
                {
                    "_id": "640c80bebd02cd923cd3ca71",
                    "commitId": "54467b00418b3e7e4271710f119fa5c7fc1ad866",
                    "vulnerability": "Error based SQL injection",
                    "vulId": 1,
                    "affectedUrl": "http://192.168.1.7/dcp/product.php?id=3",
                    "severity": "high",
                    "__v": 0
                }
            ],
            "2": [
                {
                    "_id": "640c80d5efaa9cc432f364c4",
                    "commitId": "54467b00418b3e7e4271710f119fa5c7fc1ad866",
                    "vulnerability": "XSS",
                    "vulId": 2,
                    "affectedUrl": "http://192.168.1.7/dcp//product.php?id=2",
                    "severity": "high",
                    "__v": 0
                }
            ]
        },
        "54467b00418b3e7e4271710f119fa5c7fc1ad867": {
            "1": [
                {
                    "_id": "640cba35c2f31ba11a7f4d5d",
                    "commitId": "54467b00418b3e7e4271710f119fa5c7fc1ad867",
                    "vulnerability": "Error based SQL injection",
                    "vulId": 1,
                    "affectedUrl": "http://192.168.1.7/dcp/product.php?id=3",
                    "severity": "high",
                    "__v": 0
                }
            ]
        }
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const results = await axios.get("http://localhost:5000/api/results");
    //         setData(results.data);
    //     };
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    const viewPopup = ()=>{
        window.alert('hi');
    }

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
                                            <th className="third">Affected URLs</th>
                                            <th className="fourth">Severity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(data[commitId]).map((item) => {

                                                const it = data[commitId][item];
                                                console.log(data[commitId][item])
                                                const severity = it[0].severity;

                                                return (
                                                    <tr>
                                                        <td className="second text-red-600">{it[0].vulnerability}</td>
                                                        <td className="third"><button onClick={viewPopup}>View</button></td>
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
