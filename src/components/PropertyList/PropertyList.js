import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  setSelectedProperty,
  setPropertyList,
} from "../../actions/propertyActions";
import PropertyDetails from "../PropertyDetails/PropertyDetails";

import icon from "../../assets/nestawayIcon.ad7b1cdf.svg";
import "./PropertyList.css";

const PropertyList = () => {
  const properties = useSelector((state) => state.properties.propertyList);
  const selectedProperty = useSelector(
    (state) => state.properties?.selectedProperty
  );

  const [bookedProperties, setBookedProperties] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://mocki.io/v1/c1b8d087-971c-472f-870c-47185f710c17"
        );

        dispatch(setPropertyList(data?.houses));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const storedBookedPropertiesJSON =
        localStorage.getItem("bookedProperties");
      if (storedBookedPropertiesJSON) {
        const storedBookedProperties = JSON.parse(storedBookedPropertiesJSON);

        setBookedProperties([...storedBookedProperties]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleViewDetails = (property) => {
    dispatch(setSelectedProperty(property));
  };

  const handleCloseDetails = () => {
    dispatch(setSelectedProperty(null));
  };

  const combinedProperties = [...bookedProperties, ...properties];

  const allProperties = combinedProperties.filter(
    (item, index, self) => self.findIndex((i) => i.id === item.id) === index
  );

  return (
    <>
      <header className="header">
        <img src={icon} alt="Icon" />
        <h1>Rental Properties</h1>
      </header>
      <div className="property-list">
        {allProperties.length &&
          allProperties.map((property) => (
            <div key={property.id} className="property-card">
              {property.status && <span className="booked-text">Booked</span>}

              <img src={property.image_url} alt={property.title} />
              <h2>Title: {property.title}</h2>
              <p>
                Location: <small>{property.city}</small>
              </p>
              <p>
                Rent: <small>₹{property.rent} </small>
              </p>
              <button onClick={() => handleViewDetails(property)}>
                View Details
              </button>
            </div>
          ))}
      </div>

      {selectedProperty && (
        <div className="property-details-container">
          <PropertyDetails
            property={selectedProperty}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </>
  );
};

export default PropertyList;
