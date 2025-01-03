import React, {useState} from 'react';
import "./PageSelector.css";


function PageSelector({pageCount}) {


    const [currentPage,setCurrentPage] = useState(1);
    // const nrPages = 20;

    const maxNrButtons = 5;

    let buttonIndexes = getIndexes();



    function getIndexes(){

        if(!pageCount) return [];

        let list = [];

        if(currentPage < Math.ceil(maxNrButtons / 2)){

            for(let i = 0; i < Math.min(maxNrButtons,pageCount); i++){
                list.push(i+1);
            }
        }
        else if (currentPage + Math.ceil(maxNrButtons / 2) > pageCount){
            for(let i = Math.max(0,pageCount - maxNrButtons); i < pageCount; i++){
                list.push(i+1);
            }
        }
        else{
            for(let i = - Math.floor(maxNrButtons / 2); i <= Math.floor(maxNrButtons / 2); i++  ){
                list.push(i+currentPage);
            }
        }

        return list;
    }


    const selectedStyle = {
        backgroundColor : 'red'
    }

    const buttonComponents =
        buttonIndexes.map(idx =>
            <button key={idx}
                    style={idx === currentPage ? selectedStyle : {}}
                    onClick={()=>onButtonPress(idx)}>{idx}
            </button>)

    function onButtonPress(idx){
        if(currentPage === idx) return;
        setCurrentPage(idx);
        //
    }

    return (
        <div className="page--selector--container">
            <button onClick={()=>onButtonPress(1)}><span className="material-symbols-outlined">keyboard_double_arrow_left</span></button>
            {buttonComponents}
            <button onClick={()=>onButtonPress(pageCount)}><span className="material-symbols-outlined">keyboard_double_arrow_right</span></button>
        </div>
    );
}

export default PageSelector;