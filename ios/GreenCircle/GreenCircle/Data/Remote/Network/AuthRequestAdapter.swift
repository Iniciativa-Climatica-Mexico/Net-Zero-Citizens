//
//  AuthRequestAdapter.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 24/09/23.
//

import Foundation
import Alamofire

class AuthRequestAdapter: RequestInterceptor {
  private let authToken: String
  
  init(_ authToken: String) {
    self.authToken = authToken
  }
  
  func adapt(_ urlRequest: URLRequest, for session: Alamofire.Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
    var authRequest = urlRequest
    authRequest.setValue("Bearer \(authToken)",
                         forHTTPHeaderField: "Authorization")
    completion(.success(authRequest))
  }
}
