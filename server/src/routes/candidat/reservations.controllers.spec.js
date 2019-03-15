import request from 'supertest'
import { DateTime } from 'luxon'

import { connect, disconnect } from '../../mongo-connection'

import app, { apiPrefix } from '../../app'
import {
  createCandidats,
  createCentres,
  createPlaces,
  removePlaces,
  removeCentres,
  deleteCandidats,
} from '../../models/__tests__'
import {
  SAVE_RESA_WITH_MAIL_SENT,
  CANCEL_RESA_WITH_MAIL_SENT,
} from './message.constants'
import { findPlaceById } from '../../models/place'

jest.mock('../../util/logger')
// jest.mock('../../util/logger', () => ({
//   info: value => console.info(value),
//   debug: value => console.debug(value),
//   error: value => console.error(value),
//   warn: value => console.warn(value),
// }))
jest.mock('../business/send-mail')
jest.mock('../middlewares/verify-token')

describe('Test reservation controllers', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await disconnect()
    await app.close()
  })

  describe('Réserver une place', () => {
    let createdCentres
    let createdPlaces
    let createdCandiats
    beforeAll(async () => {
      createdCandiats = await createCandidats()
      createdCentres = await createCentres()
      createdPlaces = await createPlaces()
    })

    afterAll(async () => {
      await removePlaces()
      await removeCentres()
      await deleteCandidats()
    })

    it('Should get 200 to book one place', async () => {
      console.log('Should get 200 to book one place')
      const selectedCandidat = createdCandiats[0]
      require('../middlewares/verify-token').__setIdCandidat(
        selectedCandidat._id
      )
      const selectedCentre = createdCentres[0]
      const selectedPlace = createdPlaces[0]

      const { body } = await request(app)
        .post(`${apiPrefix}/candidat/reservations`)
        .send({
          id: selectedCentre._id,
          date: selectedPlace.date,
          isAccompanied: true,
          hasDualControlCar: true,
        })
        .set('Accept', 'application/json')
        .expect(200)

      expect(body).toBeDefined()
      expect(body).toHaveProperty('success', true)
      expect(body).toHaveProperty('statusmail', true)
      expect(body).toHaveProperty('message', SAVE_RESA_WITH_MAIL_SENT)
      expect(body).toHaveProperty('reservation')
      expect(body.reservation).toHaveProperty(
        'date',
        DateTime.fromJSDate(selectedPlace.date)
          .setZone('utc')
          .toISO()
      )
      expect(body.reservation).toHaveProperty('centre', selectedCentre.nom)
      expect(body.reservation).toHaveProperty(
        'departement',
        selectedCentre.departement
      )
      expect(body.reservation).toHaveProperty('isBooked', true)
      expect(body.reservation).not.toHaveProperty('inspecteur')
    })

    it('Should get 200 to book another place', async () => {
      console.log('Should get 200 to book another place')
      const selectedCandidat = createdCandiats[0]
      require('../middlewares/verify-token').__setIdCandidat(
        selectedCandidat._id
      )
      const selectedCentre = createdCentres[1]
      const selectedPlace = createdPlaces[1]

      const { body } = await request(app)
        .post(`${apiPrefix}/candidat/reservations`)
        .send({
          id: selectedCentre._id,
          date: selectedPlace.date,
          isAccompanied: true,
          hasDualControlCar: true,
        })
        .set('Accept', 'application/json')
        .expect(200)

      expect(body).toBeDefined()
      expect(body).toHaveProperty('success', true)
      expect(body).toHaveProperty('statusmail', true)
      expect(body).toHaveProperty('message', SAVE_RESA_WITH_MAIL_SENT)
      expect(body).toHaveProperty('reservation')
      expect(body.reservation).toHaveProperty(
        'date',
        DateTime.fromJSDate(selectedPlace.date)
          .setZone('utc')
          .toISO()
      )
      expect(body.reservation).toHaveProperty('centre', selectedCentre.nom)
      expect(body.reservation).toHaveProperty(
        'departement',
        selectedCentre.departement
      )
      expect(body.reservation).toHaveProperty('isBooked', true)
      expect(body.reservation).not.toHaveProperty('inspecteur')

      const previewPlace = await findPlaceById(createdPlaces[0]._id)
      expect(previewPlace).toHaveProperty('isBooked', false)
      expect(previewPlace.bookedBy).toBeUndefined()
    })

    it('Should get 200 to cancel a reservation', async () => {
      console.log('Should get 200 to cancel a reservation')
      const selectedCandidat = createdCandiats[0]
      require('../middlewares/verify-token').__setIdCandidat(
        selectedCandidat._id
      )
      const { body } = await request(app)
        .delete(`${apiPrefix}/candidat/reservations`)
        .set('Accept', 'application/json')
        .expect(200)

      expect(body).toBeDefined()
      expect(body).toHaveProperty('success', true)
      expect(body).toHaveProperty('statusmail', true)
      expect(body).toHaveProperty('message', CANCEL_RESA_WITH_MAIL_SENT)
    })
  })
})
