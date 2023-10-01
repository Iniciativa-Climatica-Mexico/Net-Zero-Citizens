//
//  EditProfileView.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 14/09/23.
//

import SwiftUI

// TITLE BAR SECTION ------------------------------------
struct TitleBarSection: View{
  var title: String
  var leftIcon: String?
  var rightIcon: String?
  var leftDestination: (() -> Void)?
  var rightDestination: (() -> Void)?

  var body: some View {
      VStack {
          TitleBarView(
            title: "Editar Datos",
            leftIcon: nil,//"chevron.left",
            rightIcon: nil,
            leftDestination: { //ProfileView(modelUser: UserViewModel())
                  },
            rightDestination: { }
            )
            .frame(height: 10)
            .navigationBarBackButtonHidden(true)
            .offset(y: -60)
            Spacer() // Esto empuja el TitleBarView hacia arriba
          }
  }
}

// PROFILE SECTION ------------------------------------
struct ProfileSection: View{
  @ObservedObject var modelUser: UserViewModel
  
  var body: some View {
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

// FORM SECTION 1 ------------------------------------
struct FormSection1: View {
  @ObservedObject var modelUser = UserViewModel()
//  @State private var newPassword: String = ""
//  @State private var confirmPassword: String = ""
//  @State private var passwordErrorMessage: String? = nil
  
  var body: some View{
      VStack(alignment: .leading) {
        
        //------------------------Field Nombre----------------------------------------------------------
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
        
        //------------------------Field Primer Apellido----------------------------------------------------------
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
        
        //------------------------Picker Edad----------------------------------------------------------
//          VStack(alignment: .leading) {
//            Text("Edad")
//              .padding(.top, 16)
//              .foregroundColor(Color("GreenColor"))
//              .font(.system(size: 13))
//              .fontWeight(.semibold)
//
//            ZStack {
//              RoundedRectangle(cornerRadius: 5)
//                .stroke(Color.gray, lineWidth: 0.1)
//                .frame(height: 30)
//
//              Picker("Edad", selection: $modelUser.contentUser.age) {
//                ForEach(1..<100) { i in
//                  Text("\(i)").tag(i)
//                }
//              }
//              .pickerStyle(MenuPickerStyle())
//              .padding(.top, 3)
//              .padding(.leading, -15)
//              .font(.system(size: 11))
//              .frame(maxWidth: .infinity, alignment: .leading)
//              .padding(.horizontal, 10)
//            }
//          }
        
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
                    modelUser.contentUser.age = age
                } else {
                    modelUser.contentUser.age = nil
                }
            }
        ))
        .keyboardType(.numberPad)
        .padding(.top, 3)
        .font(.system(size: 13))
        .textFieldStyle(RoundedBorderTextFieldStyle())
        .padding(.trailing, 16)
          
          //------------------------Picker Género----------------------------------------------------------
//          VStack(alignment: .leading) {
//            Text("Género")
//              .padding(.top, 16)
//              .foregroundColor(Color("GreenColor"))
//              .font(.system(size: 13))
//              .fontWeight(.semibold)
//            ZStack {
//              RoundedRectangle(cornerRadius: 5)
//                .stroke(Color.gray, lineWidth: 0.1)
//                .frame(height: 30)
//              Picker("Género", selection: $modelUser.contentUser.gender) {
//                Text("Femenino").tag("femenine")
//                Text("Masculino").tag("masculine")
//                Text("Otro").tag("other")
//                Text("---").tag("no_answer")
//              }
//              .pickerStyle(MenuPickerStyle())
//              .padding(.top, 3)
//              .padding(.leading, -15)
//              .font(.system(size: 11))
//              .frame(maxWidth: .infinity, alignment: .leading)
//              .padding(.horizontal, 10)
//            }
//          }
      }
  }
}

