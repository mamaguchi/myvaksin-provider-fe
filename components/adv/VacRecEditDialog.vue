<template>
  <v-container>
    <!-- EDIT DIALOG -->
    <v-dialog
      v-model="dialog"
      max-width="700px"
      @keydown.enter="save"
      @click:outside="close"
    >
      <v-form @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <!-- NEWLINE -->
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
                  md="6"
                >
                  <div v-show="false" />
                </v-col>


                <!--            -->
                <!-- FIRST DOSE -->
                <!--            -->
                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-divider />
                </v-col>
                
                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  md="12"
                >
                  <span>First Dose</span>
                </v-col>

                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-select
                    id="brand"
                    v-model="editedItem.fdBrand"
                    :items="vaccineBrands[editedItem.vaccination]"
                    item-text="name"
                    item-value="name"
                    no-data-text="Please select a vaccination first"
                    label="First Dose Vaccine Brand"
                    :error-messages="requiredVacTblErrMsg.fdBrand"
                    @change="requiredVacTblErrMsg.fdBrand=''"
                    @input="updateVacInfo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
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
                <!-- Dose TCA -->
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="fdTCA"
                    ref="fdTCAMenu"
                    v-model="fdTCAMenu"
                    :close-on-content-click="false"
                    :return-value.sync="editedItem.fdTCA"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.fdTCA"
                        label="Dose TCA"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        :error-messages="requiredVacTblErrMsg.fdTCA"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.fdTCA"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="fdTCAMenu = false"
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
                <!-- Dose Given On -->
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="fdGiven"
                    ref="fdGivenMenu"
                    v-model="fdGivenMenu"
                    :close-on-content-click="false"
                    :return-value.sync="editedItem.fdGiven"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.fdGiven"
                        label="Dose Given On"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        :error-messages="requiredVacTblErrMsg.fdGiven"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.fdGiven"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="fdGivenMenu = false"
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
                    v-model="editedItem.fdAefiClass"
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
                    v-if="editedItem.fdAefiClass==='Vaccine-Related'"
                    v-model="editedItem.fdAefiReactionSel"
                    :items="aefiReaction[editedItem.fdAefiClass]"
                    no-data-text="Please select an AEFI class first"
                    label="AEFI Reaction"
                    small-chips
                    deletable-chips
                    @input="updateAefiReaction('1', 'tca')"
                  />
                  <v-select
                    v-else-if="editedItem.fdAefiClass==='Coincidental-Events'"
                    disabled
                    label="AEFI Reaction"
                    hint="Please specify events at remarks section"
                    persistent-hint
                    class="green--text"
                  />
                  <v-select
                    v-else-if="editedItem.fdAefiClass==='None'"
                    disabled
                    label="AEFI Reaction"
                    hint="N/A"
                    persistent-hint
                    class="green--text"
                  />
                  <v-select
                    v-else
                    v-model="editedItem.fdAefiReactionSel"
                    multiple
                    :items="aefiReaction[editedItem.fdAefiClass]"
                    no-data-text="Please select an AEFI class first"
                    label="AEFI Reaction"
                    small-chips
                    deletable-chips
                    @input="updateAefiReaction('1')"
                  />
                </v-col>

                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  sm="6"
                  md="8"
                >
                  <v-textarea
                    v-model="editedItem.fdRemarks"
                    clearable
                    label="Remarks"
                  />
                </v-col>


                <!--             -->
                <!-- SECOND DOSE -->
                <!--             -->
                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-divider />
                </v-col>

                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  md="12"
                >
                  <span>Second Dose</span>
                </v-col>

                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-select
                    id="brand"
                    v-model="editedItem.sdBrand"
                    :items="vaccineBrands[editedItem.vaccination]"
                    item-text="name"
                    item-value="name"
                    no-data-text="Please select a vaccination first"
                    label="Vaccine Brand"
                    :error-messages="requiredVacTblErrMsg.sdBrand"
                    @change="requiredVacTblErrMsg.sdBrand=''"
                    @input="updateVacInfo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
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
                <!-- 2nd Dose TCA -->
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="sdTCA"
                    ref="sdTCAMenu"
                    v-model="sdTCAMenu"
                    :close-on-content-click="false"
                    :return-value.sync="editedItem.sdTCA"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.sdTCA"
                        label="Dose TCA"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        :error-messages="requiredVacTblErrMsg.sdTCA"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.sdTCA"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="sdTCAMenu = false"
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
                <!-- 2nd Dose Given On -->
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    id="sdGiven"
                    ref="sdGivenMenu"
                    v-model="sdGivenMenu"
                    :close-on-content-click="false"
                    :return-value.sync="editedItem.sdGiven"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.sdGiven"
                        label="Dose Given On"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        :error-messages="requiredVacTblErrMsg.sdGiven"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.sdGiven"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="sdGivenMenu = false"
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
                    v-model="editedItem.sdAefiClass"
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
                    v-if="editedItem.sdAefiClass==='Vaccine-Related'"
                    v-model="editedItem.sdAefiReactionSel"
                    :items="aefiReaction[editedItem.sdAefiClass]"
                    no-data-text="Please select an AEFI class first"
                    label="AEFI Reaction"
                    small-chips
                    deletable-chips
                    @input="updateAefiReaction('2')"
                  />
                  <v-select
                    v-else-if="editedItem.sdAefiClass==='Coincidental-Events'"
                    disabled
                    label="AEFI Reaction"
                    hint="Please specify events at remarks section"
                    persistent-hint
                    class="green--text"
                  />
                  <v-select
                    v-else-if="editedItem.sdAefiClass==='None'"
                    disabled
                    label="AEFI Reaction"
                    hint="N/A"
                    persistent-hint
                    class="green--text"
                  />
                  <v-select
                    v-else
                    v-model="editedItem.sdAefiReactionSel"
                    multiple
                    :items="aefiReaction[editedItem.sdAefiClass]"
                    no-data-text="Please select an AEFI class first"
                    label="AEFI Reaction"
                    small-chips
                    deletable-chips
                    @input="updateAefiReaction('2', 'given')"
                  />
                </v-col>

                <!-- NEWLINE -->
                <v-col
                  cols="12"
                  sm="6"
                  md="8"
                >
                  <v-textarea
                    v-model="editedItem.sdRemarks"
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
  </v-container>
