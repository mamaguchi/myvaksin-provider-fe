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
                    id="profileFname"
                    v-model="profile.fname"
                    label="First Name"
                    :rules="profileNameRules"
                    :error-messages="requiredProfErrMsg.fname"
                    @change="requiredProfErrMsg.fname=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    id="profileLname"
                    v-model="profile.lname"
                    label="Last Name"
                    :rules="profileNameRules"
                    :error-messages="requiredProfErrMsg.lname"
                    @change="requiredProfErrMsg.lname=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    id="profileGender"
                    v-model="profile.gender"
                    :items="gender"
                    label="Gender"
                    :error-messages="requiredProfErrMsg.gender"
                    @change="requiredProfErrMsg.gender=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="dob"
                    ref="dobMenu"
                    v-model="dobMenu"
                    :close-on-content-click="false"
                    :return-value.sync="profile.dob"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="profile.dob"
                        label="Date Of Birth"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        :error-messages="requiredProfErrMsg.dob"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="profile.dob"
                      no-title
                      scrollable
                      @change="requiredProfErrMsg.dob=''"
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="dobMenu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dobMenu.save(profile.dob)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    id="profileRace"
                    v-model="profile.race"
                    :items="race"
                    label="Race"
                    :error-messages="requiredProfErrMsg.race"
                    @change="requiredProfErrMsg.race=''"
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
                    id="profileId"
                    v-model="profile.id"
                    label="IC/Passport"
                    :rules="profileIdRules"
                    :error-messages="requiredProfErrMsg.id"
                    @change="requiredProfErrMsg.id=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    id="profileNationality"
                    v-model="profile.nationality"
                    :items="nationality"
                    label="Nationality"
                    :error-messages="requiredProfErrMsg.nationality"
                    @change="requiredProfErrMsg.nationality=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profileOccupation"
                    v-model="profile.occupation"
                    label="Occupation"
                    :rules="profileOccupationRules"
                    :error-messages="requiredProfErrMsg.occupation"
                    @change="requiredProfErrMsg.occupation=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profileTelephone"
                    v-model="profile.telephone"
                    label="Telephone"
                    :rules="profileTelephoneRules"
                    :error-messages="requiredProfErrMsg.telephone"
                    @change="requiredProfErrMsg.telephone=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="profile.email"
                    label="Email Address"
                    :error-messages="requiredProfErrMsg.email"
                    @focus="requiredProfErrMsg.email=''"
                    @blur="validateEmail"
                  />
                </v-col>

                <v-col
                  cols="12"
                >
                  <div v-show="false" />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    id="profileAddress"
                    v-model="profile.address"
                    label="Address"
                    :error-messages="requiredProfErrMsg.address"
                    @change="requiredProfErrMsg.address=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profileCityTown"
                    v-model="profile.cityTown"
                    label="City/Town"
                    :error-messages="requiredProfErrMsg.cityTown"
                    @change="requiredProfErrMsg.cityTown=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profilePostalCode"
                    v-model="profile.postalCode"
                    label="Postal Code"
                    :error-messages="requiredProfErrMsg.postalCode"
                    @change="requiredProfErrMsg.postalCode=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    id="profileState"
                    v-model="profile.state"
                    :items="state"
                    label="State"
                    :error-messages="requiredProfErrMsg.state"
                    @change="requiredProfErrMsg.state=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="updateProfile"
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

            <h5 class="text-h5 font-weight-light black--text mb-1">
              Alec Thompson
            </h5>

            <div class="text-subtitle-1 font-weight-light grey--text mb-3">
              {{ age }}
            </div>

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
            style="cursor:pointer"
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
            <template #[`header.vaccination`]="{ header }">
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
              <v-toolbar flat style="cursor:default">
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
                                :error-messages="requiredVacTblErrMsg.vaccination"
                                @change="requiredVacTblErrMsg.vaccination=''"
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
                                :error-messages="requiredVacTblErrMsg.brand"
                                @change="requiredVacTblErrMsg.brand=''"
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
                                :error-messages="requiredVacTblErrMsg.aoa"
                                item-text="name"
                                item-value="value"
                                @change="requiredVacTblErrMsg.aoa=''"
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
                                :error-messages="requiredVacTblErrMsg.fa"
                                @change="requiredVacTblErrMsg.fa=''"
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
                                    :error-messages="requiredVacTblErrMsg.fdd"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="editedItem.fdd"
                                  no-title
                                  scrollable
                                  @change="requiredVacTblErrMsg.fdd=''"
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
      /* PROFILE */
      profile: {
        fname: '',
        lname: '',
        gender: '',
        dob: '',
        race: '',
        id: '',
        nationality: '',
        occupation: '',
        telephone: '',
        email: '',
        address: '',
        cityTown: '',
        postalCode: '',
        state: ''
      },
      gender: ['Male', 'Female'],
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
      ],
      race: [
        'Malay',
        'Chinese',
        'Indian',
        'Sikh',
        'Orang Asli',
        'Kadazan',
        'Dusun',
        'Iban',
        'Indonesian',
        'Filipin',
        'Myanmar',
        'Vietnamese',
        'Bangladesh'
      ],
      nationality: ['Warganegara', 'Bukan Warganegara'],
      state: [
        'Perlis',
        'Kedah',
        'Pulau Pinang',
        'Perak',
        'Selangor',
        'Kuala Lumpur',
        'Negeri Sembilan',
        'Melaka',
        'Johor',
        'Kelantan',
        'Terengganu',
        'Pahang',
        'Sabah',
        'Sarawak',
        'Pulau Labuan'
      ],
      profileNameRules: [
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'First and last name must contain alphabet characters only'
      ],
      profileIdRules: [
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_-]/g) > -1) || 'IC/Passport is not allowed to contain space and special characters'
      ],
      profileOccupationRules: [
        v => !(v.search(/[0-9!@#$%^&*)(<>+=,.?_-]/g) > -1) || 'Occupation must contain alphabet characters only'
      ],
      profileTelephoneRules: [
        v => !((v.match(/-/g) || []).length > 1) || 'Telephone number can contain only 1 hyphen character',
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_]/g) > -1) || 'Telephone number not allowed to contain space and special characters',
        v => !(v.search(/[a-zA-Z]/g) > -1) || 'Telephone number not allowed to contain alphabet characters'
      ],
      profileEmailRules: [
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) ||
           'Invalid email address'
      ],
      requiredProfErrMsg: {
        fname: '',
        lname: '',
        gender: '',
        // dob: '',
        race: '',
        id: '',
        nationality: '',
        occupation: '',
        telephone: '',
        email: '',
        address: '',
        cityTown: '',
        postalCode: '',
        state: ''
      },
      dobMenu: false,

      /* VACCINATION TABLE */
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
        aefiReaction: [],
        remarks: ''
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
        aefiReaction: [],
        remarks: ''
      },
      requiredRule: [v => !!v || 'This field is required'],
      requiredVacTblErrMsg: {
        vaccination: '',
        brand: '',
        aoa: '',
        fa: '',
        fdd: ''
      },
      fddMenu: false,
      sddMenu: false

    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
    },

    age () {
      if (this.profile.dob === '') { return '' }

      const diffMs = Date.now() - new Date(this.profile.dob)

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
    validateEmail () {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.profile.email)) {
        this.requiredProfErrMsg.email = 'Invalid email address'
      }
    },

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

    resetRequiredVacTblErrMsg () {
      this.requiredVacTblErrMsg.vaccination = ''
      this.requiredVacTblErrMsg.brand = ''
      this.requiredVacTblErrMsg.aoa = ''
      this.requiredVacTblErrMsg.fa = ''
      this.requiredVacTblErrMsg.fdd = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.resetRequiredVacTblErrMsg()
    },

    closeDelete () {
      this.dialogDelete = false
    },

    validateProfileForm () {
      let isFnameValid = true
      let isLnameValid = true
      let isGenderValid = true
      let isRaceValid = true
      let isIdValid = true
      let isNationalityValid = true
      let isOccupationValid = true
      let isTelephoneValid = true
      let isAddressValid = true
      let isCityTownValid = true
      let isPostalCodeValid = true
      let isStateValid = true

      if (!this.profile.fname) {
        this.requiredProfErrMsg.fname = 'First name is required'
        isFnameValid = false
      }
      if (!this.profile.lname) {
        this.requiredProfErrMsg.lname = 'Last name is required'
        isLnameValid = false
      }
      if (!this.profile.gender) {
        this.requiredProfErrMsg.gender = 'Gender is required'
        isGenderValid = false
      }
      if (!this.profile.race) {
        this.requiredProfErrMsg.race = 'Race is required'
        isRaceValid = false
      }
      if (!this.profile.id) {
        this.requiredProfErrMsg.id = 'IC/Passport is required'
        isIdValid = false
      }
      if (!this.profile.nationality) {
        this.requiredProfErrMsg.nationality = 'Nationality is required'
        isNationalityValid = false
      }
      if (!this.profile.occupation) {
        this.requiredProfErrMsg.occupation = 'Occupation is required'
        isOccupationValid = false
      }
      if (!this.profile.telephone) {
        this.requiredProfErrMsg.telephone = 'Telephone is required'
        isTelephoneValid = false
      }
      if (!this.profile.address) {
        this.requiredProfErrMsg.address = 'Address is required'
        isAddressValid = false
      }
      if (!this.profile.cityTown) {
        this.requiredProfErrMsg.cityTown = 'City/Town is required'
        isCityTownValid = false
      }
      if (!this.profile.postalCode) {
        this.requiredProfErrMsg.postalCode = 'Postal code is required'
        isPostalCodeValid = false
      }
      if (!this.profile.state) {
        this.requiredProfErrMsg.state = 'State is required'
        isStateValid = false
      }

      // Scrolling
      if (!isFnameValid) {
        document.querySelector('#profileFname').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isLnameValid) {
        document.querySelector('#profileLname').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isGenderValid) {
        document.querySelector('#profileGender').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isRaceValid) {
        document.querySelector('#profileRace').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isIdValid) {
        document.querySelector('#profileId').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isNationalityValid) {
        document.querySelector('#profileNationality').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isOccupationValid) {
        document.querySelector('#profileOccupation').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isTelephoneValid) {
        document.querySelector('#profileTelephone').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isAddressValid) {
        document.querySelector('#profileAddress').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isCityTownValid) {
        document.querySelector('#profileCityTown').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isPostalCodeValid) {
        document.querySelector('#profilePostalCode').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isStateValid) {
        document.querySelector('#profileState').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }

      return true
    },

    resetRequiredProfErrMsg () {
      this.requiredProfErrMsg.fname = ''
      this.requiredProfErrMsg.lname = ''
      this.requiredProfErrMsg.gender = ''
      this.requiredProfErrMsg.race = ''
      this.requiredProfErrMsg.id = ''
      this.requiredProfErrMsg.nationality = ''
      this.requiredProfErrMsg.occupation = ''
      this.requiredProfErrMsg.telephone = ''
      this.requiredProfErrMsg.address = ''
      this.requiredProfErrMsg.cityTown = ''
      this.requiredProfErrMsg.postalCode = ''
      this.requiredProfErrMsg.state = ''
    },

    updateProfile () {
      const isValid = this.validateProfileForm()
      if (!isValid) { return }

      // TODO: to save profile to backend database
      this.resetRequiredProfErrMsg()
      alert('Profile updated')
    },

    validateEditedItem () {
      let isVaccinationValid = true
      let isBrandValid = true
      let isAoaValid = true
      let isFaValid = true
      let isFddValid = true

      if (!this.editedItem.vaccination) {
        this.requiredVacTblErrMsg.vaccination = 'Vaccination is required'
        isVaccinationValid = false
      }
      if (!this.editedItem.brand) {
        this.requiredVacTblErrMsg.brand = 'Vaccine brand is required'
        isBrandValid = false
      }
      if (!this.editedItem.aoa) {
        this.requiredVacTblErrMsg.aoa = 'AOA is required'
        isAoaValid = false
      }
      if (!this.editedItem.fa) {
        this.requiredVacTblErrMsg.fa = 'First administration is required'
        isFaValid = false
      }
      if (!this.editedItem.fdd) {
        this.requiredVacTblErrMsg.fdd = '1st dose date is required'
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

      return true
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
