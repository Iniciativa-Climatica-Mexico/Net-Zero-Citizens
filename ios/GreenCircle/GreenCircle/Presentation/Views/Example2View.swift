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
//            TitleBarView(title: "Example 2",
//                         leftIcon: nil,
//                         rightIcon: nil,
//                         leftDestination: { },
//                         rightDestination: { })
//                .offset(y: -140)
            ScrollView {
                VStack {
                    Text("Provisional de cerrar sesión")
                        .padding(.top, 250)
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
