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
      Race: <h3>{{ searchFilters.race }}</h3>
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
        <v-card-title class="mb-n2">
          <v-row justify="center">
            <span>myVaksin</span>
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
                  <!-- <div> -->
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
                <!-- </div> -->
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
                      id="filters"
                      style="cursor:pointer"
                      class="grey--text text--darken-2 font-weight-regular"
                    >
                      Filters
                    </span>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilters.state"
                        label="State"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilters.district"
                        label="District"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="searchFilters.locality"
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
    <v-row justify="center" class="mx-16 mt-n16">
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

  data () {
    return {
      /* SEARCH */
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

      /* SEARCH RESULTS TABLE */
      searchResults: [],
      panel: undefined,
      state: '',
      district: '',
      locality: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
          class: 'success',
          width: '150px'
        },
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

  computed: {
    currentYear () {
      return new Date().getUTCFullYear().toString()
    },

    endOfCurrentYearDate () {
      return new Date(this.currentYear + '-12-31')
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
        this.searchFilters.ident = val.replace(/-/g, '')

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
          this.searchFilters.age)

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
            this.searchFilters.age)
        } else {
          this.searchQuery = 'age range: ' +
            this.formatAgeStrOutput(ageArr[0], this.searchFilters.minAge) +
            ' to: ' +
            this.formatAgeStrOutput(ageArr[1], this.searchFilters.maxAge)
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
          this.searchFilters.nationality = val
          return
        }
        for (let i = 0; i < this.racePatList.length; i++) {
          if (val.search(this.racePatList[i]) !== -1) {
            this.searchQuery = 'race: ' + val
            this.searchFilters.race = val
            return
          }
        }
        this.searchQuery = 'name: ' + val
        this.searchFilters.name = val

      // Location: State, District, Locality
      } else if (locationPat.test(val)) {
        const locationArr = val.split(':')
        const locationType = locationArr.length
        const state = locationArr[0].trim() ? locationArr[0] : 'any'
        this.searchFilters.state = locationArr[0].trim() ? locationArr[0].trim() : '%'
        if (locationType === 2) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          this.searchFilters.district = locationArr[1].trim() ? locationArr[1].trim() : '%'
          this.searchQuery = 'state: ' + state +
                             ', district: ' + district
        } else if (locationType === 3) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          this.searchFilters.district = locationArr[1].trim() ? locationArr[1].trim() : '%'
          const locality = locationArr[2].trim() ? locationArr[2] : 'all'
          this.searchFilters.locality = locationArr[2].trim() ? locationArr[2].trim() : '%'
          this.searchQuery = 'state: ' + state +
                             ', district: ' + district +
                             ', locality/taman: ' + locality
        }

      // Passport
      } else if (passportPat.test(val)) {
        this.searchQuery = 'passport: ' + val
        this.searchFilters.ident = val

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

  // async created () {
  //   try {
  //     const { data } = await this.$axios.post(
  //       'http://localhost:8080/people/search',
  //       this.searchFilters
  //     )

  //     for (let i = 0; i < data.peopleSearchResults.length; i++) {
  //       const searchResult = {
  //         name: data.peopleSearchResults[i].name,
  //         ident: data.peopleSearchResults[i].ident,
  //         dob: data.peopleSearchResults[i].dob.substring(0, 10),
  //         race: data.peopleSearchResults[i].race,
  //         nationality: data.peopleSearchResults[i].nationality,
  //         state: data.peopleSearchResults[i].state,
  //         district: data.peopleSearchResults[i].district,
  //         locality: data.peopleSearchResults[i].locality
  //       }
  //       searchResult.age = this.getAge(searchResult.dob)
  //       this.searchResults.push(searchResult)
  //     }
  //   } catch (error) {
  //     //
  //   }
  // },

  methods: {
    resetSearchFilters () {
      this.searchFilters.ident = ''
      this.searchFilters.name = ''
      this.searchFilters.age.value = ''
      this.searchFilters.age.type = ''
      this.searchFilters.minAge.value = ''
      this.searchFilters.minAge.type = ''
      this.searchFilters.maxAge.value = ''
      this.searchFilters.maxAge.type = ''
      this.searchFilters.race = ''
      this.searchFilters.nationality = ''
      this.searchFilters.state = ''
      this.searchFilters.district = ''
      this.searchFilters.locality = ''
    },

    getDobDateIntervalFromAge () {
      const now = new Date()

      if (this.searchFilters.age.value) {
        if (this.searchFilters.age.type === 'm') {
          const targetYear = format(subMonths(now, this.searchFilters.age.value), 'yyyy')
          this.sqlInputVars.dobInterval.minDate = targetYear + '-01-01'
          this.sqlInputVars.dobInterval.maxDate = targetYear + '-12-31'
        } else if (this.searchFilters.age.type === 'y') {
          const targetYear = format(subYears(now, this.searchFilters.age.value), 'yyyy')
          this.sqlInputVars.dobInterval.minDate = targetYear + '-01-01'
          this.sqlInputVars.dobInterval.maxDate = targetYear + '-12-31'
        }
      } else if (this.searchFilters.minAge.value) {
        if (this.searchFilters.minAge.type === 'm') {
          this.sqlInputVars.dobInterval.minDate = format(subMonths(now, this.searchFilters.maxAge.value), 'yyyy-MM-dd')
          this.sqlInputVars.dobInterval.maxDate = format(subMonths(now, this.searchFilters.minAge.value), 'yyyy-MM-dd')
        } else if (this.searchFilters.minAge.type === 'y') {
          this.sqlInputVars.dobInterval.minDate = format(subYears(now, this.searchFilters.maxAge.value), 'yyyy-MM-dd')
          this.sqlInputVars.dobInterval.maxDate = format(subYears(now, this.searchFilters.minAge.value), 'yyyy-MM-dd')
        }
      } else {
        this.sqlInputVars.dobInterval.minDate = '%'
        this.sqlInputVars.dobInterval.maxDate = '%'
      }
    },

    prepareSqlInputVars () {
      this.sqlInputVars.ident = ''
      this.sqlInputVars.name = ''
      this.sqlInputVars.dobInterval.minDate = ''
      this.sqlInputVars.dobInterval.maxDate = ''
      this.sqlInputVars.race = ''
      this.sqlInputVars.nationality = ''
      this.sqlInputVars.state = ''
      this.sqlInputVars.district = ''
      this.sqlInputVars.locality = ''

      if (this.searchFilters.ident) {
        this.sqlInputVars.ident = this.searchFilters.ident
        this.sqlInputVars.sqlOpt = '1'
      } else if (this.searchFilters.age.value ||
                this.searchFilters.minAge.value) {
        this.getDobDateIntervalFromAge()
        this.sqlInputVars.sqlOpt = '2'
      } else {
        this.sqlInputVars.name = this.searchFilters.name ? '%' + this.searchFilters.name + '%' : '%'
        this.sqlInputVars.race = this.searchFilters.race ? this.searchFilters.race : '%'
        this.sqlInputVars.nationality = this.searchFilters.nationality ? this.searchFilters.nationality : '%'
        this.sqlInputVars.state = this.searchFilters.state ? this.searchFilters.state : '%'
        this.sqlInputVars.district = this.searchFilters.district ? this.searchFilters.district : '%'
        this.sqlInputVars.locality = this.searchFilters.locality ? this.searchFilters.locality : '%'
        this.sqlInputVars.sqlOpt = '3'
      }
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
    },

    async doSearch () {
      if (!this.search) {
        return
      }
      if (this.search &&
          this.checkIfObjEmpty(this.searchFilters)) {
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
        this.searchResults.length = 0
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
          this.searchResults.push(searchResult)
        }
      } catch (error) {
      // TODO: Add error handling.
      }
      this.searching = false
    },

    formatAgeStrOutput (ageStr, ageFilter) {
      ageFilter.type = ageStr[ageStr.length - 1].toLowerCase()
      ageStr = ageStr.slice(0, ageStr.length - 1)
      ageFilter.value = parseInt(ageStr)
      if (ageFilter.type === 'm') {
        if (ageFilter.value >= 12) {
          const valYear = Math.floor(ageFilter.value / 12)
          const year = valYear > 1 ? ' years ' : ' year '
          const valResidualMonth = (ageFilter.value % 12)
          const residualMonth = valResidualMonth > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + ' months old' +
              '  (' + valYear.toString() + year +
              valResidualMonth.toString() + residualMonth + 'old)'
          return searchQuery
        } else {
          const month = ageFilter.value > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + month + 'old'
          return searchQuery
        }
      }
      const year = ageFilter.value > 1 ? ' years ' : ' year '
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

    tblRowClicked () {
      //
    },

    filterPanelClickEvent (clickEvent) {
      // event.target gives you html 'Element' object.
      // event.target.innerHTML & event.target.textContent
      // both give you the Element inner content.
      if (clickEvent.target.id.trim().toLowerCase() === 'mdidotsvertical' ||
          clickEvent.target.id.trim().toLowerCase() === 'filters') {
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