// FORM SECTION 1 ------------------------------------
struct FormSection2: View{
  @ObservedObject var modelUser = UserViewModel()
//  @State private var newPassword: String = ""
//  @State private var confirmPassword: String = ""
//  @State private var passwordErrorMessage: String? = nil
  @State private var showAlert = false
  @Environment(\.presentationMode) var presentationMode
  @State private var estados = [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Ciudad de México",
      "Coahuila",
      "Colima",
      "Durango",
      "Estado de México",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
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
  var body: some View{
    //------------------------Field Correo----------------------------------------------------------
                
                             Text("Correo Electrónico")
                               .padding(.top, 16)
                               .foregroundColor(Color("GreenColor"))
                               .font(.system(size: 13))
                               .fontWeight(.semibold)
                             TextField("Correo Electrónico", text: $modelUser.contentUser.email)
                               .disableAutocorrection(true)
                               .autocapitalization(.none)
                               .padding(.top, 3)
                               .font(.system(size: 13))
                               .textFieldStyle(RoundedBorderTextFieldStyle())

    //------------------------Field Nueva contraseña----------------------------------------------------------
//                             Text("Contraseña")
//                               .padding(.top, 16)
//                               .foregroundColor(Color("GreenColor"))
//                               .font(.system(size: 13))
//                               .fontWeight(.semibold)
//                             SecureField("Escribe una nueva contraseña", text: $newPassword)
//                               .disableAutocorrection(true)
//                               .padding(.top, 3)
//                               .font(.system(size: 13))
//                               .textFieldStyle(RoundedBorderTextFieldStyle())
//
//    //------------------------Field Confirmar contraseña----------------------------------------------------------
//                             Text("Confirmar Contraseña")
//                               .padding(.top, 16)
//                               .foregroundColor(Color("GreenColor"))
//                               .font(.system(size: 13))
//                               .fontWeight(.semibold)
//                             SecureField("Confirmar Contraseña", text: $confirmPassword)
//                               .disableAutocorrection(true)
//                               .padding(.top, 3)
//                               .font(.system(size: 13))
//                               .textFieldStyle(RoundedBorderTextFieldStyle())
//
//                           if let errorMessage = passwordErrorMessage { //Mensaje de error si no coinciden
//                             Text(errorMessage)
//                               .foregroundColor(.red)
//                               .font(.system(size: 12))
//                           }

    //------------------------Field Celular----------------------------------------------------------
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

      //------------------------Field Estado----------------------------------------------------------
                             VStack(alignment: .leading) {
                               Text("Estado")
                                 .padding(.top, 16)
                                 .foregroundColor(Color("GreenColor"))
                                 .font(.system(size: 13))
                                 .fontWeight(.semibold)

                               ZStack {
                                 RoundedRectangle(cornerRadius: 5)
                                   .stroke(Color.gray, lineWidth: 0.1)

                                 if modelUser.contentUser.state == nil {
                                     Text("Seleccione un estado").foregroundColor(.gray)
                                 } else {
                                     Picker("Estado", selection: $modelUser.contentUser.state) {
                                         ForEach(estados, id: \.self) { estado in
                                             Text(estado).tag(estado)
                                         }
                                     }
                                     .pickerStyle(MenuPickerStyle())
                                     .padding(.top, 3)
                                     .font(.system(size: 11))
                                     .padding(.leading, -15)
                                     .frame(maxWidth: .infinity, alignment: .leading)
                                     .padding(.horizontal, 10)
                                 }
 
                               }
                             }
    
                             .padding()
      //------------------------Sección de botones----------------------------------------------------------
    
    //Spacer()

  }
  //.padding(.top, 10)  //cambiar el espacio entre "Cerrar sesión" y tu formulario

  //Spacer()
}

    struct ButtonSection: View {
      @ObservedObject var modelUser = UserViewModel()
//      @State private var newPassword: String = ""
//      @State private var confirmPassword: String = ""
//      @State private var passwordErrorMessage: String? = nil
      @State private var showAlert = false
      @Environment(\.presentationMode) var presentationMode
      
      var body: some View{
        HStack {
          //Botón cancelar
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
          .frame(maxWidth: 100) // Hace que el botón Cancelar ocupe todo el ancho disponible
          .padding(.trailing, 10) // Añade un espacio después del botón Cancelar

          .alert(isPresented: $showAlert) {
            Alert(
              title: Text("Salir sin guardar"),
              message: Text("Si sales, los datos actualizados no se guardarán. ¿Estás seguro de que quieres salir?"),
              primaryButton: .default(Text("Seguir editando"), action: {
                //Pendiente porque de igual manera se sale
              }),
              secondaryButton: .destructive(Text("Salir"), action: {
                presentationMode.wrappedValue.dismiss()
              })
            )
          }

          //Botón guardar
          Button(action: {
//            Task {
//              let updatedUser = UserAuth(
//                first_name: modelUser.contentUser.first_name,
//                last_name: modelUser.contentUser.last_name,
//                uuid: modelUser.contentUser.uuid,
//                email: modelUser.contentUser.email,
//                login_type: modelUser.contentUser.login_type,
//                picture: modelUser.contentUser.picture,
//                //password: modelUser.contentUser.password,
//                roles: modelUser.contentUser.roles,
//                phone: modelUser.contentUser.phone,
//                gender: modelUser.contentUser.gender,
//                state: modelUser.contentUser.state,
//                age: modelUser.contentUser.age,
//              )
//              //Updatear Usuarios
////              await modelUser.updateUserData(updatedUserData: updatedUser, userId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
//              //Regresar a vista anterior
//              self.presentationMode.wrappedValue.dismiss()
//            }
          }) {
            Text("Guardar")
              .foregroundColor(.white)
              .padding(.vertical, 12)
              .padding(.horizontal)
              .frame(maxWidth: .infinity)
              .background(TitleBarColor.TitleBarColor)
              .cornerRadius(8)
          }

          .padding(.leading, 8) // padding para crear espacio entre los botones
        }
        .padding(.horizontal, 20) // padding horizontal para que los botones no lleguen hasta el borde de la vista
        
      }
    }

                    


// PRINCIPAL ------------------------------------
struct EditProfileView: View {
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var modelUser = UserViewModel()
    @State private var estados = [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Ciudad de México",
      "Coahuila",
      "Colima",
      "Durango",
      "Estado de México",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
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
                  FormSection1(modelUser: modelUser)
                  FormSection2(modelUser: modelUser)
                  ButtonSection(modelUser: modelUser)
                }
                .padding(.top, 10)
                Spacer()
            }
        }
    }
}
struct EditProfileView_Previews: PreviewProvider {
    static var previews: some View {
        EditProfileView()
    }
}




