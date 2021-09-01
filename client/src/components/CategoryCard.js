import React from 'react';


const CategoryCard = ({title,image})=>{

    return(
        <div className="category__card">
            <div className="image">
                <img src={image} alt={title} width={550}  />
            </div>
        </div>
    )
}

export default CategoryCard;