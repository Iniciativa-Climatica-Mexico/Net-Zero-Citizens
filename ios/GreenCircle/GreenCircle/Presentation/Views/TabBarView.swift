//
//  TabBarView.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 13/09/23.
//

import SwiftUI

struct TabBarView: View {
  @State private var dispScrollView = false

  var body: some View {
    TabView (selection: $dispScrollView) {
      EcoInfoView()
        .applyNavBarTheme()
        .tabItem {
          Image(systemName: "leaf.fill")
          Text("Eco-Info")
        }
        .tag(false)
      
      CatalogView()
        .applyNavBarTheme()
        .tabItem {
          Image(systemName: "book.fill")
          Text("Catálogo")
        }
        .tag(true)
      
      EmptyView()
        .tabItem {
          Image(systemName: "map.fill")
          Text("Mapa")
        }
      
      ProfileView(modelUser: UserViewModel(), companyModel: CompanyViewModel()) // quitar company Model
        .tabItem {
          Image(systemName: "person.fill")
          Text("Perfil")
        }
    }
    .accentColor(Color("GreenCustom"))
  }
}
