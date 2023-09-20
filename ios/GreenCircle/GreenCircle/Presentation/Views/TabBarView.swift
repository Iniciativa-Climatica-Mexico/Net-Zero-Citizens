//
//  TabBarView.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 19/09/23.
//  Created by Diego Vega Camacho on 13/09/23.
//

import SwiftUI


struct TabBarView: View {
    var body: some View {
        TabView {
//            ProfileView(modelUser: UserViewModel())
//                .tabItem {
//                    Image(systemName: "leaf.fill")
//                    Text("Eco-Info")
//                }
//
//            ProfileView(modelUser: UserViewModel())
//                .tabItem {
//                    Image(systemName: "book.fill")
//                    Text("Catálogo")
//                }
//
//            ProfileView(modelUser: UserViewModel())
//                .tabItem {
//                    Image(systemName: "map.fill")
//                    Text("Mapa")
//                }

            ProfileView(modelUser: UserViewModel())
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Perfil")
                }
        }
    }
}

struct TabBarView_Previews: PreviewProvider {
    static var previews: some View {
        TabBarView()
    }
}
