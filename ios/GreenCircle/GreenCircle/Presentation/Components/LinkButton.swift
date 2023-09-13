//
//  LinkButton.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI

struct LinkButtonConfig: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .foregroundColor(.gray)
      .bold()
      .underline()
      .opacity(configuration.isPressed ? 1 : 0.5)
  }
}
