import React from 'react'
import PropTypes from 'prop-types'


const Country = (props) => {
    const country = props.country;

    return (
        <div className="country">

            {country.name}


        </div>
    )


}

Country.protoTypes = {
    country: PropTypes.object.isRequired,
}

export default Country;