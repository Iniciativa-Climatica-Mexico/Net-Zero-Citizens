import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import { authAxios } from '../axios.config'

/**
 * Endpoint para capturar el gráfico de la encuesta
 *
 * @function
 * @async
 * @module api/v1/chartJSimage/captureChart
 * @see {@link http://localhost:3000/api/v1/chartJSimage/captureChart}
 * @param {NextApiRequest} req - Petición del cliente
 * @param {NextApiResponse} res - Respuesta del servidor
 *
 * @returns {Promise<void>} - No retorna nada
 *
 * @throws {400} - Si no se especifica el id de la encuesta
 * @throws {500} - Si no se encuentra el gráfico
 */
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const surveyId = req.query.surveyId as string

  if (!surveyId) {
    res
      .status(400)
      .json({ error: 'No se ha especificado el id de la encuesta' })

    return
  }

  let authToken
  try {
    const axiosInstance = authAxios()
    const response = await axiosInstance.get('/auth/token')

    authToken = response.data.token
  } catch (error) {
    console.error('Error al obtener el token de autenticación', error)
    res
      .status(500)
      .json({ error: 'Error al obtener el token de autenticación' })

    return
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setExtraHTTPHeaders({
    Authorization: `Bearer ${authToken}`,
  })

  await page.goto(`http://localhost:3000/reportes/encuesta/${surveyId}`)

  const scaleChartElement = await page.$('#scaleChartContainer')
  if (!scaleChartElement) {
    res.status(500).json({ error: 'No se ha encontrado el gráfico' })
    return
  }

  const screenshot = await scaleChartElement.screenshot()
  await browser.close()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Content-Disposition', 'attachment; filename=chart.png')
  res.setHeader('Content-Length', screenshot.length)
  res.send(screenshot)
}
