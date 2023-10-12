//
//  SplashScreenView.swift
//  GreenCircle
//
//  Created by Diego Iturbe Bravo on 03/10/23.
//

import SwiftUI

struct LoadingScreenView: View {
    @State private var rotationDegrees = 0.0
    @StateObject var viewModel = LoadingScreenViewModel()
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
         
              Image("GCLOGO")
                  .resizable()
                  .aspectRatio(contentMode: .fit)
                  .frame(height: 50)
                  .opacity(viewModel.loader1 ? 0.5 : 0.00)
                  .rotationEffect(.degrees(rotationDegrees))
                
                  .onAppear {
                      withAnimation(Animation.easeIn(duration: 5.00)) {
                          rotationDegrees = 360.0
                      }

                  }
              Image("GCLOGOGRAY")
                  .resizable()
                  .aspectRatio(contentMode: .fit)
                  .frame(height: 50)
                  .opacity(viewModel.loader2 ? 0.4 : 0.00)
                  
                  
              
            
                  
        }
      .onAppear{viewModel.hideLoaderAfterTime()}
    }
    
}

struct LoadingScreenView_Previews: PreviewProvider {
    static var previews: some View {
        LoadingScreenView()
    }
}
