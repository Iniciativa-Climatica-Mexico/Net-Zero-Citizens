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
        .applyNavBarTheme()
        .tabItem {
          Image(systemName: "leaf.fill")
          Text("Eco-Info")
        }
      
      ContactCompanyView()
        .tabItem {
          Image(systemName: "book.fill")
          Text("Catálogo")
        }
      
      EmptyView()
        .tabItem {
          Image(systemName: "map.fill")
          Text("Mapa")
        }
      
      EmptyView()
        .tabItem {
          Image(systemName: "person.fill")
          Text("Perfil")
        }
    }
    .accentColor(Color("GreenCustom"))
  }
}
