//
//  EditProfileView2.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 30/09/23.
//

import SwiftUI

///__----------------- TITLE BAR SECTION__

struct SectionTitleBar: View{
  var title: String
  var leftIcon: String?
  var rightIcon: String?
  var leftDestination: (() -> Void)?
  var rightDestination: (() -> Void)?

  var body: some View{
    VStack {
        TitleBarView(
          title: "Editar Datos",
          leftIcon: nil,//"chevron.left",
          rightIcon: nil,
          leftDestination: {  },
          rightDestination: { }
          )
          .frame(height: 10)
          .navigationBarBackButtonHidden(true)
          .offset(y: -60)
          Spacer() // Esto empuja el TitleBarView hacia arriba
        }
     }
}

///__----------------- PROFILE SECTION__
struct SectionProfile: View{
  @ObservedObject var modelUser = UserViewModel()
  var body: some View{
    VStack {
        Image("Sun")
            .resizable()
            .frame(width: 100, height: 100)
        HStack {
            Text(modelUser.contentUser.first_name)
                .foregroundColor(Color.black)
                .font(.system(size: 16))
                .fontWeight(.semibold)
                .padding(.top, 12)
                .padding(.bottom, 2)
            Text(modelUser.contentUser.last_name)
                .foregroundColor(Color.black)
                .font(.system(size: 16))
                .fontWeight(.semibold)
                .padding(.top, 12)
                .padding(.bottom, 2)
        }
        NavigationLink("Cerrar Sesión", destination: Example2View())
            .foregroundColor(TitleBarColor.TitleBarColor)
            .font(.system(size: 13))
            .fontWeight(.bold)
            .padding(.top, 8)
    }
  }
}
///__----------------- SECTION 1__
struct Section1: View{
  @ObservedObject var modelUser = UserViewModel()
  var body: some View{
    VStack(alignment: .leading) {
      
      //---Field Nombre----------------------------------------------------------
      Text("Nombre")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      TextField("Nombre", text: $modelUser.contentUser.first_name)
        .disableAutocorrection(true)
        .padding(.top, 3)
        .font(.system(size: 13))
        .textFieldStyle(RoundedBorderTextFieldStyle())
      
      //---Field Apellido----------------------------------------------------------
      Text("Primer Apellido")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      TextField("Primer Apellido", text: $modelUser.contentUser.last_name)
        .disableAutocorrection(true)
        .padding(.top, 3)
        .font(.system(size: 13))
        .textFieldStyle(RoundedBorderTextFieldStyle())
      
      Text("Email")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      TextField("Email", text: $modelUser.contentUser.email)
        .disabled(true)
        .padding(.top, 3)
        .font(.system(size: 13))
        .foregroundColor(.gray)
        .textFieldStyle(RoundedBorderTextFieldStyle())
      
    }
  }
}

///__----------------- SECTION 2__
struct Section2: View{
  @ObservedObject var modelUser = UserViewModel()
  var body: some View{
    HStack{
      //---Field Edad----------------------------------------------------------
      VStack(alignment: .leading) {
      Text("Edad")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      
      TextField("Edad", text: Binding(
        get: {
          String(modelUser.contentUser.age ?? 0)
        },
        set: {
          if let age = Int($0) {
            modelUser.contentUser.age = modelUser.contentUser.age
          } else {
            modelUser.contentUser.age = nil
          }
        }
      ))
    }
    .keyboardType(.numberPad)
    .padding(.top, 3)
    .font(.system(size: 13))
    .textFieldStyle(RoundedBorderTextFieldStyle())
    
    //----Picker Género----------------------------------------------------------
    VStack(alignment: .leading) {
      Text("Género")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      PickerFormView2(
          selectedOption: Binding<String>(
              get: { modelUser.contentUser.gender ?? "" },
              set: { newValue in
                  modelUser.contentUser.gender = newValue.isEmpty ? nil : newValue
              }
          ),
          label: modelUser.contentUser.gender ?? "Selecciona un género",
          options: GENDERS
      )
      .padding(.top, 5)
    }
  }
    }
  }

