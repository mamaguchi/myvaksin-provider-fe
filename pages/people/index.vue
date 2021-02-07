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
      <span class="text-h3">
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
          @click:row="tblRowClicked"
        >
          <!-- TABLE HEADER CONFIGURATION -->
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

          <!-- TOOLBAR -->
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                <div class="ml-1 mt-1">
                  <v-icon x-large color="pink">
                    mdi-heart-plus
                  </v-icon>
                  <v-icon class="ml-n2 mt-n2" color="blue lighten-3">
                    mdi-needle
                  </v-icon>
                </div>
              </v-toolbar-title>
              <v-spacer />

              <!-- EDIT DIALOG -->
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Vaccination"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.brand"
                            label="Vaccine Brand"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.type"
                            label="Vaccine Type"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.against"
                            label="Against"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.raoa"
                            label="RAOA"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.aoa"
                            label="AOA"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.fa"
                            label="First Adm"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.fdd"
                            label="1st Dose Date"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.sdd"
                            label="2nd Dose Date"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.aefi"
                            label="AEFI Present"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.aefisx"
                            label="AEFI Sx"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                    <v-btn
                      color="yellow darken-1"
                      text
                      :disabled="editedIndex===-1"
                      @click="deleteItem"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- DELETE DIALOG -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to delete this item?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="closeDelete">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                      OK
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <!-- TABLE NO DATA -->
          <template #no-data>
            <span class="text-h4 grey--text">Sorry, no data available :(</span>
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
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        aoa: '',
        fa: '',
        fdd: '',
        sdd: '',
        aefi: null,
        aefisx: ''
      },
      defaultItem: {
        name: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        aoa: '',
        fa: '',
        fdd: '',
        sdd: '',
        aefi: null,
        aefisx: ''
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    tblRowClicked (item, miscData) {
      // eslint-disable-next-line
      console.log(item.name)
      this.editItem(item)
    },

    editItem (item) {
      this.editedIndex = this.vaccinations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem () {
      // this.editedIndex = this.vaccinations.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.dialog = false
      this.vaccinations.splice(this.editedIndex, 1)
      this.$nextTick(() => {
        this.editedIndex = -1
      })
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      // this.$nextTick(() => {
      //   // this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.vaccinations[this.editedIndex], this.editedItem)
      } else {
        this.vaccinations.push(this.editedItem)
      }
      this.close()
    }
  }

}
</script>

<style>
.btn_hover_turn_red :hover {
  color: red;
}
</style>
