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
          leftDestination: { },
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
          Text(modelUser.contentBaseUser?.firstName ?? "Cargando...")
                .foregroundColor(Color.black)
                .font(.system(size: 16))
                .fontWeight(.semibold)
                .padding(.top, 12)
                .padding(.bottom, 2)
            Text(modelUser.contentBaseUser?.lastName ?? "Cargando...")
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

      // Propiedad computada para el binding del TextField
      private var firstNameBinding: Binding<String> {
          Binding<String>(
              get: { self.modelUser.contentBaseUser?.firstName ?? "" },
              set: { newValue in
                  if self.modelUser.contentBaseUser != nil {
                      self.modelUser.contentBaseUser?.firstName = newValue
                  }
              }
          )
      }
  
  private var lastNameBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.lastName ?? "" },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.lastName = newValue
              }
          }
      )
  }
  
  private var emailBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.email ?? "" },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.email = newValue
              }
          }
      )
  }
  
  func containsNumber(input: String) -> Bool {
      return input.range(of: "\\d", options: .regularExpression) != nil
  }
  
  func isBlank(input: String) -> Bool {
      return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
  }

  var body: some View{
    VStack(alignment: .leading) {
      
      //---Field Nombre----------------------------------------------------------
      Text("Nombre")
                      .padding(.top, 16)
                      .foregroundColor(Color("GreenColor"))
                      .font(.system(size: 13))
                      .fontWeight(.semibold)
                  
                  TextField("Nombre", text: firstNameBinding)
                      .disableAutocorrection(true)
                      .padding(.top, 3)
                      .font(.system(size: 13))
                      .textFieldStyle(RoundedBorderTextFieldStyle())
      
      if isBlank(input: modelUser.contentBaseUser?.firstName ?? "Cargando...") {
          Text("No puedes dejar este campo vacío.")
              .foregroundColor(.red)
              .font(.system(size: 11))
      }else if containsNumber(input: modelUser.contentBaseUser?.firstName ?? "Cargando...") {
            Text("Este campo no puede contener números.")
                .foregroundColor(.red)
                .font(.system(size: 11))
      }
      
      //---Field Apellido----------------------------------------------------------
      Text("Apellido")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      TextField("Primer Apellido", text: lastNameBinding)
        .disableAutocorrection(true)
        .padding(.top, 3)
        .font(.system(size: 13))
        .textFieldStyle(RoundedBorderTextFieldStyle())
      
      if isBlank(input:  modelUser.contentBaseUser?.lastName ?? "Cargando...") {
          Text("No puedes dejar este campo vacío.")
              .foregroundColor(.red)
              .font(.system(size: 11))
      } else if containsNumber(input: modelUser.contentBaseUser?.lastName ?? "Cargando...") {
          Text("Este campo no puede contener números.")
              .foregroundColor(.red)
              .font(.system(size: 11))
      }
      
      Text("Email")
        .padding(.top, 16)
        .foregroundColor(Color("GreenColor"))
        .font(.system(size: 13))
        .fontWeight(.semibold)
      TextField("Email", text: emailBinding)
        .disabled(true)
        .padding(.top, 3)
        .font(.system(size: 13))
        .foregroundColor(.gray)
        .textFieldStyle(RoundedBorderTextFieldStyle())
      
    }
  }
}

