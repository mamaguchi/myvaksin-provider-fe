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
        <v-container>
          <v-data-table
            dense
            :headers="headers"
            :items="vaccinations"
            item-key="id"
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
            <template #[`header.aefiClass`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.aefiReaction`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>
            <template #[`header.remarks`]="{ header }">
              <span class="white--text font-weight-medium">{{ header.text }}</span>
            </template>

            <!-- TO HIDE(CAMOUFLAGE WITH 2ND LAST COLUMN)
          ID COLUMN HEADER & BODY -->
            <template #[`header.id`]>
              <div v-if="false" />
            </template>
            <template #[`item.id`]>
              <div v-if="false" />
            </template>

            <template #[`item.aefiReaction`]="{ item }">
              <div v-if="item.aefiReaction.length!==0">
                <v-chip
                  v-for="val in item.aefiReaction"
                  :key="val"
                  color="red"
                  text-color="white"
                  small
                  class="ma-1"
                >
                  {{ val }}
                </v-chip>
              </div>
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
                  max-width="700px"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon class="ml-n2">
                        mdi-plus
                      </v-icon>
                      New Vaccination
                    </v-btn>
                  </template>

                  <v-form @submit.prevent="submit">
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
                              md="6"
                            >
                              <v-select
                                id="vaccination"
                                v-model="editedItem.vaccination"
                                :items="vaccinationList"
                                label="Vaccination"
                                :error-messages="requiredErrMsg.vaccination"
                                @change="requiredErrMsg.vaccination=''"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-select
                                id="brand"
                                v-model="editedItem.brand"
                                :items="vaccineBrands[editedItem.vaccination]"
                                item-text="name"
                                item-value="name"
                                no-data-text="Please select a vaccination first"
                                label="Vaccine Brand"
                                :error-messages="requiredErrMsg.brand"
                                @change="requiredErrMsg.brand=''"
                                @input="updateVacInfo"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.type"
                                readonly
                                outlined
                                :success="editedItem.type!=false"
                                :disabled="editedItem.type==false"
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
                                readonly
                                outlined
                                :success="editedItem.against!=false"
                                :disabled="editedItem.against==false"
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
                                readonly
                                outlined
                                :success="editedItem.raoa!=false"
                                :disabled="editedItem.raoa==false"
                                label="RAOA"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <!-- <v-text-field
                              v-model="editedItem.aoa"
                              label="AOA"
                            /> -->

                              <v-autocomplete
                                id="aoa"
                                v-model="editedItem.aoa"
                                :items="ageSelection"
                                label="Age Of Administration (AOA)"
                                :error-messages="requiredErrMsg.aoa"
                                item-text="name"
                                item-value="value"
                                @change="requiredErrMsg.aoa=''"
                              >
                                <template #item="data">
                                  <v-list-item-content>
                                    <v-list-item-title class="font-weight-medium" v-text="data.item.name" />
                                    <v-list-item-subtitle class="caption" v-text="data.item.group" />
                                  </v-list-item-content>
                                </template>
                              </v-autocomplete>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                id="fa"
                                v-model="editedItem.fa"
                                :items="['Yes', 'No']"
                                label="First Administration"
                                :error-messages="requiredErrMsg.fa"
                                @change="requiredErrMsg.fa=''"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <div v-show="false" />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <!-- <v-text-field
                              v-model="editedItem.fdd"
                              label="1st Dose Date"
                            /> -->

                              <v-menu
                                id="fdd"
                                ref="fddMenu"
                                v-model="fddMenu"
                                :close-on-content-click="false"
                                :return-value.sync="editedItem.fdd"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template #activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.fdd"
                                    label="1st Dose Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    :error-messages="requiredErrMsg.fdd"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="editedItem.fdd"
                                  no-title
                                  scrollable
                                  @change="requiredErrMsg.fdd=''"
                                >
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="fddMenu = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.fddMenu.save(editedItem.fdd)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <!-- <v-text-field
                              v-model="editedItem.sdd"
                              label="2nd Dose Date"
                            /> -->

                              <v-menu
                                ref="sddMenu"
                                v-model="sddMenu"
                                :close-on-content-click="false"
                                :return-value.sync="editedItem.sdd"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template #activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.sdd"
                                    label="2nd Dose Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="editedItem.sdd"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="sddMenu = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.sddMenu.save(editedItem.sdd)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <div v-show="false" />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                v-model="editedItem.aefiClass"
                                :items="aefiClass"
                                label="AEFI Class"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="8"
                            >
                              <v-select
                                v-if="editedItem.aefiClass==='Vaccine-Related'"
                                v-model="editedItem.aefiReaction"
                                :items="aefiReaction[editedItem.aefiClass]"
                                no-data-text="Please select an AEFI class first"
                                label="AEFI Reaction"
                                small-chips
                                deletable-chips
                              />
                              <v-select
                                v-else-if="editedItem.aefiClass==='Coincidental-Events'"
                                v-model="editedItem.aefiReaction"
                                disabled
                                label="AEFI Reaction"
                                hint="Please specify events at remarks section"
                                persistent-hint
                                class="green--text"
                              />
                              <v-select
                                v-else-if="editedItem.aefiClass==='None'"
                                v-model="editedItem.aefiReaction"
                                disabled
                                label="AEFI Reaction"
                                hint="N/A"
                                persistent-hint
                                class="green--text"
                              />
                              <v-select
                                v-else
                                v-model="editedItem.aefiReaction"
                                multiple
                                :items="aefiReaction[editedItem.aefiClass]"
                                no-data-text="Please select an AEFI class first"
                                label="AEFI Reaction"
                                small-chips
                                deletable-chips
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="8"
                            >
                              <v-textarea
                                v-model="editedItem.remarks"
                                clearable
                                label="Remarks"
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
                          color="yellow darken-3"
                          text
                          :disabled="editedIndex===-1"
                          @click="deleteItem"
                        >
                          Delete
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
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
        </v-container>
      </v-col>

      <!-- TABLE EXTERNAL PAGINATION -->
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
      vaccinationList: [
        'COVID-19',
        'Measles',
        'Dtap',
        'Polio'
      ],
      vaccineBrandPos: {
        'Pfizer-BioNTech': 0,
        'Astra-Zeneca': 1,
        // eslint-disable-next-line
        'Sinovac': 2,
        // eslint-disable-next-line
        'Sputnik': 3
      },
      vaccineBrands: {
        'COVID-19': [
          { name: 'Pfizer-BioNTech', type: 'RNA', against: 'SARS‑CoV‑2', raoa: 'n/a' },
          { name: 'Astra-Zeneca', type: 'Adenovirus Vector', against: 'SARS‑CoV‑2', raoa: 'n/a' },
          { name: 'Sinovac', type: 'Inactivated SARS‑CoV‑2', against: 'SARS‑CoV‑2', raoa: 'n/a' },
          { name: 'Sputnik', type: 'Adenovirus Vector', against: 'SARS‑CoV‑2', raoa: 'n/a' }
        ]
      },
      aefiClass: [
        'None',
        'Vaccine-Related',
        'Immunization-Error-Related',
        'Immunization-Anxiety-Related',
        'Coincidental-Events'
      ],
      aefiReaction: {
        // eslint-disable-next-line
        'None': [],
        'Vaccine-Related': ['Mild', 'Severe'],
        'Immunization-Error-Related': [
          'Non-Sterile Injection',
          'Vaccine Transport/Storage Error',
          'Reconstitution Error',
          'Injection At Incorrect Site',
          'Contraindication Ignored'
        ],
        'Immunization-Anxiety-Related': [
          'Fainting',
          'Hyperventilation',
          'Vomiting',
          'Convulsion'
        ],
        'Coincidental-Events': []
      },
      headers: [
        {
          text: 'Vaccination',
          align: 'start',
          sortable: true,
          value: 'vaccination',
          class: 'success'
        },
        { text: 'id', align: 'start', value: 'id', sortable: false, class: 'success', width: '1px' },
        { text: 'Vaccine Brand', value: 'brand', class: 'success', width: '150px' },
        { text: 'Vaccine Type', value: 'type', class: 'success', width: '150px' },
        { text: 'Against', value: 'against', class: 'success', width: '150px' },
        { text: 'RAOA', value: 'raoa', class: 'success', width: '150px' },
        { text: 'AOA', value: 'aoa', class: 'success', width: '80px' },
        { text: 'First Adm', value: 'fa', class: 'success' },
        { text: '1st Dose Date', value: 'fdd', class: 'success' },
        { text: '2nd Dose Date', value: 'sdd', class: 'success' },
        { text: 'AEFI', value: 'aefiClass', class: 'success', width: '150px' },
        { text: 'AEFI Rection', value: 'aefiReaction', class: 'success' },
        { text: 'Remarks', value: 'remarks', class: 'success', width: '400px' }

      ],
      vaccinations: [
        {
          id: 0,
          vaccination: 'COVID-19',
          brand: 'Pfizer-BioNTech',
          type: 6,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 1,
          vaccination: 'COVID-19',
          brand: 'Astra-Zeneca',
          type: 'mRNA',
          against: 'SARS-nCoV',
          raoa: 'Any age',
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'Vaccine-Related',
          aefiReaction: ['Mild'],
          remarks: ''
        },
        {
          id: 2,
          vaccination: 'COVID-19',
          brand: 'Sinovac',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'Immunization-Error-Related',
          aefiReaction: ['Non-sterile Injection', 'Vaccine transport/storage error'],
          remarks: 'Hello world. This is a remark section.'
        },
        {
          id: 3,
          vaccination: 'COVID-19',
          brand: 'Sputnik',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'Immunization-Anxiety-Related',
          aefiReaction: ['Fainting', 'Hyperventilation'],
          remarks: ''
        },
        {
          id: 4,
          vaccination: 'COVID-19',
          brand: 'Johnson-johnson',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'Coincidental-Events',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 5,
          vaccination: 'COVID-19',
          brand: 'BBV152',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 6,
          vaccination: 'COVID-19',
          brand: 'Moderna',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 7,
          vaccination: 'COVID-19',
          brand: 'EpiVacCorona',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 8,
          vaccination: 'COVID-19',
          brand: 'CoronaVac',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        },
        {
          id: 9,
          vaccination: 'COVID-19',
          brand: 'Ad5-nCoV',
          type: 6.0,
          against: 24,
          raoa: 4.0,
          aoa: '1%',
          fa: '2021-02-01',
          fdd: '2021-02-01',
          sdd: '2021-02-22',
          aefiClass: 'None',
          aefiReaction: [],
          remarks: ''
        }
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        vaccination: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        aoa: '',
        fa: '',
        fdd: '',
        sdd: '',
        aefiClass: '',
        aefisx: []
      },
      defaultItem: {
        vaccination: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        aoa: '',
        fa: '',
        fdd: '',
        sdd: '',
        aefiClass: '',
        aefisx: []
      },
      requiredRule: [v => !!v || 'This field is required'],
      requiredErrMsg: {
        vaccination: '',
        brand: '',
        aoa: '',
        fa: '',
        fdd: ''
      },
      fddMenu: false,
      sddMenu: false,
      ageSelection: [
        { header: 'Age (month)' },
        { name: '1', value: '1 mth', group: 'month' },
        { name: '2', value: '2 mths', group: 'months' },
        { name: '3', value: '3 mths', group: 'months' },
        { name: '4', value: '4 mths', group: 'months' },
        { name: '5', value: '5 mths', group: 'months' },
        { name: '6', value: '6 mths', group: 'months' },
        { name: '7', value: '7 mths', group: 'months' },
        { name: '8', value: '8 mths', group: 'months' },
        { name: '9', value: '9 mths', group: 'months' },
        { name: '10', value: '10 mths', group: 'months' },
        { name: '11', value: '11 mths', group: 'months' },
        { name: '12', value: '12 mths', group: 'months' },
        { divider: true },
        { header: 'Age (year)' },
        { name: '1', value: '1 yr', group: 'year' },
        { name: '2', value: '2 yrs', group: 'years' },
        { name: '3', value: '3 yrs', group: 'years' },
        { name: '4', value: '4 yrs', group: 'years' },
        { name: '5', value: '5 yrs', group: 'years' },
        { name: '6', value: '6 yrs', group: 'years' },
        { name: '7', value: '7 yrs', group: 'years' },
        { name: '8', value: '8 yrs', group: 'years' },
        { name: '9', value: '9 yrs', group: 'years' },
        { name: '10', value: '10 yrs', group: 'years' }
      ]
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
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

    updateVacInfo (vacBrand) {
      const vacPos = this.vaccineBrandPos[vacBrand]
      const vaccination = this.editedItem.vaccination
      this.editedItem.type = this.vaccineBrands[vaccination][vacPos].type
      this.editedItem.against = this.vaccineBrands[vaccination][vacPos].against
      this.editedItem.raoa = this.vaccineBrands[vaccination][vacPos].raoa
    },

    editItem (item) {
      this.editedIndex = this.vaccinations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem () {
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

    resetRequiredErrMsg () {
      this.requiredErrMsg.vaccination = ''
      this.requiredErrMsg.brand = ''
      this.requiredErrMsg.aoa = ''
      this.requiredErrMsg.fa = ''
      this.requiredErrMsg.fdd = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.resetRequiredErrMsg()
    },

    closeDelete () {
      this.dialogDelete = false
    },

    validateEditedItem () {
      let isVaccinationValid = true
      let isBrandValid = true
      let isAoaValid = true
      let isFaValid = true
      let isFddValid = true

      if (!this.editedItem.vaccination) {
        this.requiredErrMsg.vaccination = 'Vaccination is required'
        isVaccinationValid = false
      }
      if (!this.editedItem.brand) {
        this.requiredErrMsg.brand = 'Vaccine brand is required'
        isBrandValid = false
      }
      if (!this.editedItem.aoa) {
        this.requiredErrMsg.aoa = 'AOA is required'
        isAoaValid = false
      }
      if (!this.editedItem.fa) {
        this.requiredErrMsg.fa = 'First administration is required'
        isFaValid = false
      }
      if (!this.editedItem.fdd) {
        this.requiredErrMsg.fdd = '1st dose date is required'
        isFddValid = false
      }

      if (!isVaccinationValid) {
        document.querySelector('#vaccination').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isBrandValid) {
        document.querySelector('#brand').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isAoaValid) {
        document.querySelector('#aoa').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isFaValid) {
        document.querySelector('#fa').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isFddValid) {
        document.querySelector('#fdd').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
    },

    save () {
      const isValid = this.validateEditedItem()
      if (!isValid) { return }

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
