//
//  AppTutorial.swift
//  GreenCircle
//
//  Created by Dan FuPo on 01/10/23.
//

import SwiftUI

struct AppTutorial_16: View {
  
  private let tutoImgs = ["EcoInfo",
                          "Catalogo",
                          "Filtros",
                          "DetalleProveedor",
                          "MiPerfil",
                          "EditarPerfil"]
  
  private let textImgs = ["Eco Info", "Catálogo de proveedores", "Filtros del catálogo", "Detalle del proveedor", "Mi perfil", "Editar mi perfil"]
  
  var goMainMenu: () -> Void
  
  var body: some View {
    NavigationView {
      
      VStack(alignment: .leading) {
        Text("¿Cómo uso la App?").font(.title).bold().padding([.leading, .top])
        ScrollView(.horizontal) {
          LazyHStack(spacing: 0) {
            ForEach(tutoImgs.indices, id: \.self) { index in
              let tutorial = tutoImgs[index]
              let text = textImgs[index]
              VStack {
                Text(text).font(.headline).foregroundColor(Color("Secondary"))
                Image(tutorial)
                  .resizable()
                  .scaledToFit()
                  .frame(maxHeight: .infinity)
                  .clipShape(RoundedRectangle(cornerRadius: 25.0))
                  .padding(.horizontal, 20)
              }
            }
          }
        }
        
        HStack {
          
          Spacer()
          
          Button("Salir", action: goMainMenu)
            .foregroundColor(.white)
            .frame(width: 178, height: 40)
            .background(Color(red: 0.33, green: 0.49, blue: 0.55))
            .cornerRadius(9)
            .padding(.top)
            .padding(.bottom, 20)
          
          Spacer()
          
        } .navigationBarTitle("Tutoriales")
          .navigationBarTitleDisplayMode(.inline)
        
      }
    }
  }
}

#Preview {
  AppTutorial_16(goMainMenu: {})
}
