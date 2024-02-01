import React from "react";
import "./descriptions.css";

import { FaArrowDown, FaArrowUp, FaCompass, FaWind } from "react-icons/fa";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = ({ weather, units }) => {

    const tempUnit = units === "metric" ? "°C" : "°F"
    const windUnit = units === "metric" ? "m/s" : "m/h"

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: `${units === "metric" ? weather.temp_min.toFixed() : Math.ceil((weather.temp_min * 9 / 5) + 32)}`,
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: `${units === "metric" ? weather.temp_max.toFixed() : Math.ceil((weather.temp_max * 9 / 5) + 32)}`,
            unit: tempUnit,
        }, {
            id: 3,
            icon: <MdCompress />,
            title: "pressure",
            data: weather.pressure,
            unit: "hPa",
        }, {
            id: 4,
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: weather.humidity,
            unit: "%",
        },
        {
            id: 5,
            icon: <FaWind />,
            title: "wind speed",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
        {
            id: 6,
            icon: <FaCompass />,
            title: "wind direction",
            data: weather.deg.toFixed(),
            unit: windUnit,
        },
    ];

    return (
        <div className="section section__descriptions">
            {cards.map(({ id, icon, title, data, unit }) => (
                <div key={id} className="card">
                    <div className="description__card-icon">
                        {icon}
                        <small>{title}</small>
                    </div>
                    <h2>{`${data} ${unit}`}</h2>
                </div>
            ))}
        </div>
    )
}

export default Descriptions