///__----------------- SECTION 3__
struct Section3: View {
  @ObservedObject var modelUser = UserViewModel()
  var body: some View{
    VStack(alignment: .leading) {
    //----Field Celular----------------------------------------------------------
    Text("Celular")
      .padding(.top, 16)
      .foregroundColor(Color("GreenColor"))
      .font(.system(size: 13))
      .fontWeight(.semibold)
    TextField("Celular", text: Binding(
      get: { modelUser.contentUser.phone ?? "" },
      set: { modelUser.contentUser.phone = $0 }
    ))
    .keyboardType(.phonePad)
    .padding(.top, 3)
    .font(.system(size: 13))
    .textFieldStyle(RoundedBorderTextFieldStyle())
    
    //----Picker Estado----------------------------------------------------------
    Text("Estado")
      .padding(.top, 16)
      .foregroundColor(Color("GreenColor"))
      .font(.system(size: 13))
      .fontWeight(.semibold)
    PickerFormView2(
      selectedOption: Binding<String>(
        get: { modelUser.contentUser.state ?? "" },
        set: { newValue in
          modelUser.contentUser.state = newValue.isEmpty ? nil : newValue
        }
      ),
      label: modelUser.contentUser.gender ?? "Selecciona un estado",
      options: Constants.states
    )
    .padding(.top, 5)
  }
  }
}

///__-----------------BUTTON SECTION__
struct SectionButton: View{
  var modelUser: UserViewModel
  @State private var showAlert = false
  @State private var showAlert2 = false
  @Environment(\.presentationMode) var presentationMode
  @State private var navigateToProfile = false

  var body: some View{
    HStack {
      Button(action: {
          showAlert = true
      }) {
          Text("Cancelar")
            .foregroundColor(TitleBarColor.TitleBarColor)
            .padding(.vertical, 12)
            .padding(.horizontal)
            .frame(maxWidth: .infinity)
            .background(Color.white)
            .cornerRadius(8)
            .overlay(
              RoundedRectangle(cornerRadius: 8)
                .stroke(TitleBarColor.TitleBarColor, lineWidth: 1)
            )
      }
      .frame(maxWidth: 100)
      .padding(.trailing, 10)
      .alert(isPresented: $showAlert) {
          Alert(
              title: Text("Salir sin guardar"),
              message: Text("Si sales, los datos actualizados no se guardarán. ¿Estás seguro de que quieres salir?"),
              primaryButton: .default(Text("Seguir editando"), action: {

              }),
              secondaryButton: .destructive(Text("Salir"), action: {
                  presentationMode.wrappedValue.dismiss()
              })
          )
      }

      VStack {
        Button(action: {
            showAlert2 = true
        }) {
            Text("Guardar")
                .foregroundColor(.white)
                .padding(.vertical, 12)
                .padding(.horizontal)
                .frame(maxWidth: .infinity)
                .background(TitleBarColor.TitleBarColor)
                .cornerRadius(8)
        }
        .alert(isPresented: $showAlert2) {
            Alert(
                title: Text("Datos Actualizados"),
                message: Text("Los datos se actualizaron correctamente."),
                dismissButton: .default(Text("OK"), action: {
                    presentationMode.wrappedValue.dismiss()
                })
            )
        }
        
      }
      .padding(.leading, 8)
      
      
    }
    .padding(.horizontal, 20)
    .padding(.top, 30)
  }
}

///__----------------- DELETE SECTION__
struct SectionDelete: View{
  var body: some View{
    VStack{
    Divider()
      .padding(.top, 40)
    Text("Elimina tu cuenta de usuario")
      .padding(.top, 30)
      .bold()
      .font(.system(size: 20))
    Button(action: {}) {
        Text("Eliminar cuenta")
            .foregroundColor(.white)
            .padding(.vertical, 12)
            .padding(.horizontal, 40)
            .frame(maxWidth: .infinity)
            .background(.red)
            .cornerRadius(8)
    } .padding(.top, 12)
      .padding(.horizontal, 70)
    }
  }
    
}
///__----------------- MAIN SECTION__
struct EditProfileView2: View {
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var modelUser = UserViewModel()
    //@State private var selectedState: String = Constants.states.first ?? ""

    var body: some View {
        ZStack {
            VStack {
                TitleBarView(
                    title: "Editar Datos",
                    leftIcon: nil,
                    rightIcon: nil,
                    leftDestination: {},
                    rightDestination: {}
                )
                .frame(height: 10)
                .navigationBarBackButtonHidden(true)
                .offset(y: -60)
                
                Spacer()
            }
            VStack {
              ProfileSection(modelUser: modelUser)
                    .padding(.top, 70)
                ScrollView {
                  Section1(modelUser: UserViewModel())
                  Section2(modelUser:  UserViewModel())
                  Section3(modelUser:  UserViewModel())
                  SectionButton(modelUser:  UserViewModel())
                  SectionDelete()
                }
                .padding(.top, 10)
                .padding(.horizontal, 20)
                Spacer()
            }
        }
    }
}
