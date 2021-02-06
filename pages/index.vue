<template>
  <v-container
    fluid
    fill-height
  >
    <!-- SEARCH & FILTER -->
    <v-row justify="center">
      <v-card
        flat
        max-width="600"
        min-width="600"
        class="grey lighten-4"
      >
        <v-card-title class="mb-n2">
          <v-row justify="center">
            <span>myVaksin</span>
          </v-row>
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              outlined
              flat
              clearable
              class="rounded-pill"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="mt-n10">
          <v-list-item-content>
            <v-expansion-panels
              v-model="panel"
              accordion
              flat
              max-width="200"
            >
              <v-expansion-panel
                class="grey lighten-4"
                :class="`elevation-${panel===0 ? 3 : 0}`"
              >
                <v-expansion-panel-header>
                  <template #actions>
                    <v-icon>
                      mdi-dots-vertical
                    </v-icon>
                  </template>
                  <v-row class="mr-1">
                    <v-spacer />
                    <span class="grey--text text--darken-2 font-weight-regular">Filter</span>
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
  </v-container>
</template>

<script>

export default {
  components: {
    //
  },

  data () {
    return {
      search: '',
      panel: undefined,
      state: '',
      district: '',
      locality: ''
    }
  },

  methods: {
    clinicSelected () {
      //
    }
  }
}
</script>
