//
//  RegisterCompanyUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

/// Clase representando el caso de uso de registrar una compañía nueva
class RegisterCompanyUseCase {
  static let shared = RegisterCompanyUseCase()
  let repository = CompanyRepository.shared
  
  /// Llama al repositorio para crear una compañía nueva
  /// - Parameters:
  ///   - authToken: token de autenticación del usuario
  ///   - company: datos de la compañía
  @MainActor
  func registerCompany(authToken: String, company: PostCompanyData) async {
    await repository.postCompany(authToken: authToken, company: company)
  }
}
