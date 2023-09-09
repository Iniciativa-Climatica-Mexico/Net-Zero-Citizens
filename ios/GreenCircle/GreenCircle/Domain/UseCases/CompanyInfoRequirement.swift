//
//  CompanyInfoRequirement.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

/// Inicialización de protocolo de requerimientos
protocol CompanyInfoRequirementProtocol {
    func getCompanyById(id: UUID) async -> Company?
}

/// Inicialización de clase de requerimientos de modelo de compañía
/// No como se hará fetch de los datos, pero si definir los requerimientos
/// para hacerlo
class CompanyInfoRequirement: CompanyInfoRequirementProtocol {
    /// Inicialización de repositorio para poder hacer el fetch de datos de compañía
    let companyDataRepository: CompanyRepository
    /// Creación de Singleton
    static let shared = CompanyInfoRequirement()
    /// Constructor con recivimiento o por default
    init(companyDataRepository: CompanyRepository = CompanyRepository.shared) {
        self.companyDataRepository = companyDataRepository
    }
    /// Definición de requerimiento para hacer el fetch
    ///   - Parameters:UUID de compañía
    ///   - Returns: Modelo de compañía
    func getCompanyById(id: UUID) async -> Company? {
        return await companyDataRepository.getCompanyById(companyId: id)
    }
    
}
