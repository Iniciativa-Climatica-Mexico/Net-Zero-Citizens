import fs from 'fs'
import csv from 'csv-parser'
import dotEnv from 'dotenv'

dotEnv.config()

type MapsResponse = {
  results: {
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
  }[]
}

export type ParsedCompany = {
  name: string
  description: string
  email: string
  phone: string
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  status: string
  products: string[]
}

readCSVFile(__dirname + '/PADRON.EMPRESAS.FIDE.AGOSTO2023.csv').then(
  async (data) => {
    const companies = await Promise.all(
      data.map(async (c) => {
        const company = c as Record<string, string>
        const address = [
          company['Dirección'],
          // company['Colonia'],
          company['Código Postal'],
          company['Entidad Federativa'],
        ].join(', ')

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&components=locality:${encodeURIComponent(company['Colonia'])}&key=${
          process.env.PARSING_MAPS_KEY
        }`
        const response = (await (await fetch(url)).json()) as MapsResponse
        console.log(url)

        console.log(response)
        let streetNumber = ''
        let street = ''
        let city = ''
        let state = ''

        response.results[0].address_components.forEach((compontent) => {
          if (compontent.types.some((type) => type === 'street_number'))
            streetNumber = compontent.short_name

          if (compontent.types.some((type) => type === 'route'))
            street = compontent.long_name

          if (compontent.types.some((type) => type === 'locality'))
            city = compontent.long_name

          if (
            compontent.types.some(
              (type) => type === 'administrative_area_level_1'
            )
          )
            state = compontent.long_name
        })

        if (state.length == 0) state = company['Entidad Federativa']

        if (city.length == 0) city = company['Colonia']

        const parsedCompany: ParsedCompany = {
          name: company['Proveedor'],
          description: company['Rama Especialización'],
          email: company['Correo Electrónico'].split(',')[0].trim(),
          phone: company['Telefono']
            .split(',')[0]
            .split('')
            .filter((c) => /^\d+$/.test(c))
            .join(''),
          street,
          streetNumber,
          city,
          state,
          zipCode: company['Código Postal'],
          status: 'approved',
          products: [] as string[],
        }

        if (
          company['Rama Especialización'].includes('Sistemas fotovoltaicos')
        ) {
          parsedCompany.products.push('Paneles Solares')
        }

        if (company['Rama Especialización'].includes('Calentadores solares')) {
          parsedCompany.products.push('Calentadores Solares')
        }
        return parsedCompany
      })
    )
    fs.writeFileSync(
      __dirname + '/parsedCompanies.json',
      JSON.stringify(companies)
    )
  }
)
function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath, { encoding: 'utf-8' })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error))
  })
}
