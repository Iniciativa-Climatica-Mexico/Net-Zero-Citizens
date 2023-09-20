//
//  PendingCompanyView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI

struct PendingCompanyView: View {
  var body: some View {
    VStack {
      Text("Cuenta en proceso de validación")
        .font(.largeTitle).bold()
        .multilineTextAlignment(.center)
        .padding(.bottom, 30)
      Text("Nos podremos en contacto contigo para proceder con el registro")
        .font(.headline)
        .multilineTextAlignment(.center)
    }.padding(.horizontal, 40)
  }
}

struct PendingCompanyView_Previews: PreviewProvider {
  static var previews: some View {
    PendingCompanyView()
  }
}
