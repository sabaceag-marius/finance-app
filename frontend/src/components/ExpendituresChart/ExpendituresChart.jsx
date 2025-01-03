import React, {useEffect, useState} from 'react';
import {getSpendingsAPI} from "../../services/CategoriesService";
import Chart from "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import "./ExpendituresChart.css";
import moment from "moment/moment";

function ExpendituresChart() {



    const [labels,setLabels] = useState([]);
    const [values,setValues] = useState([]);


    const [timeInput,setTimeInput] = useState({
        type : 'month',
        currentMoment: moment(),
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD'),
    });

    const chartData = {
        labels: labels,
        showInLegend: true,
        datasets: [{
            label: 'Amount',
            data: values,
            hoverOffset: 4
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    }

    useEffect(() => {
        getSpendingsAPI()
            .then(res =>{
                if(res != null){
                    setLabels(res.map(element => element.categoryName));
                    setValues(res.map(element => element.amount));
                }
            });
    }, []);

    function changeTimeInputType(e){
        console.log(e.target.name);

        const {name} = e.target;

        // console.log(moment().startOf(name).add(-1,name).format('YYYY-MM-DD'));
        // console.log(moment().endOf(name).add(-1,name).format('YYYY-MM-DD'));



        setTimeInput({
            type : name,
            currentMoment: moment(),
            startDate: moment().startOf(name).format('YYYY-MM-DD'),
            endDate: moment().endOf(name).format('YYYY-MM-DD')
        });

    }

    function getDisplayValue(){
        switch (timeInput.type){
            case "week":
                return `${timeInput.startDate} - ${timeInput.endDate}`;
            case "month":
                return timeInput.currentMoment.format('YYYY MMMM');
            case "year":
                return timeInput.currentMoment.format('YYYY');

            default: return "";
        }
    }

    function changeTimeInputValue(amount){

        const {type,currentMoment,startDate,endDate} = timeInput;
        currentMoment.add(amount,type);

        setTimeInput(prev =>({
            ...prev,
            currentMoment: currentMoment,
            startDate: currentMoment.clone().startOf(type).format('YYYY-MM-DD'),
            endDate: currentMoment.clone().endOf(type).format('YYYY-MM-DD')
        }));
    }

    return (
        <>

            {values.length > 0 &&
            <div className="chart">

                <div className="buttons-container">

                    <button name='week' onClick={changeTimeInputType}>Week</button>
                    <button name='month' onClick={changeTimeInputType}>Month</button>
                    <button name='year' onClick={changeTimeInputType}>Year</button>
                    <button onClick={() => changeTimeInputValue(-1)}>-</button>
                    <button onClick={() => changeTimeInputValue(1)}>+</button>

                    <h2>{getDisplayValue()}</h2>
                </div>
                <Doughnut options={options} data={chartData}/>
            </div>
            }
        </>
    );
}

export default ExpendituresChart;