import { DateTime } from 'luxon'
import { getFrenchLuxonDateFromIso, creneauSetting } from '../util'

import api from '@/api'

import { SHOW_ERROR, SHOW_SUCCESS } from '@/store'

export const FETCH_ADMIN_INFO_REQUEST = 'FETCH_ADMIN_INFO_REQUEST'
export const FETCH_ADMIN_INFO_FAILURE = 'FETCH_ADMIN_INFO_FAILURE'
export const FETCH_ADMIN_INFO_SUCCESS = 'FETCH_ADMIN_INFO_SUCCESS'

export const FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_REQUEST = 'FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_REQUEST'
export const FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_FAILURE = 'FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_FAILURE'
export const FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_SUCCESS = 'FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_SUCCESS'

export const FETCH_INSPECTEURS_BY_DEPARTEMENT_REQUEST = 'FETCH_INSPECTEURS_BY_DEPARTEMENT_REQUEST'
export const FETCH_INSPECTEURS_BY_DEPARTEMENT_FAILURE = 'FETCH_INSPECTEURS_BY_DEPARTEMENT_FAILURE'
export const FETCH_INSPECTEURS_BY_DEPARTEMENT_SUCCESS = 'FETCH_INSPECTEURS_BY_DEPARTEMENT_SUCCESS'

export const DELETE_PLACE_REQUEST = 'DELETE_PLACE_REQUEST'
export const DELETE_PLACE_FAILURE = 'DELETE_PLACE_FAILURE'
export const DELETE_PLACE_SUCCESS = 'DELETE_PLACE_SUCCESS'

export const CREATE_CRENEAU_REQUEST = 'CREATE_CRENEAU_REQUEST'
export const CREATE_CRENEAU_FAILURE = 'CREATE_CRENEAU_FAILURE'
export const CREATE_CRENEAU_SUCCESS = 'CREATE_CRENEAU_SUCCESS'

export const SELECT_DEPARTEMENT = 'SELECT_DEPARTEMENT'
export const SET_WEEK_SECTION = 'SET_WEEK_SECTION'

