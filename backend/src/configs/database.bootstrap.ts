import CompanyBootstrap from '../bootstrap/company.bootstrap'
import CompanyProductsBootstrap from '../bootstrap/companyProducts.bootstrap'
import DummyBootstrap from '../bootstrap/dummy.bootstrap'
import ProductBootstrap from '../bootstrap/product.bootstrap'
import ReviewBootstrap from '../bootstrap/reviews.bootstrap'
import UserBootstrap from '../bootstrap/users.bootstrap'

export const bootstrapDB = async () => {
  try {
    const bootstrappers = [
      UserBootstrap,
      ProductBootstrap,
      CompanyBootstrap,
      CompanyProductsBootstrap,
      ReviewBootstrap,
      DummyBootstrap,
    ]
    const pool = bootstrappers.map((bootstrapper) => {
      const instance = new bootstrapper()
      return instance.run()
    })
    await Promise.all(pool)
    console.log('Database bootstrapped')
  } catch (error) {
    console.error('Unable to bootstrap database:', error)
  }
}
