import React, { useState, useEffect } from 'react'
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { SurveyReport } from '@/api/v1/report'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  questionTitle: {
    fontSize: 16,
    textAlign: 'center',
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Montserrat',
  },
  tableHeader: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    backgroundColor: 'rgba(88, 154, 116, 1)',
  },
  tableColumn: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'grey',
  },
  tableRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  graph: {
    width: 300,
    height: 300,
    margin: 12,
  },
})

type surveyPDFProps = {
  survey: SurveyReport
}

/**
 * `surveyPDF` genera un documento PDF con las respuestas de la encuesta
 *
 * @function
 * @name surveyPDF
 * @param survey Respuestas de la encuesta
 * @returns {JSX.Element} Documento PDF con las respuestas de la encuesta
 */
const SurveyPDFReport: React.FC<surveyPDFProps> = ({ survey }) => {
  const [chartImage, setChartImage] = useState(String)
  const surveyId = survey?.surveyId

  const fetchChartImage = async () => {
    const repsonse = await fetch(`/api/captureChart?surveyId=${surveyId}`)
    const blob = await repsonse.blob()
    const objectURL = URL.createObjectURL(blob)

    setChartImage(objectURL)
  }

  useEffect(() => {
    fetchChartImage()
  }, [surveyId])

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title} fixed>
          {survey?.title}
        </Text>

        <Text style={styles.header} fixed>
          {survey?.description}
        </Text>

        {survey.questions.map((question, index) => (
          <View key={index}>
            <Text style={styles.questionTitle}>{question.questionText}</Text>

            {question.answers && question.answers.length > 0 ? (
              <>
                <Image style={styles.graph} src={chartImage} />
                <View style={styles.tableHeader}>
                  <Text style={styles.tableColumn}>Opción</Text>
                  <Text style={styles.tableColumn}>Total de respuestas</Text>
                </View>
                {question.answers.map((answer, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{answer.label}</Text>
                    <Text style={styles.tableCell}>{answer.count}</Text>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.text}>No hay respuestas disponibles</Text>
            )}
          </View>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default SurveyPDFReport
