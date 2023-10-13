import CompanyBootstrap from '../bootstrap/company.bootstrap'
import CompanyFilesBootstrap from '../bootstrap/companyFiles.bootstrap'
import CompanyProductsBootstrap from '../bootstrap/companyProducts.bootstrap'
import ProductBootstrap from '../bootstrap/product.bootstrap'
import ReviewBootstrap from '../bootstrap/reviews.bootstrap'
import UserBootstrap from '../bootstrap/users.bootstrap'
import RolesBootstrap from '../bootstrap/roles.bootstrap'
import EcoinfoBootstrap from '../bootstrap/ecoinfo.bootstrap'
import SurveysBootstrapper from '../bootstrap/survey.bootstrap'
import ComplaintsBootstrapper from '../bootstrap/complaint.bootstrap'
import FavouritesBootsrapper from '../bootstrap/favourite.bootstrap'

export const bootstrapDB = async () => {
  try {
    const bootstrappers = [
      RolesBootstrap,
      CompanyBootstrap,
      UserBootstrap,
      SurveysBootstrapper,
      ReviewBootstrap,
      ProductBootstrap,
      CompanyFilesBootstrap,
      CompanyProductsBootstrap,
      EcoinfoBootstrap,
      ComplaintsBootstrapper,
      FavouritesBootsrapper,
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

import ProductBootstrapProd from '../bootstrap/prod/product.bootstrap'
import RolesBootstrapProd from '../bootstrap/prod/roles.bootstrap'
import SurveysBootstrapperProd from '../bootstrap/prod/survey.bootstrap'
import UserBootstrapProd from '../bootstrap/prod/users.bootstrap'


export const bootstrapDBProd = async () => {
  try {
    const bootstrappers = [
      ProductBootstrapProd,
      RolesBootstrapProd,
      SurveysBootstrapperProd,
      UserBootstrapProd
    ]
    const pool = bootstrappers.map((bootstrapper) => {
      const instance = new bootstrapper()
      return instance.run()
    })
    await Promise.all(pool)
    console.log('Database bootstrapped (PROD)')
  } catch (error) {
    console.error('Unable to bootstrap database (PROD):', error)
  }
}

