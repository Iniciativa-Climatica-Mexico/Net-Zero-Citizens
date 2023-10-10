//
//  ProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//

import SwiftUI

class ImageLoader: ObservableObject {
    @Published var uiImage: UIImage?

    func load(url: URL) {
        URLSession.shared.dataTask(with: url) { data, _, error in
            guard let data = data, error == nil else {
                return
            }

            DispatchQueue.main.async {
                self.uiImage = UIImage(data: data)
            }
        }.resume()
    }
}

struct AsyncImage: View {
    @ObservedObject private var loader: ImageLoader
    private let placeholder: Image

    init(url: URL, placeholder: Image = Image("Sun")) {
        self.loader = ImageLoader()
        self.placeholder = placeholder
        self.loader.load(url: url)
    }

    var body: some View {
        if let uiImage = loader.uiImage {
            Image(uiImage: uiImage)
        } else {
            placeholder
        }
    }
}

@ViewBuilder
private func userProfileImage() -> some View {
    @ObservedObject var imageModel = UserImageViewModel()
    if let imageURL = URL(string: imageModel.profilePictureURL ?? "") {
        AsyncImage(url: imageURL)
            .frame(width: 100, height: 100)
    } else {
        Image("Sun")
            .resizable()
            .frame(width: 100, height: 100)
    }
}


struct ProfileView: View {
  
  @ObservedObject var modelUser = UserViewModel()
  @StateObject var favourites = FavouriteViewModel()
  @State var myFavourites: Bool = false
  @State var totalFavourites: Int = 0
  @State private var showAlertFavourites = false
  
  var goLogin: () -> Void

  var body: some View {
    NavigationView {
      ZStack {
        // Title Bar
        VStack {
          
          TitleBarView(
            title: "Mi Perfil",
            leftIcon: nil,
            rightIcon: nil,
            leftDestination: {  },
            rightDestination: { }
          )
          .frame(height: 10)
          .offset(y: -60)
          .navigationBarBackButtonHidden(true)
          Spacer() // Esto empuja el TitleBarView hacia arriba
        }
        //----------------------Perfil-------------------------------
        VStack {
          
          //Imagen provicional
            userProfileImage()
          
          HStack {
            //Nombre del usuario
            Text(modelUser.contentUser.first_name)
              .foregroundColor(Color.black)
              .font(.system(size: 16))
              .fontWeight(.semibold)
              .padding(.top, 10)
              .padding(.bottom, 2)
            //Apellido del Usuario
            Text(modelUser.contentUser.last_name)
              .foregroundColor(Color.black)
              .font(.system(size: 16))
              .fontWeight(.semibold)
              .padding(.top, 10)
              .padding(.bottom, 2)
          }
          
          //Bot{on cerrar sesión con navegaci{on provicional
          NavigationLink("Cerrar Sesión", destination: Example2View())
            .foregroundColor(TitleBarColor.TitleBarColor)
            .font(.system(size: 13))
            .fontWeight(.bold)
            .padding(.top, 4)
          
          //----------------------Botones------------------------------
          HStack {
            Button(action: {
              // Implementación futura
              myFavourites = myFavourites ? false : true
            }) {
              Text(myFavourites ? "Mis Reseñas" : "Mis favoritos")
                .foregroundColor(.white)
                .padding(.vertical, 12)
                .padding(.horizontal)
                .frame(maxWidth: .infinity)
                .background(TitleBarColor.TitleBarColor)
                .cornerRadius(8)
            }
            .padding(.trailing, 10)
            
            NavigationLink(destination: EditProfileView(modelUser: UserViewModel(), goLogin: goLogin)) {
              Text("Editar perfil")
                .foregroundColor(.white)
                .padding(.vertical, 12)
                .padding(.horizontal)
                .frame(maxWidth: .infinity)
                .background(TitleBarColor.TitleBarColor)
                .cornerRadius(8)
            }.padding(.leading,10) // Añade padding para crear espacio entre los botones
            
            
          }
          .padding(.horizontal, 40) // Añade padding horizontal para que los botones no lleguen hasta el borde de la vista
          .padding(.top, 24) // Reduciendo el padding top para acercar los botones
          
          Spacer()
          
          //--------------------Sección de Reseñas-----------------------------------------
          Text(myFavourites ? "Mis Favoritos(" + "\(totalFavourites))" : "Mis Reseñas")
            .font(.system(size: 20))
            .fontWeight(.bold)
            .padding(EdgeInsets(top: 32, leading: 15, bottom: 0, trailing: 0))
            .padding(.leading)
            .foregroundColor(.black)
            .frame(maxWidth: .infinity, alignment: .leading)
          ScrollView {
            //Aquí irán las tarjetas de reseñas
            if myFavourites {
              if totalFavourites > 0 {
                LazyVStack(spacing: 8) {
                  ForEach(Array(0..<favourites.listFavourites.rows.count), id: \.self) { index in
                    let favourite = favourites.listFavourites.rows[index]
                    FavouriteCardView(idCompany: favourite.companyId)
                  }
                }.padding(10)
              } else {
                Text("No has agregado proveedores como favoritos")
                  .foregroundColor(Color("MainText"))
                    .font(.system(size: 18))
              }
              
            } else {
              /// TODO reviews of user
            }
          }.onAppear {
            Task {
              try await favourites.getAllFavouritesByUser()
              totalFavourites = favourites.listFavourites.rows.count
              if totalFavourites == 0 {
                showAlertFavourites = true
              }
            }
          }
        }
        .padding(.top, 70)
      }
    }
  }
  
  struct ProfileView_Previews: PreviewProvider {

    static var previews: some View {

      ProfileView(modelUser: UserViewModel(), goLogin: {})

    }
  }
  
}
