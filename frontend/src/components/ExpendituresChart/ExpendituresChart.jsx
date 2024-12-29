import React, {useEffect} from 'react';
import {getSpendingsAPI} from "../../services/CategoriesService";

function ExpendituresGraph(props) {

    async function initialiseGraph(){

        const data = await getSpendingsAPI();

        const graph

    }

    useEffect(() => {

        const data = getSpendingsAPI()

        const config = {
            type: 'doughnut',
            data: data,
        };
    }, []);

    return (
        <div></div>
    );
}

export default ExpendituresGraph;