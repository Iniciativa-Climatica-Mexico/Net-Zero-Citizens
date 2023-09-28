import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as UserService from '../src/services/users.service'
import { getCompanyByUserId, unbindUserFromCompany } from '../src/services/company.service'
import { deleteAllReviewsByUser, getReviewByUser } from '../src/services/review.service'
import { ubindUserFromComplaint } from '../src/services/complaints.service'
import { updateAnswersByUserId } from '../src/services/survey.service'

chai.use(chaiExclude)

const { expect } = chai

const user = {
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  roleId: 'ADMIN_ROLE_ID',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '8453728592',
  age: 30,
  state: 'NY',
  gender: 'masculine' as 'masculine' | 'femenine' | 'other' | 'no_answer',
  companyId: null,
  googleId: null,
  facebookId: null,
  appleId: null,
  secondLastName: null,
  password: null,
  profilePicture: null,
  deviceToken: '',
}

const newUserInfo = {
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  roleId: 'ADMIN_ROLE_ID',
  firstName: 'John Fernando',
  lastName: 'Doe',
  phoneNumber: '8453728592',
  age: 30,
  state: 'NY',
  gender: 'masculine' as 'masculine' | 'femenine' | 'other' | 'no_answer',
  companyId: null,
  googleId: null,
  facebookId: null,
  appleId: null,
  secondLastName: null,
  deviceToken: '',
}

const newUserCredentials = {
  email: 'new.email@example.com',
  password: 'newpassword123',
}

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('UserService', () => {
  describe('getUserRoleByEmail', () => {
    it('should return null while getting a false user', async () => {
      const res = await UserService.getUserByEmailWithRole(
        'falseuseremail@mail.com'
      )
      expect(res).to.be.null
    })
    it('should get a user by email with role', async () => {
      const res = await UserService.getUserByEmailWithRole(user.email)
      expect(res?.userId).to.equal('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8')
      expect(res?.roleId).to.equal('ADMIN_ROLE_ID')
      expect(res?.role.dataValues.ROLE_ID).to.equal('ADMIN_ROLE_ID')
      expect(res?.role.dataValues.NAME).to.equal('admin')
    })
  })

  describe('getUserInfo', () => {
    // User id null
    it('should return null while getting a false user', async () => {
      const res = await UserService.getUserInfo('')
      expect(res).to.be.null
    })

    // User id invalid
    it('should return null while getting a false user', async () => {
      const res = await UserService.getUserInfo('not-user-id')
      expect(res).to.be.null
    })

    // User id valid
    it('should retrieve user info successfully', async () => {
      const res = await UserService.getUserInfo(user.userId)
      expect(res?.firstName).to.equal('John')
      expect(res?.lastName).to.equal('Doe')
      expect(res?.email).to.equal('john.doe@example.com')
      expect(res?.phoneNumber).to.equal('8453728592')
      expect(res?.age).to.equal(30)
      expect(res?.state).to.equal('NY')
      expect(res?.gender).to.equal('masculine')
    })
  })

  describe('updateUserInfo', () => {
    // User id null
    try {
      it('should return null while updating a non existing', async () => {
        const res = await UserService.updateUserInfo('', newUserInfo)
        expect(res).to.be.null
      })

      // User id invalid

      it('should return null while updating a false user', async () => {
        const res = await UserService.updateUserInfo('not-user-id', newUserInfo)
        expect(res).to.be.null
      })

      // User id valid

      it('should update user info successfully', async () => {
        const res = await UserService.updateUserInfo(user.userId, newUserInfo)
        expect(res?.firstName).to.equal('John Fernando')
        expect(res?.lastName).to.equal('Doe')
        expect(res?.phoneNumber).to.equal('8453728592')
        expect(res?.age).to.equal(30)
        expect(res?.state).to.equal('NY')
        expect(res?.gender).to.equal('masculine')
      })
    } catch (error) {
      console.log(error)
    }
  })

  describe('updateUserCredentials', () => {
    // User id null
    it('should return null while updating a non existing', async () => {
      const res = await UserService.updateUserCredentials(
        '',
        newUserCredentials
      )
      expect(res).to.be.null
    })

    // User id invalid
    it('should return null while updating a false user', async () => {
      const res = await UserService.updateUserCredentials(
        'not-user-id',
        newUserCredentials
      )
      expect(res).to.be.null
    })

    it('should update user credentials successfully', async () => {
      const res = await UserService.updateUserCredentials(
        user.userId,
        newUserCredentials
      )
      expect(res).to.not.be.null
      expect(res?.email).to.equal('new.email@example.com')
    })
  })

  describe('deleteUserById', () => {
    it('should return 0 while deleting a non existing', async () => {
      const res = await UserService.deleteUserById('')
      expect(res).to.be.equal(0)
    })

    it('should return 1 while deleting a user', async () => {
      await unbindUserFromCompany(user.userId)
      await deleteAllReviewsByUser(user.userId)
      await updateAnswersByUserId(user.userId)
      await ubindUserFromComplaint(user.userId)

      const res = await UserService.deleteUserById(newUserInfo.userId)
      expect(res).to.be.equal(1)
    })
    
    it('should return null while recovering a deleted user', async () => {
      await unbindUserFromCompany(user.userId)
      await deleteAllReviewsByUser(user.userId)
      await updateAnswersByUserId(user.userId)      
      await UserService.deleteUserById(newUserInfo.userId)

      const res = await UserService.getUserInfo(newUserInfo.userId)
      expect(res).to.be.null
    })

    it('should return userId = null in company table', async () => {
      const company = await getCompanyByUserId(user.userId)
      expect(company?.userId).to.be.equal(user.userId)
      
      await unbindUserFromCompany(user.userId)
      const company2 = await getCompanyByUserId(user.userId)
      expect(company2).to.be.null
      expect(company2?.userId).to.be.undefined
    })

    it('should delete all reviews by user', async () => {
      const res = await deleteAllReviewsByUser(user.userId)
      expect(res).to.be.equal(1)

      const reviews = await getReviewByUser({ pageSize: 10, start: 0, userId: user.userId })
      expect(reviews.count).to.be.equal(0)
    })
  })
})