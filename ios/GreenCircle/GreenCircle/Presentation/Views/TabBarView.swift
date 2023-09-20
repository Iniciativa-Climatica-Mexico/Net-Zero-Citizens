//
//  TabBarView.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 13/09/23.
//

import SwiftUI

struct TabBarView: View {
    var body: some View {
        TabView {
            EcoInfoView()
                .tabItem {
                    Image(systemName: "leaf.fill")
                    Text("Eco-Info")
                }

            CatalogView()
                .tabItem {
                    Image(systemName: "book.fill")
                    Text("Catálogo")
                }

            MapView()
                .tabItem {
                    Image(systemName: "map.fill")
                    Text("Mapa")
                }

            ProfileView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Perfil")
                }
        }
    }
}

