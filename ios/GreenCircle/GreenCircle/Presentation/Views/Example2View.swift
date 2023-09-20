//
//  Example2View.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 06/09/23.
//

import SwiftUI

struct Example2View: View {
    var body: some View {
        VStack {
            TitleBarView(title: "Example 2",
                         leftIcon: "chevron.left",
                         rightIcon: nil,
                         leftDestination: { Example2View() },
                         rightDestination: { })
                .navigationBarBackButtonHidden(true)
                .navigationBarBackButtonHidden(true)
                .offset(y: -60)   
            ScrollView {
                VStack {
                    Text("Provisional de cerrar sesión")
                }
            }
        }
    }
}

struct Example2View_Previews: PreviewProvider {
    static var previews: some View {
        Example2View()
    }
}