</template>

<script>
export default {
  name: 'VacRecEditDialog',

  //   props: {
  //     close: {
  //       type: Function,
  //       required: true
  //     }
  //   },

  data () {
    return {
      ident: '',
      isNewVacRec: false,
      payload: {},
      dialog: false,
      dialogDelete: false,
      fddMenu: false,
      sddMenu: false,
      editedIndex: -1,
      editedItem: {
        vaccination: '',
        vaccinationId: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        // aoa: '',
        fa: '',
        fdd: '',
        sdd: '',
        aefiClass: '',
        aefiReaction: [],
        aefiReactionSel: [],
        remarks: ''
      },
      defaultItem: {
        vaccination: '',
        vaccinationId: '',
        brand: '',
        type: '',
        against: '',
        raoa: '',
        // aoa: '',
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
        // aoa: '',
        fa: '',
        fdd: ''
      },

      // =========================
      // VACCINATION RECORDS TABLE
      // =========================
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      // headers: [
      //   { text: 'Vaccination', align: 'start', sortable: true, value: 'vaccination', class: 'success' },
      //   { text: 'vacId', value: 'vaccinationId', sortable: false, class: 'success', width: '1px' },
      //   { text: 'Vaccine Brand', value: 'brand', class: 'success', width: '150px' },
      //   { text: 'Vaccine Type', value: 'type', class: 'success', width: '150px' },
      //   { text: 'Against', value: 'against', class: 'success', width: '150px' },
      //   { text: 'RAOA', value: 'raoa', class: 'success', width: '110px' },
      //   { text: 'AOA', value: 'aoa', class: 'success', width: '110px' },
      //   { text: 'First Adm', value: 'fa', class: 'success' },
      //   { text: '1st Dose Date', value: 'fdd', class: 'success' },
      //   { text: '2nd Dose Date', value: 'sdd', class: 'success' },
      //   { text: 'AEFI', value: 'aefiClass', class: 'success', width: '150px' },
      //   { text: 'AEFI Rection', value: 'aefiReaction', class: 'success' },
      //   { text: 'Remarks', value: 'remarks', class: 'success', width: '400px' }

      // ],
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
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
    }
  },

  methods: {
    open (ident, isNewVacRec) {
      this.ident = ident
      this.isNewVacRec = isNewVacRec
      if (!isNewVacRec) {
        this.editedIndex = 1
        this.getCovidVacRec()
      }
      this.dialog = true
    },

    async getCovidVacRec () {
      const payload = { ident: this.ident }

      try {
        const hdrConfig = {
          headers: {
            Authorization: `Bearer: ${this.$store.state.auth.auth.token}`
          }
        }
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://myvaksin.com/vacrec/get',
            payload,
            hdrConfig
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/vacrec/get',
            payload,
            hdrConfig
          )
        }

        if (response.data) {
          this.editedItem = {
            vaccinationId: response.data.vaccinationId,
            vaccination: response.data.vaccination,
            brand: response.data.vaccineBrand,
            type: response.data.vaccineType,
            against: response.data.vaccineAgainst,
            raoa: response.data.vaccineRaoa,
            fa: response.data.fa ? 'Yes' : 'No',
            fdd: response.data.fdd.substring(0, 10),
            sdd: response.data.sdd
              ? response.data.sdd.substring(0, 10)
              : '',
            aefiClass: response.data.aefiClass,
            aefiReaction: response.data.aefiReaction
              ? [...response.data.aefiReaction]
              : [],
            aefiReactionSel: response.data.aefiReaction
              ? [...response.data.aefiReaction]
              : [],
            remarks: response.data.remarks
          }
          // this.editedItem.aoa = this.getVaccinationAge(
          //   this.editedItem.fdd
          // )
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            alert(error)
            this.$router.push('/login')
          } else {
            alert('Temporary network error, please try again later')
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)

        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)

        }
      }
    },

    updateVacInfo (vacBrand) {
      const vacPos = this.vaccineBrandPos[vacBrand]
      const vaccination = this.editedItem.vaccination
      this.editedItem.type = this.vaccineBrands[vaccination][vacPos].type
      this.editedItem.against = this.vaccineBrands[vaccination][vacPos].against
      this.editedItem.raoa = this.vaccineBrands[vaccination][vacPos].raoa
    },

    // getVaccinationAge (fdd) {
    //   if (this.profile.dob === '') { return '' }

    //   const diffMs = new Date(fdd) - new Date(this.profile.dob)

    //   const diff = diffMs / 1000
    //   const diffDay = diff / (60 * 60 * 24)
    //   const ageDay = Math.abs(Math.round(diffDay))
    //   if (ageDay === 0) {
    //     return 'At Birth'
    //   }
    //   if (ageDay === 1) {
    //     return ageDay.toString() + ' day old'
    //   }
    //   if (ageDay <= 30) {
    //     return ageDay.toString() + ' days old'
    //   }

    //   const diffMonth = diffDay / (7 * 4)
    //   const ageMonth = Math.abs(Math.round(diffMonth))
    //   if (ageMonth === 1) {
    //     return ageMonth.toString() + ' month old'
    //   }
    //   if (ageMonth <= 12) {
    //     return ageMonth.toString() + ' months old'
    //   }

    //   const ageDt = new Date(diffMs)
    //   const ageYear = Math.abs(ageDt.getUTCFullYear() - 1970)
    //   if (ageYear === 1) {
    //     return ageYear.toString() + ' year old'
    //   }
    //   return ageYear.toString() + ' years old'
    // },

    getAOA () {
      this.requiredVacTblErrMsg.fdd = ''
      this.$refs.fddMenu.save(this.editedItem.fdd)
      // this.editedItem.aoa = this.getVaccinationAge(this.editedItem.fdd)
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
      // this.vaccinationRecords.splice(this.editedIndex, 1)
      this.$nextTick(() => {
        this.editedIndex = -1
      })
      this.closeDelete()
    },

    async deleteVacRecFromDB (vacRec) {
      try {
        this.vacRecStatus = 'Deleting...'
        const hdrConfig = {
          headers: {
            Authorization: `Bearer: ${this.$store.state.auth.auth.token}`
          }
        }
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/delete',
            vacRec,
            hdrConfig
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/delete',
            vacRec,
            hdrConfig
          )
        }
        this.vacRecStatus = 'Deleted'
        setTimeout(() => (this.vacRecStatus = 'Saved'), 1000)
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            alert(error)
            this.$router.push('/login')
          } else if (error.response.status === 500) {
            this.vacRecStatus = 'Delete failed'
          } else {
            this.vacRecStatus = 'Delete failed'
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          this.vacRecStatus = 'Delete failed'
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          this.vacRecStatus = 'Delete failed'
        }
        // this.vacRecStatus = 'Delete failed'
        // this.$router.push('/login')
      }
    },

    resetRequiredVacTblErrMsg () {
      this.requiredVacTblErrMsg.vaccination = ''
      this.requiredVacTblErrMsg.brand = ''
      // this.requiredVacTblErrMsg.aoa = ''
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

    validateEditedItem () {
      let isVaccinationValid = true
      let isBrandValid = true
      // let isAoaValid = true
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
      // if (!this.editedItem.aoa) {
      //   this.requiredVacTblErrMsg.aoa = 'AOA is required'
      //   isAoaValid = false
      // }
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
      // if (!isAoaValid) {
      //   document.querySelector('#aoa').scrollIntoView({ behavior: 'smooth', block: 'center' })
      //   return false
      // }
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
        // Object.assign(this.vaccinationRecords[this.editedIndex], this.editedItem)
        this.checkAefiReaction()
        this.prepareHttpPayload(false)
        this.updateVacRecToDB()
      } else {
        this.checkAefiReaction()
        this.prepareHttpPayload(true)
        this.createNewVacRecToDB()
        // if (this.vaccinationRecords.length === 0) {
        //   this.editedItem.vaccinationId = 1
        // } else {
        //   this.editedItem.vaccinationId = this.vaccinationRecords[this.vaccinationRecords.length - 1]
        //     .vaccinationId + 1
        // }
        // this.vaccinationRecords.push(this.editedItem)
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
        ident: this.ident,
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
        const hdrConfig = {
          headers: {
            Authorization: `Bearer: ${this.$store.state.auth.auth.token}`
          }
        }
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/create',
            this.payload, hdrConfig
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/create',
            this.payload, hdrConfig
          )
        }
        // alert('New vaccine record created')
        this.vacRecStatus = 'Saved'
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            alert(error)
            this.$router.push('/login')
          } else if (error.response.status === 500) {
            this.vacRecStatus = 'Save failed'
          } else {
            this.vacRecStatus = 'Save failed'
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          this.vacRecStatus = 'Save failed'
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          this.vacRecStatus = 'Save failed'
        }
        // this.vacRecStatus = 'Save failed'
        // this.$router.push('/login')
      }
    },

    async updateVacRecToDB () {
      try {
        this.vacRecStatus = 'Saving...'
        const hdrConfig = {
          headers: {
            Authorization: `Bearer: ${this.$store.state.auth.auth.token}`
          }
        }
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/vacrec/update',
            this.payload, hdrConfig
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/vacrec/update',
            this.payload, hdrConfig
          )
        }
        // alert('Vaccine record updated')
        this.vacRecStatus = 'Saved'
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            alert(error)
            this.$router.push('/login')
          } else if (error.response.status === 500) {
            this.vacRecStatus = 'Save failed'
          } else {
            this.vacRecStatus = 'Save failed'
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          this.vacRecStatus = 'Save failed'
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          this.vacRecStatus = 'Save failed'
        }
        // this.vacRecStatus = 'Save failed'
        // this.$router.push('/login')
      }
    }
  }

}
</script>
