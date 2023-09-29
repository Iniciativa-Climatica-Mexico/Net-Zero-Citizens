//
//  LocalService.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 16/09/23.
//

import Foundation

class LocalService {
  static let shared = LocalService()
  private var decoder = JSONDecoder()
  private var encoder = JSONEncoder()
  private let USER_DATA = "USER_DATA"
    private let COMPANY_ID = "COMPANY_ID"
  
  func getToken() -> AuthResponse? {
    guard let userData = UserDefaults.standard.data(forKey: USER_DATA)
    else {
      return nil
    }
    do {
      return try decoder.decode(AuthResponse.self, from: userData)
    } catch {
      debugPrint(error)
      return nil
    }
  }
  
  func setToken(userData: AuthResponse) {
    do {
      let encodedData = try encoder.encode(userData)
      UserDefaults.standard.set(encodedData, forKey: USER_DATA)
    } catch {
      debugPrint(error)
      return
    }
  }
    
    func setCompanyId(userData: String){
        UserDefaults.standard.set(userData, forKey: COMPANY_ID)
    }
    
    func getCompanyId() -> String?{
        return UserDefaults.standard.string(forKey: COMPANY_ID)
    }
}
