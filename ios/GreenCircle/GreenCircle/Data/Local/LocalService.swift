//
//  LocalService.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 16/09/23.
//  Modified by Daniel Gutiérrez Gómez on 03/10/23

import Foundation

class LocalService {
  static let shared = LocalService()
  private var decoder = JSONDecoder()
  private var encoder = JSONEncoder()
  private let USER_DATA = "USER_DATA"
    private let COMPANY_ID = "COMPANY_ID"
    private let USER_ID = "USER_ID"
  
  func getUserInformation() -> AuthResponse? {
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
  
  func setUserInformation(userData: AuthResponse) {
    do {
      let encodedData = try encoder.encode(userData)
      UserDefaults.standard.set(encodedData, forKey: USER_DATA)
    } catch {
      debugPrint(error)
      return
    }
  }
    
    /// Set company id when login
        /// - Parameter companyId: companyId
        func setCompanyId(companyId: String) {
            UserDefaults.standard.set(companyId, forKey: "companyId")
        }

        
        /// Function to get company id from local storage
        /// - Returns: Compnay id
        func getCompanyId() -> String? {
            return UserDefaults.standard.string(forKey: "companyId")
        }
    
    /// Set company id when login
        /// - Parameter companyId: companyId
        func setUserId(userId: String) {
            UserDefaults.standard.set(userId, forKey: USER_ID)
        }

        
        /// Function to get company id from local storage
        /// - Returns: Compnay id
        func getUserId() -> String? {
            return UserDefaults.standard.string(forKey: USER_ID)
        }
        
        /// - Description:
        ///   Función que borra la información del usuario cuando este ya no quiere su cuenta
        func deleteUserInformation() {
          let domain = Bundle.main.bundleIdentifier!
          UserDefaults.standard.removePersistentDomain(forName: domain)
          UserDefaults.standard.synchronize()
        }
  
  /// - Description: Stores favourite to maintain heart filled when closing app
  func setCompanyFavourite(companyId: UUID) {
    UserDefaults.standard.set(true, forKey: "\(companyId.uuidString)_favourite")
  }
  
  /// - Description: Checks if favourite already exists
  /// - Parameters:
  ///   - companyId: Company Id
  /// - Returns: `Bool`
  func existsFavourite(companyId: UUID) -> Bool {
    UserDefaults.standard.bool(forKey: "\(companyId.uuidString)_favourite")
  }
  
  /// - Description: Deletes from local storage to keep track of state favourite when closing app
  /// - Parameters:
  ///   - companyId: Company Id
  func deleteFavourite(companyId: UUID) {
    UserDefaults.standard.removeObject(forKey: "\(companyId.uuidString)_favourite")
  }
  
  func deleteUserData() {
    UserDefaults.standard.removeObject(forKey: USER_DATA)
  }
}
