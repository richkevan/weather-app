import React from "react"

const Location = (props) => {
    const location = props.location

    return (
        <div className="locationHeader">
            <h3>{location.name}, {location.region}</h3>
        </div>
    )
}

export default Location
