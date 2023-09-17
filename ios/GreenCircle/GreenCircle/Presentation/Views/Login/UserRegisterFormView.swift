//
//  UserRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import SwiftUI

let genders = ["Masculino", "Femenino", "Otro"]
let states = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Ciudad de México (CDMX)",
  "Estado de México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas"
]

struct UserRegisterFormView: View {

  
  @State var phone = ""
  @State var age = ""
  @State var state = ""
  @State var gender = ""
  @State var privacy = false
  
  var body: some View {
    VStack {
      UserRegisterHeaderView()
      Spacer()
      VStack(alignment: .leading, spacing: 10) {
        Text("Completa tu registro por favor")
          .font(.system(size: 24))
        InputFormView(bindingValue: $phone,
                      label: "Teléfono",
                      prompt: "123-456-7890")
        .keyboardType(.phonePad)
        InputFormView(bindingValue: $age,
                      label: "Edad",
                      prompt: "Ingresa tu edad...")
        .keyboardType(.numberPad)
        PickerFormView(selectedOption: $state,
                       label: "Estado",
                       options: states)
        PickerFormView(selectedOption: $gender,
                       label: "Género",
                       options: genders)
        HStack {
          HStack {
            Text("Acepto las")
            LinkButton("políticas de privacidad", buttonColor: .blue){}
          }.frame(width: 270)

          Toggle("", isOn: $privacy)
        }
      }.padding(.horizontal)
      Spacer()
      MainButton("Continuar", action: {})
      Spacer()
      
    }
    .foregroundColor(Color("MainText"))
  }
}

struct UserRegisterFormView_Previews: PreviewProvider {
  static var previews: some View {
    UserRegisterFormView()
  }
}

struct UserRegisterHeaderView: View {
  var mail = "ricardo@email.com"
  
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(.green)
      Text("Bienvenido, Ricardo Fernández")
        .font(.system(size: 40, weight: .bold))
      VStack(alignment: .leading) {
        Text("Te registraste con el correo")
        Text(mail).bold()
      }
      .foregroundColor(Color("SecondaryText"))
      .font(.system(size: 20))
    }
    .padding(.horizontal)
    .frame(maxWidth: .infinity,
           alignment: .leading)
  }
}

struct InputFormView: View {
  var bindingValue: Binding<String>
  var label: String
  var prompt: String
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(label)
        .foregroundColor(Color("SecondaryText"))
      TextField(prompt, text: bindingValue)
        .padding(10)
        .overlay {
          RoundedRectangle(cornerRadius: 10)
            .stroke(.gray, lineWidth: 1)
        }
      
    }.font(.system(size: 20, weight: .medium))
  }
  
}

struct PickerFormView: View {
  @Binding var selectedOption: String
  var label: String
  var options: [String]
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(label)
        .foregroundColor(Color("SecondaryText"))
      HStack {
        Menu {
          Picker(selection: $selectedOption) {
            ForEach(options, id: \.self) { option in
              Text(option).tag(option)
            }
          } label: {}
        } label: {
          if selectedOption.isEmpty {
            Text("Selecciona una opción...")
              .opacity(0.3)
          } else {
            Text(selectedOption)
          }
          Spacer()
          Image(systemName: "chevron.down")
        }
        .padding(10)
        Spacer()
      }.overlay {
        RoundedRectangle(cornerRadius: 10)
          .stroke(.gray, lineWidth: 1)
      }
    }
    .font(.system(size: 20, weight: .medium))
  }
}
