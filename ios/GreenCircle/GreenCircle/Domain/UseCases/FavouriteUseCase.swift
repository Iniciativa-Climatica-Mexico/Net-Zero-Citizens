//
//  FavouriteUseCase.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 30/09/23.
//

import Foundation

/// Clase representando el caso de uso de favoritos de proveedores
class FavouriteUseCase {
  static let shared = FavouriteUseCase()
  let fRepository = FavouriteRepository.shared
  let uRepository = UserRepository.shared
  
  // Obtener los tokens del usuario (userId)
  let lService = LocalService.shared.getUserInformation()
  
  /// - Description: Obtener el ID del user para poder crear favorito
  func getLocalUserData() -> AuthResponse? {
    return uRepository.getAuthData()
  }
  
  /// - Description: Post de un favorito con body (companyId y serId) asíncrono
  /// - Parameters:
  ///    - favouriteBody: Instancia de`PostFavouriteData` contiene los datos a mandar.
  /// - Returns:
  ///    - `FavouriteCreationResponse?` objeto representando la respuesta desde backend.
  @MainActor
  func postFavouriteById(favouriteBody: PostFavouriteData) async -> FavouriteCreationResponse? {
    return await fRepository.postFavouriteById(favouriteBody: favouriteBody)
  }
  
  /// - Description: Delete asíncrono de un favorito
  /// - Parameters:
  ///    - favouriteId: El id`favouriteId` para eliminar favorito
  /// - Returns:
  ///    - `FavouriteDeleteResponse?` objeto representando la respuesta desde backend.
  func deleteFavouriteById(favouriteId: UUID) async -> FavouriteDeleteResponse? {
    return await fRepository.deleteFavouriteById(favouriteId: favouriteId)
  }
  
}
