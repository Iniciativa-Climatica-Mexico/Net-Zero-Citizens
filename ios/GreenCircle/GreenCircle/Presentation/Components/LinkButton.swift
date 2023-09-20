//
//  LinkButton.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI

struct LinkButton: View {
  var content: String
  var action: () -> Void
  var buttonColor: Color
  
  init(_ content: String,
       buttonColor: Color = .gray,
       action: @escaping () -> Void) {
    self.content = content
    self.action = action
    self.buttonColor = buttonColor
  }
  
  var body: some View {
    Button{action()} label: {
      Text(content)
        .foregroundColor(buttonColor)
        .bold()
        .underline()
    }
  }
}
