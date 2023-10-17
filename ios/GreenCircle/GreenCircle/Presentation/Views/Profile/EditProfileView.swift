//
//  EditProfileView2.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 30/09/23.
//

import SwiftUI

///_----------------- TITLE BAR SECTION_

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

///_----------------- PROFILE SECTION_
struct SectionProfile: View{
  @ObservedObject var modelUser = UserViewModel()
  var body: some View{
    VStack {
        Image(systemName: "person.crop.circle.fill")
            .resizable()
            .frame(width: 100, height: 100)
            .foregroundStyle(Color("Primary"))
        HStack {
          Text("\(modelUser.contentBaseUser?.firstName ?? "Cargando...") \(modelUser.contentBaseUser?.lastName ?? "")")
              .foregroundColor(Color.black)
              .font(.system(size: 16))
              .fontWeight(.semibold)
              .padding(.top, 10)
              .padding(.bottom, 2)
        }
    }
  }
}

///_----------------- SECTION 1_
struct Section1: View{
  @ObservedObject var modelUser = UserViewModel()
  @State private var shouldDisableSaveButton = true

      private var firstNameBinding: Binding<String> {
          Binding<String>(
              get: { self.modelUser.contentBaseUser?.firstName ?? "" },
              set: { newValue in
                  if !containsNumber(input: newValue) {
                      if self.modelUser.contentBaseUser != nil {
                          self.modelUser.contentBaseUser?.firstName = newValue
                      }
                  }
              }
          )
      }
  
