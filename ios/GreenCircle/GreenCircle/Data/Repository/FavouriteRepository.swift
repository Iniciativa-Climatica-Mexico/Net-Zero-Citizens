//
//  FavouriteRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 30/09/23.
//

import Foundation

/// Class representing the structure of the API for Favourites
class FavouriteAPI {
  static let base = APIRoutes.Favourite.base
  struct Routes {
    //static let create = "/create"
    //body to send companyId, userId
    static let post = "/create"
    static let delete = "/delete/:companyId/user/:userId"
    static let getAll = "/user/:userId"
    static let get = "/:favouriteId"
  }
}

/// Protocolo con las funciones del repositorio de Favourites
protocol FavouriteRepositoryProtocol {
  func postFavouriteById(favouriteBody: PostFavouriteData) async -> FavouriteCreationResponse?
  func deleteFavouriteById(companyId: UUID, userId: String) async -> FavouriteDeleteResponse?
  func getAllFavouritesByUser(userId: String) async -> PaginatedQuery<Favourite>?
}

/// Clase que representa el protocolo de Favourites
class FavouriteRepository: FavouriteRepositoryProtocol {
  /// Inicialización de servicio backEnd
  let service: NetworkAPIService
  /// Inicialización de singleton de repositorio de compañía
  static let shared = FavouriteRepository()
  /// Constructor que toma el valor del servicio del backEnd
  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  
  /// - Description: Función asíncrona que llama al servicio de conexión con la API para hacer un post del favorito
  /// - Parameters:
  ///   - userId: El ID del usuario
  ///   - companyId: El ID del company
  /// - Returns: `FavouriteCreationResponse?`
  func postFavouriteById(favouriteBody: PostFavouriteData) async -> FavouriteCreationResponse? {

    let jsonObjetct: [String: Any] = [
      "companyId": favouriteBody.companyId.uuidString.lowercased(),
      "userId": favouriteBody.userId
    ]
    let endpoint = FavouriteAPI.base + FavouriteAPI.Routes.post
    return await NetworkAPIService.shared.postRequest(URL(string: endpoint)!, body: jsonObjetct)
  }
  
  /// - Description: Función asíncrona que llama al servicio de conexión con la API para hacer un delete del favorito
  /// - Parameters:
  ///   - favouriteId: El ID del favorito
  /// - Returns: `FavouriteDeleteResponse?`
  func deleteFavouriteById(companyId: UUID, userId: String) async -> FavouriteDeleteResponse? {
    
    let endpoint = FavouriteAPI.base + FavouriteAPI.Routes.delete
      .replacingOccurrences(of: ":companyId", with: companyId.uuidString.lowercased())
      .replacingOccurrences(of: ":userId", with: userId)
    return await NetworkAPIService.shared.deleteRequest(URL(string: endpoint)!)
  }
  
  /// - Description: Función asíncrona que llama al servicio de conexión con la API para hacer un fetchAll del favorito
  /// - Parameters:
  ///   - userId: El ID del user
  /// - Returns: `FavouriteDeleteResponse?`
  func getAllFavouritesByUser(userId: String) async -> PaginatedQuery<Favourite>? {
    let endpoint = FavouriteAPI.base + FavouriteAPI.Routes.getAll
      .replacingOccurrences(of: ":userId", with: userId.lowercased())
    return await NetworkAPIService.shared.getRequest(URL(string: endpoint)!)
  }

  /// - Description: Función asíncrona que llama al servicio de conexión con la API para hacer un getFavouriteById del favorito
  /// - Parameters:
  ///   - favouriteId: El ID del favourite
  /// - Returns: `Favourite?`
  func getFavouriteById(favouriteId: UUID) async -> FavouriteGetResponse? {
    let endpoint = FavouriteAPI.base + FavouriteAPI.Routes.get
      .replacingOccurrences(of: ":favouriteId", with: favouriteId.uuidString.lowercased())
    return await NetworkAPIService.shared.getRequest(URL(string: endpoint)!)
  }


}
