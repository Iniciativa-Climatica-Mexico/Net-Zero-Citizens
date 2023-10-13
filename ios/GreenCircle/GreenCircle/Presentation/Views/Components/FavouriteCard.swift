//
//  FavouriteCard.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 05/10/23.
//

import Foundation
import SwiftUI

struct FavouriteCardView: View {
  let idCompany: UUID
  @StateObject var companyViewModel: CompanyViewModel
  
  init(idCompany: UUID) {
    _companyViewModel = StateObject(wrappedValue: CompanyViewModel())
    self.idCompany = idCompany
  }
  
  var body: some View {
    ZStack {
      RoundedRectangle(cornerRadius: 10, style: .continuous)
        .fill(.white)
        .frame(width: 335, height: 150)
        .shadow(color: Color("Primary"), radius: 1)
    HStack {
      VStack(alignment: .leading) {
        HStack {
          Text(companyViewModel.contentCompany.name)
            .foregroundColor(Color("MainText"))
            .font(.system(size: 18))
            .bold()
            .lineLimit(1)
          Spacer()
          Image(systemName: "heart.fill").foregroundColor(Color("Primary"))
            .font(.system(size: 22))
        }.padding(EdgeInsets(top: 5, leading: 15, bottom: 0, trailing: 10))
        HStack {
          AsyncImage(url: URL(string: companyViewModel.contentCompany.files?.first?.fileUrl ?? "")) { phase in
            switch phase {
              case .empty:
                Image(systemName: "square.fill")
                  .resizable()
                  .frame(width: 100, height: 100)
                  .foregroundColor(.gray)
                  .opacity(0.3)
              case .success(let companyImage):
                companyImage
                  .resizable()
                  .scaledToFit()
                  .cornerRadius(10)
                  .frame(maxWidth: 100, maxHeight: 100)
              case .failure(_):
                Text("Error cargando imagen")
              @unknown default:
                EmptyView()
            }
          }
          Spacer()
          VStack(alignment: .center, spacing: 20) {
            HStack {
              Image(systemName: "location.fill")
              Text("\(companyViewModel.contentCompany.city), \(companyViewModel.contentCompany.state)")
            }.foregroundColor(Color("MainText"))
              .font(.system(size: 16))
            HStack {
              if Int(companyViewModel.contentCompany.score!) > 0 {
                ForEach(0..<5, id: \.self) { index in
                  Image(systemName: index < Int(companyViewModel.contentCompany.score!) ? "star.fill" : "star")
                }.foregroundColor(Color("Secondary"))
                Text("\(Int(companyViewModel.contentCompany.score!))")
              } else {
                Text("No hay rating").foregroundColor(Color("Secondary"))
              }
            }.font(.system(size: 14))
              .foregroundColor(Color("Secondary"))
          }
          .foregroundColor(Color("Secondary"))
          Spacer()
        }.frame(maxWidth: 320)
          .padding(EdgeInsets(top: 0, leading: 10, bottom: 5, trailing: 10))
      }
    }.frame(maxWidth: 320)
  }.onAppear {
      Task {
        await companyViewModel.fetchCompanyById(idCompany: idCompany)
      }
    }
  }
}
