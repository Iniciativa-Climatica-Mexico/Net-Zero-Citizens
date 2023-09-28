//
//  SplashScreenView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 20/09/23.
//

import SwiftUI

struct SplashScreenView: View {
  var goLogin: () -> Void
  
    var body: some View {
      VStack {
        Image("Logo")
          .resizable()
          .frame(width: 250, height: 250)
      }
    }
}

struct SplashScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SplashScreenView(goLogin: {})
    }
}
