import CompanyBootstrap from '../bootstrap/company.bootstrap'
import DummyBootstrap from '../bootstrap/dummy.bootstrap'
import ReviewBootstrap from '../bootstrap/reviews.bootstrap'
import UserBootstrap from '../bootstrap/users.bootstrap'
import RolesBootstrap from '../bootstrap/roles.bootstrap'
import ProductBootstrap from '../bootstrap/product.bootstrap'
import ProductImageBootstrap from '../bootstrap/companyImage.bootstrap'
import EcoinfoBootstrap from '../bootstrap/ecoinfo.bootstrap'
import SurveysBootstrapper from '../bootstrap/survey.bootstrap'


export const bootstrapDB = async () => {
  try {
    const bootstrappers = [
      RolesBootstrap,
      CompanyBootstrap,
      UserBootstrap,
      SurveysBootstrapper,
      ReviewBootstrap,
      ProductBootstrap,
      ProductImageBootstrap,
      DummyBootstrap,
      EcoinfoBootstrap,
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
