import { sendNotification } from '../src/services/notification.service'
import { expect } from 'chai'
import { db, initDB } from '../src/configs/database.config'

beforeEach(async () => {
  await db.drop()
  await initDB()
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
    const userId = '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'

    try {
      await sendNotification('Prueba','Mensaje de prueba', userId,testARN)
      expect(true).to.equal(true)
    } catch (error) {
      expect(true).to.equal(false)
    }
  })
})
