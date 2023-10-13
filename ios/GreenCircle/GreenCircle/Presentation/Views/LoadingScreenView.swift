//
//  SplashScreenView.swift
//  GreenCircle
//
//  Created by Diego Iturbe Bravo on 03/10/23.
//

import SwiftUI

struct LoadingScreenView: View {
  @State var isAnimating = false
  @State private var rotationDegrees = 0.0
  
  private var animation: Animation {
    .linear
    .speed(0.1)
    .repeatForever(autoreverses: false)
  }
  var body: some View {
    ZStack {
      Color(.systemBackground)
        .ignoresSafeArea()
        .opacity(0.7)
      VStack {
        Image("GCLOGO")
          .resizable()
          .aspectRatio(contentMode: .fit)
          .frame(height: 50)
          .opacity(0.5)
          .rotationEffect(.degrees(rotationDegrees))
        
        .onAppear {
          withAnimation(animation) {
            rotationDegrees = 360.0
          }
        }
      }
    }
  }
}

struct LoadingScreenView_Previews: PreviewProvider {
  static var previews: some View {
    LoadingScreenView()
  }
}
