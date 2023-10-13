//
//  Components.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//  Modified by Daniel Gutiérrez Gómez on 25/09/23

import SwiftUI

struct HeaderView: View {
  var title: String
  var subTitle: String = ""
  
  var body: some View {
    VStack(alignment: .leading) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(.green)
      Text(title)
        .font(.system(size: 40, weight: .bold))
        .padding(.vertical)
      Text(subTitle)
        .font(.system(size: 20))
      Spacer()
    }
    .padding(.horizontal)
    .frame(maxWidth: .infinity,
           maxHeight: 250,
           alignment: .leading)
  }
}

struct BackgroundView: View {
  var body: some View {
    Rectangle()
      .fill(.gray)
      .opacity(0.1)
      .cornerRadius(40, corners: [.topLeft, .topRight])
      .edgesIgnoringSafeArea(.bottom)
      .padding(.top, 290)
  }
}

struct RegisterHeaderView: View {
  var mail: String
  var name: String
  
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(.green)
      Text("Bienvenido, \(name)")
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

struct SecureInputFormView: View {
  var bindingValue: Binding<String>
  var label: String
  var prompt: String
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(label)
        .foregroundColor(Color("SecondaryText"))
      SecureField(prompt, text: bindingValue)
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

struct PickerFormView2: View {
  @Binding var selectedOption: String
  var label: String
  var options: [String]
  
  var body: some View {
    VStack(alignment: .leading) {
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
        RoundedRectangle(cornerRadius: 4)
          .stroke(Color("GrayColor"), lineWidth: 0.5)
          .frame(height: 34)
      }
    }
    .font(.system(size: 13))
  }
}

struct CompanyRegisterHeaderView: View {
  
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(Color("Secondary"))
      Text("Servicios que ofreces")
        .font(.system(size: 40, weight: .bold))
        .frame(maxWidth: 230)
        .foregroundColor(Color("MainText")).bold()
        .padding(.top, 10)
      VStack(alignment: .leading) {
        Text("Por favor selecciona los productos correspondientes a los servicios que ofrece tu empresa")
          .multilineTextAlignment(.leading)
          .padding(.leading, 8)
          .lineSpacing(4)
      }
      .foregroundColor(Color("MainText"))
      .font(.system(size: 14))
    }
    .padding(.horizontal)
    .frame(maxWidth: .infinity,
           alignment: .leading)
  }
}

struct ButtonDividerView: View {
  var text: String
  var body: some View {
    ZStack {
      Divider()
      Rectangle()
        .foregroundColor(.white)
        .frame(width: 150)
      Text(text)
        .foregroundColor(Color("MainText"))
    }
  }
}