///__----------------- SECTION 2__
struct Section2: View {
  @ObservedObject var modelUser = UserViewModel()
  
  
  private var edadBinding: Binding<Int> {
      Binding<Int>(
          get: { self.modelUser.contentBaseUser?.age ?? 0 },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.age = newValue
              }
          }
      )
  }
  
  private var generoBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.gender ?? "Cargando..." },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.gender = newValue
              }
          }
      )
  }
  
  func isBlank(input: String) -> Bool {
      return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
  }

  func containsOnlyNumbers(input: String) -> Bool {
      return input.range(of: "^[0-9]+$", options: .regularExpression) != nil
  }
    var body: some View {
        HStack {
            //---Field Edad----------------------------------------------------------
          VStack(alignment: .leading) {
              Text("Edad")
                  .padding(.top, 16)
                  .foregroundColor(Color("GreenColor"))
                  .font(.system(size: 13))
                  .fontWeight(.semibold)

              let ageStringBinding = Binding<String>(
                  get: {
                    if let age = modelUser.contentBaseUser?.age {
                          return String(age)
                      } else {
                          return "Cargando..."
                      }
                  },
                  set: {
                      let filtered = $0.filter { "0123456789".contains($0) }
                      
                      // Limitamos la entrada a un máximo de 2 dígitos
                      if filtered.count <= 2 {
                          if let age = Int(filtered) {
                            modelUser.contentBaseUser?.age  = age
                          } else {
                            modelUser.contentBaseUser?.age = 0
                          }
                      }
                  }
              )

              TextField("Edad", text: ageStringBinding)
                  .keyboardType(.numberPad)
                  .padding(.top, 3)
                  .font(.system(size: 13))
                  .textFieldStyle(RoundedBorderTextFieldStyle())

              if isBlank(input: ageStringBinding.wrappedValue) {
                  Text("No puede estar vacío.")
                      .foregroundColor(.red)
                      .font(.system(size: 11))
              } else if !containsOnlyNumbers(input: ageStringBinding.wrappedValue) {
                  Text("Solo se permiten números.")
                      .foregroundColor(.red)
                      .font(.system(size: 11))
              }
          }

            //----Picker Género----------------------------------------------------------
            VStack(alignment: .leading) {
                Text("Género")
                    .padding(.top, 16)
                    .foregroundColor(Color("GreenColor"))
                    .font(.system(size: 13))
                    .fontWeight(.semibold)
              PickerFormView2(
                  selectedOption: Binding<String>(
                      get: { modelUser.contentBaseUser?.gender ?? "Cargando..." },
                      set: { newValue in
                          if !newValue.isEmpty {
                              modelUser.contentBaseUser?.gender = newValue
                          }
                      }
                  ),
                  label:  modelUser.contentBaseUser?.gender ?? "Selecciona un género...",
                  options: GENDERS
              )
              .padding(.top, 5)
            }
        }
    }
}

///__----------------- SECTION 3__
struct Section3: View {
  @ObservedObject var modelUser: UserViewModel
  
  private var phoneBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.phoneNumber ?? "Cargando..." },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.phoneNumber = newValue
              }
          }
      )
  }
  
  private var estadoBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.state ?? "Cargando..." },
          set: { newValue in
              if self.modelUser.contentBaseUser != nil {
                  self.modelUser.contentBaseUser?.state = newValue
              }
          }
      )
  }

  
  func isBlank(input: String?) -> Bool {
      guard let input = input else { return true }
      return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
  }

  func containsOnlyNumbers(input: String?) -> Bool {
      guard let input = input else { return false }
      return input.range(of: "^[0-9]+$", options: .regularExpression) != nil
  }
  
    var body: some View {
        VStack(alignment: .leading) {
            //----Field Celular----------------------------------------------------------
            Text("Teléfono")
                .padding(.top, 16)
                .foregroundColor(Color("GreenColor"))
                .font(.system(size: 13))
                .fontWeight(.semibold)

          TextField("Teléfono", text: Binding(
              get: { self.modelUser.contentBaseUser?.phoneNumber ?? "Cargando..."  },
              set: {
                  let filtered = $0.filter { "0123456789".contains($0) }
                  if filtered.count <= 10 {
                      self.modelUser.contentBaseUser?.phoneNumber = filtered.isEmpty ? nil : filtered
                  }
              }
          ))
          .keyboardType(.numberPad)
          .padding(.top, 3)
          .font(.system(size: 13))
          .textFieldStyle(RoundedBorderTextFieldStyle())

                     // Mostrar mensaje solo si el campo está vacío.
                     if isBlank(input: modelUser.contentBaseUser?.phoneNumber ?? "Cargando...") {
                         Text("No puedes dejar este campo vacío.")
                             .foregroundColor(.red)
                             .font(.system(size: 11))
                     }

            //----Picker Estado----------------------------------------------------------
            Text("Estado")
                .padding(.top, 16)
                .foregroundColor(Color("GreenColor"))
                .font(.system(size: 13))
                .fontWeight(.semibold)
            
            PickerFormView2(
                selectedOption: Binding<String>(
                    get: { modelUser.contentBaseUser?.state ?? "Cargando..."},
                    set: { newValue in
                      modelUser.contentBaseUser?.state = newValue.isEmpty ? nil : newValue
                    }
                ),
                label:  modelUser.contentBaseUser?.state ?? "Selecciona un estado...",
                options: Constants.states
            )
            .padding(.top, 5)
        }
    }
}
  
  ///__-----------------BUTTON SECTION__
