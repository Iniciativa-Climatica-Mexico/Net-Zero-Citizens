//
//  CompanyRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI

struct CompanyRegisterFormView: View {
  @State var companyName: String = ""
  @State var companyDesc: String = ""
  
  var body: some View {
    ScrollView{
      VStack {
        RegisterHeaderView(mail: "", name: "")
        Spacer()
        VStack(alignment: .leading, spacing: 10) {
          VStack(alignment: .leading, spacing: 20) {
            Text("Registra los datos de tu empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue: $companyName,
                          label: "Nombre de la empresa",
                          prompt: "Ingresa el nombre...")
            VStack(alignment: .leading) {
              Text("Descripción")
                .foregroundColor(Color("SecondaryText"))
              TextField("Ingresa tu descripción",
                        text: $companyDesc,
                        axis: .vertical)
                .lineLimit(5, reservesSpace: true)
                .padding(10)
                .overlay {
                  RoundedRectangle(cornerRadius: 10)
                    .stroke(.gray, lineWidth: 1)
                }
              
            }.font(.system(size: 20, weight: .medium))
          }
          VStack(alignment: .leading, spacing: 20) {
            Text("Datos de contacto")
              .font(.system(size: 24))
            InputFormView(bindingValue: $companyName,
                          label: "Email de contacto*",
                          prompt: "empresa@ejemplo.com")
            .keyboardType(.emailAddress)
            InputFormView(bindingValue: $companyName,
                          label: "Teléfono de contacto*",
                          prompt: "123-123-1234")
            .keyboardType(.phonePad)
            InputFormView(bindingValue: $companyName,
                          label: "Sitio Web",
                          prompt: "empresa.com.mx")
            .keyboardType(.URL)
            
          }
          VStack(alignment: .leading, spacing: 20) {
            Text("Dirección de la empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue: $companyName,
                          label: "Calle*",
                          prompt: "Calle Asombrosa")
            InputFormView(bindingValue: $companyName,
                          label: "Número*",
                          prompt: "111")
            .keyboardType(.numberPad)
            InputFormView(bindingValue: $companyName,
                          label: "Ciudad*",
                          prompt: "Ciudad Gótica")
            PickerFormView(selectedOption: $companyDesc, label: "Estado", options: ["Estado"])
            InputFormView(bindingValue: $companyName,
                          label: "Código postal*",
                          prompt: "12345")
            .keyboardType(.numberPad)
            
          }
        }.padding(.horizontal)
      }
    }.foregroundColor(Color("MainText"))
  }
}

struct CompanyRegisterFormView_Previews: PreviewProvider {
  static var previews: some View {
    CompanyRegisterFormView()
  }
}
