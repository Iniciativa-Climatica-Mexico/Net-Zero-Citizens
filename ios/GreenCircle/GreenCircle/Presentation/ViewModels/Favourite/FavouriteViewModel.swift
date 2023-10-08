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
  
  /// Creación de viewModel cuando se esté dentro del perfil cliente
  @Published var listFavourites: PaginatedQuery<Favourite> = PaginatedQuery(rows: [], start: 0, pageSize: 10, total: 0)
  
  /// Creación de viewModel si se presiona corazón
  @Published var contentFavourite: FavouriteCreationResponse = FavouriteCreationResponse(
    favouriteId: UUID(uuidString: "") ?? UUID(),
    companyId: UUID(uuidString: "") ?? UUID(),
    message: ""
  )
  
  @Published var contentGetFavourite: FavouriteGetResponse = FavouriteGetResponse(
    favouriteId: UUID(uuidString: "") ?? UUID(),
    companyId: UUID(uuidString: "") ?? UUID(),
    userId: "",
    createdAt: "", updatedAt: "", message: "" 
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
  func postFavouriteById(companyId: UUID) async {
    let userId: String = useCase.lService?.user.id ?? ""
    let postBody: PostFavouriteData = PostFavouriteData(
      companyId: companyId, userId: userId
    )
    // Settear el favouriteId local
    if let resultFavourite = await useCase.postFavouriteById(favouriteBody: postBody) {
      contentFavourite = resultFavourite
      useCase.lServiceFavourite.setCompanyFavourite(companyId: companyId)
    }
  }
  
  @MainActor
  /// - Description: Hacer delete de Favourite async cuando el usuario aprieta un corazón con relleno cambia VM
  /// - Parameters:
  ///   - favouriteId: To make a `favourite` instance in database
  func deleteFavouriteById(companyId: UUID) async throws {
    let userId: String = useCase.lService?.user.id ?? ""
    if let favouriteDelResponse = await useCase.deleteFavouriteById(companyId: companyId, userId: userId) {
      deleteContentFavourite = favouriteDelResponse
      useCase.lServiceFavourite.deleteFavourite(companyId: companyId)
    } else {
      throw GCError.requestFailed
    }
  }
  
  /// - Description: Hacer getAll de Favourite async cuando el usuario aprieta botón ver favoritos
  /// - Parameters:
  ///   - favouriteId: To make a `favourite` instance in database
  @MainActor
  func getAllFavouritesByUser() async throws {
    let userId: String = useCase.lService?.user.id ?? ""
    if let favouriteList = await useCase.getAllFavouritesByUser(userId: userId) {
      listFavourites = favouriteList
    } else {
      throw GCError.requestFailed
    }
  }
  
  /// - Description: Hacer get de Favourite async
  /// - Parameters:
  ///   - favouriteId: To verify it already exists `favouriteId`
  @MainActor
  func getFavouriteById(favouriteId: UUID) async  {
    if let getFavourite = await useCase.getFavouriteById(favouriteId: favouriteId) {
      contentGetFavourite = getFavourite
    }
  }
  
  /// - Description: Revisar si existe el favourite
  /// - Parameters:
  ///   - companyId: To verify it already exists `companyId`
  func existsFavourite(companyId: UUID) -> Bool {
    return useCase.lServiceFavourite.existsFavourite(companyId: companyId)
  }
  
}
