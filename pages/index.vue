<template>
  <v-container
    fluid
    fill-height
  >
    <!-- <span>
      Current Year: <h3>{{ currentYear }}</h3>
      End Of Current Year: <h3>{{ endOfCurrentYearDate }}</h3>
      Ident: <h3>{{ searchFilters.ident }}</h3>
      Name: <h3>{{ searchFilters.name }}</h3>
      AgeVal: <h3>{{ searchFilters.age.value }}</h3>
      AgeType: <h3>{{ searchFilters.age.type }}</h3>
      MinAgeVal: <h3>{{ searchFilters.minAge.value }}</h3>
      MinAgeType: <h3>{{ searchFilters.minAge.type }}</h3>
      MaxAgeVal: <h3>{{ searchFilters.maxAge.value }}</h3>
      MaxAgeType<h3>{{ searchFilters.maxAge.type }}</h3>
      Race: <h3>{{ searchFilterRace }}</h3>
      Nationality: <h3>{{ searchFilters.nationality }}</h3>
      State: <h3>{{ searchFilters.state }}</h3>
      District: <h3>{{ searchFilters.district }}</h3>
      Locality: <h3>{{ searchFilters.locality }}</h3>
    </span> -->
    <v-row justify="center" class="mb-n16">
      <v-card
        flat
        max-width="600"
        min-width="600"
        class="white mb-n16"
      >
        <v-card-title class="mt-n4 mb-6">
          <v-row justify="center">
            <!-- <span class="text-h3">myVaksin</span> -->
            <div class="text-h3">
              <span class="blue--text">m</span><span class="blue--text">y</span><span class="blue--text text--darken-2">Vaksin</span>
            </div>
          </v-row>
        </v-card-title>

        <!-- SEARCH BAR-->
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              outlined
              flat
              class="rounded-pill"
              @keydown.enter="doSearch"
              @keydown.esc="search=''"
            >
              <template #append>
                <v-icon
                  v-show="search"
                  class="mr-1 mt-n2"
                  @click="search=''"
                >
                  mdi-close
                </v-icon>
                <v-fade-transition leave-absolute>
                  <div
                    v-if="searching"
                    style="height:40px"
                    class="mt-n2 ml-1"
                  >
                    <v-divider
                      vertical
                    />
                    <v-progress-circular
                      class="mt-n6 ml-6 mr-8"
                      size="24"
                      color="info"
                      indeterminate
                    />
                  </div>
                  <div
                    v-else
                    style="height:40px"
                    class="mt-n2 ml-1"
                  >
                    <v-divider
                      vertical
                    />
                    <div
                      class="mt-n7 ml-4 mr-2 search_onhover_highlight"
                      style="cursor:pointer"
                      @click="doSearch"
                    >
                      SEARCH
                    </div>
                  </div>
                </v-fade-transition>
              </template>
            </v-text-field>

            <!-- SEARCH QUERY -->
            <span
              v-show="!!search"
              class="mt-n4 grey--text text-subtitle-2"
            >
              {{ searchQueryPrefix }} {{ searchQuery }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <!-- FILTER -->
        <v-list-item class="mt-n6">
          <v-list-item-content>
            <!-- <v-btn
              @click="createNewProfile"
            >
              New Profile
            </v-btn> -->
            <v-expansion-panels
              v-model="panel"
              accordion
              flat
              max-width="200"
            >
              <v-expansion-panel
                class="rounded-lg"
                :class="`elevation-${panel===0 ? '4 grey lighten-5' : '0 white'}`"
                @click.native.capture="filterPanelClickEvent($event)"
              >
                <v-expansion-panel-header
                  style="cursor:default"
                  class="mt-n2"
                >
                  <template #actions>
                    <v-icon
                      id="mdiDotsVertical"
                      style="cursor:pointer"
                      class="mr-n2"
                    >
                      mdi-dots-vertical
                    </v-icon>
                  </template>
                  <v-row class="mr-1">
                    <v-spacer />
                    <span
                      id="newProfile"
                      style="cursor:pointer"
                      class="grey--text text--darken-2 font-weight-regular mr-5"
                      @click="createNewProfile"
                    >
                      New Profile
                      <v-icon
                        id="newProfileIcon"
                        right
                        class="ml-n1 pl-1"
                      >
                        mdi-plus
                      </v-icon>
                    </span>
                    <span
                      id="filters"
                      style="cursor:pointer"
                      class="grey--text text--darken-2 font-weight-regular mt-1"
                    >
                      Filters
                    </span>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilterState"
                        label="State"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilterDistrict"
                        label="District"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilterLocality"
                        label="Locality"
                        flat
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>

    <!-- TABLE -->
    <v-row justify="center" class="mx-16">
      <v-col cols="12">
        <v-container>
          <v-data-table
            v-if="searchResults.length"
            dense
            style="cursor:pointer"
            :headers="headers"
            :items="searchResults"
            item-key="tblId"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            multi-sort
            hide-default-footer
            class="elevation-3 white"
            @page-count="pageCount = $event"
            @click:row="tblRowClicked"
          >
            <!-- TABLE HEADER CONFIGURATION -->
            <template #[`header.name`]="{ header }">
              <span class="white--text font-weight-black">{{ header.text }}</span>
            </template>
            <template #[`header.ident`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.age`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.race`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.nationality`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.state`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.district`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.locality`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>

            <!-- TO HIDE(CAMOUFLAGE WITH 2ND LAST COLUMN)
          ID COLUMN HEADER & BODY -->
            <template #[`header.tblId`]>
              <div v-if="false" />
            </template>
            <template #[`item.tblId`]>
              <div v-if="false" />
            </template>
          </v-data-table>
        </v-container>
      </v-col>

      <v-col cols="auto" class="mx-auto">
        <v-pagination
          v-if="searchResults.length"
          v-model="page"
          :length="pageCount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, subMonths, subYears } from 'date-fns'

export default {
  components: {
    //
  },

  middleware: ['token'],

  /* CONVERT SEARCH QUERY TO SQL COMMAND
    =======================================
    Dependencies: data-fns

    0) Filter by: All other fields when ident is empty
    --------------------------------------------------
    [Javascript]
    ident = !!ident ? ident : '%'
    name = !!name ? '%' + name + '%' : '%'

    let now = new Date()
    minDate = datefns.format(datefns.subYears(now, maxAge), 'yyyy-MM-dd')
    minDate = datefns.format(datefns.subMonths(now, maxAge), 'yyyy-MM-dd')
    maxDate = datefns.format(datefns.subYears(now, minAge), 'yyyy-MM-dd')
    maxDate = datefns.format(datefns.subMonths(now, minAge), 'yyyy-MM-dd')

    race = !!race ? race : '%'
    nationality = !!nationality ? nationality : '%'

    state = !!state ? state : '%'
    district = !!district ? district : '%'
    locality = !!locality ? locality : '%'

    [Golang]
    sql1 := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where
              name ilike $1
              and race ilike $4
              and nationality ilike $5
              and state ilike $6
              and district ilike $7
              and locality ilike $8`
    sql2 := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where dob between timestamp $1 and timestamp $2`

    rows, err := conn.Query(context.Background(), sql1/sql2, state, district, locality)

    1) Filter by: ident
    -------------------
    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where ident=$1`
    rows, err := conn.Query(context.Background(), sql, ident)

    2) Filter by: name
    ------------------
    [Javascript]
    name = '%' + name + '%'

    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where name ilike $1`
    rows, err := conn.Query(context.Background(), sql, name)

    3) Filter by: minAge, maxAge (to calculate dob)
    -----------------------------------------------
    a) Age range:-
    [Javascript]
    let now = new Date()

    minDate = datefns.format(datefns.subYears(now, maxAge), 'yyyy-MM-dd')
    minDate = datefns.format(datefns.subMonths(now, maxAge), 'yyyy-MM-dd')

    maxDate = datefns.format(datefns.subYears(now, minAge), 'yyyy-MM-dd')
    maxDate = datefns.format(datefns.subMonths(now, minAge), 'yyyy-MM-dd')

    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where dob between $1 and $2`
    rows, err := conn.Query(context.Background(), sql, minDate, maxDate)

    4) Filter by: race
    ------------------
    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where race ilike $1`
    rows, err := conn.Query(context.Background(), sql, race)

    5) Filter by: nationality
    -------------------------
    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where nationality ilike $1`
    rows, err := conn.Query(context.Background(), sql, nationality)

    6) Filter by: state, district, locality
    ---------------------------------------
    [Javascript]
    state = !!state ? state : '%'
    district = !!district ? district : '%'
    locality = !!locality? locality : '%'

    [Golang]
    sql := `select people.ident, people.name, people.dob, people.race,
              people.nationality, people.locality, people.district, people.state
            from kkm.people
            where state ilike $1
              and district ilike $2
              and locality ilike $3`
    rows, err := conn.Query(context.Background(), sql, state, district, locality)

    */

  data () {
    return {
      /* STATIC HTML ELEMENT CONFIGURATION */
      panel: undefined,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        { text: 'Name', align: 'start', sortable: true, value: 'name', class: 'success', width: '150px' },
        { text: 'tblId', value: 'tblId', sortable: false, class: 'success', width: '1px' },
        { text: 'IC/Passport', value: 'ident', sortable: false, class: 'success', width: '150px' },
        { text: 'Age', value: 'age', class: 'success', width: '110px' },
        { text: 'Race', value: 'race', class: 'success', width: '100px' },
        { text: 'Nationality', value: 'nationality', class: 'success', width: '150px' },
        { text: 'State', value: 'state', class: 'success', width: '150px' },
        { text: 'District', value: 'district', class: 'success', width: '150px' },
        { text: 'Locality/Taman', value: 'locality', class: 'success', width: '150px' }
      ],
      racePatList: [
        /^malay$/i,
        /^chinese$/i,
        /^indian$/i,
        /^sikh$/i,
        /^orang asli$/i,
        /^kadazan$/i,
        /^dusun$/i,
        /^iban$/i,
        /^indonesian$/i,
        /^filipin$/i,
        /^myanmar$/i,
        /^vietnamese$/i,
        /^bangladesh$/i
      ]
    }
  },

  created() {
    this.$router.push({
        path: 'home'        
      })
  },

  computed: {
    currentYear () {
      return new Date().getUTCFullYear().toString()
    },

    endOfCurrentYearDate () {
      return new Date(this.currentYear + '-12-31')
    },

    // SEARCH
    search: {
      get () {
        return this.$store.getters['people/search']
      },
      set (val) {
        this.$store.commit('people/search', val)
      }
    },

    searching: {
      get () {
        return this.$store.getters['people/searching']
      },
      set (val) {
        this.$store.commit('people/searching', val)
      }
    },

    searchQueryPrefix: {
      get () {
        return this.$store.getters['people/searchQueryPrefix']
      },
      set (val) {
        this.$store.commit('people/searchQueryPrefix', val)
      }
    },

    searchQuery: {
      get () {
        return this.$store.getters['people/searchQuery']
      },
      set (val) {
        this.$store.commit('people/searchQuery', val)
      }
    },

    // SEARCH FILTERS
    searchFilters () {
      return this.$store.getters['people/searchFilters']
    },

    searchFilterIdent: {
      get () {
        return this.$store.getters['people/searchFilterIdent']
      },
      set (val) {
        this.$store.commit('people/searchFilterIdent', val)
      }
    },

    searchFilterName: {
      get () {
        return this.$store.getters['people/searchFilterName']
      },
      set (val) {
        this.$store.commit('people/searchFilterName', val)
      }
    },

    searchFilterAgeVal: {
      get () {
        return this.$store.getters['people/searchFilterAgeVal']
      },
      set (val) {
        this.$store.commit('people/searchFilterAgeVal', val)
      }
    },

    searchFilterAgeType: {
      get () {
        return this.$store.getters['people/searchFilterAgeType']
      },
      set (val) {
        this.$store.commit('people/searchFilterAgeType', val)
      }
    },

    searchFilterMinAgeVal: {
      get () {
        return this.$store.getters['people/searchFilterMinAgeVal']
      },
      set (val) {
        this.$store.commit('people/searchFilterMinAgeVal', val)
      }
    },

    searchFilterMinAgeType: {
      get () {
        return this.$store.getters['people/searchFilterMinAgeType']
      },
      set (val) {
        this.$store.commit('people/searchFilterMinAgeType', val)
      }
    },

    searchFilterMaxAgeVal: {
      get () {
        return this.$store.getters['people/searchFilterMaxAgeVal']
      },
      set (val) {
        this.$store.commit('people/searchFilterMaxAgeVal', val)
      }
    },

    searchFilterMaxAgeType: {
      get () {
        return this.$store.getters['people/searchFilterMaxAgeType']
      },
      set (val) {
        this.$store.commit('people/searchFilterMaxAgeType', val)
      }
    },

    searchFilterRace: {
      get () {
        return this.$store.getters['people/searchFilterRace']
      },
      set (val) {
        this.$store.commit('people/searchFilterRace', val)
      }
    },

    searchFilterNationality: {
      get () {
        return this.$store.getters['people/searchFilterNationality']
      },
      set (val) {
        this.$store.commit('people/searchFilterNationality', val)
      }
    },

    searchFilterState: {
      get () {
        return this.$store.getters['people/searchFilterState']
      },
      set (val) {
        this.$store.commit('people/searchFilterState', val)
      }
    },

    searchFilterDistrict: {
      get () {
        return this.$store.getters['people/searchFilterDistrict']
      },
      set (val) {
        this.$store.commit('people/searchFilterDistrict', val)
      }
    },

    searchFilterLocality: {
      get () {
        return this.$store.getters['people/searchFilterLocality']
      },
      set (val) {
        this.$store.commit('people/searchFilterLocality', val)
      }
    },

    // SEARCH SQL INPUT VARIABLES
    sqlInputVars () {
      return this.$store.getters['people/sqlInputVars']
    },

    sqlInputVarIdent: {
      get () {
        return this.$store.getters['people/sqlInputVarIdent']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarIdent', val)
      }
    },

    sqlInputVarName: {
      get () {
        return this.$store.getters['people/sqlInputVarName']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarName', val)
      }
    },

    sqlInputVarDobIntvlMinDate: {
      get () {
        return this.$store.getters['people/sqlInputVarDobIntvlMinDate']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarDobIntvlMinDate', val)
      }
    },

    sqlInputVarDobIntvlMaxDate: {
      get () {
        return this.$store.getters['people/sqlInputVarDobIntvlMaxDate']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarDobIntvlMaxDate', val)
      }
    },

    sqlInputVarRace: {
      get () {
        return this.$store.getters['people/sqlInputVarRace']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarRace', val)
      }
    },

    sqlInputVarNationality: {
      get () {
        return this.$store.getters['people/sqlInputVarNationality']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarNationality', val)
      }
    },

    sqlInputVarState: {
      get () {
        return this.$store.getters['people/sqlInputVarState']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarState', val)
      }
    },

    sqlInputVarDistrict: {
      get () {
        return this.$store.getters['people/sqlInputVarDistrict']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarDistrict', val)
      }
    },

    sqlInputVarLocality: {
      get () {
        return this.$store.getters['people/sqlInputVarLocality']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarLocality', val)
      }
    },

    sqlInputVarSqlOpt: {
      get () {
        return this.$store.getters['people/sqlInputVarSqlOpt']
      },
      set (val) {
        this.$store.commit('people/sqlInputVarSqlOpt', val)
      }
    },

    // SEARCH RESULTS
    searchResults: {
      get () {
        return this.$store.getters['people/searchResults']
      },
      set (val) {
        this.$store.commit('people/searchResults')
      }
    }

  },

  watch: {
    search (val) {
      if (!val) {
        // RESET VARIABLES
        this.resetSearchFilters()
        return
      }

      // RESET VARIABLES
      this.searchQueryPrefix = 'Search for'
      this.resetSearchFilters()

      // REGEX PATTERNS
      const generalIcPat = /^[0-9]*[-]*[0-9]*[-]*[0-9]*$/
      const icPat1 = /^[0-9]{6,6}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{4,4}$/
      const icPat2 = /^[0-9]{6,6}[0-9]{2,2}[0-9]{4,4}$/
      const agePat = /^[0-9]{1,3}[mMyY]{1}$/
      const ageRangePat = /^[0-9]{1,3}[mMyY]{1}-[0-9]{1,3}[mMyY]{1}$/
      const invalidAgeRangePat1 = /^[0-9]{3,}-[0-9]{4,}$/
      const invalidAgeRangePat2 = /^[0-9]{4,}-[0-9]{3,}$/
      const passportPat = /^[a-zA-Z]{1,2}[0-9]{6,8}[a-zA-Z]{0,1}$/
      const invalidPassportPat1 = /^[a-zA-Z]{3,}[0-9]{6,8}[a-zA-Z]{0,1}$/
      const invalidPassportPat2 = /^[a-zA-Z]{1,2}[0-9]{9,}[a-zA-Z]{0,1}$/
      const invalidPassportPat3 = /^[a-zA-Z]{1,2}[0-9]{6,8}[a-zA-Z]{2,}$/
      const invalidPassportPat4 = /^[a-zA-Z]{3,}[0-9]{9,}[a-zA-Z]{2,}$/
      const invalidPassportPat5 = /^[a-zA-Z]{3,}[0-9]{9,}[a-zA-Z]{0,1}$/
      const invalidPassportPat6 = /^[a-zA-Z]{1,2}[0-9]{9,}[a-zA-Z]{2,}$/
      const invalidPassportPat7 = /^[a-zA-Z]{3,}[0-9]{6,8}[a-zA-Z]{2,}$/
      const racePat = /^[ ]*[a-z A-Z]*[a-z A-Z]*[ ]*$/
      const locationPat = /^[a-zA-Z0-9 ]*:[a-zA-Z0-9 ]*[:]?[a-zA-Z0-9 ]*$/

      // IC
      if (generalIcPat.test(val) &&
          (icPat1.test(val) ||
          icPat2.test(val))) {
        this.searchQuery = 'IC: ' + val
        this.searchFilterIdent = val.replace(/-/g, '')

      // Invalid IC
      } else if (generalIcPat.test(val) &&
          (!icPat1.test(val) &&
          !icPat2.test(val))) {
        this.searchQuery = 'Invalid IC number'
        this.searchQueryPrefix = ''

      // Age
      } else if (agePat.test(val)) {
        this.searchQuery = 'age: ' + this.formatAgeStrOutput(
          val,
          this.searchFilterAgeVal,
          this.searchFilterAgeType)

      // Age Range
      } else if (ageRangePat.test(val)) {
        const ageArr = val.split('-')
        const minAgeType = ageArr[0][ageArr[0].length - 1].toLowerCase()
        const maxAgeType = ageArr[1][ageArr[1].length - 1].toLowerCase()
        let minAge = parseInt(ageArr[0].slice(0, ageArr[0].length - 1))
        if (minAgeType === 'y') {
          minAge = minAge * 12
        }
        let maxAge = parseInt(ageArr[1].slice(0, ageArr[1].length - 1))
        if (maxAgeType === 'y') {
          maxAge = maxAge * 12
        }
        if (minAge > maxAge || minAgeType > maxAgeType) {
          this.searchQuery = 'Invalid age range, min age > max age!'
          this.searchQueryPrefix = ''
        } else if (minAge === maxAge) {
          this.searchQuery = 'age: ' + this.formatAgeStrOutput(
            ageArr[0],
            this.searchFilterAgeVal,
            this.searchFilterAgeType)
        } else {
          this.searchQuery = 'age range: ' +
            this.formatAgeStrOutput(ageArr[0],
              this.searchFilterMinAgeVal,
              this.searchFilterMinAgeType) +
            ' to: ' +
            this.formatAgeStrOutput(ageArr[1],
              this.searchFilterMaxAgeVal,
              this.searchFilterMaxAgeType)
        }

      // Invalid Age Range
      } else if (invalidAgeRangePat1.test(val) ||
                  invalidAgeRangePat2.test(val)) {
        this.searchQuery = 'Invalid age range, age value too big!'
        this.searchQueryPrefix = ''

      // Nationality, Race, Name
      } else if (racePat.test(val)) {
        if (val.match(/^[ ]*warganegara[ ]*$/i) ||
            val.match(/^[ ]*bukan[ ]*warganegara[ ]*$/i)) {
          this.searchQuery = 'nationality: ' + val
          this.searchFilterNationality = val
          return
        }
        for (let i = 0; i < this.racePatList.length; i++) {
          if (val.search(this.racePatList[i]) !== -1) {
            this.searchQuery = 'race: ' + val
            this.searchFilterRace = val
            return
          }
        }
        this.searchQuery = 'name: ' + val
        this.searchFilterName = val

      // Location: State, District, Locality
      } else if (locationPat.test(val)) {
        const locationArr = val.split(':')
        const locationType = locationArr.length
        const state = locationArr[0].trim() ? locationArr[0] : 'all'
        this.searchFilterState = locationArr[0].trim() ? locationArr[0].trim() : '%'
        if (locationType === 2) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          this.searchFilterDistrict = locationArr[1].trim() ? locationArr[1].trim() : '%'
          this.searchQuery = 'state: ' + state +
                             ', district: ' + district
        } else if (locationType === 3) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          this.searchFilterDistrict = locationArr[1].trim() ? locationArr[1].trim() : '%'
          const locality = locationArr[2].trim() ? locationArr[2] : 'all'
          this.searchFilterLocality = locationArr[2].trim() ? locationArr[2].trim() : '%'
          this.searchQuery = 'state: ' + state +
                             ', district: ' + district +
                             ', locality/taman: ' + locality
        }

      // Passport
      } else if (passportPat.test(val)) {
        this.searchQuery = 'passport: ' + val
        this.searchFilterIdent = val

      // Invalid Passport
      } else if (invalidPassportPat1.test(val) ||
                invalidPassportPat2.test(val) ||
                invalidPassportPat3.test(val) ||
                invalidPassportPat4.test(val) ||
                invalidPassportPat5.test(val) ||
                invalidPassportPat6.test(val) ||
                invalidPassportPat7.test(val)) {
        this.searchQuery = 'Invalid passport number!'
        this.searchQueryPrefix = ''

      // Unknown
      } else {
        this.searchQuery = '?'
      }
    }
  },

  methods: {

    resetSearchFilters () {
      this.searchFilterIdent = ''
      this.searchFilterName = ''
      this.searchFilterAgeVal = ''
      this.searchFilterAgeType = ''
      this.searchFilterMinAgeVal = ''
      this.searchFilterMinAgeType = ''
      this.searchFilterMaxAgeVal = ''
      this.searchFilterMaxAgeType = ''
      this.searchFilterRace = ''
      this.searchFilterNationality = ''
      this.searchFilterState = ''
      this.searchFilterDistrict = ''
      this.searchFilterLocality = ''
    },

    getDobDateIntervalFromAge () {
      const now = new Date()

      if (this.searchFilterAgeVal) {
        if (this.searchFilterAgeType === 'm') {
          const targetYear = format(subMonths(now, this.searchFilterAgeVal), 'yyyy')
          this.sqlInputVarDobIntvlMinDate = targetYear + '-01-01'
          this.sqlInputVarDobIntvlMaxDate = targetYear + '-12-31'
        } else if (this.searchFilterAgeType === 'y') {
          const targetYear = format(subYears(now, this.searchFilterAgeVal), 'yyyy')
          this.sqlInputVarDobIntvlMinDate = targetYear + '-01-01'
          this.sqlInputVarDobIntvlMaxDate = targetYear + '-12-31'
        }
      } else if (this.searchFilterMinAgeVal) {
        // MinAge
        if (this.searchFilterMinAgeType === 'm') {
          this.sqlInputVarDobIntvlMaxDate = format(subMonths(now, this.searchFilterMinAgeVal), 'yyyy-MM-dd')
        } else if (this.searchFilterMinAgeType === 'y') {
          this.sqlInputVarDobIntvlMaxDate = format(subYears(now, this.searchFilterMinAgeVal), 'yyyy-MM-dd')
        }
        // MaxAge
        if (this.searchFilterMaxAgeType === 'm') {
          this.sqlInputVarDobIntvlMinDate = format(subMonths(now, this.searchFilterMaxAgeVal), 'yyyy-MM-dd')
        } else if (this.searchFilterMaxAgeType === 'y') {
          this.sqlInputVarDobIntvlMinDate = format(subYears(now, this.searchFilterMaxAgeVal), 'yyyy-MM-dd')
        }
      } else {
        this.sqlInputVarDobIntvlMinDate = '%'
        this.sqlInputVarDobIntvlMaxDate = '%'
      }
    },

    prepareSqlInputVars () {
      this.sqlInputVarIdent = ''
      this.sqlInputVarName = ''
      this.sqlInputVarDobIntvlMinDate = ''
      this.sqlInputVarDobIntvlMaxDate = ''
      this.sqlInputVarRace = ''
      this.sqlInputVarNationality = ''
      this.sqlInputVarState = ''
      this.sqlInputVarDistrict = ''
      this.sqlInputVarLocality = ''

      if (this.searchFilterIdent) {
        this.sqlInputVarIdent = this.searchFilterIdent
        this.sqlInputVarSqlOpt = '1'
      } else if (this.searchFilterAgeVal ||
                this.searchFilterMinAgeVal) {
        this.getDobDateIntervalFromAge()
        this.sqlInputVarSqlOpt = '2'
      } else {
        this.sqlInputVarName = this.searchFilterName ? '%' + this.searchFilterName + '%' : '%'
        this.sqlInputVarRace = this.searchFilterRace ? this.searchFilterRace : '%'
        this.sqlInputVarNationality = this.searchFilterNationality ? this.searchFilterNationality : '%'
        this.sqlInputVarState = this.searchFilterState ? this.searchFilterState : '%'
        this.sqlInputVarDistrict = this.searchFilterDistrict ? this.searchFilterDistrict : '%'
        this.sqlInputVarLocality = this.searchFilterLocality ? this.searchFilterLocality : '%'
        this.sqlInputVarSqlOpt = '3'
      }
    },

    async doSearch () {
      if (!this.search) {
        return
      }
      if (this.search &&
          this.$store.commit('people/checkIfObjEmpty', this.searchFilters)) {
        this.searchQuery = ''
        this.searchQueryPrefix = 'Invalid search query'
        return
      }

      this.searching = true
      this.prepareSqlInputVars()
      try {
        const { data } = await this.$axios.post(
          'http://localhost:8080/people/search',
          this.sqlInputVars
        )
        this.$store.commit('people/setSearchResultsLen', 0)
        for (let i = 0; i < data.peopleSearchResults.length; i++) {
          const searchResult = {
            name: data.peopleSearchResults[i].name,
            ident: data.peopleSearchResults[i].ident,
            dob: data.peopleSearchResults[i].dob.substring(0, 10),
            race: data.peopleSearchResults[i].race,
            nationality: data.peopleSearchResults[i].nationality,
            state: data.peopleSearchResults[i].state,
            district: data.peopleSearchResults[i].district,
            locality: data.peopleSearchResults[i].locality
          }
          searchResult.age = this.getAge(searchResult.dob)
          this.$store.commit('people/pushSearchResults', searchResult)
        }
      } catch (error) {
      // TODO: Add error handling.
      }
      this.searching = false
    },

    formatAgeStrOutput (ageStr, ageVal, ageType) {
      ageType = ageStr[ageStr.length - 1].toLowerCase()
      ageStr = ageStr.slice(0, ageStr.length - 1)
      ageVal = parseInt(ageStr)
      if (ageType === 'm') {
        if (ageVal >= 12) {
          const valYear = Math.floor(ageVal / 12)
          const year = valYear > 1 ? ' years ' : ' year '
          const valResidualMonth = (ageVal % 12)
          const residualMonth = valResidualMonth > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + ' months old' +
              '  (' + valYear.toString() + year +
              valResidualMonth.toString() + residualMonth + 'old)'
          return searchQuery
        } else {
          const month = ageVal > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + month + 'old'
          return searchQuery
        }
      }
      const year = ageVal > 1 ? ' years ' : ' year '
      const searchQuery = ageStr + year + 'old'
      return searchQuery
    },

    getAge (dob) {
      if (dob === '') { return '' }

      let diffMs = Date.now() - new Date(dob)
      // Day
      const diff = diffMs / 1000
      const diffDay = diff / (60 * 60 * 24)
      const ageDay = Math.abs(Math.round(diffDay))
      if (ageDay === 1) {
        return ageDay.toString() + ' day old'
      }
      if (ageDay <= 30) {
        return ageDay.toString() + ' days old'
      }
      // Month
      const diffMonth = diffDay / (7 * 4)
      const ageMonth = Math.abs(Math.round(diffMonth))
      if (ageMonth === 1) {
        return ageMonth.toString() + ' month old'
      }
      if (ageMonth <= 12) {
        return ageMonth.toString() + ' months old'
      }
      // Year
      diffMs = this.endOfCurrentYearDate - new Date(dob)
      const ageDt = new Date(diffMs)
      const ageYear = Math.abs(ageDt.getUTCFullYear() - 1970)
      if (ageYear === 1) {
        return ageYear.toString() + ' year old'
      }
      return ageYear.toString() + ' years old'
    },

    createNewProfile () {
      this.$router.push({
        path: 'people',
        query: {
          isNewProfile: true
        }
      })
    },

    tblRowClicked (item, miscData) {
      // this.$router.push({ path: 'people', query: { ident: item.ident } })
      this.$router.push({
        path: 'people',
        query: {
          ident: item.ident,
          isNewProfile: false
        }
      })
    },

    filterPanelClickEvent (clickEvent) {
      // event.target gives you html 'Element' object.
      // event.target.innerHTML & event.target.textContent
      // both give you the Element inner content.
      if (clickEvent.target.id.trim().toLowerCase() === 'mdidotsvertical' ||
          clickEvent.target.id.trim().toLowerCase() === 'filters' ||
          clickEvent.target.id.trim().toLowerCase() === 'newprofile' ||
          clickEvent.target.id.trim().toLowerCase() === 'newprofileicon') {
        // allow click event to propagate for
        // click that occurs on the 'Enable' button.
        return
      }
      // For click that does not fulfill the criteria above,
      // do not allow the click event to pass through
      // (i.e. clicking on it does nothing)
      clickEvent.stopPropagation()
    }
  }

}
</script>

<style>
div.search_onhover_highlight:hover {
  color: #29B6F6;
}
</style>
