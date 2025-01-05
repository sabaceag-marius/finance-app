import React, {useEffect, useState} from "react";
import './FilterForm.css'
import {getCategoriesAPI} from "../../services/CategoriesService";
import InputRangeSlider from "../InputRangeSlider/InputRangeSlider";
function FilterForm({handleSubmit,handleChange,stateData,handleReset}){

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

        <form onSubmit={handleSubmit} className="filter-form">
            <label className="filter-label" htmlFor="category">Categories</label>

            <select
                id="category"
                name="category"
                onChange={handleChange}
                value={stateData.category}
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
                onChange={handleChange}
                value={stateData.minValue}
            />

            <label className="filter-label" htmlFor="maxValue">Maximum value</label>
            <input
                className="filter-input"
                type="number"
                step="0.01"
                id="maxValue"
                name="maxValue"
                onChange={handleChange}
                value={stateData.maxValue}
            />

            <label className="filter-label" htmlFor="afterDate">After date</label>
            <input
                className="filter-input"
                type="date"
                id="afterDate"
                name="afterDate"
                onChange={handleChange}
                value={stateData.afterDate}
            />

            <label className="filter-label" htmlFor="beforeDate">Before Date</label>
            <input
                className="filter-input"
                type="date"
                id="beforeDate"
                name="beforeDate"
                onChange={handleChange}
                value={stateData.beforeDate}
            />

            <section className="buttons-section">
                <button type="submit" className="submit-button">Filter</button>
                <button type="button" onClick={handleReset} className="reset-button">Reset</button>
            </section>
        </form>

    )
}

export default FilterForm;