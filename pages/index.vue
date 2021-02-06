<template>
  <v-container
    fluid
    fill-height
  >
    <!-- SEARCH -->
    <v-row justify="center">
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

        <!-- FILTER -->
        <v-list-item class="mt-n10">
          <v-list-item-content>
            <v-expansion-panels
              v-model="panel"
              accordion
              flat
              max-width="200"
            >
              <v-expansion-panel
                class="white"
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

    <!-- TABLE -->
    <v-row justify="center" class="mx-16">
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="desserts"
          item-key="name"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          multi-sort
          hide-default-footer
          class="elevation-1 white"
          @page-count="pageCount = $event"
        >
          <template #[`header.name`]="{ header }">
            <span class="white--text">{{ header.text.toUpperCase() }}</span>
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

export default {
  components: {
    //
  },

  data () {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      search: '',
      panel: undefined,
      state: '',
      district: '',
      locality: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'success'
        },
        { text: 'Calories', value: 'calories', class: 'success' },
        { text: 'Fat (g)', value: 'fat', class: 'success' },
        { text: 'Carbs (g)', value: 'carbs', class: 'success' },
        { text: 'Protein (g)', value: 'protein', class: 'success' },
        { text: 'Iron (%)', value: 'iron', class: 'success' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },

  methods: {
    clinicSelected () {
      //
    }
  }
}
</script>
