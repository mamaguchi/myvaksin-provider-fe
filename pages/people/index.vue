<template>
  <v-container
    fluid
    fill-height
  >
    <!-- <span>Prof Pic: <h3>{{ profilePic }}</h3></span>
    <span>Prof Pic Data: <h3>{{ profile.profilePicData }}</h3></span>
    <span>Prof Pic Data Len: <h3>{{ profile.profilePicData.length }}</h3></span> -->

    <!-- PROFILE -->
    <v-row class="px-4 mt-10" justify="center">
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
                    id="profileName"
                    v-model="profile.name"
                    label="Name"
                    :rules="profileNameRules"
                    :error-messages="requiredProfErrMsg.name"
                    @change="requiredProfErrMsg.name=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    id="profileIdent"
                    v-model="profile.ident"
                    label="IC/Passport"
                    :rules="profileIdentRules"
                    :error-messages="requiredProfErrMsg.ident"
                    @change="requiredProfErrMsg.ident=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="profileDob"
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
                  <v-select
                    id="profileEduLvl"
                    v-model="profile.eduLvl"
                    :items="eduLvl"
                    label="Education Level"
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
                  <v-file-input
                    v-model="profilePic"
                    style="cursor:pointer"
                    show-size
                    accept="image/png, image/jpeg, image/bmp"

                    prepend-icon="mdi-camera"
                    label="Profile Picture"
                    @change="processProfilePic"
                  />
                </v-col>
                <!-- :rules="rules" -->
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profileTel"
                    v-model="profile.tel"
                    label="Telephone"
                    :rules="profileTelRules"
                    :error-messages="requiredProfErrMsg.tel"
                    @change="requiredProfErrMsg.tel=''"
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

                <v-col
                  cols="12"
                  md="8"
                >
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
                  <v-text-field
                    id="profileLocality"
                    v-model="profile.locality"
                    label="Locality/Taman"
                    :error-messages="requiredProfErrMsg.locality"
                    @change="requiredProfErrMsg.locality=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="profileDistrict"
                    v-model="profile.district"
                    label="District"
                    :error-messages="requiredProfErrMsg.district"
                    @change="requiredProfErrMsg.district=''"
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
                >
                  <div v-show="false" />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    id="profileSupportVac"
                    v-model="profile.supportVac"
                    :items="supportVac"
                    item-text="name"
                    item-value="value"
                    label="Support Vaccine"
                    :rules="supportVacRule"
                    :error-messages="requiredProfErrMsg.supportVac"
                    @change="requiredProfErrMsg.supportVac=''"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="8"
                >
                  <div v-show="false" />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    v-if="isNewProfile"
                    color="success"
                    class="mr-0"
                    @click="upsertProfile"
                  >
                    Create Profile
                  </v-btn>
                  <v-btn
                    v-else
                    color="success"
                    class="mr-0"
                    @click="upsertProfile"
                  >
                    Update Profile
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <span class="amber--text text--darken-4 text-caption">
                    {{ newProfileCreateStatus }}
                  </span>
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
        <v-row
          dense
          justify="center"
        >
          <v-col
            cols="4"
            class="mx-auto mb-n16"
            style="z-index:100"
          >
            <v-avatar

              size="170"
              class="mx-auto ml-n5 v-card--material__avatar elevation-6"
              color="grey"
            >
              <img v-if="profile.profilePicData" id="output" :src="profile.profilePicData">
              <img v-else src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
            </v-avatar>
          </v-col>

          <v-col
            cols="12"
            class="mt-n16"
          >
            <base-material-card
              class="v-card-profile"
              avatar="DUMMY_STRING"
            >
              <v-card-text class="text-center">
                <h6 class="text-subtitle-1 grey--text mb-1">
                  {{ profile.occupation }}
                </h6>

                <h5 class="text-h5 font-weight-light black--text mb-1">
                  {{ profile.name }}
                </h5>

                <div class="text-subtitle-1 font-weight-light grey--text mb-3">
                  {{ age }}
                </div>

                <v-tooltip
                  v-if="!isNewProfile"
                  bottom
                >
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
                  <span>Delete Profile</span>
                </v-tooltip>
              </v-card-text>
            </base-material-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div v-if="!isNewProfile">
      <!-- DIVIDER -->
      <v-row class="mb-4">
        <v-divider />
      </v-row>

      <!-- VACCINATION RECORDS TABLE -->
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
              :items="vaccinationRecords"
              item-key="vaccinationId"
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
              <template #[`header.vaccinationId`]>
                <div v-if="false" />
              </template>
              <template #[`item.vaccinationId`]>
                <div v-if="false" />
              </template>

              <!-- DISPLAY AEFI-REACTION AS V-CHIP -->
              <template #[`item.aefiReaction`]="{ item }">
                <div
                  v-if="item.aefiReaction.length!==0 &&
                    !!item.aefiReaction[0]"
                >
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

                  <span
                    class="grey--text text--darken-2 text-caption mr-7 mt-2"
                  >
                    {{ vacRecStatus }}
                  </span>

                  <!-- EDIT DIALOG -->
                  <v-dialog
                    v-model="dialog"
                    max-width="700px"
                    @keydown.enter="save"
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

                              <!-- NEWLINE -->
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
                                  label="Rec. AOFA"
                                />
                              </v-col>

                              <!-- NEWLINE -->
                              <v-col
                                cols="12"
                                md="12"
                              >
                                <div v-show="false" />
                              </v-col>

                              <!-- NEWLINE -->
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
                                md="4"
                              >
                                <v-text-field
                                  v-if="editedItem.fa==='' ||
                                    editedItem.fa === 'Yes'"
                                  v-model="editedItem.aoa"
                                  readonly
                                  outlined
                                  label="AOFA"
                                />
                                <v-text-field
                                  v-else-if="editedItem.fa === 'No'"
                                  v-model="editedItem.aoa"
                                  label="AOSA"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <div v-show="false" />
                              </v-col>

                              <!-- NEWLINE -->
                              <v-col
                                cols="12"
                                md="4"
                              >
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
                                      label="Date Of 1st Dose"
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
                                      @click="getAOA"
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
                                      label="Date Of 2nd Dose"
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
                                md="4"
                              >
                                <div v-show="false" />
                              </v-col>

                              <!-- NEWLINE -->
                              <v-col
                                cols="12"
                                md="12"
                              >
                                <div v-show="false" />
                              </v-col>

                              <!-- NEWLINE -->
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
                                <!-- <span>aefiReaction: <h3>{{ aefiReact }}</h3></span> -->
                                <v-select
                                  v-if="editedItem.aefiClass==='Vaccine-Related'"
                                  v-model="editedItem.aefiReactionSel"
                                  :items="aefiReaction[editedItem.aefiClass]"
                                  no-data-text="Please select an AEFI class first"
                                  label="AEFI Reaction"
                                  small-chips
                                  deletable-chips
                                  @input="updateAefiReaction"
                                />
                                <v-select
                                  v-else-if="editedItem.aefiClass==='Coincidental-Events'"
                                  disabled
                                  label="AEFI Reaction"
                                  hint="Please specify events at remarks section"
                                  persistent-hint
                                  class="green--text"
                                />
                                <v-select
                                  v-else-if="editedItem.aefiClass==='None'"
                                  disabled
                                  label="AEFI Reaction"
                                  hint="N/A"
                                  persistent-hint
                                  class="green--text"
                                />
                                <v-select
                                  v-else
                                  v-model="editedItem.aefiReactionSel"
                                  multiple
                                  :items="aefiReaction[editedItem.aefiClass]"
                                  no-data-text="Please select an AEFI class first"
                                  label="AEFI Reaction"
                                  small-chips
                                  deletable-chips
                                  @input="updateAefiReaction"
                                />
                              </v-col>

                              <!-- NEWLINE -->
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
                            @keydown.esc="close"
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
                <span class="text-h4 grey--text">No vaccination records</span>
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
    </div>
  </v-container>
