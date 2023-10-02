//
//  FavouriteRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 30/09/23.
//

import Foundation

/// Class representing the structure of the API for Favourites
class FavouriteAPI {
  static let base = "http://localhost:4000/api/v1/favourites"
  struct Routes {
    //static let create = "/create"
    //body to send companyId, userId
    static let post = "/create"
  }
}

/// Protocolo con las funciones del repositorio de Favourites
protocol FavouriteRepositoryProtocol {
  func postFavouriteById(favouriteBody: PostFavouriteData) async -> FavouriteCreationResponse?
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
}
