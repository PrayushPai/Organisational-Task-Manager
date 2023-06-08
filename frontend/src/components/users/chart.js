import React, { Fragment, useEffect } from "react";
import randomcolor from "randomcolor";
import faker from "faker";
import data from "./data.json";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";

const Card = (props) => {
    const levelColor = randomcolor();
    return (
        <ul>
            {props.data.map((item, index) => (
                <Fragment key={item.name}>
                    <li>
                        <div className="card">
                            <div className="card-body">
                                <h4>{item.name}</h4>
                            </div>
                            <div></div>
                        </div>
                        {item.children?.length && <Card data={item.children} />}
                    </li>
                </Fragment>
            ))}
        </ul>
    );
};


const Chart = () => {

    const [tree, setTree] = useState([]);
    const handleClick = (event) => {

        var x = sessionStorage.getItem("instituteId");
        const loggedInstitute = {
            id: Number(x),
        };

        console.log("Institue");
        console.log(loggedInstitute);

        axios
            .post("http://localhost:4000/heirarchy/", loggedInstitute, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((response) => {
                data = response.data
                setTree(response.data);
            })

        console.log("Tree");
        console.log(tree);
    };

    return (
        <div className="org-tree">
            <Button
                type="submit"
                fullWidth
                onClick={handleClick}
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
            >
                Show Hierarchy</Button>

            <Card data={[tree]} />
        </div>
    );
};
export default Chart;
