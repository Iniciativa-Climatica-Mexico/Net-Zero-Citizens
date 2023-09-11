import CompanyBootstrap from '../bootstrap/company.bootstrap'
import DummyBootstrap from '../bootstrap/dummy.bootstrap'
import ReviewBootstrap from '../bootstrap/reviews.bootstrap'
import SurveysBootstrapper from '../bootstrap/survey.bootstrap'
import UserBootstrap from '../bootstrap/users.bootstrap'
import RolesBootstrapper from '../bootstrap/roles.bootstrap'
import ProductBootstrap from '../bootstrap/product.bootstrap'

export const bootstrapDB = async () => {
  try {
    const bootstrappers = [
      RolesBootstrapper,
      CompanyBootstrap,
      UserBootstrap,
      ReviewBootstrap,
      SurveysBootstrapper,
      ProductBootstrap,
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
