//
//  CompanyFilesView.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 26/09/23.
//

import SwiftUI

struct CompanyFilesView: View {
    var body: some View {
        VStack{
            VStack(alignment: .leading, spacing: 10){
                Text("Subir Documentos")
                    .bold()
                    .padding(.horizontal, 30)
                    .font(.system(size: 32))
                    .padding(.bottom, 22)
                Text("Para poder validar  tu empresa, te pedimos puedas compartir con nosotros los siguientes documentos")
                    .padding(.horizontal, 30)
            }
            VStack(){
                
            }
        }
    }
}

struct CompanyFilesView_Previews: PreviewProvider {
    static var previews: some View {
        CompanyFilesView()
    }
}
