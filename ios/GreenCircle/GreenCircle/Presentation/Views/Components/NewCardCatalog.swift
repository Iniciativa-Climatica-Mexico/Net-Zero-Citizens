//
//  NewCardCatalog.swift
//  GreenCircle
//
//  Created by Dan FuPo on 12/10/23.
//

import SwiftUI

struct NewCardCatalog: View {
  @Environment(\.colorScheme) var colorScheme
  @StateObject var vm: CompanyViewModel
  @StateObject var favouriteViewModel: FavouriteViewModel
  @State var emptyHeartFill: Bool = false
  @State private var showAlert = false
  @State private var messageAlert = ""
  @State private var deleteOperation = false
  
  var companyId: UUID
  var companyName: String
  var city: String
  var state: String
  
  init(companyId: UUID,
       companyName: String,
       city: String,
       state: String) {
    
    _vm = StateObject(wrappedValue: CompanyViewModel())
    _favouriteViewModel = StateObject(wrappedValue: FavouriteViewModel())
    self.companyId = companyId
    self.companyName = companyName
    self.city = city
    self.state = state
  }
  
  var body: some View {
    ZStack {
      RoundedRectangle(cornerRadius: 20, style: .continuous)
        .fill(.white)
        .frame(maxWidth: .infinity, maxHeight: 150)
        .shadow(color: Color.black, radius: 1)
      HStack {
        if let imageURL = URL(string: vm.contentCompany.files?.first?.fileUrl ?? "") {
          AsyncImage(url: imageURL) { phase in
            switch phase {
            case .empty:
              LoadingScreenView()
            case .success(let image):
              image
                .resizable()
                .scaledToFit()
                .cornerRadius(10, corners: [.bottomLeft, .bottomRight, .topLeft, .topRight])
                .frame(width: 100, height: 100)
            case .failure:
              Text("Failed to load Image!!")
            @unknown default:
              fatalError()
            }
          }
        } else {
          LoadingScreenView().frame(width: 100, height: 100)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          Text(companyName)
            .font(.system(size: 17))
            .fontWeight(.bold)
          HStack {
            Image(systemName: "location.fill")
              .foregroundColor(Color("BlueCustom"))
            Text("\(city), \(state)")
              .font(.system(size: 13))
              .lineSpacing(2)
          }
          .foregroundColor(Color("MainText"))
          .padding(.bottom, 3)
        }
      }
    }
  }
}

#Preview {
  NewCardCatalog(companyId: UUID(uuidString: ("08b49208-7b8e-42b9-8164-c0688676609e"))!,
                 companyName: "ENERGIA PUEBLO SOLAR S.A. DE C.V.",
                 city: "Hermosillo",
                 state: "Sonora")
}
