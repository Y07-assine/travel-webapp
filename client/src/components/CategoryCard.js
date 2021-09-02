import React from 'react';


const CategoryCard = ({title,image})=>{

    return(
        <div className="category__card">
            <div className="image">
                <img src={image} alt={title} width={550}  />
            </div>
            <div className="category__title">
                <h3>{title}</h3>
                <div className="category__button">
                    <button className="explore" >Explore</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;