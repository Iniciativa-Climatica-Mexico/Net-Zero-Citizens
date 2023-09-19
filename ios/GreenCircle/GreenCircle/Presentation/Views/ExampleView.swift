//
//  ExampleView.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 06/09/23.
//

import SwiftUI

struct ExampleView: View {
    var body: some View {
//        VStack {
//            // TitleBarView (No forma parte del ScrollView)
//            TitleBarView(
//                title: "Example",
//                leftIcon: "chevron.left",  // Nombre SF Symbol para ícono izquierdo
//                rightIcon: nil,            // Nombre SF Symbol para ícono derecho
//                leftDestination: { },  // View a la que se navegará con el ícono izquierdo
//                rightDestination: { }                 // View a la que se navegará con el ícono derecho
//            )
//            .frame(height: 80)  // Espacio entre el titel bar y el contenido
//            .navigationBarBackButtonHidden(true)  // Ocultar botón "back" predeterminado
//            .offset(y: -60)  // Ajustar TitleBar a la altura correcta
//            // ScrollView (Esta parte sí se desplaza)
//            ScrollView {
//                VStack {
//                    // Contenido desplazable
//                    ForEach(0..<50) { i in
//                        Text("Contenido \(i)")
//                    }.padding(.bottom, 8)
//                }
//            }
//        }
        
        TabView {
            ProfileView(modelUser: UserViewModel())
                .tabItem {
                    Image(systemName: "leaf.fill")
                    Text("Eco-Info")
                }

            ProfileView(modelUser: UserViewModel())
                .tabItem {
                    Image(systemName: "book.fill")
                    Text("Catálogo")
                }

            ProfileView(modelUser: UserViewModel())
                .tabItem {
                    Image(systemName: "map.fill")
                    Text("Mapa")
                }

            ProfileView(modelUser: UserViewModel())
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Perfil")
                }
        }
        
    }
}

struct ExampleView_Previews: PreviewProvider {
    static var previews: some View {
        ExampleView()
    }
}
