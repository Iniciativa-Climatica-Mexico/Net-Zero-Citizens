import React from 'react'
import { Page, Text, View, Image, Document } from '@react-pdf/renderer'
import { SurveyReport } from '@/api/v1/report'
import styles from './styles'

type surveyPDFProps = {
  survey: SurveyReport
}

/**
 * `surveyPDF` genera un documento PDF con las respuestas de la encuesta
 *
 * @function
 * @name surveyPDF
 * @param survey Respuestas de la encue sta
 * @returns {JSX.Element} Documento PDF con las respuestas de la encuesta
 */
const SurveyPDFReport: React.FC<surveyPDFProps> = ({ survey }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.headerContainer} fixed>
          <Image src={'/logo.png'} style={styles.logo} />

          <View style={styles.textContainer}>
            <Text style={styles.organizationName}>
              Iniciativa Climatica de Mexico
            </Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <Text style={styles.title} fixed>
          {survey?.title}
        </Text>

        <Text style={styles.subtitle} fixed>
          {survey?.description}
        </Text>

        {survey.questions.map((question, index) => (
          <View key={index}>
            <Text style={styles.questionTitle}>{question.questionText}</Text>

            {question.answers && question.answers.length > 0 ? (
              <>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableColumn}>
                    {question.questionType === 'open' ? 'Respuesta' : 'Opción'}
                  </Text>
                  <Text style={styles.tableColumn}>
                    {question.questionType === 'open'
                      ? 'Frecuencia'
                      : 'Total de respuestas'}
                  </Text>
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
