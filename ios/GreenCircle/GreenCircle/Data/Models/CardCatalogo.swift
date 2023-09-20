//
//  CardCatalogo.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import Foundation


struct Catalogo: Codable{
    var count: Int
    var results: [Proveedor]
}

struct Proveedor: Codable {
    let nombre: String
    let ubicacion: String
    let calificacion: Double
    let image: String
    
}

struct ProveedorBase: Identifiable{
    var id : Int
    var proveedor : Proveedor
}
