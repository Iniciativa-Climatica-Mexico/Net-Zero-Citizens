//
//  Tutorial.swift
//  GreenCircle
//
//  Created by Dan FuPo on 06/10/23.
//

import SwiftUI

struct Tutorial: View {
  
  private let tutoImgs = ["EcoInfo",
                          "Catalogo",
                          "Filtros",
                          "DetalleProveedor",
                          "MiPerfil",
                          "EditarPerfil"]
  
  private let textImgs = ["Eco Info", "Catálogo de proveedores", "Filtros del catálogo", "Detalle del proveedor", "Mi perfil", "Editar mi perfil"]
  
  var body: some View {
    NavigationView {
      
      VStack(alignment: .leading) {
        Text("¿Cómo uso la App?").font(.title)
          .padding(.leading)
          .padding(.top, 30)
        ScrollView(.horizontal) {
          LazyHStack(spacing: 0) {
            ForEach(tutoImgs.indices, id: \.self) { index in
              let tutorial = tutoImgs[index]
              let text = textImgs[index]
              VStack {
                Text(text).font(.headline)
                Image(tutorial)
                  .resizable()
                  .scaledToFit()
                  .frame(height: 550)
                  .clipShape(RoundedRectangle(cornerRadius: /*@START_MENU_TOKEN@*/25.0/*@END_MENU_TOKEN@*/))
                  .padding(.horizontal, 20)
              }
            }
          } .padding(.bottom, 50)
        }
      }
    } .navigationBarTitle("Tutoriales")
      .navigationBarTitleDisplayMode(.inline)
  }
}

#Preview {
  Tutorial()
}