</template>

<script>
import MaterialCard from '@/components/base/MaterialCard'

export default {

  components: {
    BaseMaterialCard: MaterialCard
  },

  layout: 'people',

  middleware: ['token'],

  data () {
    return {
      /* PEOPLE PROFILE */
      profilePic: null,
      isNewProfile: '',
      newProfileCreateStatus: '',
      profile: {
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        email: '',
        address: '',
        postalCode: '',
        locality: '',
        district: '',
        state: '',
        eduLvl: '',
        occupation: '',
        comorbids: [],
        supportVac: '',
        profilePicData: ''
      },
      vaccinationRecords: [],
      dobMenu: false,
      requiredProfErrMsg: {
        name: '',
        gender: '',
        // dob: '',
        race: '',
        ident: '',
        nationality: '',
        occupation: '',
        tel: '',
        email: '',
        address: '',
        locality: '',
        district: '',
        postalCode: '',
        state: '',
        supportVac: ''
      },

      /* VACCINATION RECORDS TABLE */
      vacRecStatus: 'Saved',
      payload: {},
      dialog: false,
      dialogDelete: false,
      fddMenu: false,
      sddMenu: false,
      editedIndex: -1,
      editedItem: {
        // tblId: '',
        vaccination: '',
        vaccinationId: '',
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
        aefiReactionSel: [],
        remarks: ''
      },
      defaultItem: {
        // tblId: '',
        vaccination: '',
        vaccinationId: '',
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
        aefiReactionSel: [],
        remarks: ''
      },
      requiredVacTblErrMsg: {
        vaccination: '',
        brand: '',
        aoa: '',
        fa: '',
        fdd: ''
      },

      /* STATIC HTML ELEMENT CONFIGURATION */
      // ==============
      // PEOPLE PROFILE
      // ==============
      gender: ['Male', 'Female'],
      supportVac: [
        { name: 'Yes', value: true },
        { name: 'No', value: false }
      ],
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
      eduLvl: ['Primary', 'Secondary', 'Tertiary'],
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

      // =========================
      // VACCINATION RECORDS TABLE
      // =========================
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        { text: 'Vaccination', align: 'start', sortable: true, value: 'vaccination', class: 'success' },
        // { text: 'tblId', value: 'tblId', sortable: false, class: 'success', width: '1px' },
        { text: 'vacId', value: 'vaccinationId', sortable: false, class: 'success', width: '1px' },
        { text: 'Vaccine Brand', value: 'brand', class: 'success', width: '150px' },
        { text: 'Vaccine Type', value: 'type', class: 'success', width: '150px' },
        { text: 'Against', value: 'against', class: 'success', width: '150px' },
        { text: 'RAOA', value: 'raoa', class: 'success', width: '110px' },
        { text: 'AOA', value: 'aoa', class: 'success', width: '110px' },
        { text: 'First Adm', value: 'fa', class: 'success' },
        { text: '1st Dose Date', value: 'fdd', class: 'success' },
        { text: '2nd Dose Date', value: 'sdd', class: 'success' },
        { text: 'AEFI', value: 'aefiClass', class: 'success', width: '150px' },
        { text: 'AEFI Rection', value: 'aefiReaction', class: 'success' },
        { text: 'Remarks', value: 'remarks', class: 'success', width: '400px' }

      ],
      vaccinationList: [
        'COVID-19',
        'Measles',
        'Dtap',
        'Polio',
        'HepB'
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

      /* FORM FIELD RULES */
      requiredRule: [v => !!v || 'This field is required'],
      profileNameRules: [
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'Name must contain alphabet characters only'
      ],
      profileIdentRules: [
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_-]/g) > -1) || 'IC/Passport is not allowed to contain space and special characters'
      ],
      profileOccupationRules: [
        v => !(v.search(/[0-9!@#$%^&*)(<>+=,.?_-]/g) > -1) || 'Occupation must contain alphabet characters only'
      ],
      profileTelRules: [
        v => !((v.match(/-/g) || []).length > 1) || 'Telephone number can contain only 1 hyphen character',
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_]/g) > -1) || 'Telephone number not allowed to contain space and special characters',
        v => !(v.search(/[a-zA-Z]/g) > -1) || 'Telephone number not allowed to contain alphabet characters'
      ],
      profileEmailRules: [
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) ||
           'Invalid email address'
      ],
      supportVacRule: [v => v !== '' || 'This field is required']
    }
  },

  computed: {
    aefiReact () {
      if (this.editedItem.aefiReaction.length !== 0) {
        return this.editedItem.aefiReaction[0]
      }
      return ''
    },

    currentYear () {
      return new Date().getUTCFullYear().toString()
    },

    endOfCurrentYearDate () {
      return new Date(this.currentYear + '-12-31')
    },

    formTitle () {
      return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
    },

    age () {
      if (this.profile.dob === '') { return '' }

      let diffMs = Date.now() - new Date(this.profile.dob)
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
      diffMs = this.endOfCurrentYearDate - new Date(this.profile.dob)
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

  async created () {
    this.isNewProfile = this.$route.query.isNewProfile !== 'false'

    if (this.$route.query.ident) {
      const payload = { ident: this.$route.query.ident }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://myvaksin.com/people/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/people/get',
            payload
          )
        }
        this.profile.ident = response.data.people.ident
        this.profile.name = response.data.people.name
        this.profile.gender = response.data.people.gender
        this.profile.dob = response.data.people.dob.substring(0, 10)
        this.profile.nationality = response.data.people.nationality
        this.profile.race = response.data.people.race
        this.profile.tel = response.data.people.tel
        this.profile.email = response.data.people.email
        this.profile.address = response.data.people.address
        this.profile.postalCode = response.data.people.postalCode
        this.profile.locality = response.data.people.locality
        this.profile.district = response.data.people.district
        this.profile.state = response.data.people.state
        this.profile.eduLvl = response.data.people.eduLvl
        this.profile.occupation = response.data.people.occupation
        this.profile.comorbids = response.data.people.comorbids
        this.profile.supportVac = response.data.people.supportVac
        this.profile.profilePicData = response.data.people.profilePicData

        for (let i = 0; i < response.data.vaccinationRecords.length; i++) {
          const vaccinationRecord = {
          // tblId: i,
            vaccinationId: response.data.vaccinationRecords[i].vaccinationId,
            vaccination: response.data.vaccinationRecords[i].vaccination,
            brand: response.data.vaccinationRecords[i].vaccineBrand,
            type: response.data.vaccinationRecords[i].vaccineType,
            against: response.data.vaccinationRecords[i].vaccineAgainst,
            raoa: response.data.vaccinationRecords[i].vaccineRaoa,
            fa: response.data.vaccinationRecords[i].fa ? 'Yes' : 'No',
            fdd: response.data.vaccinationRecords[i].fdd.substring(0, 10),
            sdd: response.data.vaccinationRecords[i].sdd
              ? response.data.vaccinationRecords[i].sdd.substring(0, 10)
              : '',
            aefiClass: response.data.vaccinationRecords[i].aefiClass,
            aefiReaction: response.data.vaccinationRecords[i].aefiReaction
              ? [...response.data.vaccinationRecords[i].aefiReaction]
              : [],
            remarks: response.data.vaccinationRecords[i].remarks
          }
          vaccinationRecord.aoa = this.getVaccinationAge(
            vaccinationRecord.fdd
          )
          this.vaccinationRecords.push(vaccinationRecord)
        }
      } catch (error) {
      //
      }
    }
  },

  methods: {
    processProfilePic () {
      if (!this.profilePic) { return }

      const _this = this

      const reader = new FileReader()
      reader.readAsDataURL(this.profilePic)

      reader.onload = function (readerEvt) {
        const imgElement = document.createElement('img')
        imgElement.src = readerEvt.target.result // result is the base64-encoded image

        imgElement.onload = function (e) {
          const canvas = document.createElement('canvas')
          // const MAX_WIDTH = 400 // produces base64 string len: ~252866
          const MAX_WIDTH = 100 // produces base64 string len: ~26486
          // const MAX_WIDTH = 50 // produces base64 string len: ~8038

          const scaleSize = MAX_WIDTH / e.target.width
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext('2d')

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

          const picResizedEncoded = ctx.canvas.toDataURL(e.target, 'image/png')
          _this.profile.profilePicData = picResizedEncoded

          // you can send picResizedEncoded to the server
          document.querySelector('#output').src = picResizedEncoded
        }
      }
    },

    validateEmail () {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.profile.email)) {
        this.requiredProfErrMsg.email = 'Invalid email address'
      }
    },

    tblRowClicked (item, miscData) {
      // eslint-disable-next-line
      // console.log(item.name)
      this.editItem(item)
    },

    getVaccinationAge (fdd) {
      if (this.profile.dob === '') { return '' }

      const diffMs = new Date(fdd) - new Date(this.profile.dob)

      const diff = diffMs / 1000
      const diffDay = diff / (60 * 60 * 24)
      const ageDay = Math.abs(Math.round(diffDay))
      if (ageDay === 0) {
        return 'At Birth'
      }
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

    getAOA () {
      this.requiredVacTblErrMsg.fdd = ''
      this.$refs.fddMenu.save(this.editedItem.fdd)
      this.editedItem.aoa = this.getVaccinationAge(this.editedItem.fdd)
    },

    updateVacInfo (vacBrand) {
      const vacPos = this.vaccineBrandPos[vacBrand]
      const vaccination = this.editedItem.vaccination
      this.editedItem.type = this.vaccineBrands[vaccination][vacPos].type
      this.editedItem.against = this.vaccineBrands[vaccination][vacPos].against
      this.editedItem.raoa = this.vaccineBrands[vaccination][vacPos].raoa
    },

    editItem (item) {
      this.editedIndex = this.vaccinationRecords.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem () {
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.dialog = false
      const vacRec = {
        vaccinationId: parseInt(this.editedItem.vaccinationId)
      }
      this.deleteVacRecFromDB(vacRec)
      this.vaccinationRecords.splice(this.editedIndex, 1)
      this.$nextTick(() => {
        this.editedIndex = -1
      })
      this.closeDelete()
    },

    async deleteVacRecFromDB (vacRec) {
      try {
        this.vacRecStatus = 'Deleting...'
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/delete',
            vacRec
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/delete',
            vacRec
          )
        }
        this.vacRecStatus = 'Deleted'
        setTimeout(() => (this.vacRecStatus = 'Saved'), 1000)
      } catch (error) {
        this.vacRecStatus = 'Delete failed'
      }
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
      let isNameValid = true
      let isIdentValid = true
      let isGenderValid = true
      let isDobValid = true
      let isRaceValid = true
      let isNationalityValid = true
      let isOccupationValid = true
      let isTelValid = true
      let isAddressValid = true
      let isPostalCodeValid = true
      let isLocalityValid = true
      let isDistrictValid = true
      let isStateValid = true
      let isSupportVacValid = true

      if (!this.profile.name) {
        this.requiredProfErrMsg.name = 'First name is required'
        isNameValid = false
      }
      if (!this.profile.gender) {
        this.requiredProfErrMsg.gender = 'Gender is required'
        isGenderValid = false
      }
      if (!this.profile.dob) {
        this.requiredProfErrMsg.dob = 'Date of birth is required'
        isDobValid = false
      }
      if (!this.profile.race) {
        this.requiredProfErrMsg.race = 'Race is required'
        isRaceValid = false
      }
      if (!this.profile.ident) {
        this.requiredProfErrMsg.ident = 'IC/Passport is required'
        isIdentValid = false
      }
      if (!this.profile.nationality) {
        this.requiredProfErrMsg.nationality = 'Nationality is required'
        isNationalityValid = false
      }
      if (!this.profile.occupation) {
        this.requiredProfErrMsg.occupation = 'Occupation is required'
        isOccupationValid = false
      }
      if (!this.profile.tel) {
        this.requiredProfErrMsg.tel = 'Telephone is required'
        isTelValid = false
      }
      if (!this.profile.address) {
        this.requiredProfErrMsg.address = 'Address is required'
        isAddressValid = false
      }
      if (!this.profile.postalCode) {
        this.requiredProfErrMsg.postalCode = 'Postal code is required'
        isPostalCodeValid = false
      }
      if (!this.profile.locality) {
        this.requiredProfErrMsg.locality = 'Locality/Taman is required'
        isLocalityValid = false
      }
      if (!this.profile.district) {
        this.requiredProfErrMsg.district = 'City/Town is required'
        isDistrictValid = false
      }
      if (!this.profile.state) {
        this.requiredProfErrMsg.state = 'State is required'
        isStateValid = false
      }
      if (this.profile.supportVac === '') {
        this.requiredProfErrMsg.supportVac = 'Support vaccine is required'
        isSupportVacValid = false
      }

      // Scrolling
      if (!isNameValid) {
        document.querySelector('#profileName').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isGenderValid) {
        document.querySelector('#profileGender').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isDobValid) {
        document.querySelector('#profileDob').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isRaceValid) {
        document.querySelector('#profileRace').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isIdentValid) {
        document.querySelector('#profileIdent').scrollIntoView({ behavior: 'smooth', block: 'center' })
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
      if (!isTelValid) {
        document.querySelector('#profileTel').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isAddressValid) {
        document.querySelector('#profileAddress').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isPostalCodeValid) {
        document.querySelector('#profilePostalCode').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isLocalityValid) {
        document.querySelector('#profileLocality').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isDistrictValid) {
        document.querySelector('#profileDistrict').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isStateValid) {
        document.querySelector('#profileState').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }
      if (!isSupportVacValid) {
        document.querySelector('#profileSupportVac').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return false
      }

      return true
    },

    resetRequiredProfErrMsg () {
      this.requiredProfErrMsg.name = ''
      this.requiredProfErrMsg.gender = ''
      this.requiredProfErrMsg.dob = ''
      this.requiredProfErrMsg.race = ''
      this.requiredProfErrMsg.ident = ''
      this.requiredProfErrMsg.nationality = ''
      this.requiredProfErrMsg.occupation = ''
      this.requiredProfErrMsg.tel = ''
      this.requiredProfErrMsg.address = ''
      this.requiredProfErrMsg.postalCode = ''
      this.requiredProfErrMsg.locality = ''
      this.requiredProfErrMsg.district = ''
      this.requiredProfErrMsg.state = ''
      this.requiredProfErrMsg.supportVac = ''
    },

    async upsertProfile () {
      const isValid = this.validateProfileForm()
      if (!isValid) { return }

      this.resetRequiredProfErrMsg()
      try {
        if (this.isNewProfile) {
          let response = null
          if (process.env.NODE_ENV === 'production') {
            response = await this.$axios.post(
              'https://myvaksin.com/people/create',
              this.profile
            )
          } else {
            response = await this.$axios.post(
              'http://localhost:8080/people/create',
              this.profile
            )
          }

          if (response && response.data.createNewPeopleRespCode === '1') {
            this.isNewProfile = false
            alert('Profile created')
          } else if (response && response.data.createNewPeopleRespCode === '0') {
            this.newProfileCreateStatus = 'A profile with this ID already exists, new profile not created'
          }

          // this.isNewProfile = false
          // alert('Profile created')
        } else {
          if (process.env.NODE_ENV === 'production') {
            await this.$axios.post(
              'https://myvaksin.com/people/update',
              this.profile
            )
          } else {
            await this.$axios.post(
              'http://localhost:8080/people/update',
              this.profile
            )
          }
          alert('Profile updated')
        }
      } catch (error) {
        alert(error)
      }
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
        Object.assign(this.vaccinationRecords[this.editedIndex], this.editedItem)
        this.prepareHttpPayload(false)
        this.updateVacRecToDB()
      } else {
        this.checkAefiReaction()
        this.prepareHttpPayload(true)
        this.createNewVacRecToDB()
        this.editedItem.tblId = this.vaccinationRecords[this.vaccinationRecords.length - 1]
          .tblId + 1
        this.vaccinationRecords.push(this.editedItem)
      }
      this.close()
    },

    updateAefiReaction (event) {
      if (!Array.isArray(this.editedItem.aefiReaction)) {
        this.editedItem.aefiReaction = []
      }
      this.editedItem.aefiReaction.length = 0
      if (Array.isArray(event)) {
        this.editedItem.aefiReaction = [...event]
      } else if (typeof event === 'string') {
        this.editedItem.aefiReaction.push(event)
      }
    },

    checkAefiReaction () {
      if (!this.editedItem.aefiReaction ||
          !Array.isArray(this.editedItem.aefiReaction) ||
          this.editedItem.aefiReaction.length === 0) {
        this.editedItem.aefiReaction = ['']
      }
    },

    prepareHttpPayload (isNewVacRec) {
      this.payload = {
        ident: this.profile.ident,
        vacRec: {
          vaccination: this.editedItem.vaccination,
          vaccineBrand: this.editedItem.brand,
          fa: this.editedItem.fa,
          fdd: this.editedItem.fdd,
          sdd: this.editedItem.sdd,
          aefiClass: this.editedItem.aefiClass,
          aefiReaction: [...this.editedItem.aefiReaction],
          remarks: this.editedItem.remarks
        }
      }
      if (!isNewVacRec) {
        this.payload.vacRec.vaccinationId = this.editedItem.vaccinationId
      }
    },

    async createNewVacRecToDB () {
      try {
        this.vacRecStatus = 'Saving...'
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/create',
            this.payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/create',
            this.payload
          )
        }
        // alert('New vaccine record created')
        this.vacRecStatus = 'Saved'
      } catch (error) {
        this.vacRecStatus = 'Save failed'
      }
    },

    async updateVacRecToDB () {
      try {
        this.vacRecStatus = 'Saving...'
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/update',
            this.payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/update',
            this.payload
          )
        }
        // alert('Vaccine record updated')
        this.vacRecStatus = 'Saved'
      } catch (error) {
        this.vacRecStatus = 'Save failed'
      }
    }

  }

}
</script>

<style>
.btn_hover_turn_red :hover {
  color: red;
}

/* <v-autocomplete
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
  </v-autocomplete> */
</style>
