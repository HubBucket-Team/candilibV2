<template>
  <v-form
    ref="createCenterForm"
    v-model="valid"
    @submit.prevent="createCentre"
  >
    <v-container
      :class="{
        't-create-centre-form': addCentre,
        't-update-centre-form': !addCentre,
      }"
    >
      <v-row class="mx-10">
        <v-text-field
          v-model="nom"
          prepend-icon="edit"
          :aria-placeholder="defaults.nom"
          :hint="'ex. : ' + defaults.nom"
          label="Nom"
          :placeholder="placeholders.nom"
          required
          name="nom-centre"
          :rules="generalRules"
          @focus="setPlaceholder('nom')"
          @blur="removePlaceholder('nom')"
          @change="onChange"
        />
        <v-text-field
          v-model="label"
          prepend-icon="comment"
          :aria-placeholder="defaults.label"
          :hint="'ex. : ' + defaults.label"
          label="Informations complémentaires"
          :placeholder="placeholders.label"
          required
          name="label-centre"
          :rules="generalRules"
          @focus="setPlaceholder('label')"
          @blur="removePlaceholder('label')"
          @change="onChange"
        />
      </v-row>
      <v-row class="mx-10">
        <v-text-field
          v-model="adresse"
          prepend-icon="location_city"
          :aria-placeholder="defaults.adresse"
          :hint="'ex. : ' + defaults.adresse"
          label="Adresse"
          :placeholder="placeholders.adresse"
          required
          name="adresse-centre"
          :rules="generalRules"
          @focus="setPlaceholder('adresse')"
          @blur="removePlaceholder('adresse')"
          @change="onChange"
        />
      </v-row>
      <v-row class="mx-10">
        <v-text-field
          v-model="lon"
          prepend-icon="border_vertical"
          :aria-placeholder="defaults.lon"
          :hint="'ex. : ' + defaults.lon"
          label="Longitude"
          :placeholder="placeholders.lon"
          required
          name="lon-centre"
          :rules="[...generalRules, ...numberRules]"
          @focus="setPlaceholder('lon')"
          @blur="removePlaceholder('lon')"
          @change="onChange"
        />

        <v-text-field
          v-model="lat"
          prepend-icon="border_horizontal"
          :aria-placeholder="defaults.lat"
          :hint="'ex. : ' + defaults.lat"
          label="Latitude"
          :placeholder="placeholders.lat"
          required
          name="lat-centre"
          :rules="[...generalRules, ...numberRules]"
          @focus="setPlaceholder('lat')"
          @blur="removePlaceholder('lat')"
          @change="onChange"
        />

        <v-select
          v-if="addCentre"
          v-model="departement"
          class="t-create-center-select-departement"
          :items="availableDepartements"
          label="Département"
          prepend-icon="my_location"
          aria-placeholder="93"
          hint="ex. : 93"
          name="departement-centre"
          :rules="departementRules"
          required
        />
      </v-row>
      <div
        v-if="addCentre"
        class="mx-10  text-right"
      >
        <v-btn
          type="submit"
          :disabled="!valid || isCreating"
          :aria-disabled="!valid || isCreating"
          tabindex="0"
          raised
          class="t-create-centre-submit"
          color="success"
        >
          Ajouter
          <v-icon>
            add_circle
          </v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

import {
  CREATE_CENTER_REQUEST,
} from '@/store'

export default {
  props: {
    addCentre: Boolean,
    defaultValues: {
      type: Object,
      default: () => undefined,
    },
  },

  data () {
    return {
      nom: '',
      label: '',
      adresse: '',
      lon: '',
      lat: '',
      departement: '',
      departementRules: [
        dpt => !!dpt ||
          'Veuillez renseigner un département',
      ],
      valid: false,
      numberRules: [
        numberStr => !isNaN(Number(numberStr)) || 'Veuillez entrer un nombre',
      ],
      placeholders: {
        nom: '',
        label: '',
        adresse: '',
        lon: '',
        lat: '',
      },
      defaults: {
        nom: 'Metropolis',
        label: "Centre d'examen du permis de conduire de Metropolis",
        adresse: '320 rue de la kryptonite 00000 Metropolis',
        lon: '2.45',
        lat: '48.90',
      },
    }
  },

  computed: {
    generalRules () {
      if (this.addCentre) {
        return [text => text !== '' || 'Veuillez renseigner ce champ']
      }
      return []
    },
    ...mapState({
      availableDepartements: state => state.admin.departements.list,
    }),
    isCreating () {
      return this.$store.state.admin.centres.isCreating || false
    },
  },

  mounted () {
    if (this.defaultValues) {
      this.resetForm()
    }
  },

  methods: {
    setPlaceholder (type) {
      this.placeholders[type] = this.defaults[type]
    },

    removePlaceholder (type) {
      this.placeholders[type] = ''
    },

    async createCentre () {
      const {
        nom,
        label,
        adresse,
        lon,
        lat,
        departement,
      } = this

      await this.$store.dispatch(CREATE_CENTER_REQUEST, {
        nom,
        label,
        adresse,
        lon: Number(lon),
        lat: Number(lat),
        departement,
      })
      this.$refs.createCenterForm.reset()
    },

    onChange () {
      const {
        nom,
        label,
        adresse,
        lon,
        lat,
      } = this
      this.$emit('change', {
        nom,
        label,
        adresse,
        lon,
        lat,
      })
    },

    resetForm () {
      this.nom = this.defaultValues.nom
      this.label = this.defaultValues.label
      this.adresse = this.defaultValues.adresse
      this.lon = this.defaultValues && this.defaultValues.geoloc && this.defaultValues.geoloc.coordinates[0]
      this.lat = this.defaultValues && this.defaultValues.geoloc && this.defaultValues.geoloc.coordinates[1]
    },
  },
}
</script>
