import { sendNotification } from '../src/services/notification.service'
import { expect } from 'chai'
import { db, initDB } from '../src/configs/database.config'
import * as UserService from '../src/services/users.service'
import * as CompanyService from '../src/services/company.service'

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

/**
 * @brief Prueba unitaria para el servicio de notificaciones
 * @details Esta prueba unitaria se encarga de probar que el servicio de notificaciones
 * esté funcionando correctamente. Para ello, se envía un mensaje de prueba a un ARN
 * de prueba que se ha creado en la consola de AWS.
 */

describe('Notification Service', () => {
  it('should send a notification successfully', async () => {
    // Aquí pondrías un ARN de prueba que has creado en la consola de AWS
    const testARN = process.env.AWS_ARN
    const userId = 'abcd-1234-efgh-5678'

    try {
      await sendNotification('Prueba','Mensaje de prueba', userId,testARN)
      expect(true).to.equal(true)
    } catch (error) {
      expect(true).to.equal(false)
    }
  })
})
