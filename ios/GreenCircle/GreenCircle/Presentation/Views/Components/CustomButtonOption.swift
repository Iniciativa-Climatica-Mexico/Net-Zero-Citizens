//
//  CustomButtonOption.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 01/10/23.
//

import Foundation
import SwiftUI

struct CustomButtonOption: View {
  @Binding var isPressed: [String: Bool]
  var content: String
  var body: some View {
    Button(action: {
      isPressed[content] = true
          
      for (key, _) in (isPressed.filter { $0.key != content }) {
          isPressed[key] = false
      }
      
      }, label: {
        if content == "Report"{
          Image(systemName: "exclamationmark.bubble")
          .shadow(color: isPressed[content] ?? false ? Color("GreenCustom") : Color.clear, radius: 10, y: 9)
          .foregroundColor(isPressed[content] ?? false ? Color("GreenCustom") : Color("MainText"))
          
        } else {
          Text(content)
          .font(.system(size: 18))
          .scaleEffect(isPressed[content] ?? false ? 1.1 : 1.0)
          .shadow(color: isPressed[content] ?? false ? Color("GreenCustom") : Color.clear, radius: 10, y: 9)
          .foregroundColor(isPressed[content] ?? false ? Color("GreenCustom") : Color("MainText"))
        }
      })
    .frame(maxWidth: .infinity, maxHeight: 15)
  }
}
