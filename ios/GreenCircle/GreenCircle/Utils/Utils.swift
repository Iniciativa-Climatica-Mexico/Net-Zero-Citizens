//
//  Utils.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 27/09/23.
//

import Foundation

class Utils {
  static func formatNumber(with mask: String, for string: String) -> String {
    let numbers = string.replacingOccurrences(of: "[^0-9]", with: "", options: .regularExpression)
    var result = ""
    var index = numbers.startIndex
    for ch in mask where index < numbers.endIndex {
      if ch == "X" {
        result.append(numbers[index])
        index = numbers.index(after: index)
      } else {
        result.append(ch)
      }
    }
    return result
  }
  
  static func isValidEmail(_ email: String) -> Bool {
    let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
    
    let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
    return emailPred.evaluate(with: email)
  }
}
