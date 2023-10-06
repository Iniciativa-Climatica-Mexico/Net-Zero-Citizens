//
//  MainButton.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import SwiftUI

struct MainButton: View {
  var content: String
  var action: () -> Void
  var buttonColor: Color
  
  init(_ content: String,
       buttonColor: Color = Color("Primary"),
       action: @escaping () -> Void) {
    self.content = content
    self.action = action
    self.buttonColor = buttonColor
  }
  
  var body: some View {
    ZStack{
      Rectangle()
        .frame(height: 45)
        .cornerRadius(10)
        .foregroundColor(buttonColor)
      Button{action()} label: {
        Text(content)
          .foregroundColor(.white)
          .bold()
      }
    }
  }
}
