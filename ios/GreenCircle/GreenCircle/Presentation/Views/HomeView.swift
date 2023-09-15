//
//  HomeView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import SwiftUI

struct HomeView: View {
    @State private var showSecondView = false

    var body: some View {
        NavigationView {
            VStack {
                Text("Página de inicio")
                    .font(.largeTitle)
                NavigationLink(
                    destination: SecondView(showSecondView: $showSecondView),
                    isActive: $showSecondView,
                    label: {
                        EmptyView()
                    }
                )
            }
            .navigationTitle("Inicio")
        }
    }
}


struct Previews_HomeView_Previews: PreviewProvider {
  static var previews: some View {
    HomeView()
  }
}
