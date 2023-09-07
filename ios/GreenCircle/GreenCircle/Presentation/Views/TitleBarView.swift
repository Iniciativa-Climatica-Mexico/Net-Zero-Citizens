//
//  TitleBarView.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 06/09/23.
//

import SwiftUI

// Definición de colores para Title Bar
struct TitleBarColor {
    static let TitleBarColor = Color("TitleBarColor")
}

// Vista genérica para la Title Bar
struct TitleBarView<LeftDestination: View, RightDestination: View>: View {
    
    // Propiedades
    let title: String
    let leftIcon: String?
    let rightIcon: String?
    let leftDestination: LeftDestination
    let rightDestination: RightDestination
    
    // Inicializador con parámetros opcionales para los iconos y destinos
    init(
        title: String,
        leftIcon: String? = nil,
        rightIcon: String? = nil,
        @ViewBuilder leftDestination: () -> LeftDestination,
        @ViewBuilder rightDestination: () -> RightDestination
    ) {
        self.title = title
        self.leftIcon = leftIcon
        self.rightIcon = rightIcon
        self.leftDestination = leftDestination()
        self.rightDestination = rightDestination()
    }
    
    // Cuerpo de la vista
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Fondo de la Title Bar
                Rectangle()
                    .foregroundColor(TitleBarColor.TitleBarColor)
                    .frame(height: 100)
                    .edgesIgnoringSafeArea(.all)

                // Título
                Text(title)
                    .foregroundColor(Color.white)
                    .font(.system(size: 17))
                    .bold()
                    .padding(.top, 50)
                
                // Contenido de la Title Bar
                HStack {
                    // Icono izquierdo y navegación
                    if let leftIcon = leftIcon {
                        NavigationLink(destination: leftDestination) {
                            Image(systemName: leftIcon)
                                .foregroundColor(Color.white)
                        }
                    }
                    
                    Spacer()
                    
                    // Icono derecho y navegación
                    if let rightIcon = rightIcon {
                        NavigationLink(destination: rightDestination) {
                            Image(systemName: rightIcon)
                                .foregroundColor(Color.white)
                        }
                    }
                }
                .padding(.top, geometry.safeAreaInsets.top + 50)
                .padding([.leading, .trailing], 20)
            }
            .frame(width: geometry.size.width, height: 100 + geometry.safeAreaInsets.top)
        }
    }



}

// Vista previa para Title Bar
struct TitleBarView_Previews: PreviewProvider {
    static var previews: some View {
        TitleBarView(
            title: "Mi perfil",
            leftIcon: "chevron.left",
            rightIcon: "chevron.right",
            leftDestination: { Text("Izquierda") },
            rightDestination: { Text("Derecha") }
        )
        .offset(y: -60)
    }
}
