import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
} from '@react-pdf/renderer'
import { SurveyReport } from '@/api/v1/report'

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  tableColLabel: {
    width: '75%',
    padding: 5,
  },
  tableColCount: {
    width: '25%',
    padding: 5,
  },
  chartImage: {
    marginVertical: 15,
    width: '100%',
    height: 200,
  },
})

type SurveyReportPDFProps = {
  surveyReport: SurveyReport
  chartImage: string | null
}

const SurveyReportPDF: React.FC<SurveyReportPDFProps> = ({
  surveyReport,
  chartImage,
}) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{surveyReport.title}</Text>
      {chartImage && <Image style={styles.chartImage} src={chartImage} />}{' '}
      {/* Conditional rendering */}
      {surveyReport.questions.map((question, index) => (
        <View key={index}>
          <Text style={styles.question}>{question.questionText}</Text>
          {question.answers.map((answer) => (
            <View style={styles.tableRow}>
              <View style={styles.tableColLabel}>
                <Text>{answer.label}</Text>
              </View>
              <View style={styles.tableColCount}>
                <Text>{answer.count}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
)

export default SurveyReportPDF
