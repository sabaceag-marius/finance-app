import React from "react";
import './FilterForm.css'
function FilterForm(props){

    return(

        <form onSubmit={props.handleSubmit} className="filter-form">
            <label className="filter-label" htmlFor="categories">Categories</label>
            <input 
                className="filter-input"
                type="text"
                id="categories"
                name="categories"
                onChange={props.handleChange}
                value={props.stateData.categories}
            />

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

            <section className="buttons-section">
                <button type="submit" className="submit-button">Filter</button>
                <button type="button" onClick={props.handleReset} className="reset-button">Reset</button>
            </section>
        </form>

    )
}

export default FilterForm;