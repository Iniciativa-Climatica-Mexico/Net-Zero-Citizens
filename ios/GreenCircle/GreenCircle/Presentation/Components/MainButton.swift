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
  var width: CGFloat
  
  init(_ content: String,
       buttonColor: Color = Color("Primary"),
       width: CGFloat = 200,
       action: @escaping () -> Void) {
    self.content = content
    self.action = action
    self.buttonColor = buttonColor
    self.width = width
  }
  
  var body: some View {
    ZStack{
      Rectangle()
        .frame(width: width, height: 45)
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
