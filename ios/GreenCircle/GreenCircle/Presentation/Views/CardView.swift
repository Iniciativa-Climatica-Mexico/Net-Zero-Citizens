//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import SwiftUI

struct CardView: View {
    @StateObject var contentViewModel = ContentViewModel()
    var body: some View {
        NavigationView{
            List(contentViewModel.cardsList) { proveedorBase in
                ZStack{
                    RoundedRectangle(cornerRadius: 25, style: .continuous)
                        .fill(.white)
                        .shadow(color: .gray, radius: 2)
                    HStack{
                        Image(systemName: "square.fill")
                            .resizable()
                            .frame(width: 90, height: 90.0)
                            .foregroundColor(.gray)
                        
                        VStack {
                            
                            Text(proveedorBase.proveedor.nombre)
                                .font(.title)
                            
                                .fontWeight(.black)
                                .foregroundColor(.black)
                            
                            
                            
                            HStack{
                                Image(systemName: "location.fill")
                                    .foregroundColor(.green)
                                Text(proveedorBase.proveedor.ubicacion)
                                    .foregroundColor(.green)
                            }
                            
                            HStack{
                                
                                Image(systemName: "star.fill")
                                    .foregroundColor(.green)
                                Image(systemName: "star.fill")
                                    .foregroundColor(.green)
                                Image(systemName: "star")
                                    .foregroundColor(.green)
                                Image(systemName: "star")
                                    .foregroundColor(.green)
                                Image(systemName: "star")
                                    .foregroundColor(.green)
                                Text(String(proveedorBase.proveedor.calificacion))
                                    .foregroundColor(.green)
                            }
                            
                        }
                        
                        
                        .multilineTextAlignment(.center)
                   
                        Image(systemName: "heart")
                        
                            .foregroundColor(.gray)
                        
                    }
                    
                    
                    .frame(width: 380, height: 180)
                }
                .listRowSeparator(.hidden)
                .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
                .padding(.vertical, 5)
            }
            
            .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
            
            .listStyle(.plain)
            .navigationTitle("Proveedores")
            
            
        }
        
        .onAppear {
            Task {
                print ("esperando")
                await contentViewModel.getCardsList()
            }
        }
    }
}





struct CardView_Previews: PreviewProvider {
    static var previews: some View {
        CardView()
    }
}
