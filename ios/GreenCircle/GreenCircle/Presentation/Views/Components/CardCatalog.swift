//
//  NewCardCatalog.swift
//  GreenCircle
//
//  Created by Dan FuPo on 12/10/23.
//

import SwiftUI

struct CardCatalog: View {
  @Environment(\.colorScheme) var colorScheme
  @StateObject var vm = CompanyViewModel()
  @StateObject var favouriteViewModel = FavouriteViewModel()
  @State var emptyHeartFill: Bool = false
  @State private var showAlert = false
  @State private var messageAlert = ""
  @State private var deleteOperation = false
  
  var companyId: UUID
  var companyName: String
  var city: String
  var state: String
  
  var body: some View {
    NavigationLink(destination: ContactCompanyView(idCompany: companyId, favouriteViewModel: favouriteViewModel, emptyHeartFill: $emptyHeartFill))
    {
      ZStack {
        
        RoundedRectangle(cornerRadius: 20, style: .continuous)
          .fill(.white)
          .frame(maxWidth: .infinity, maxHeight: 250)
          .shadow(color: Color.black, radius: 1)
        
        HStack {
          
          if let imageURL = URL(string: vm.contentCompany.files?.first?.fileUrl ?? "") {
            AsyncImage(url: imageURL) { phase in
              switch phase {
                
              case .empty:
                LoadingScreenView()
                  .padding(.horizontal)
                
              case .success(let image):
                image
                  .resizable()
                  .scaledToFill()
                  .frame(width: 100, height: 100)
                  .cornerRadius(10, corners: [.bottomLeft, .bottomRight, .topLeft, .topRight])
                  .padding(.horizontal)
                
              case .failure:
                Text("Failed to load Image!!")
                
              @unknown default:
                fatalError()
              }
            }
          
          } else {
            
            LoadingScreenView().frame(width: 100, height: 100)
              .padding(.horizontal)
            
          }
          
          VStack(alignment: .leading, spacing: 2) {
            
            Text(companyName)
              .font(.system(size: 17))
              .fontWeight(.bold)
              .lineLimit(2)
              .multilineTextAlignment(.leading)

            
            HStack {
              Image(systemName: "location.fill")
                .foregroundColor(Color("BlueCustom"))
              Text("\(city), \(state)")
                .font(.system(size: 13))
                .lineSpacing(2)
            }
            .foregroundColor(Color("MainText"))
            .padding([.top,.bottom], 10)
            
            if let score = vm.contentCompany.score, score != 0 {
              HStack {
                StarRating(score)
                  .frame(width: 100)
              }
            } else {
              Text("No hay rating")
                .font(.system(size: 13))
                .foregroundColor(Color("GreenCustom"))
            }
          }
          
          Spacer()
          
          Button(action: {
            Task {
              if favouriteViewModel.existsFavourite(companyId: companyId) && emptyHeartFill {
                emptyHeartFill = true
                deleteOperation = true
                showAlert = true
                messageAlert = "¿Eliminar a: " + companyName + " de tus favoritos?"
              } else if !favouriteViewModel.existsFavourite(companyId: companyId) {
                showAlert = true
                await favouriteViewModel.postFavouriteById(companyId: companyId)
                if favouriteViewModel.contentFavourite.message ==
                    "Favourite created" {
                  messageAlert = "Se ha agregado a: " + companyName + " a tus favoritos!"
                  emptyHeartFill = true
                  deleteOperation = false
                }
              }
            }
          }, label: {
            Image(systemName: emptyHeartFill ? "heart.fill" : "heart")
              .foregroundColor(Color("BlueCustom"))
              .font(.system(size: 24))
              .padding(.bottom, 80)
          })
          .alert(isPresented: $showAlert) {
            if !deleteOperation {
              return Alert(title: Text("Éxito"), message: Text(messageAlert))
            }
            else {
              return Alert(title: Text("Confirmar borrar favoritos"), message: Text(messageAlert),
                           primaryButton: .destructive(Text("Borrar")) {
                Task {
                  emptyHeartFill = false
                  try await favouriteViewModel.deleteFavouriteById( companyId: companyId)
                }
              }, secondaryButton: .cancel())
            }
          }
          .frame(maxWidth: 30)
        }
        .padding()
      }
    }.foregroundColor(.black)
    .onAppear {
      Task {
        await vm.fetchCompanyById(idCompany: companyId)
        if favouriteViewModel.existsFavourite(companyId: companyId) {
          emptyHeartFill = true
        } else {
          emptyHeartFill = false
        }
      }
    }
    .navigationTitle("Proveedores")
    .navigationBarTitleDisplayMode(.inline)
  }
}

#Preview {
  CardCatalog(companyId: UUID(uuidString: ("08b49208-7b8e-42b9-8164-c0688676609e"))!,
                 companyName: "ENERGIA PUEBLO SOLAR S.A. DE C.V.",
                 city: "Hermosillo",
                 state: "Sonora")
}
