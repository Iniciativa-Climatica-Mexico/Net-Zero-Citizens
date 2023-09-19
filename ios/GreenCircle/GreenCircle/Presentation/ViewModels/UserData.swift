//
//  UserData.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 18/09/23.
//

import Foundation

class UserData: ObservableObject {
  @Published var user: User?
  @Published var tokens: Tokens?
  
  init(_ user: User) {
    self.user = user
  }
  
  init() {
    self.user = nil
  }
}
