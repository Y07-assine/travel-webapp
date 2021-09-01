import React from 'react'

import PropTypes from 'prop-types'

const Icon =({name,color,size}) =>{
    return (
        <svg fill={color} width={size} height={size}>
           <use xlinkHref={`/images/sprite.svg#icon-${name}`} /> 
        </svg>
    );
}
Icon.defaultProps ={
    color:'black'
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color:PropTypes.string,
    size:PropTypes.number

}

export default Icon