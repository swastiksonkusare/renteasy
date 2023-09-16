const initialState = {
  propertyList: [],
  selectedProperty: null,
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROPERTY_LIST":
      return {
        ...state,
        propertyList: action.payload,
      };
    case "SET_SELECTED_PROPERTY":
      return {
        ...state,
        selectedProperty: action.payload,
      };

    case "UPDATE_AVAILABLE_FROM":
      const { propertyId, status } = action.payload;
      const updatedPropertiesData = state.propertyList?.map((property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            status,
          };
        }

        return property;
      });

      return {
        ...state,
        propertyList: updatedPropertiesData,
      };
    default:
      return state;
  }
};

export default propertyReducer;
