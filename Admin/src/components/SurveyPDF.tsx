import React from 'react'
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
    backgroundColor: '#589A74',
  },
  tableColumn: {
    margin: 5,
    width: '50%',
    textAlign: 'center',
  },
  tableRow: {
    margin: 5,
    width: '50%',
    textAlign: 'center',
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
const surveyPDF: React.FC<surveyPDFProps> = ({ survey }) => {
  const labels = survey.questions.flatMap((question) => {
    return question.answers.map((answer) => answer.label)
  })

  const data = survey.questions.flatMap((question) => {
    return question.answers.map((answer) => answer.count)
  })

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {survey?.title}
        </Text>

        {survey.questions.map((question, index) => (
          <View key={index}>
            <Text style={styles.questionTitle}>{question.questionText}</Text>

            <View style={styles.tableHeader}>
              <Text style={styles.tableColumn}>Opción</Text>
              <Text style={styles.tableColumn}>Total de respuestas</Text>
            </View>

            {question.answers.map((answer, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableColumn}>{answer.label}</Text>
                <Text style={styles.tableColumn}>{answer.count}</Text>
              </View>
            ))}
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

export default surveyPDF
