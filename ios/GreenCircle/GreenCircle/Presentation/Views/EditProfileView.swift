//
//  EditProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 14/09/23.
//

import SwiftUI

struct EditProfileView: View {
    
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var modelUser: UserViewModel
    @State private var showAlert = false
    @State private var newPassword: String = ""
    @State private var confirmPassword: String = ""
    @State private var passwordErrorMessage: String? = nil
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
            // Title Bar
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
            // Content
            VStack {
                VStack {
                    
                    Image("Sun")
                    .resizable() // Hacer que la imagen sea redimensionable
                    .frame(width: 100, height: 100)
                    
                    HStack {
                        Text(modelUser.contentUser.firstName)
                            .foregroundColor(Color.black)
                            .font(.system(size: 16))
                            .fontWeight(.semibold)
                            .padding(.top, 12)
                            .padding(.bottom, 2)
                        Text(modelUser.contentUser.lastName)
                            .foregroundColor(Color.black)
                            .font(.system(size: 16))
                            .fontWeight(.semibold)
                            .padding(.top, 12)
                            .padding(.bottom, 2)
                    }
                  
                    //Botón cerrar sesión
                    NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
                        .foregroundColor(TitleBarColor.TitleBarColor)
                        .font(.system(size: 13))
                        .fontWeight(.bold)
                        .padding(.top, 8) // Añade padding para separar el botón del texto
                }
                .padding(.top, 70)
                
                ScrollView {
                    VStack(alignment: .leading) {
                        
                        //------------------------Field Nombre----------------------------------------------------------
                        Group {
                            Text("Nombre")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Nombre", text: $modelUser.contentUser.firstName)
                                .disableAutocorrection(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        //------------------------Field Primer Apellido----------------------------------------------------------
                        Group {
                            Text("Primer Apellido")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Primer Apellido", text: $modelUser.contentUser.lastName)
                                .disableAutocorrection(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        //------------------------Field Segundo Apellido----------------------------------------------------------
                        Group {
                            Text("Segundo Apellido")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Segundo Apellido", text: Binding(get: {
                                modelUser.contentUser.secondLastName ?? "" //Opcional
                            }, set: { newValue in
                                modelUser.contentUser.secondLastName = newValue
                            }))
                            .disableAutocorrection(true)
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        
                        HStack {
                            //------------------------Picker Edad----------------------------------------------------------
                            VStack(alignment: .leading) {
                                Text("Edad")
                                    .padding(.top, 16)
                                    .foregroundColor(Color("GreenColor"))
                                    .font(.system(size: 13))
                                    .fontWeight(.semibold)
                                
                                ZStack {
                                    RoundedRectangle(cornerRadius: 5)
                                        .stroke(Color.gray, lineWidth: 0.1)
                                        .frame(height: 30)
                                    
                                    Picker("Edad", selection: $modelUser.contentUser.age) {
                                        ForEach(1..<100) { i in
                                            Text("\(i)").tag(i)
                                        }
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .padding(.top, 3)
                                    .padding(.leading, -15)
                                    .font(.system(size: 11))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }
                            }
                            .padding(.trailing, 16) // Añade un padding para separar los dos VStack
                            
                            //------------------------Picker Sexo----------------------------------------------------------
                            VStack(alignment: .leading) {
                                Text("Sexo")
                                    .padding(.top, 16)
                                    .foregroundColor(Color("GreenColor"))
                                    .font(.system(size: 13))
                                    .fontWeight(.semibold)
                                ZStack {
                                    RoundedRectangle(cornerRadius: 5)
                                        .stroke(Color.gray, lineWidth: 0.1)
                                        .frame(height: 30)
                                    Picker("Sexo", selection: $modelUser.contentUser.gender) {
                                        Text("Femenino").tag("femenine")
                                        Text("Masculino").tag("masculine")
                                        Text("Otro").tag("other")
                                        Text("---").tag("no_answer")
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .padding(.top, 3)
                                    .padding(.leading, -15)
                                    .font(.system(size: 11))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }                            }
                        }
                        //------------------------Field Correo----------------------------------------------------------
                        Group {
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
                        }
                        //------------------------Field Nueva contraseña----------------------------------------------------------
                        Group {
                            Text("Contraseña")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            SecureField("Escribe una nueva contraseña", text: $newPassword)
                                .disableAutocorrection(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        //------------------------Field Confirmar contraseña----------------------------------------------------------
                        Group {
                            Text("Confirmar Contraseña")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            SecureField("Confirmar Contraseña", text: $confirmPassword)
                                .disableAutocorrection(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        
                        if let errorMessage = passwordErrorMessage { //Mensaje de error si no coinciden
                            Text(errorMessage)
                                .foregroundColor(.red)
                                .font(.system(size: 12))
                        }
                        //------------------------Field Celular----------------------------------------------------------
                        Group {
                            Text("Celular")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Celular", text: $modelUser.contentUser.phoneNumber)
                                .keyboardType(.phonePad)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        //------------------------Field Estado----------------------------------------------------------
                        Group {
                            VStack(alignment: .leading) {
                                Text("Estado")
                                    .padding(.top, 16)
                                    .foregroundColor(Color("GreenColor"))
                                    .font(.system(size: 13))
                                    .fontWeight(.semibold)
                                
                                ZStack {
                                    RoundedRectangle(cornerRadius: 5)
                                        .stroke(Color.gray, lineWidth: 0.1)
                                    
                                    
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
                    }
                    .padding()
//------------------------Sección de botones----------------------------------------------------------
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
                            
                            //Verificar si passwords coinciden para ver si se puede guardar o manda error
                            if newPassword == confirmPassword {
                                    modelUser.contentUser.password = newPassword
                                    passwordErrorMessage = nil
                                } else {
                                    passwordErrorMessage = "Las contraseñas no coinciden"
                                }
                            //Al guardar actualiza los datos
                            Task {
                                let updatedUser = User(
                                    userId: modelUser.contentUser.userId,
                                    roleId: modelUser.contentUser.roleId,
                                    companyId: modelUser.contentUser.companyId,
                                    googleId: modelUser.contentUser.googleId,
                                    facebookId: modelUser.contentUser.facebookId,
                                    appleId: modelUser.contentUser.appleId,
                                    firstName: modelUser.contentUser.firstName,
                                    lastName: modelUser.contentUser.lastName,
                                    secondLastName: modelUser.contentUser.secondLastName,
                                    email: modelUser.contentUser.email,
                                    password: modelUser.contentUser.password,
                                    phoneNumber: modelUser.contentUser.phoneNumber,
                                    age: modelUser.contentUser.age,
                                    state: modelUser.contentUser.state,
                                    gender: modelUser.contentUser.gender,
                                    profilePicture: modelUser.contentUser.profilePicture,
                                    createdAt: modelUser.contentUser.createdAt,
                                    updatedAt: Date()
                                    
                                
                                )
                                //Updatear Usuarios
                                await modelUser.updateUserData(updatedUserData: updatedUser, userId: "0cca9c89-c38e-4350-ae31-9215741c8f11")
                                //Regresar a vista anterior
                                self.presentationMode.wrappedValue.dismiss()
                            }
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
                    .padding(.top, 10)

                    Spacer()

                }
                .padding(.top, 10)  //cambiar el espacio entre "Cerrar sesión" y tu formulario

                Spacer()
                
                
            }
            .onAppear {
                Task {
                    await modelUser.fetchUserById(idUser: "0cca9c89-c38e-4350-ae31-9215741c8f11")
                }
            }
        }
        
        
    }
}

struct EditProfileView_Previews: PreviewProvider {
    static var previews: some View {
        EditProfileView(modelUser: UserViewModel())
        
    }
}

