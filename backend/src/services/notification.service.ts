import AWS from 'aws-sdk'
import { getUserInfo } from './users.service'
import { getCompanyInfo } from './company.service'

AWS.config.update({ region: 'us-east-2' })

const cred = new AWS.Credentials({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
})
const sns = new AWS.SNS({ credentials: cred, region: 'us-east-2' })

const arn = process.env.AWS_ARN

/**
 * @brief Servicio para obtener el device token de un usuario
 * @param userId
 * @return deviceToken
 */

export const getUserTokenDevice = async (userId: string) => {
  try {
    const userInfo = await getUserInfo(userId)
    const deviceToken = userInfo?.deviceToken
    return deviceToken
  } catch (error) {
    console.log(error)
    throw new Error('Error getting user device token')
  }
}

/**
 * @brief Servicio para obtener el device token de una compañia
 * @param companyId
 * @return deviceToken
 */

export const getCompanyTokenDevice = async (companyId: string) => {
  try {
    const companyInfo = await getCompanyInfo(companyId)
    const deviceToken = companyInfo?.deviceToken
    return deviceToken
  } catch (error) {
    console.log(error)
    throw new Error('Error getting company device token')
  }
}

/**
 * @brief Servicio para enviar notificaciones usando SNS
 * @param message -> mensaje a enviar
 * @param arn -> arn del topic
 * @param userId -> id del usuario (opcional)
 * @param companyId -> id de la compañia (opcional)
 */

export const sendNotification = async (
  title: string,
  message: string,
  arn: string,
  companyId?: string,
  userId?: string,
) => {
  try {
    let deviceToken
    if (userId && !companyId) {
      deviceToken = await getUserTokenDevice(userId)
    } else if (companyId && !userId) {
      deviceToken = await getCompanyTokenDevice(companyId)
    }

    if (deviceToken) {
      // Create a platform endpoint
      const endpointParams = {
        PlatformApplicationArn: arn,
        Token: deviceToken,
      }
      console.log("Endpoint params: ", endpointParams)
      const endpointResponse = await sns
        .createPlatformEndpoint(endpointParams)
        .promise()

      // Publish a message to the endpoint
      const publishParams = {
        Message: JSON.stringify({
          default: message,
          APNS: JSON.stringify({
            aps: {
              alert: {
                title: title,
                body: message,
              },
            },
          }),
        }),
        MessageStructure: 'json',
        TargetArn: endpointResponse.EndpointArn,
      }
      const publishResponse = await sns.publish(publishParams).promise()
      console.log("-------------------------------------------")
      console.log(endpointResponse)
      console.log(publishParams)
      console.log(publishResponse)
      console.log("-------------------------------------------")
      console.log(`Mensaje enviado con éxito: ${message}`)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error sending notification')
  }
}
