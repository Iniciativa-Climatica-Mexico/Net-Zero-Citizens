//
//  UserData.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 18/09/23.
//

import Foundation

/// Clase para representar la variable de entorno con los datos del usuario y los tokens de acceso
class UserData: ObservableObject {
  @Published var user: UserAuth?
  @Published var tokens: Tokens?
  
  init(_ user: UserAuth) {
    self.user = user
  }
  
  init() {
    self.user = nil
  }
}
