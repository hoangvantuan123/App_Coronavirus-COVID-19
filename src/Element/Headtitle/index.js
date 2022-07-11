import React from 'react'

const itemData = [
    {
        span: "Strain",
        p: "SARS-CoV-2",
    },
    {
        span: "Symptoms",
        p: "Fever, Cough, Fatigue"
    },
    {
        span: "Usual onset",
        p: "2–14 days "
    },


]


export default function Headtitle() {
    return (
        
            <div className="items">
                <div className="item">
                    {itemData.map((itemData, index) =>
                        <div key={index} className="item_list" >
                            <span>
                                {itemData.span}
                            </span>
                            <p>
                                {itemData.p}
                            </p>
                        </div>
                    )}

                </div>
            </div>
           
            
       

    )
}



