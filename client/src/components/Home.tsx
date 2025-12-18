import React from "react";
import "./Home.css"



export const Home = () => {

    const curDate = new Date();
    const date = curDate.getHours()

 

    let greeting = "";
    if (date>=1 && date <12) {
        greeting="Guten Morgen Timo";
    }else if(date>=12 && date<19){
        greeting="Guten Nachmittag Timo"
    }else {
        greeting="Guten Abend Timo"
    }


    return(
        <div className="home-container">

            <div>
                <h1>{greeting}</h1>
        
            </div>

        </div>
    )
};