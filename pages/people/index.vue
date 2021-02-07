<template>
  <v-container
    fluid
    fill-height
  >
    <!-- PROFILE -->
    <v-row class="px-4 mt-6" justify="center">
      <v-col
        cols="12"
        md="8"
        class="my-10"
      >
        <base-material-card>
          <template #heading>
            <div class="display-2 font-weight-light">
              Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              <span><v-icon>mdi-account-edit-outline</v-icon> View and edit bio</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Gender"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Age"
                    class="purple-input"
                    type="number"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Race"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                >
                  <div v-show="false" />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="IC/Passport"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Nationality"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Occupation"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Telephone"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                >
                  <div v-show="false" />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City/Town"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Postal Code"
                    class="purple-input"
                    type="number"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="State"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <!-- PROFILE PICTURE -->
      <v-col
        cols="12"
        md="4"
        class="my-10"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="text-subtitle-1 grey--text mb-1">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="text-h5 font-weight-light black--text mb-3">
              Alec Thompson
            </h4>

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  class="mr-0 btn_hover_turn_red"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-delete-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Delete Account</span>
            </v-tooltip>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>

    <!-- DIVIDER -->
    <v-row class="mb-4">
      <v-divider />
    </v-row>

    <!-- TABLE -->
    <v-row justify="center" class="mb-2">
      <span class="text-h3 text-center">
        Vaccination
      </span>
    </v-row>

    <v-row justify="center" class="mx-8 mb-12">
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="vaccinations"
          item-key="name"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          multi-sort
          hide-default-footer
          class="elevation-1 white"
          @page-count="pageCount = $event"
        >
          <template #[`header.name`]="{ header }">
            <span class="white--text font-weight-black">{{ header.text }}</span>
          </template>
          <template #[`header.brand`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.type`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.against`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.raoa`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.aoa`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.fa`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.fdd`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.sdd`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.aefi`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
          <template #[`header.aefisx`]="{ header }">
            <span class="white--text font-weight-medium">{{ header.text }}</span>
          </template>
        </v-data-table>
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
import MaterialCard from '@/components/base/MaterialCard'

export default {

  components: {
    BaseMaterialCard: MaterialCard
  },
  layout: 'people',

  data () {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: 'Vaccination',
          align: 'start',
          sortable: true,
          value: 'name',
          class: 'success'
        },
        { text: 'Vaccine Brand', value: 'brand', class: 'success' },
        { text: 'Vaccine Type', value: 'type', class: 'success' },
        { text: 'Against', value: 'against', class: 'success' },
        { text: 'RAOA', value: 'raoa', class: 'success' },
        { text: 'AOA', value: 'aoa', class: 'success' },
        { text: 'First Adm', value: 'fa', class: 'success' },
        { text: '1st Dose Date', value: 'fdd', class: 'success' },
        { text: '2nd Dose Date', value: 'sdd', class: 'success' },
        { text: 'AEFI Present', value: 'aefi', class: 'success' },
        { text: 'AEFI Sx', value: 'aefisx', class: 'success' }
      ],
      vaccinations: [
        {
          name: 'Pfizer-BioNTech',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Astra-Zeneca',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Sinovac',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Sputnik',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Johnson-johnson',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'BBV152',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Moderna',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'EpiVacCorona',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'CoronaVac',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        },
        {
          name: 'Ad5-nCoV',
          brand: 159,
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefi: true,
          aefisx: 'itch, sob'
        }
      ]
    }
  }
}
</script>
<style>
.btn_hover_turn_red :hover {
  color: red;
}
</style>
