import "./searchItem.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
const SearchItem = ({ item }) => {
  console.log(item); // hotelID and name details
  const { dates, options } = useContext(SearchContext);
  console.log(dates); //start date and end date
  console.log(options); // adults, children, room
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxtOp">Free Airport Taxi</span>
        <span className="siSubTitle">
          Studio Appartmant with Air Conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubTitle">
          You can cacell later, so lock in this great price today
        </span>
      </div>

      <span className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <spn className="siPrice">${item.cheapestPrice}</spn>
          <spn className="siTaxOp">Include taxes and fees</spn>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton" dates={dates} options={options}>
              See Availability
            </button>
          </Link>
        </div>
      </span>
    </div>
  );
};

export default SearchItem;
