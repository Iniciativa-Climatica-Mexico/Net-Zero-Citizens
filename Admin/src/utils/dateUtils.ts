  /**
   * @brief Function to format companies approval date to: DD/MM/YY
   * @param date
   * @returns formatted date
   */
  export const formatDate = (date: string) => {
    const dateObject = new Date(date)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    const formattedDay = day < 10 ? `0${day}` : day
    const formattedMonth = month < 10 ? `0${month}` : month

    return `${formattedDay}/${formattedMonth}/${year}`
  }
