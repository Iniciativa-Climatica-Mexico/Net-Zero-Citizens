//
//  TabBarView.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 13/09/23.
//

import SwiftUI

enum TabSelection {
    case ecoInfo
    case catalog
    case map
    case profile
}

struct TabBarView: View {
    @State private var selectedTab: TabSelection = .ecoInfo
    @StateObject var vm = SurveyViewModel()
    
    var goSurvey: () -> Void
    var goLogin: () -> Void

    var body: some View {
        TabView(selection: $selectedTab) {
            EcoInfoView()
                .applyNavBarTheme()
                .tabItem {
                    Image(systemName: "leaf.fill")
                    Text("Eco-Info")
                }
                .tag(TabSelection.ecoInfo)

            CatalogView()
                .applyNavBarTheme()
                .tabItem {
                    Image(systemName: "book.fill")
                    Text("Catálogo")
                }
                .tag(TabSelection.catalog)

            CoordinatesView()
                .tabItem {
                    Image(systemName: "map.fill")
                    Text("Mapa")
                }
                .tag(TabSelection.map)

            ProfileView(modelUser: UserViewModel(), goLogin: goLogin)
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Perfil")
                }
                .tag(TabSelection.profile)
        }
        .onAppear {
            Task {
                if await vm.getPendingSurvey() {
                    goSurvey()
                }
            }
        }
        .accentColor(Color("GreenCustom"))
    }
}