export default {
  getters: {
    creneauSetup: () => {
      return creneauSetting.map(hour => ({ hour }))
    },
    activeDepartement: state => {
      return state.departements.active
    },
  },

  state: {
    departements: {
      active: undefined,
      error: undefined,
      isFetching: false,
      list: [],
    },
    email: undefined,
    places: {
      isFetching: false,
      list: [],
    },
    inspecteurs: {
      isFetching: false,
      error: undefined,
      list: [],
    },
    deletePlaceAction: {
      result: undefined,
      isDeleting: false,
    },
    currentWeek: undefined,
    centerTarget: undefined,
    createCreneau: {
      isCreating: false,
      result: undefined,
    },
  },

  mutations: {
    [FETCH_ADMIN_INFO_REQUEST] (state) {
      state.departements.isFetching = true
    },
    [FETCH_ADMIN_INFO_SUCCESS] (state, infos) {
      state.departements.list = infos.departements
      state.email = infos.email
      state.departements.active = infos.departements[1]
      state.departements.isFetching = false
    },
    [FETCH_ADMIN_INFO_FAILURE] (state) {
      state.departements.isFetching = false
    },

    [FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_REQUEST] (state) {
      state.places.isFetching = true
    },
    [FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_SUCCESS] (state, list) {
      state.places.list = list
      state.places.isFetching = false
    },
    [FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_FAILURE] (state, error) {
      state.places.error = error
      state.places.isFetching = false
    },

    [FETCH_INSPECTEURS_BY_DEPARTEMENT_REQUEST] (state) {
      state.inspecteurs.isFetching = true
    },
    [FETCH_INSPECTEURS_BY_DEPARTEMENT_SUCCESS] (state, list) {
      state.inspecteurs.list = list
      state.inspecteurs.isFetching = false
    },
    [FETCH_INSPECTEURS_BY_DEPARTEMENT_FAILURE] (state, error) {
      state.inspecteurs.error = error
      state.inspecteurs.isFetching = false
    },

    [DELETE_PLACE_REQUEST] (state) {
      state.deletePlaceAction.isDeleting = true
    },
    [DELETE_PLACE_SUCCESS] (state, success) {
      state.deletePlaceAction.result = success
      state.deletePlaceAction.isDeleting = false
    },
    [DELETE_PLACE_FAILURE] (state, error) {
      state.deletePlaceAction.result = error
      state.deletePlaceAction.isDeleting = false
    },

    [CREATE_CRENEAU_REQUEST] (state) {
      state.createCreneau.isCreating = true
    },
    [CREATE_CRENEAU_SUCCESS] (state, success) {
      state.createCreneau.result = success
      state.createCreneau.isCreating = false
    },
    [CREATE_CRENEAU_FAILURE] (state, error) {
      state.createCreneau.result = error
      state.createCreneau.isCreating = false
    },

    [CREATE_CRENEAU_REQUEST] (state) {
      state.createCreneau.isCreating = true
    },
    [CREATE_CRENEAU_SUCCESS] (state, success) {
      state.createCreneau.result = success
    },
    [CREATE_CRENEAU_FAILURE] (state, error) {
      state.createCreneau.result = error
      state.createCreneau.isCreating = false
    },

    [CREATE_CRENEAU_REQUEST] (state) {
      state.createCreneau.isCreating = true
    },
    [CREATE_CRENEAU_SUCCESS] (state, success) {
      state.createCreneau.result = success
      state.createCreneau.isCreating = false
    },
    [CREATE_CRENEAU_FAILURE] (state, error) {
      state.createCreneau.result = error
      state.createCreneau.isCreating = false
    },

    [SELECT_DEPARTEMENT] (state, departement) {
      state.departements.active = departement
    },

    [SET_WEEK_SECTION] (state, currentWeek, centerId) {
      state.currentWeek = currentWeek
      state.centerTarget = centerId
    },
  },

  actions: {
    async [FETCH_ADMIN_INFO_REQUEST] ({ commit, dispatch }) {
      commit(FETCH_ADMIN_INFO_REQUEST)
      try {
        const infos = await api.admin.getMe()
        commit(FETCH_ADMIN_INFO_SUCCESS, infos)
      } catch (error) {
        commit(FETCH_ADMIN_INFO_FAILURE)
        return dispatch(SHOW_ERROR, error.message)
      }
    },

    async [FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_REQUEST] ({ commit, dispatch, state }, window = {}) {
      const { begin, end } = window
      commit(FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_REQUEST)
      try {
        const currentDateTime = DateTime.local().setLocale('fr')
        const weekDay = currentDateTime.weekday
        const beginDate = begin || currentDateTime.plus({ days: -weekDay }).toISO()
        const endDate = end || currentDateTime.plus({ months: 2 }).toISO()
        const placesByCentre = await api.admin
          .getAllPlacesByDepartement(state.departements.active, beginDate, endDate)
        const placesByCentreAndWeek = placesByCentre.map(element => ({
          centre: element.centre,
          places: element.places.reduce((acc, place) => {
            const key = getFrenchLuxonDateFromIso(place.date).weekNumber
            const places = { ...acc }
            places[key] = [...(places[key] || []), place]
            return places
          }, {}),
        }))

        commit(FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_SUCCESS, placesByCentreAndWeek)
      } catch (error) {
        commit(FETCH_ADMIN_DEPARTEMENT_ACTIVE_INFO_FAILURE, error)
        return dispatch(SHOW_ERROR, error.message)
      }
    },

    async [FETCH_INSPECTEURS_BY_DEPARTEMENT_REQUEST] ({ commit, dispatch, state, getters }) {
      commit(FETCH_INSPECTEURS_BY_DEPARTEMENT_REQUEST)
      try {
        const list = await api.admin.getInspecteursByDepartement(state.departements.active)
        const newList = list.map(elem => {
          return {
            ...elem,
            creneau: getters.creneauSetup,
          }
        })
        commit(FETCH_INSPECTEURS_BY_DEPARTEMENT_SUCCESS, newList)
      } catch (error) {
        commit(FETCH_INSPECTEURS_BY_DEPARTEMENT_FAILURE, error)
        return dispatch(SHOW_ERROR, error.message)
      }
    },

    async [DELETE_PLACE_REQUEST] ({ commit, dispatch, state }, placeId) {
      commit(DELETE_PLACE_REQUEST)
      try {
        const result = await api.admin.deletePlace(placeId)
        commit(DELETE_PLACE_SUCCESS, result)
        dispatch(SHOW_SUCCESS, result.message)
      } catch (error) {
        commit(DELETE_PLACE_FAILURE, error)
        return dispatch(SHOW_ERROR, error.message)
      }
    },

    async [CREATE_CRENEAU_REQUEST] ({ commit, dispatch, state }, { centre, inspecteur, date }) {
      commit(CREATE_CRENEAU_REQUEST)
      try {
        const result = await api.admin.createPlace(centre, inspecteur, date)
        commit(CREATE_CRENEAU_SUCCESS, result)
        dispatch(SHOW_SUCCESS, result.message)
      } catch (error) {
        commit(CREATE_CRENEAU_FAILURE, error)
        return dispatch(SHOW_ERROR, error.message)
      }
    },

    [SELECT_DEPARTEMENT] ({ commit }, departement) {
      commit(SELECT_DEPARTEMENT, departement)
    },

    [SET_WEEK_SECTION] ({ commit, dispatch }, currentWeek, centerId) {
      commit(SET_WEEK_SECTION, currentWeek, centerId)
    },
  },
}