    private var lastNameBinding: Binding<String> {
        Binding<String>(
            get: { self.modelUser.contentBaseUser?.lastName ?? "" },
            set: { newValue in
                if !containsNumber(input: newValue) {
                    if self.modelUser.contentBaseUser != nil {
                        self.modelUser.contentBaseUser?.lastName = newValue
                    }
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
                      .foregroundColor(Color("Secondary"))
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
        .foregroundColor(Color("Secondary"))
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
        .foregroundColor(Color("Secondary"))
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

///_----------------- SECTION 2_
struct Section2: View {
  @ObservedObject var modelUser = UserViewModel()
  
  
    private var edadBinding: Binding<String> {
        Binding<String>(
            get: { String(self.modelUser.contentBaseUser?.age ?? 0) },
            set: { newValue in
                if containsOnlyNumbers(input: newValue) {
                    if let ageInt = Int(newValue), self.modelUser.contentBaseUser != nil {
                        self.modelUser.contentBaseUser?.age = ageInt
                    }
                }
            }
        )
    }
  
  private var generoBinding: Binding<String> {
      Binding<String>(
          get: { self.modelUser.contentBaseUser?.gender ?? "Cargando..." },
          set: { newValue in
              if var contentUser = self.modelUser.contentBaseUser {
                contentUser.gender = newValue
              }
          }
      )
  }

  
  func isBlank(input: String) -> Bool {
      return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
  }

  
  func containsOnlyNumbers(input: String?) -> Bool {
      guard let input = input else { return false }
      return input.range(of: "^[0-9]+$",
                         options: .regularExpression) != nil
  }
  
    var body: some View {
        HStack {
            //---Field Edad----------------------------------------------------------
          VStack(alignment: .leading) {
              Text("Edad")
                  .padding(.top, 16)
                  .foregroundColor(Color("Secondary"))
                  .font(.system(size: 13))
                  .fontWeight(.semibold)
            let ageStringBinding = Binding<String>(
                get: {
                    if let age = modelUser.contentBaseUser?.age, age > 0 {
                        return String(age)
                    } else {
                        return ""
                    }
                },
                set: {
                    let filtered = $0.filter { "0123456789".contains($0) }

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
                    .foregroundColor(Color("Secondary"))
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
              .foregroundColor(Color("Secondary"))
            }
        }
    }
}

///_----------------- SECTION 3_
struct Section3: View {
    @ObservedObject var modelUser: UserViewModel

    func isBlank(input: String?) -> Bool {
        guard let input = input else { return true }
        return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    func containsOnlyNumbers(input: String?) -> Bool {
        guard let input = input else { return false }
        return input.range(of: "^[0-9]+$", options: .regularExpression) != nil
    }
  
  func isPhoneNumberValid(phoneNumber: String?) -> Bool {
      guard let phoneNumber = phoneNumber else { return false }
      return phoneNumber.count == 12
  }

    var body: some View {
        ZStack {
            Color.clear
                .contentShape(Rectangle())
                .onTapGesture {
                    hideKeyboard()
                }

            VStack(alignment: .leading) {
                Text("Teléfono")
                    .padding(.top, 16)
                    .foregroundColor(Color("Secondary"))
                    .font(.system(size: 13))
                    .fontWeight(.semibold)

                TextField("Teléfono", text: Binding(
                    get: {
                        if let phoneNumber = self.modelUser.contentBaseUser?.phoneNumber, !phoneNumber.isEmpty {
                            return Utils.formatNumber(with: "XXX-XXX-XXXX", for: phoneNumber)
                        } else {
                            return ""
                        }
                    },
                    set: {
                        self.modelUser.contentBaseUser?.phoneNumber = Utils.formatNumber(with: "XXX-XXX-XXXX", for: $0)
                    }
                ))
                .keyboardType(.numberPad)
                .padding(.top, 3)
                .font(.system(size: 13))
                .textFieldStyle(RoundedBorderTextFieldStyle())

                if isBlank(input: modelUser.contentBaseUser?.phoneNumber) {
                    Text("No puedes dejar este campo vacío.")
                        .foregroundColor(.red)
                        .font(.system(size: 11))
                }
                
                Text("Estado")
                    .padding(.top, 16)
                    .foregroundColor(Color("Secondary"))
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
                .foregroundColor(Color("Secondary"))
            }
        }
    }
}


struct SectionButton: View {
    var modelUser: UserViewModel
    @State private var showAlert = false
    @State private var showAlert2 = false
    @Environment(\.presentationMode) var presentationMode
    @Binding var selectedTab: TabSelection
    var isFormValid: Bool
    var isPhoneNumberValid: Bool

    func buttonOpacity() -> Double {
        if isFormValid && isPhoneNumberValid {
            return 1.0
        } else {
            return 0.5
        }
    }

    var body: some View {
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
                    primaryButton: .default(Text("Seguir editando"), action: {}),
                    secondaryButton: .destructive(Text("Salir"), action: {
                        presentationMode.wrappedValue.dismiss()
                        selectedTab = .profile
                    })
                )
            }

            VStack {
                Button(action: {
                    async {
                        await modelUser.saveProfileChanges()
                    }
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
                .opacity(buttonOpacity())
                .disabled(!isFormValid || !isPhoneNumberValid)
                .alert(isPresented: $showAlert2) {
                    Alert(
                        title: Text("Cambios guardados"),
                        message: Text("Tus cambios han sido guardados con éxito."),
                        dismissButton: .default(Text("OK"), action: {
                            presentationMode.wrappedValue.dismiss()
                            selectedTab = .profile
                        })
                    )
                }
            }
        }
    }
}


  ///_----------------- DELETE SECTION_
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
          .padding(.bottom, 30)
          .bold()
          .font(.system(size: 17))
        Button(action: {
          showAlert = true
        }, label: {
          Text("Eliminar cuenta")
            .foregroundColor(.white)
            .padding(.vertical, 12)
            .padding(.horizontal, 30)
            .frame(maxWidth: .infinity)
            .background(Color("Alert"))
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
        
        } .padding(.top, 3)
          .padding(.horizontal, 70)
      }
    }

  ///_----------------- MAIN SECTION_

struct EditProfileView: View {
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var modelUser = UserViewModel()
    @State private var currentTab: TabSelection = .profile
    var goLogin: () -> Void
    
  func isPhoneNumberValid(phoneNumber: String?) -> Bool {
      guard let phoneNumber = phoneNumber else { return false }
      return phoneNumber.count == 12
  }
    
    var body: some View {
        ZStack {
            Color.clear
            .contentShape(Rectangle())
            .onTapGesture {
                hideKeyboard()
            }
            
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
                    SectionButton(modelUser: modelUser,
                                  selectedTab: $currentTab,
                                  isFormValid: isFormValid,
                                  isPhoneNumberValid: isPhoneNumberValid(phoneNumber: modelUser.contentBaseUser?.phoneNumber))
                    .padding(.top, 20)
                    SectionDelete(goLogin: goLogin)
                }
                .padding(.top, 10)
                .padding(.horizontal, 20)
                
                Spacer()
            }
        }
        .onAppear(perform: loadProfileData)
        .accentColor(Color("Secondary"))
    }
    
    private func loadProfileData() {
      Task {
          await modelUser.getAllUserData()
          
      }
    }
    
    var isFormValid: Bool {
        guard let user = modelUser.contentBaseUser else { return false }
        let hasFirstName = !isBlank(input: user.firstName)
        let hasLastName = !isBlank(input: user.lastName)
        let hasPhone = isPhoneNumberValid(phoneNumber: user.phoneNumber)
        let hasAge = user.age > 0
        return hasFirstName && hasLastName && hasPhone && hasAge
    }

    func isBlank(input: String?) -> Bool {
        guard let input = input else { return true }
        return input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
}
