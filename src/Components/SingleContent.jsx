import React, { useEffect, useState } from "react";
import "./SingleContentStyle.css";
import { img_300, unavailable } from "../Config/Config";
import "./SingleContentStyle.css";
import { Badge } from "react-bootstrap";
import axios from "axios";

export default function SingleContent({ id, poster, title, date, media_type, vote_average }) {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const roundedVoteAverage = vote_average.toFixed(1);

    const [dataContent, setDataContent] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedItemGenre, setSelectedItemGenre] = useState([]);
    const [overview, setOverview] = useState("");
    const lengthOverview = overview.length;
    
    const getData = async () => {
        try {
            const urlData = `https://api.themoviedb.org/3/${media_type === "tv" ? "tv" : "movie"}/${id}?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`;
            const responseData = await axios.get(urlData);
            setDataContent(responseData.data);
            setSelectedItemGenre(responseData.data.genres);
            setOverview(responseData.data.overview);
        } catch (error) {
            console.error(error);
        }
    };

    const handleHoverEnter = () => {
        setIsHovered(true);
    };

    const handleHoverLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

return (
    <>
        <div
            className={`content d-flex flex-column w-100 h-100 ${isHovered ? "hovered" : "unhovered"}`}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
        >
            <div className="unhover-dataContent d-flex flex-column w-100 h-100">
                <Badge className="badge" bg={vote_average > 6 ? "dark" : "secondary"}>
                    {roundedVoteAverage}
                </Badge>
                <div className="content-img-wrap w-100">
                    <img
                        className="content-img w-100 h-100"
                        src={poster ? `${img_300}${poster}` : unavailable}
                        alt={title}
                    />
                </div>
                <div className="content-details d-flex flex-column">
                    <span className="content-title">{title}</span>
                    <span className="content-date">{formatDate(date)}</span>
                </div>
            </div>

            <div
                className="hover-dataContent w-100 h-100"
                style={{
                    backgroundImage: `url(${
                    dataContent.poster_path
                        ? `${img_300}${dataContent.poster_path}`
                        : unavailable
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <div
                    className="hover-conten"
                    style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    <p className="hover-title">{dataContent.original_title}</p>
                    <p className="hover-overview">Overview:</p>
                    <p className="text-overview">
                        {
                            lengthOverview < 200
                            ? dataContent.overview
                            : dataContent.overview?.substring(0, 200) + `...`
                        }
                    </p>
                    <p className="hover-genres">Genres:</p>
                    <div className="wrap-genre d-flex flex-wrap mb-1">
                        {selectedItemGenre.map((gen, index) => (
                            <span key={index} className="hover-genre">
                            {gen.name}
                            {index < selectedItemGenre.length - 1 && ","}
                            </span>
                        ))}
                    </div>
                    <p className="hover-date-release">Dete release:</p>
                    <p className="date-release">
                        {formatDate(dataContent.release_date)}
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}
