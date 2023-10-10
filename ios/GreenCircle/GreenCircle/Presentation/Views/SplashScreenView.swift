//
//  SplashScreenView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 20/09/23.
//  Modified by Diego Iturbe Bravo on 03/10/23.
//

import SwiftUI

struct SplashScreenView: View {
    @State private var isActive = false
    @State private var size = 0.8
    @State private var opacity = 0.5
  var goLogin: () -> Void
    var body: some View {
      VStack {
          VStack {
              Image("GCLOGO")
                  .resizable()
                  .aspectRatio(contentMode: .fit)
                  .frame(height: 120)
                  .padding(.bottom,20)
              Image("GREENCIRCLE")
                  .resizable()
                  .aspectRatio(contentMode: .fit)
                  .frame(width: 230)
          }
          .frame(height: 600 , alignment: .center)
          .scaleEffect(size)
          .opacity(opacity)
          .onAppear {
              withAnimation(.easeIn(duration: 1.2)){
                  self.size = 1.0
                  self.opacity = 1.0
              }
          }
          
          
          VStack {
              Text("from")
                  .opacity(0.60)
              HStack{
                  Image("ICMLOGO_GREEN")
                      .resizable()
                      .aspectRatio(contentMode: .fit)
                      .frame(height: 60 , alignment: .bottom)
                      .padding(.bottom,20)
                  Image("ICM_GREEN")
                      .resizable()
                      .aspectRatio(contentMode: .fit)
                      .frame(width: 210)
              }
              
        
          }
          .frame(height: 100 , alignment: .bottom)
          .onAppear {
              DispatchQueue.main.asyncAfter(deadline: .now() + 2.0){
                  self.isActive = true
              }
          }
      }
      
    }
}

struct SplashScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SplashScreenView(goLogin: {})
    }
}
