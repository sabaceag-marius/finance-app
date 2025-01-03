import React, {useEffect, useState} from "react";
import './FilterForm.css'
import {getCategoriesAPI} from "../../services/CategoriesService";
import InputRangeSlider from "../InputRangeSlider/InputRangeSlider";
function FilterForm(props){

    const [categories,setCategories] = useState([]);

    async function fetchCategories(){

        const response = await getCategoriesAPI();
        // console.log(response);
        setCategories(response.map(category => category.name));
    }

    useEffect(() => {
        fetchCategories().then();
    }, []);

    const categoriesSelectOptions = categories.map(c => <option key={c} value={c}>{c}</option>)

    return(

        <form onSubmit={props.handleSubmit} className="filter-form">
            <label className="filter-label" htmlFor="category">Categories</label>

            <select
                id="category"
                name="category"
                onChange={props.handleChange}
                value={props.stateData.category}
                className="select"
            >
                <option value="">Select a category</option>
                {categoriesSelectOptions}
            </select>

            <label className="filter-label" htmlFor="minValue">Minimum value</label>
            <input
                className="filter-input"
                type="number"
                step="0.01"
                id="minValue"
                name="minValue"
                onChange={props.handleChange}
                value={props.stateData.minValue}
            />

            <label className="filter-label" htmlFor="maxValue">Maximum value</label>
            <input
                className="filter-input"
                type="number"
                step="0.01"
                id="maxValue"
                name="maxValue"
                onChange={props.handleChange}
                value={props.stateData.maxValue}
            />

            {/*<InputRangeSlider min={1} max={100} step={10} />*/}


            <section className="buttons-section">
                <button type="submit" className="submit-button">Filter</button>
                <button type="button" onClick={props.handleReset} className="reset-button">Reset</button>
            </section>
        </form>

    )
}

export default FilterForm;