//extension EditProfileView {
//    var isFormValid: Bool {
//        // Here you can add conditions to ensure all your requirements are met
//        if modelUser.contentUser.first_name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
//            return false
//        }
//        
//        if modelUser.contentUser.last_name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
//            return false
//        }
      
//      if ((modelUser.contentUser.phone?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty) != nil) {
//          return false
//      }
//      
//      if let age = modelUser.contentUser.age, String(age).trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
//          return false
//      }
//      
//        return true
//    }
//}


  struct SectionButton: View{
    var modelUser: UserViewModel
    @State private var showAlert = false
    @State private var showAlert2 = false
    @Environment(\.presentationMode) var presentationMode
    @State private var navigateToProfile = false
    @Binding var selectedTab: TabSelection
    
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
              selectedTab = .profile
            })
          )
        }
        
//        VStack
        .padding(.leading, 8)
        
        
      }
      .padding(.horizontal, 20)
      .padding(.top, 30)
    }
  }
  
  ///__----------------- DELETE SECTION__
struct SectionDelete: View{
    @StateObject var deleteUserViewModel = DeleteUserViewModel()
    @State var showAlert: Bool = false
    var goLogin: () -> Void
    var body: some View{
      VStack{
        Divider()
          .padding(.top, 40)
        Text("Elimina tu cuenta de usuario")
          .padding(.top, 30)
          .bold()
          .font(.system(size: 20))
        Button(action: {
          showAlert = true
        }, label: {
          Text("Eliminar cuenta")
            .foregroundColor(.white)
            .padding(.vertical, 12)
            .padding(.horizontal, 40)
            .frame(maxWidth: .infinity)
            .background(Color("RedCustom"))
            .cornerRadius(8)
        }).alert(isPresented: $showAlert, content: {
          Alert(title: Text("¿Deseas borrar tu cuenta?"), message: Text("Si aceptas, no guardaremos ningún dato tuyo."),
             primaryButton: .default(Text("Cancelar")) {
             },
                secondaryButton: .destructive(Text("Borrar")) {
            Task {
              try await deleteUserViewModel.deleteUserById()
              if deleteUserViewModel.contentResponse.status == 200 {
                goLogin()
              }
            }
          })
        })
        
        } .padding(.top, 12)
          .padding(.horizontal, 70)
      }
    }

  ///__----------------- MAIN SECTION__

  struct EditProfileView: View {
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var modelUser = UserViewModel()
    @State private var currentTab: TabSelection = .profile
    var goLogin: () -> Void
    
    
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
          SectionProfile(modelUser: modelUser)
            .padding(.top, 70)
          ScrollView {
            Section1(modelUser: modelUser)
            Section2(modelUser: modelUser)
            Section3(modelUser: modelUser)
//            SectionButton(disabledOpacity: isFormValid ? 1.0 : 0.5, isFormValid: isFormValid, modelUser: modelUser, selectedTab: $currentTab)
            SectionButton(modelUser: modelUser, selectedTab: $currentTab)
            SectionDelete(goLogin: goLogin)
          }
          .padding(.top, 10)
          .padding(.horizontal, 20)
          Spacer()
        }
      }
    }
  }

