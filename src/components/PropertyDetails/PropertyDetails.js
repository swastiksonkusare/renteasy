import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { updateAvailableFrom } from "../../actions/propertyActions";

import "./PropertyDetails.css";

const PropertyDetails = ({ property, onClose }) => {
  const [bookingData, setBookingData] = useState({
    name: "",
    contact: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const validateContact = (contact) => {
    const regex = /^\d{10}$/;
    return regex.test(contact);
  };

  const validateDates = (startDate, endDate) => {
    return new Date(startDate) > new Date(endDate);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.name) {
      newErrors.name = "Name is required";
    }
    if (!bookingData.contact) {
      newErrors.contact = "Contact information is required";
    } else if (!validateContact(bookingData.contact)) {
      newErrors.contact = "Invalid contact number";
    }
    if (!bookingData.startDate || !bookingData.endDate) {
      newErrors.dates = "Both start and end dates are required";
    } else if (validateDates(bookingData.startDate, bookingData.endDate)) {
      newErrors.dates = "Start date must be greater than end date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(updateAvailableFrom(property.id, true));

      property.status = true;

      const storedBookedPropertiesJSON =
        localStorage.getItem("bookedProperties");
      const storedBookedProperties = storedBookedPropertiesJSON
        ? JSON.parse(storedBookedPropertiesJSON)
        : [];

      storedBookedProperties.push(property);

      localStorage.setItem(
        "bookedProperties",
        JSON.stringify(storedBookedProperties)
      );

      setIsBookingFormOpen(false);
    }
  };

  return (
    <div className="property-details-overlay">
      <div key={property.id} className="property-details-modal">
        <h2>{property.title}</h2>
        <p>Location: {property?.city}</p>
        <p>Rent: ₹{property.rent}</p>
        <img src={property.image_url} alt={property.title} />
        <div className="amenity-list">
          <h3>{property?.amenity_list.length ? "Amenities:" : ""} </h3>
          <ul>
            {property?.amenity_list.map((amenity, index) => (
              <div>
                <li key={index}>{amenity.amenity}</li>
                <img src={amenity.icon_url} alt={amenity.amenity} />
              </div>
            ))}
          </ul>
        </div>

        <div className="description">
          <h3>Description:</h3>
          <p>{property.description.short_description}</p>
        </div>

        {!property.status && (
          <div className="available-from">
            <h3>Available From:</h3>
            <p>{property.available_from}</p>
          </div>
        )}

        <div className="property-action">
          <button
            onClick={() => {
              if (property.status) {
                setIsBookingFormOpen(false);
              } else {
                setIsBookingFormOpen(true);
              }
            }}
          >
            {property.status ? "Booked" : "Book Now"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>

        {isBookingFormOpen && (
          <div className="booking-modal">
            <form onSubmit={handleBookingSubmit}>
              <h3>Book this property:</h3>
              <div className="form-field">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label>Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={bookingData.contact}
                  onChange={handleInputChange}
                />
                {errors.contact && (
                  <span className="error">{errors.contact}</span>
                )}
              </div>
              <div className="form-field">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleInputChange}
                />
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={bookingData.endDate}
                  onChange={handleInputChange}
                />
                {errors.dates && <span className="error">{errors.dates}</span>}
              </div>
              <div className="form-field">
                <button type="submit">Submit Booking</button>
                <button
                  type="button"
                  onClick={() => setIsBookingFormOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
        {property.status && (
          <div className="confirmation-message">
            Property booked successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
