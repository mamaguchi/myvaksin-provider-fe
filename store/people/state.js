export default () => ({
  /*
    PEOPLE SEARCH PAGE
  */
  search: '',
  searching: false,
  searchQueryPrefix: 'Search for',
  searchQuery: '',
  searchFilters: {
    ident: '',
    name: '',
    age: { value: '', type: '' },
    minAge: { value: '', type: '' },
    maxAge: { value: '', type: '' },
    race: '',
    nationality: '',
    state: '',
    district: '',
    locality: ''
  },
  sqlInputVars: {
    ident: '',
    name: '',
    dobInterval: { minDate: '', maxDate: '' },
    race: '',
    nationality: '',
    state: '',
    district: '',
    locality: '',
    sqlOpt: ''
  },
  searchResults: []

})
