import { StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  organizationName: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'right',
    color: 'grey',
  },
  dateText: {
    fontSize: 12,
    textAlign: 'right',
    color: 'grey',
  },
  logo: {
    width: 50,
    height: 50,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  questionTitle: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 12,
    marginBottom: 8,
    fontWeight: 600,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Helvetica',
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
    marginVertical: 1,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    fontSize: 12,
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
    padding: 12,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
})

export default styles
