import React from 'react'
import { Page, Text, View, Image, Document } from '@react-pdf/renderer'
import { QuestionReport, SurveyReport } from '@/api/v1/report'
import styles from './styles'

type surveyPDFProps = {
  survey: SurveyReport
  graphImages: string[]
}

/**
 * `surveyPDF` genera un documento PDF con las respuestas de la encuesta
 *
 * @function
 * @name surveyPDF
 * @param survey Respuestas de la encue sta
 * @returns {JSX.Element} Documento PDF con las respuestas de la encuesta
 */
const SurveyPDFReport: React.FC<surveyPDFProps> = ({ survey, graphImages }) => {
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const renderHeader = () => (
    <View style={styles.headerContainer} fixed>
      <Image src="/logo.png" style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.organizationName}>
          Iniciativa Climática de México
        </Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    </View>
  )

  const renderAnswers = (question: QuestionReport) => {
    if (!question.answers || question.answers.length === 0) {
      return <Text style={styles.text}>No hay respuestas disponibles</Text>
    }

    const headerLabel =
      question.questionType === 'open' ? 'Respuesta' : 'Opción'

    const countLabel =
      question.questionType === 'open' ? 'Frecuencia' : 'Total de respuestas'

    return (
      <>
        <View style={styles.tableHeader}>
          <Text style={styles.tableColumn}>{headerLabel}</Text>
          <Text style={styles.tableColumn}>{countLabel}</Text>
        </View>

        {question.answers.map((answer, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{answer.label}</Text>
            <Text style={styles.tableCell}>{answer.count}</Text>
          </View>
        ))}
      </>
    )
  }

  return (
    <Document>
      {survey.questions.map((question, index) => (
        <Page key={index} style={styles.body}>
          {renderHeader()}

          <Text style={styles.title} fixed>
            {survey?.title}
          </Text>

          <Text style={styles.subtitle} fixed>
            {survey?.description}
          </Text>

          <Text style={styles.questionTitle}>{question.questionText}</Text>

          {question.questionType !== 'open' && graphImages[index] && (
            <Image src={graphImages[index]} style={styles.graph} />
          )}

          {renderAnswers(question)}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  )
}

export default SurveyPDFReport
