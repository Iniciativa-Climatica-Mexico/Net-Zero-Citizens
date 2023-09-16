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
  @StateObject var ecoInfoViewModel = EcoInfoViewModel()

  var body: some View {
    NavigationStack {
      ScrollView {
        LazyVStack {
          ForEach(ecoInfoViewModel.ecoInfoArray, id: \.ecoinfoId) { ecoInfo in
            EcoInfoCard(isPressedSeeMore: $isPressedSeeMore, ecoInfo: ecoInfo)
          }
        }
      }.navigationTitle("Últimas noticias")
    }.onAppear {
      Task {
        await ecoInfoViewModel.fetchAllEcoInfo()
      }
    }
  }
}

struct EcoInfoCard: View {
  @Binding var isPressedSeeMore: [Int: Bool]
  let ecoInfo: EcoInfo
  var body: some View {
    ZStack {
      VStack {
        AsyncImage(url: URL(string: ecoInfo.coverImage ?? "")) { image in
          image
            .resizable()
            .scaledToFill()
            .frame(maxWidth: .infinity, maxHeight: 250)
            .roundedCorner(10, corners: [.topLeft, .topRight])
        } placeholder: {
          ProgressView().frame(width: 150, height: 250)
        }
        HStack {
          VStack(alignment: .leading) {
            let ecoInfoText = String(ecoInfo.description ?? "")
              .replacingOccurrences(of: "\n", with: " ")
              Text("\(ecoInfoText) ")
                .font(.system(size: 12)).foregroundColor(Color("BlackCustom"))
                .multilineTextAlignment(.leading)
              Text("Ver más...")
                .font(.system(size: 12))
                .foregroundColor(Color("BlueCustom"))
                .onTapGesture {
                if let url = URL(string: ecoInfo.postLink) {
                  UIApplication.shared.open(url)
                }
              }.frame(maxWidth: .infinity, alignment: .trailing)
          }.padding()
        }
      }
    }.frame(maxWidth: 344)
      .overlay(RoundedRectangle(cornerRadius: 10)
        .stroke(.black, lineWidth: 0.1))
  }
}
