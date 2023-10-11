//
//  ProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//
import SwiftUI

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
                        leftDestination: {},
                        rightDestination: {}
                    )
                    .frame(height: 10)
                    .offset(y: -60)
                    .navigationBarBackButtonHidden(true)
                    Spacer() // Esto empuja el TitleBarView hacia arriba
                }

                VStack {
                    //Imagen provisional
                    Image("Sun")
                        .resizable() // Hacer que la imagen sea redimensionable
                        .frame(width: 100, height: 100)

                    HStack {
                        //Nombre del usuario
                        Text(modelUser.contentBaseUser?.firstName ?? "Cargando...")
                            .foregroundColor(Color.black)
                            .font(.system(size: 16))
                            .fontWeight(.semibold)
                            .padding(.top, 10)
                            .padding(.bottom, 2)
                        //Apellido del Usuario
                        Text(modelUser.contentBaseUser?.lastName ?? "Cargando...")
                            .foregroundColor(Color.black)
                            .font(.system(size: 16))
                            .fontWeight(.semibold)
                            .padding(.top, 10)
                            .padding(.bottom, 2)
                    }

                    NavigationLink("Cerrar Sesión", destination: Example2View())
                        .foregroundColor(TitleBarColor.TitleBarColor)
                        .font(.system(size: 13))
                        .fontWeight(.bold)
                        .padding(.top, 4)

                    HStack {
                        Button(action: {
                            myFavourites.toggle()
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

                        NavigationLink(destination: EditProfileView(modelUser: modelUser, goLogin: goLogin)) {
                            Text("Editar perfil")
                                .foregroundColor(.white)
                                .padding(.vertical, 12)
                                .padding(.horizontal)
                                .frame(maxWidth: .infinity)
                                .background(TitleBarColor.TitleBarColor)
                                .cornerRadius(8)
                        }
                        .padding(.leading, 10)
                    }
                    .padding(.horizontal, 40)
                    .padding(.top, 24)

                    Spacer()

                    Text(myFavourites ? "Mis Favoritos(" + "\(totalFavourites))" : "Mis Reseñas")
                        .font(.system(size: 20))
                        .fontWeight(.bold)
                        .padding(EdgeInsets(top: 32, leading: 15, bottom: 0, trailing: 0))
                        .padding(.leading)
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity, alignment: .leading)

                    ScrollView {
                        if myFavourites {
                            if totalFavourites > 0 {
                                LazyVStack(spacing: 8) {
                                    ForEach(Array(0..<favourites.listFavourites.rows.count), id: \.self) { index in
                                        let favourite = favourites.listFavourites.rows[index]
                                        FavouriteCardView(idCompany: favourite.companyId)
                                    }
                                }
                                .padding(10)
                            } else {
                                Text("No has agregado proveedores como favoritos")
                                    .foregroundColor(Color("MainText"))
                                    .font(.system(size: 18))
                            }
                        } else {
                            // TODO: reviews of user
                        }
                    }
                    .onAppear {
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
        .onAppear(perform: loadProfileData)
    }

    private func loadProfileData() {
        Task {
            await modelUser.getAllUserData()
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView(modelUser: UserViewModel(), goLogin: {})
    }
}

  

