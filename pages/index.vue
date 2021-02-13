<template>
  <v-container
    fluid
    fill-height
  >
    <h5>{{ searchFilters.age.value }}</h5>
    <h5>{{ searchFilters.age.type }}</h5>
    <h5>{{ searchFilters.minAge.value }}</h5>
    <h5>{{ searchFilters.minAge.type }}</h5>
    <h5>{{ searchFilters.maxAge.value }}</h5>
    <h5>{{ searchFilters.maxAge.type }}</h5>
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
              clearable
              class="rounded-pill"
            >
              <template #append>
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
                      class="mt-n7 ml-4 mr-2"
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
                >
                  <template #actions>
                    <v-icon id="mdiDotsVertical" style="cursor:pointer">
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
                        v-model="state"
                        label="State"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="district"
                        label="District"
                        flat
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="locality"
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
          v-model="page"
          :length="pageCount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {
    //
  },

  data () {
    return {
      /* SEARCH RESULTS */
      search: '',
      searchQueryPrefix: 'Search for',
      searchQuery: '',
      searchFilters: {
        ident: '880601105149',
        name: '',
        // age: '',
        // ageType: '',
        // minAge: '',
        // minAgeType: '',
        // maxAge: '',
        // maxAgeType: '',
        age: { value: '', type: '' },
        minAge: { value: '', type: '' },
        maxAge: { value: '', type: '' },
        race: '',
        nationality: '',
        state: '',
        district: '',
        locality: ''
      },
      searching: false,

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
      locality = !!locality? locality : '%'

      [Golang]
      sql := `select people.ident, people.name, people.dob, people.race,
                people.nationality, people.locality, people.district, people.state
              from kkm.people
              where
                name ilike $1
                and dob between $2 and $3
                and race ilike $4
                and nationality ilike $5
                and state ilike $6
                and district ilike $7
                and locality ilike $8`
      rows, err := conn.Query(context.Background(), sql, state, district, locality)

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

      searchResults: [],
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
      ],

      /* SEARCH RESULTS TABLE */
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
      ]
    }
  },

  watch: {
    search (val) {
      if (!val) { return }
      this.searchQueryPrefix = 'Search for'
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
        this.searchFilters.ident = ''

      // Age
      } else if (agePat.test(val)) {
        // this.searchQuery = 'age: ' + this.formatAgeStrOutput(val)
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
          // this.searchQuery = 'age: ' + this.formatAgeStrOutput(ageArr[0])
          this.searchQuery = 'age: ' + this.formatAgeStrOutput(ageArr[0])
        } else {
          // this.searchQuery = 'age range: ' + this.formatAgeStrOutput(ageArr[0]) +
          //                   ' to: ' + this.formatAgeStrOutput(ageArr[1])
          this.searchQuery = 'age range: ' + this.formatAgeStrOutput(ageArr[0]) +
                            ' to: ' + this.formatAgeStrOutput(ageArr[1])
        }

      // Invalid Age Range
      } else if (invalidAgeRangePat1.test(val) ||
                  invalidAgeRangePat2.test(val)) {
        this.searchQuery = 'Invalid age range, age value too big!'
        this.searchQueryPrefix = ''

      // Race
      } else if (racePat.test(val)) {
        if (val.match(/^[ ]*warganegara[ ]*$/i) ||
            val.match(/^[ ]*bukan[ ]*warganegara[ ]*$/i)) {
          this.searchQuery = 'nationality: ' + val
          return
        }
        for (let i = 0; i < this.racePatList.length; i++) {
          if (val.search(this.racePatList[i]) !== -1) {
            this.searchQuery = 'race: ' + val
            return
          }
        }
        this.searchQuery = 'name: ' + val

      // Location: State, District, Locality
      } else if (locationPat.test(val)) {
        const locationArr = val.split(':')
        const locationType = locationArr.length
        if (locationType === 2) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          this.searchQuery = 'state: ' + locationArr[0] +
                             ', district: ' + district
        } else if (locationType === 3) {
          const district = locationArr[1].trim() ? locationArr[1] : 'all'
          const locality = locationArr[2].trim() ? locationArr[2] : 'all'
          this.searchQuery = 'state: ' + locationArr[0] +
                             ', district: ' + district +
                             ', locality/taman: ' + locality
        }

      // Passport
      } else if (passportPat.test(val)) {
        this.searchQuery = 'passport: ' + val

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

  async created () {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8080/people/search',
        this.searchFilters
      )

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
      //
    }
  },

  methods: {
    async doSearch () {
      this.searching = true

      // let now = new Date()

      try {
        const { data } = await this.$axios.post(
          'http://localhost:8080/people/search',
          this.searchFilters
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
      //
      }
      this.searching = false
    },

    formatAgeStrOutput (ageStr, ageFilter) {
      // const ageType = ageStr[ageStr.length - 1].toLowerCase()
      ageFilter.type = ageStr[ageStr.length - 1].toLowerCase()
      ageStr = ageStr.slice(0, ageStr.length - 1)
      // const age = parseInt(ageStr)
      ageFilter.value = parseInt(ageStr)
      if (ageFilter.type === 'm') {
        // const ageMonth = parseInt(ageStr)
        // if (ageMonth >= 12) {
        if (ageFilter.value >= 12) {
          // const valYear = Math.floor(ageMonth / 12)
          const valYear = Math.floor(ageFilter.value / 12)
          const year = valYear > 1 ? ' years ' : ' year '
          // const valResidualMonth = (ageMonth % 12)
          const valResidualMonth = (ageFilter.value % 12)
          const residualMonth = valResidualMonth > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + ' months old' +
              '  (' + valYear.toString() + year +
              valResidualMonth.toString() + residualMonth + 'old)'
          return searchQuery
        } else {
          // const month = ageMonth > 1 ? ' months ' : ' month '
          const month = ageFilter.value > 1 ? ' months ' : ' month '
          const searchQuery = ageStr + month + 'old'
          return searchQuery
        }
      }
      // const year = parseInt(ageStr) > 1 ? ' years ' : ' year '
      const year = ageFilter.value > 1 ? ' years ' : ' year '
      const searchQuery = ageStr + year + 'old'
      return searchQuery
    },

    getAge (dob) {
      if (dob === '') { return '' }

      const diffMs = Date.now() - new Date(dob)

      const diff = diffMs / 1000
      const diffDay = diff / (60 * 60 * 24)
      const ageDay = Math.abs(Math.round(diffDay))
      if (ageDay === 1) {
        return ageDay.toString() + ' day old'
      }
      if (ageDay <= 30) {
        return ageDay.toString() + ' days old'
      }

      const diffMonth = diffDay / (7 * 4)
      const ageMonth = Math.abs(Math.round(diffMonth))
      if (ageMonth === 1) {
        return ageMonth.toString() + ' month old'
      }
      if (ageMonth <= 12) {
        return ageMonth.toString() + ' months old'
      }

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
