export default {
  // SEARCH
  search (state, val) {
    state.search = val
  },
  searching (state, val) {
    state.searching = val
  },
  searchQueryPrefix (state, val) {
    state.searchQueryPrefix = val
  },
  searchQuery (state, val) {
    state.searchQuery = val
  },

  // SEARCH FILTERS
  searchFilterIdent (state, val) {
    state.searchFilters.ident = val
  },
  searchFilterName (state, val) {
    state.searchFilters.name = val
  },
  searchFilterAgeVal (state, val) {
    state.searchFilters.age.value = val
  },
  searchFilterAgeType (state, val) {
    state.searchFilters.age.type = val
  },
  searchFilterMinAgeVal (state, val) {
    state.searchFilters.minAge.value = val
  },
  searchFilterMinAgeType (state, val) {
    state.searchFilters.minAge.type = val
  },
  searchFilterMaxAgeVal (state, val) {
    state.searchFilters.maxAge.value = val
  },
  searchFilterMaxAgeType (state, val) {
    state.searchFilters.maxAge.type = val
  },
  searchFilterRace (state, val) {
    state.searchFilters.race = val
  },
  searchFilterNationality (state, val) {
    state.searchFilters.nationality = val
  },
  searchFilterState (state, val) {
    state.searchFilters.state = val
  },
  searchFilterDistrict (state, val) {
    state.searchFilters.district = val
  },
  searchFilterLocality (state, val) {
    state.searchFilters.locality = val
  },

  // SEARCH SQL INPUT VARIABLES
  sqlInputVarIdent (state, val) {
    state.sqlInputVars.ident = val
  },
  sqlInputVarName (state, val) {
    state.sqlInputVars.name = val
  },
  sqlInputVarDobIntvlMinDate (state, val) {
    state.sqlInputVars.dobInterval.minDate = val
  },
  sqlInputVarDobIntvlMaxDate (state, val) {
    state.sqlInputVars.dobInterval.maxDate = val
  },
  sqlInputVarRace (state, val) {
    state.sqlInputVars.race = val
  },
  sqlInputVarNationality (state, val) {
    state.sqlInputVars.nationality = val
  },
  sqlInputVarState (state, val) {
    state.sqlInputVars.state = val
  },
  sqlInputVarDistrict (state, val) {
    state.sqlInputVars.district = val
  },
  sqlInputVarLocality (state, val) {
    state.sqlInputVars.locality = val
  },
  sqlInputVarSqlOpt (state, val) {
    state.sqlInputVars.sqlOpt = val
  },

  // SEARCH RESULTS
  searchResults (state, val) {
    state.searchResults = val
  },

  setSearchResultsLen (state, len) {
    state.searchResults.length = len
  },

  pushSearchResults (state, searchResult) {
    state.searchResults.push(searchResult)
  },

  checkIfObjEmpty (obj) {
    const keys = Object.keys(obj)
    for (const key of keys) {
      const val = obj[key]
      const isObj = (val != null && typeof val === 'object')
      if (isObj && this.checkIfObjEmpty(val)) {
        return true
      }
      if (val !== '') {
        return false
      }
    }
    return true
  }

}
