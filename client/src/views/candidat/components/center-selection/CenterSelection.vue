<template>
  <v-card>
    <page-title :title="$formatMessage({ id: 'home_choix_du_centre' })" />
    <v-list three-line>
      <center-selection-content
        v-for="center in center.list"
        :key="center._id"
        :center="center"
      />
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import CenterSelectionContent from './CenterSelectionContent'
import {
  FETCH_CENTERS_REQUEST,
  FETCH_MY_PROFILE_REQUEST,
} from '@/store'

export default {
  components: {
    CenterSelectionContent,
  },

  computed: {
    ...mapState(['center']),
  },

  async mounted () {
    await this.getCenters()
  },

  methods: {
    async getCenters () {
      const candidat = this.$store.state.candidat
      if (!candidat || !candidat.me) {
        await this.$store.dispatch(FETCH_MY_PROFILE_REQUEST)
        setTimeout(this.getCenters, 100)
        return
      }
      const { departement } = candidat.me
      await this.$store.dispatch(FETCH_CENTERS_REQUEST, departement)
    },
  },
}
</script>
