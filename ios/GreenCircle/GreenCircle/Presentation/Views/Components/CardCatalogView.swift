//
//  CardCatalogView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 10/10/23.
//

import SwiftUI

struct CardCatalogView: View {
  @StateObject var viewModel: CompanyViewModel
  @StateObject var favouriteViewModel: FavouriteViewModel
  @State var emptyHeartFill: Bool = false
  @State private var showAlert = false
  @State private var messageAlert = ""
  @State private var deleteOperation = false
  @Environment(\.colorScheme) var colorScheme
    
  var goReviews: () -> Void
  var goOpinions: () -> Void
  var goScrollRating: () -> Void
  
  var companyId: UUID
  var companyName: String
  var city: String
  var state: String
  
  init(companyId: UUID,
       companyName: String,
       city: String,
       state: String,
       goReviews: @escaping () -> Void,
       goOpinions: @escaping () -> Void,
       goScrollRating: @escaping () -> Void) {
    
    _viewModel = StateObject(wrappedValue: CompanyViewModel())
    _favouriteViewModel = StateObject(wrappedValue: FavouriteViewModel())
    self.companyId = companyId
    self.companyName = companyName
    self.city = city
    self.state = state
    self.goReviews = goReviews
    self.goOpinions = goOpinions
    self.goScrollRating = goScrollRating
  }
  
  var body: some View {
    NavigationLink(destination: ContactCompanyView(idCompany: companyId, favouriteViewModel: favouriteViewModel, emptyHeartFill: $emptyHeartFill, goReviews: goReviews, goOpinions: goOpinions, goScrollRating: goScrollRating)){
      ZStack {
        RoundedRectangle(cornerRadius: 10, style:.continuous)
          .fill(colorScheme == .dark ? Color.black : Color.white)
          .frame(maxWidth: .infinity, maxHeight: .infinity)
          .shadow(color: colorScheme == .dark ? Color.white : Color.black, radius: 1)
        
        HStack {
          VStack (alignment: .leading) {
            if let imageURL = URL(string: viewModel.contentCompany.files?.first?.fileUrl ?? "") {
              AsyncImage(url: imageURL) { phase in
                switch phase {
                case .empty:
                  LoadingScreenView().frame(width: 100, height: 100)
                case .success(let image):
                  image
                    .resizable()
                    .scaledToFit()
                    .cornerRadius(10, corners: [.bottomLeft, .bottomRight, .topLeft, .topRight])
                    .frame(width: 100, height: 100)
                case .failure:
                  LoadingScreenView().frame(width: 100, height: 100)
                default:
                  fatalError()
                }
              }
            } else {
              LoadingScreenView().frame(width: 100, height: 100)
            }
          }
          Spacer()
          VStack(alignment: .leading, spacing: 7) {
            HStack(alignment: .top) {
              Text(companyName)
                .font(.system(size: 17))
                .lineLimit(2)
                .foregroundColor(Color("MainText"))
                .fontWeight(.bold)
            }
            HStack {
              Image(systemName: "location.fill")
                .foregroundColor(Color("Primary"))
              Text("\(city), \(state)")
                .font(.system(size: 13))
                .lineSpacing(2)
            }.foregroundColor(Color("MainText"))
              .padding(.bottom, 3)
            
            HStack {
              if Int(viewModel.contentCompany.score!) > 0 {
                ForEach(0..<5, id: \.self) { index in
                  Image(systemName: index < Int(viewModel.contentCompany.score!) ? "star.fill" : "star")
                }.foregroundColor(Color("Secondary"))
                Text("\(Int(viewModel.contentCompany.score!))")
              } else {
                Text("No hay rating").foregroundColor(Color("Secondary"))
              }
            }.font(.system(size: 13))
          }
          .frame(maxWidth: 180, maxHeight: 120)
          .multilineTextAlignment(.leading)
          Spacer()
          VStack {
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
                .foregroundColor(Color("Primary"))
                .font(.system(size: 24))
                .padding(.top, 20)
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
                },
                             secondaryButton: .cancel())
              }
            }
            Spacer()
          }.frame(maxWidth: 15)
        }
        .frame(maxWidth: 345, maxHeight: 140)
      }
    }.onAppear {
      
      Task {
        
        await viewModel.fetchCompanyById(idCompany: companyId)
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
  CardCatalogView(
    companyId: UUID(uuidString: ("08b49208-7b8e-42b9-8164-c0688676609e"))!,
    companyName: "ENERGIA PUEBLO SOLAR S.A. DE C.V.",
    city: "Hermosillo",
    state: "Sonora",
    goReviews: {},
    goOpinions: {},
    goScrollRating: {})
}
