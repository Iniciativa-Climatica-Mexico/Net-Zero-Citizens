//
//  FavouriteViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 30/09/23.
//

import Foundation

struct PostFavouriteData {
  let companyId: UUID
  let userId: String
}

/// Implementación de viewModel de modelo de Favourite
class FavouriteViewModel: ObservableObject {
  private let useCase: FavouriteUseCase
  
  /// Creación de viewModel si se presiona corazón
  @Published var contentFavourite: FavouriteCreationResponse = FavouriteCreationResponse(
    favouriteId: UUID(uuidString: "") ?? UUID(),
    companyId: UUID(uuidString: "") ?? UUID(),
    message: ""
  )
  
  /// Creación de viewModel con response de delete
  @Published var deleteContentFavourite: FavouriteDeleteResponse = FavouriteDeleteResponse(
    rows: 0,
    message: ""
  )
  /// Para implementar el caso de uso en la vista que llame al ViewModel Favourite
  init(useCase: FavouriteUseCase = FavouriteUseCase.shared) {
    self.useCase = useCase
  }
  
  @MainActor
  /// - Description: Hacer post de Favourite async cuando el usuario aprieta un corazón sin relleno cambia VM
  /// - Parameters:
  ///   - companyId: To make a `favourite` instance in database
  func postFavouriteById(companyId: UUID) async  {
    let userId: String = useCase.lService?.user.id ?? ""
    let postBody: PostFavouriteData = PostFavouriteData(
      companyId: companyId, userId: userId
    )
    if let resultFavourite = await useCase.postFavouriteById(favouriteBody: postBody) {
      contentFavourite = resultFavourite
    }
  }
  
  @MainActor
  /// - Description: Hacer delete de Favourite async cuando el usuario aprieta un corazón con relleno cambia VM
  /// - Parameters:
  ///   - favouriteId: To make a `favourite` instance in database
  func deleteFavouriteById(favouriteId: UUID) async throws {
    
    if let favouriteDelResponse = await useCase.deleteFavouriteById(favouriteId: favouriteId) {
      deleteContentFavourite = favouriteDelResponse
    } else {
      throw GCError.requestFailed
    }
  }
  
}
