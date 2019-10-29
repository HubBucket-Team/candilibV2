import User from './user.model'
import uuidv4 from 'uuid/v4'

export const findUserById = async id => {
  const user = await User.findById(id)
  return user
}

/**
 *
 * @param {string} email
 * @param {boolean} populatePassword
 *
 * @returns {Promise<User>}
 */

export const findUserByEmail = async (email, populatePassword) => {
  const query = User.findOne({ email })

  if (populatePassword) {
    return query.select('+password').exec()
  }

  return query.exec()
}

export const findUserByCredentials = async (email, password) => {
  const user = await findUserByEmail(email, true)
  if (!user) {
    return undefined
  }
  const isValidCredentials = user.comparePassword(password)
  if (!isValidCredentials) {
    return null
  }
  return user
}

export const createUser = async (email, password, departements, status) => {
  const user = new User({ email, password, departements, status })
  await user.save()
  return user
}

export const deleteUserByEmail = async email => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new Error('No user found')
  }
  await user.delete()
  return user
}

export const deleteUser = async user => {
  if (!user) {
    throw new Error('No user given')
  }
  await user.delete()
  return user
}

export const updateUserEmail = async (user, email) => {
  if (!user) {
    throw new Error('user is undefined')
  }
  await user.updateOne({ email })
  const updatedUser = await User.findById(user._id)
  return updatedUser
}

/**
 * Remplace le mot de passe existant de l'utilisateur
 *
 * @async
 * @function
 *
 * @param {User} user
 * @param {string} password
 *
 * @returns {Promise<User>}
 */
export const updateUserPassword = async (user, password) => {
  const now = Date.now()
  const passwordResetRequestedAt = user.passwordResetRequestedAt
  const difference = now - passwordResetRequestedAt
  const fifteenMinutes = 15 * 60 * 1000
  if (difference > fifteenMinutes) {
    const error = new Error(
      'Votre lien a expiré, veuillez refaire votre demande de réinitialisation de mot de passe'
    )
    error.status = 401
    throw error
  }
  user.password = password
  await user.save()
  return user
}

export const updateUserDepartements = async (user, departements) => {
  if (!user) {
    throw new Error('user is undefined')
  }
  await user.update({ departements })
  const updatedUser = await User.findById(user._id)
  return updatedUser
}

export const updateUserStatus = async (user, status) => {
  if (!user) {
    throw new Error('user is undefined')
  }
  await user.update({ status })
  const updatedUser = await User.findById(user._id)
  return updatedUser
}

/**
 * Retourne un email contenant un lien avec un hash
 * @async
 * @function
 *
 * @param {string} email
 *
 * @returns {Promise<string>}
 */

export const addEmailValidationHash = async email => {
  const emailValidationHash = uuidv4()
  const user = await findUserByEmail(email)
  user.emailValidationHash = emailValidationHash
  user.passwordResetRequestedAt = new Date()
  await user.save()
  return emailValidationHash
}