//struct EditProfileView: View {
//
//  @Environment(\.presentationMode) var presentationMode
//  @ObservedObject var modelUser = UserViewModel()
//  @State private var showAlert = false
//  @State private var newPassword: String = ""
//  @State private var confirmPassword: String = ""
//  @State private var passwordErrorMessage: String? = nil
//  @State private var estados = [
//    "Aguascalientes",
//    "Baja California",
//    "Baja California Sur",
//    "Campeche",
//    "Chiapas",
//    "Chihuahua",
//    "Ciudad de México",
//    "Coahuila",
//    "Colima",
//    "Durango",
//    "Estado de México",
//    "Guanajuato",
//    "Guerrero",
//    "Hidalgo",
//    "Jalisco",
//    "Michoacán",
//    "Morelos",
//    "Nayarit",
//    "Nuevo León",
//    "Oaxaca",
//    "Puebla",
//    "Querétaro",
//    "Quintana Roo",
//    "San Luis Potosí",
//    "Sinaloa",
//    "Sonora",
//    "Tabasco",
//    "Tamaulipas",
//    "Tlaxcala",
//    "Veracruz",
//    "Yucatán",
//    "Zacatecas"
//  ]
//
//  var body: some View {
//
//    ZStack {
////      Title Bar
//      VStack {
//        TitleBarView(
//          title: "Editar Datos",
//          leftIcon: nil,//"chevron.left",
//          rightIcon: nil,
//          leftDestination: { //ProfileView(modelUser: UserViewModel())
//          },
//          rightDestination: { }
//        )
//        .frame(height: 10)
//        .navigationBarBackButtonHidden(true)
//        .offset(y: -60)
//        Spacer() // Esto empuja el TitleBarView hacia arriba
//
//      }
//      // Content
//      VStack {
//        VStack {
//
//          Image("Sun")
//            .resizable() // Hacer que la imagen sea redimensionable
//            .frame(width: 100, height: 100)
//
//          HStack {
//            Text(modelUser.contentUser.first_name)
//              .foregroundColor(Color.black)
//              .font(.system(size: 16))
//              .fontWeight(.semibold)
//              .padding(.top, 12)
//              .padding(.bottom, 2)
//            Text(modelUser.contentUser.last_name)
//              .foregroundColor(Color.black)
//              .font(.system(size: 16))
//              .fontWeight(.semibold)
//              .padding(.top, 12)
//              .padding(.bottom, 2)
//          }
//
//          //Botón cerrar sesión
//          NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
//            .foregroundColor(TitleBarColor.TitleBarColor)
//            .font(.system(size: 13))
//            .fontWeight(.bold)
//            .padding(.top, 8) // Añade padding para separar el botón del texto
//        }
//        .padding(.top, 70)
//
//        ScrollView {
//          VStack(alignment: .leading) {
//
//            //------------------------Field Nombre----------------------------------------------------------
//            Group {
//              Text("Nombre")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              TextField("Nombre", text: $modelUser.contentUser.firstName)
//                .disableAutocorrection(true)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//            //------------------------Field Primer Apellido----------------------------------------------------------
//            Group {
//              Text("Primer Apellido")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              TextField("Primer Apellido", text: $modelUser.contentUser.lastName)
//                .disableAutocorrection(true)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//            //------------------------Field Segundo Apellido----------------------------------------------------------
//            //                        Group {
//            //                            Text("Segundo Apellido")
//            //                                .padding(.top, 16)
//            //                                .foregroundColor(Color("GreenColor"))
//            //                                .font(.system(size: 13))
//            //                                .fontWeight(.semibold)
//            //                            TextField("Segundo Apellido", text: Binding(get: {
//            //                                modelUser.contentUser.secondLastName ?? "" //Opcional
//            //                            }, set: { newValue in
//            //                                modelUser.contentUser.secondLastName = newValue
//            //                            }))
//            //                            .disableAutocorrection(true)
//            //                            .padding(.top, 3)
//            //                            .font(.system(size: 13))
//            //                            .textFieldStyle(RoundedBorderTextFieldStyle())
//            //                        }
//
//            HStack {
//              //------------------------Picker Edad----------------------------------------------------------
//              VStack(alignment: .leading) {
//                Text("Edad")
//                  .padding(.top, 16)
//                  .foregroundColor(Color("GreenColor"))
//                  .font(.system(size: 13))
//                  .fontWeight(.semibold)
//
//                ZStack {
//                  RoundedRectangle(cornerRadius: 5)
//                    .stroke(Color.gray, lineWidth: 0.1)
//                    .frame(height: 30)
//
//                  Picker("Edad", selection: $modelUser.contentUser.age) {
//                    ForEach(1..<100) { i in
//                      Text("\(i)").tag(i)
//                    }
//                  }
//                  .pickerStyle(MenuPickerStyle())
//                  .padding(.top, 3)
//                  .padding(.leading, -15)
//                  .font(.system(size: 11))
//                  .frame(maxWidth: .infinity, alignment: .leading)
//                  .padding(.horizontal, 10)
//                }
//              }
//              .padding(.trailing, 16) // Añade un padding para separar los dos VStack
//
//              //------------------------Picker Género----------------------------------------------------------
//              VStack(alignment: .leading) {
//                Text("Género")
//                  .padding(.top, 16)
//                  .foregroundColor(Color("GreenColor"))
//                  .font(.system(size: 13))
//                  .fontWeight(.semibold)
//                ZStack {
//                  RoundedRectangle(cornerRadius: 5)
//                    .stroke(Color.gray, lineWidth: 0.1)
//                    .frame(height: 30)
//                  Picker("Género", selection: $modelUser.contentUser.gender) {
//                    Text("Femenino").tag("femenine")
//                    Text("Masculino").tag("masculine")
//                    Text("Otro").tag("other")
//                    Text("---").tag("no_answer")
//                  }
//                  .pickerStyle(MenuPickerStyle())
//                  .padding(.top, 3)
//                  .padding(.leading, -15)
//                  .font(.system(size: 11))
//                  .frame(maxWidth: .infinity, alignment: .leading)
//                  .padding(.horizontal, 10)
//                }                            }
//            }
//            //------------------------Field Correo----------------------------------------------------------
//            Group {
//              Text("Correo Electrónico")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              TextField("Correo Electrónico", text: $modelUser.contentUser.email)
//                .disableAutocorrection(true)
//                .autocapitalization(.none)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//            //------------------------Field Nueva contraseña----------------------------------------------------------
//            Group {
//              Text("Contraseña")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              SecureField("Escribe una nueva contraseña", text: $newPassword)
//                .disableAutocorrection(true)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//            //------------------------Field Confirmar contraseña----------------------------------------------------------
//            Group {
//              Text("Confirmar Contraseña")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              SecureField("Confirmar Contraseña", text: $confirmPassword)
//                .disableAutocorrection(true)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//
//            if let errorMessage = passwordErrorMessage { //Mensaje de error si no coinciden
//              Text(errorMessage)
//                .foregroundColor(.red)
//                .font(.system(size: 12))
//            }
//            //------------------------Field Celular----------------------------------------------------------
//            Group {
//              Text("Celular")
//                .padding(.top, 16)
//                .foregroundColor(Color("GreenColor"))
//                .font(.system(size: 13))
//                .fontWeight(.semibold)
//              TextField("Celular", text: $modelUser.contentUser.phoneNumber)
//                .keyboardType(.phonePad)
//                .padding(.top, 3)
//                .font(.system(size: 13))
//                .textFieldStyle(RoundedBorderTextFieldStyle())
//            }
//            //------------------------Field Estado----------------------------------------------------------
//            Group {
//              VStack(alignment: .leading) {
//                Text("Estado")
//                  .padding(.top, 16)
//                  .foregroundColor(Color("GreenColor"))
//                  .font(.system(size: 13))
//                  .fontWeight(.semibold)
//
//                ZStack {
//                  RoundedRectangle(cornerRadius: 5)
//                    .stroke(Color.gray, lineWidth: 0.1)
//
//
//                  Picker("Estado", selection: $modelUser.contentUser.state) {
//                    ForEach(estados, id: \.self) { estado in
//                      Text(estado).tag(estado)
//                    }
//                  }
//                  .pickerStyle(MenuPickerStyle())
//                  .padding(.top, 3)
//                  .font(.system(size: 11))
//                  .padding(.leading, -15)
//                  .frame(maxWidth: .infinity, alignment: .leading)
//                  .padding(.horizontal, 10)
//                }
//              }
//            }
//          }
//          .padding()
//          //------------------------Sección de botones----------------------------------------------------------
//          HStack {
//            //Botón cancelar
//            Button(action: {
//              showAlert = true
//            }) {
//              Text("Cancelar")
//                .foregroundColor(TitleBarColor.TitleBarColor)
//                .padding(.vertical, 12)
//                .padding(.horizontal)
//                .frame(maxWidth: .infinity)
//                .background(Color.white)
//                .cornerRadius(8)
//                .overlay(
//                  RoundedRectangle(cornerRadius: 8)
//                    .stroke(TitleBarColor.TitleBarColor, lineWidth: 1)
//                )
//            }
//            .frame(maxWidth: 100) // Hace que el botón Cancelar ocupe todo el ancho disponible
//            .padding(.trailing, 10) // Añade un espacio después del botón Cancelar
//
//            .alert(isPresented: $showAlert) {
//              Alert(
//                title: Text("Salir sin guardar"),
//                message: Text("Si sales, los datos actualizados no se guardarán. ¿Estás seguro de que quieres salir?"),
//                primaryButton: .default(Text("Seguir editando"), action: {
//                  //Pendiente porque de igual manera se sale
//                }),
//                secondaryButton: .destructive(Text("Salir"), action: {
//                  presentationMode.wrappedValue.dismiss()
//                })
//              )
//            }
//
//            //Botón guardar
//            Button(action: {
//
//              //Verificar si passwords coinciden para ver si se puede guardar o manda error
//              if newPassword == confirmPassword {
//                modelUser.contentUser.password = newPassword
//                passwordErrorMessage = nil
//              } else {
//                passwordErrorMessage = "Las contraseñas no coinciden"
//              }
//              //Al guardar actualiza los datos
//              Task {
//                let updatedUser = User(
//                  userId: modelUser.contentUser.userId,
//                  roleId: modelUser.contentUser.roleId,
//                  companyId: modelUser.contentUser.companyId,
//                  googleId: modelUser.contentUser.googleId,
//                  facebookId: modelUser.contentUser.facebookId,
//                  appleId: modelUser.contentUser.appleId,
//                  firstName: modelUser.contentUser.firstName,
//                  lastName: modelUser.contentUser.lastName,
//                  secondLastName: modelUser.contentUser.secondLastName,
//                  email: modelUser.contentUser.email,
//                  password: modelUser.contentUser.password,
//                  phoneNumber: modelUser.contentUser.phoneNumber,
//                  age: modelUser.contentUser.age,
//                  state: modelUser.contentUser.state,
//                  gender: modelUser.contentUser.gender,
//                  profilePicture: modelUser.contentUser.profilePicture,
//                  createdAt: modelUser.contentUser.createdAt,
//                  updatedAt: Date()
//
//
//                )
//                //Updatear Usuarios
//                await modelUser.updateUserData(updatedUserData: updatedUser, userId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
//                //Regresar a vista anterior
//                self.presentationMode.wrappedValue.dismiss()
//              }
//            }) {
//              Text("Guardar")
//                .foregroundColor(.white)
//                .padding(.vertical, 12)
//                .padding(.horizontal)
//                .frame(maxWidth: .infinity)
//                .background(TitleBarColor.TitleBarColor)
//                .cornerRadius(8)
//            }
//
//            .padding(.leading, 8) // padding para crear espacio entre los botones
//          }
//          .padding(.horizontal, 20) // padding horizontal para que los botones no lleguen hasta el borde de la vista
//          .padding(.top, 10)
//
//          Spacer()
//
//        }
//        .padding(.top, 10)  //cambiar el espacio entre "Cerrar sesión" y tu formulario
//
//        Spacer()
//
//
//      }
//      .onAppear {
//        Task {
//          //await modelUser.fetchUserById(idUser: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
//        }
//      }
//    }
//
//
//  }
//}
