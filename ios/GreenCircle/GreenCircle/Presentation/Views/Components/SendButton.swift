//
//  SendBotton.swift
//  GreenCircle
//
//  Created by Dan FuPo on 15/09/23.
//

import SwiftUI

struct SendButton: View {
  var action: () -> Void
  
  var body: some View {
    Button("Enviar") {
     action()
    }
    .buttonStyle(GrowingButton())
  }
}

struct SendButton_Previews: PreviewProvider {
  static var previews: some View {
    SendButton(action: {})
  }
}


struct GrowingButton: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .foregroundColor(.white)
      .frame(width: 178, height: 40)
      .background(Color(red: 0.33, green: 0.49, blue: 0.55))
      .cornerRadius(9)
      .offset(x: 0, y: 0)
      .scaleEffect(configuration.isPressed ? 1.2 : 1)
      .animation(.easeOut(duration: 0.2), value: configuration.isPressed)
  }
}
