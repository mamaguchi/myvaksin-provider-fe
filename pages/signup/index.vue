<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-card
        ref="form"
        class="mx-auto elevation-3"
        max-width="400"
      >
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content class="mt-4">
              <v-row justify="left" class="ml-1">
                <div
                  class="ml-1 mt-n1"
                >
                  <v-icon
                    x-large
                    color="pink"
                  >
                    mdi-heart-plus
                  </v-icon>
                  <v-icon
                    class="ml-n2 mt-n2"
                    color="blue lighten-3"
                  >
                    mdi-needle
                  </v-icon>
                </div>
                <div class="text-h4">
                  <span class="blue--text">m</span><span class="blue--text">y</span><span class="blue--text text--darken-2">Vaksin</span>
                </div>
              </v-row>

              <!-- <div class="my_text_h4 text-left font-weight-bold">
                <span class="blue--text text--lighten-1">m</span><span class="blue--text text--lighten-2">y</span><span class="blue--text text--lighten-1">Vaksin</span>
              </div> -->

              <v-list-item-title class="my_text_h5 text-center ml-n2 mt-4 mb-10">
                Create your myVaksin account
              </v-list-item-title>

              <p v-if="signupErr" class="red--text mb-4">
                {{ signupErr }}
              </p>

              <v-text-field
                id="name"
                ref="name"
                v-model="name"
                outlined
                label="Name"
                validate-on-blur
                :rules="nameRules"
                required
              />

              <v-text-field
                id="ident"
                ref="ident"
                v-model="ident"
                outlined
                label="IC/Passport"
                validate-on-blur
                :rules="identRules"
                required
              />

              <v-text-field
                id="pwd"
                ref="pwd"
                v-model="pwd"
                outlined
                label="Password"
                counter
                validate-on-blur
                :rules="pwdRules"
                required
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
              />

              <!-- <v-text-field
                id="address"
                ref="address"
                v-model="address"
                outlined
                label="Address"
                validate-on-blur
                :rules="addressRules"
                required
              /> -->

              <!-- <v-text-field
                id="telephone"
                ref="telephone"
                v-model="telephone"
                outlined
                label="Telephone"
                validate-on-blur
                :rules="telephoneRules"
                required
              /> -->

              <!-- <v-text-field
                id="email"
                ref="email"
                v-model="email"
                outlined
                label="Email"
                validate-on-blur
                :rules="emailRules"
                required
              /> -->

              <div @click="resetSignUpStatus">
                <nuxt-link
                  to="/login"
                  class="mynuxtlink"
                >
                  Sign in instead
                </nuxt-link>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="mr-6 mt-n6 mb-6"
            @click="createAccount()"
          >
            Create account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  components: {
    //
  },

  layout: 'auth',

  data () {
    return {
      ident: '',
      pwd: '',
      name: '',
      // address: '',
      // telephone: '',
      // email: '',
      showPwd: false,
      signupErr: null,
      identRules: [
        v => !!v || 'IC is required',
        v => (
          /^[0-9]{6,6}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{4,4}$/.test(v) ||
          /^[0-9]{6,6}[0-9]{2,2}[0-9]{4,4}$/.test(v) ||
          /^[a-zA-Z]{1,2}[0-9]{6,8}[a-zA-Z]{0,1}$/.test(v) ||
          'Invalid IC/Passport'
        )
      ],
      pwdRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Passsword must be at least 8 characters long',
        v => !(/^.*[ ]+.*$/.test(v)) || 'Passsword is not allowed to contain space character'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'Name must contain alphabet characters only'
      ]

      // addressRules: [
      //   v => !!v || 'Address is required'
      // ],
      // telephoneRules: [
      //   v => !!v || 'Telephone is required',
      //   v => !((v.match(/-/g) || []).length > 1) || 'Telephone number can contain only 1 hyphen character',
      //   v => !(v.search(/[!@#$%^&* )(<>+=,.?_]/g) > -1) || 'Telephone number not allowed to contain space and special characters',
      //   v => !(v.search(/[a-zA-Z]/g) > -1) || 'Telephone number not allowed to contain alphabet characters'
      // ],
      // emailRules: [
      //   v => !!v || 'Email is required',
      //   v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) ||
      //      'Invalid email address'
      // ]
    }
  },

  computed: {
    form () {
      return {
        name: this.name,
        ident: this.ident,
        pwd: this.pwd
        // id: this.id,
        // address: this.address,
        // telephone: this.telephone,
        // email: this.email
      }
    }
  },

  methods: {
    ...mapActions('auth', {
      signup: 'signup'
    }),

    resetSignUpStatus () {
      this.$store.commit('auth/signupStatus', '')
    },

    validateSignUpForm () {
      let isValid = true
      const formKeys = Object.keys(this.form)
      for (let i = 0; i < formKeys.length; i++) {
        if (!this.$refs[formKeys[i]].validate(true)) {
          isValid = false
          document.querySelector(`#${formKeys[i]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          break
        }
      }
      return isValid
    },

    async createAccount () {
      if (this.validateSignUpForm()) {
        // try {
        //   const createAccResCode = await this.signup(this.form)

        //   if (createAccResCode === '1') {
        //     this.signupErr = 'This user account already exists, new account not created'
        //   } else if (createAccResCode === '0') {
        //     this.$store.commit('auth/signupStatus', 'User account created')
        //     this.$router.push('/login')
        //   }
        // } catch (error) {
        //   this.signupErr = 'Unable to signup at the moment, please try again later'
        // }
        this.signupErr = await this.signup(this.form)
        if (!this.signupErr) { this.$router.push('/login') }
      }
    }

  }
}
</script>

<style scoped>

.mynuxtlink {
    text-decoration: none;
}

.my_text_h4 {
   font-size: xx-large;
}

.my_text_h5 {
   font-size: x-large;
}

</style>
