//
//  EcoInfoView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation
import SwiftUI

struct EcoInfoView: View {
  @State var isPressedSeeMore: [Int: Bool] = [:]

  var body: some View {
    NavigationStack {
      ScrollView {
        LazyVStack {
          ForEach(1...5, id: \.self) { localKey in
            EcoInfoCard(isPressedSeeMore: $isPressedSeeMore, keyInt: localKey)
          }
        }
      }.navigationTitle("Eco-Info")
    }
  }
}

struct EcoInfoCard: View {
  @Binding var isPressedSeeMore: [Int: Bool]
  let keyInt: Int
  var body: some View {
    ZStack {
      VStack {
        Image(systemName: "star.fill")
          .resizable()
          .foregroundColor(.gray)
          .frame(width: 150, height: 150)
          .padding()
        HStack {
          VStack {
            Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non scelerisque ligula.")
              .font(.system(size: 12))
          }.padding()
          VStack(alignment: .trailing) {
            Text("Ver más")
              .font(.system(size: 12))
              .foregroundColor(isPressedSeeMore[keyInt] == true ? .black : .blue)
              .onTapGesture {
                for (key, _) in (isPressedSeeMore.filter { $0.key != keyInt }) {
                  isPressedSeeMore[key] = false
                }
                isPressedSeeMore[keyInt] = true
            }
          }
        }
      }
    }.frame(maxWidth: 344)
      .overlay(RoundedRectangle(cornerRadius: 10)
        .stroke(.black, lineWidth: 0.4))
  }
}
