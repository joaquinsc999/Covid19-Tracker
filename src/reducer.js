
export const initialState = {
    currentCountry: "worldwide",
    currentCountryInfo: null,
    tableData: [],
    mapCenter: [34.80746, -40.4796 ],
    zoom: 3,
    countries: []
  };

const reducer = (state, action) => {

    switch(action.type) {
        case 'SET_TABLE_DATA':
            return {
                currentCountry: state.currentCountry,
                currentCountryInfo: state.currentCountryInfo,
                tableData: action.item.tableData,
                mapCenter: state.mapCenter,
                zoom: state.zoom,
                countries: state.countries
            }
        case 'SET_COUNTRIES':
            return {
                currentCountry: state.currentCountry,
                currentCountryInfo: state.currentCountryInfo,
                tableData: state.tableData,
                mapCenter: state.mapCenter,
                zoom: state.zoom,
                countries: action.item.countries
            }
        default: 
            return {
                currentCountry: action.item.currentCountry,
                currentCountryInfo: action.item.currentCountryInfo,
                mapCenter: action.item.mapCenter,
                zoom: action.item.zoom,
                tableData: state.tableData,
                countries: state.countries
            }
    }
    
}

export default reducer