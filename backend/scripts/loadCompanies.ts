import fs from 'fs'
import { ParsedCompany } from './parseCompanies'
import { db } from '../src/configs/database.config'
import Company from '../src/models/company.model'
import Product from '../src/models/products.model'
import CompanyProducts from '../src/models/companyProducts.model'

export const loadFromJson = async (path: string) => {
  const companies = JSON.parse(
    fs.readFileSync(path, 'utf-8')
  ) as ParsedCompany[]

  const productMap: Record<string, Product> = {}

  db.transaction(async (t) => {
    const companiesDB = await Promise.all(
      companies.map(async (company) => {
        const companyDB = await Company.create({
          name: company.name,
          description: company.description,
          email: company.email,
          phone: company.phone,
          street: company.street,
          streetNumber: company.streetNumber,
          city: company.city,
          state: company.state,
          zipCode: company.zipCode,
          status: company.status,
        })

        await Promise.all(
          company.products.map(async (productName) => {
            if (!productMap[productName]) {
              const product = await Product.findOne({
                where: {
                  name: productName,
                },
              })
              if (!product) throw new Error(`Product ${productName} not found`)
              productMap[productName] = product
            }
            CompanyProducts.create({
              companyId: companyDB.companyId,
              productId: productMap[productName].productId,
            })
          })
        )
        return companyDB
      })
    )
    await Promise.all(
      companiesDB.splice(120, 30).map(async (company) => {
        return await Company.findByPk(company.companyId, {
          include: [Product],
        })
      })
    )
  })
}

// initDB().then(() => {
//   loadFromJson()
// })
