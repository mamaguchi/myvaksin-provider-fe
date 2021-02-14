export default {
  /*
    PEOPLE SEARCH PAGE
  */
  // SEARCH
  search (state) { return state.search },
  searching (state) { return state.searching },
  searchQueryPrefix (state) { return state.searchQueryPrefix },
  searchQuery (state) { return state.searchQuery },

  // SEARCH FILTERS
  searchFilters (state) {
    return state.searchFilters
  },
  searchFilterIdent (state) {
    return state.searchFilters.ident
  },
  searchFilterName (state) {
    return state.searchFilters.name
  },
  searchFilterAge (state) {
    return state.searchFilters.age
  },
  searchFilterAgeVal (state) {
    return state.searchFilters.age.value
  },
  searchFilterAgeType (state) {
    return state.searchFilters.age.type
  },
  searchFilterMinAge (state) {
    return state.searchFilters.minAge
  },
  searchFilterMinAgeVal (state) {
    return state.searchFilters.minAge.value
  },
  searchFilterMinAgeType (state) {
    return state.searchFilters.minAge.type
  },
  searchFilterMaxAge (state) {
    return state.searchFilters.maxAge
  },
  searchFilterMaxAgeVal (state) {
    return state.searchFilters.maxAge.value
  },
  searchFilterMaxAgeType (state) {
    return state.searchFilters.maxAge.type
  },
  searchFilterRace (state) {
    return state.searchFilters.race
  },
  searchFilterNationality (state) {
    return state.searchFilters.nationality
  },
  searchFilterState (state) {
    return state.searchFilters.State
  },
  searchFilterDistrict (state) {
    return state.searchFilters.district
  },
  searchFilterLocality (state) {
    return state.searchFilters.locality
  },

  // SEARCH SQL INPUT VARIABLES
  sqlInputVars (state) {
    return state.sqlInputVars
  },
  sqlInputVarIdent (state) {
    return state.sqlInputVars.ident
  },
  sqlInputVarName (state) {
    return state.sqlInputVars.name
  },
  sqlInputVarDobIntvlMinDate (state) {
    return state.sqlInputVars.dobInterval.minDate
  },
  sqlInputVarDobIntvlMaxDate (state) {
    return state.sqlInputVars.dobInterval.maxDate
  },
  sqlInputVarRace (state) {
    return state.sqlInputVars.race
  },
  sqlInputVarNationality (state) {
    return state.sqlInputVars.nationality
  },
  sqlInputVarState (state) {
    return state.sqlInputVars.state
  },
  sqlInputVarDistrict (state) {
    return state.sqlInputVars.district
  },
  sqlInputVarLocality (state) {
    return state.sqlInputVars.locality
  },
  sqlInputVarSqlOpt (state) {
    return state.sqlInputVars.sqlOpt
  },

  // SEARCH RESULTS
  searchResults (state) {
    return state.searchResults
  }
}
