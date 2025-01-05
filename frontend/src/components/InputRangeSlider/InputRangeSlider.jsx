import React, {useState} from 'react';
import "./InputRangeSlider.css";

function InputRangeSlider({min,max,step=1}) {

    const [minValue,setMinValue] = useState(min);
    const [maxValue,setMaxValue] = useState(max);

    function handleMinChange(e){

        const {value} = e.target;

        setMinValue(Math.min(value,maxValue));
    }

    function handleMaxChange(e){

        const {value} = e.target;

        setMaxValue(Math.max(value,minValue));
    }

    return (
        <div className="range--slider">

            <input
                type="range"
                min={min}
                step={step}
                value={minValue}
                onChange={handleMinChange}
            />
            <input
                type="range"
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMaxChange}
            />

        </div>
    );
}

export default InputRangeSlider;