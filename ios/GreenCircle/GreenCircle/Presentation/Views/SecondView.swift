//
//  SecondView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import SwiftUI

struct SecondView: View {
  @Binding var showSecondView: Bool
  
  var body: some View {
    VStack {
      Text("Segunda vista")
        .font(.largeTitle)
      Button("Enviar") {
        // Aquí puedes agregar la lógica de lo que quieras hacer en la segunda vista
      }
    }
    .navigationTitle("Segunda vista")
  }
}

struct SecondView_Previews: PreviewProvider {
  static var previews: some View {
    SecondView(showSecondView: .constant(false))
  }
}
