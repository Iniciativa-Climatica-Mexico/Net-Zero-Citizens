//
//  ContentViewModel.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import Foundation

class ContentViewModel: ObservableObject {
    @Published var cardsList = [ProveedorBase]()
    
    @MainActor
    func getCardsList() async {
        let proveedor = Proveedor(nombre: "Inicitativa Climatica", ubicacion:"Balcon Frances 1212, Blvd. Bernardo Quintana" , calificacion:2.0, image:"null" )
        let proveedor2 = Proveedor(nombre: "Celdas White", ubicacion: "308 Negra Arroyo Lane, ABQ", calificacion:2.0, image:"null" )
        let proveedor3 = Proveedor(nombre: "Quinta Santiago", ubicacion: "Andres Balvanera 4, Centro", calificacion:2.0, image:"null" )
        
        let proveedorBase = ProveedorBase(id: 1, proveedor: proveedor)
        let proveedorBase2 = ProveedorBase(id: 2, proveedor: proveedor2)
        let proveedorBase3 = ProveedorBase(id: 3, proveedor: proveedor3)
        
        
        cardsList  = [proveedorBase,proveedorBase2,proveedorBase3,proveedorBase,proveedorBase2]
    
    }
}

