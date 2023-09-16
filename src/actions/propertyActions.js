export const setPropertyList = (propertyList) => ({
  type: "SET_PROPERTY_LIST",
  payload: propertyList,
});

export const setSelectedProperty = (property) => ({
  type: "SET_SELECTED_PROPERTY",
  payload: property,
});

export const setBookingConfirmation = (confirmation) => ({
  type: "SET_BOOKING_CONFIRMATION",
  payload: confirmation,
});

export const updateAvailableFrom = (propertyId, status) => ({
  type: "UPDATE_AVAILABLE_FROM",
  payload: {
    propertyId,
    status,
  },
});
