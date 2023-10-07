//
//  AppTutorial.swift
//  GreenCircle
//
//  Created by Dan FuPo on 01/10/23.
//

import SwiftUI

@available(iOS 17.0, *)
struct AppTutorial_17: View {
  
  private let tutoImgs = ["foto1", "foto2", "foto3", "foto4", "foto5"]
  
  var goMainMenu: () -> Void
  
  var body: some View {
    NavigationView {
      
      VStack(alignment: .leading) {
        Text("¿Cómo uso la App?").font(.title).padding([.leading, .top])
        ScrollView(.horizontal) {
          LazyHStack(spacing: 0) {
            ForEach(tutoImgs.indices, id: \.self) { index in
              let tutorial = tutoImgs[index]
              VStack {
                Text(tutorial).font(.headline)
                Image(tutorial)
                  .resizable()
                  .scaledToFit()
                  .frame(height: 450)
                  .clipShape(RoundedRectangle(cornerRadius: 25.0))
                  .padding(.horizontal, 20)
                  .containerRelativeFrame(.horizontal)
                  .scrollTransition(.animated, axis: .horizontal) { content, phase in
                    content
                      .opacity(phase.isIdentity ? 1.0 : 0.8)
                      .scaleEffect(phase.isIdentity ? 1.0 : 0.8)
                  }
              }
            }
          }.scrollTargetLayout()
        }.scrollTargetBehavior(.viewAligned)
        
        HStack {
          
          Spacer()
          
          Button("Salir", action: goMainMenu)
            .foregroundColor(.white)
            .frame(width: 178, height: 40)
            .background(Color(red: 0.33, green: 0.49, blue: 0.55))
            .cornerRadius(9)
            .padding(.bottom, 40)
          
          Spacer()
          
        } .navigationBarTitle("Tutoriales")
          .navigationBarTitleDisplayMode(.inline)
        
      }
    }
  }
}

@available(iOS 17.0, *)
#Preview {
  AppTutorial_17(goMainMenu: {})
}
