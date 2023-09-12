//
//  BackEndService.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation
import Alamofire

/// Inicializar clase de servicio con Singleton
/// Se declaran los métodos para hacer las llamadas al backend
class CompanyService {
    /// Inicialización de singleton
    static let shared = CompanyService()
    // TODO GET all companies
    
    /// Obtener compañía por id
    ///  - Parameters:
    ///     - url: Backend url para obtener datos
    ///  - Returns: Modelo de compañía o error en cualquier otro caso no válido
    func fetchCompanyById(url: URL) async -> Company? {
        let taskRequest = AF.request(url, method: .get).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            do {
                return try JSONDecoder().decode(Company.self, from: data)
            } catch {
                return nil
            }
        case let .failure(error):
            debugPrint(error.localizedDescription)
            return nil
        }
    }
}
