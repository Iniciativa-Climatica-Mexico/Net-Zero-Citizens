//
//  NetworkAPIService.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//
import Alamofire
import Foundation

class NetworkAPIService {
  static let shared = NetworkAPIService()
  static let decoder = JSONDecoder()
  
  init() {
    NetworkAPIService.decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
  }
  
  func postGoogleSignIn(url: URL, googleToken: String) async -> AuthResponse? {
    let params: Parameters = ["googleToken": googleToken]
    
    let requestTask = AF.request(url, method: .post,
                                 parameters: params,
                                 encoding: JSONEncoding.default)
      .validate()
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case .success(let data):
      do {
        return try NetworkAPIService.decoder
          .decode(AuthResponse.self, from: data)
      } catch {
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
    
  }
  
  func putUser(url: URL, authToken: String, user: User) async {
    let params: Parameters = [
      "phoneNumber": user.phone!,
      "age": user.age!,
      "gender": user.gender!,
      "state": user.state!,
      "roleId": "CUSTOMER_ROLE_ID"
    ]
    let headers: HTTPHeaders = [.authorization(bearerToken: authToken)]
    let requestTask = AF.request(url, method: .put,
                                 parameters: params,
                                 headers: headers).validate()
    let _ = await requestTask.serializingData().response
  }
}
