//
//  EditProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 14/09/23.
//

import SwiftUI

struct EditProfileView: View {
    @ObservedObject var modelUser: UserViewModel
    @State private var showAlert = false

    var body: some View {
        ZStack {
            // Title Bar
            VStack {
                TitleBarView(
                    title: "Editar Datos",
                    leftIcon: "chevron.left",
                    rightIcon: nil,
                    leftDestination: { ProfileView(modelUser: UserViewModel())
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
                  

                    NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
                        .foregroundColor(TitleBarColor.TitleBarColor)
                        .font(.system(size: 13))
                        .fontWeight(.bold)
                        .padding(.top, 8) // Añade padding para separar el botón del texto
                }
                .padding(.top, 70)
                ScrollView {
                    VStack(alignment: .leading) {
                        Group {
                            Text("Nombre")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Nombre", text: $modelUser.contentUser.firstName)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        Group {
                            Text("Primer Apellido")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Primer Apellido", text: $modelUser.contentUser.lastName)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        Group {
                            Text("Segundo Apellido")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Segundo Apellido", text: Binding(get: {
                            modelUser.contentUser.secondLastName ?? "Segundo Apellido"
                            }, set: { newValue in
                                modelUser.contentUser.secondLastName = newValue
                            }))
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        
                        HStack {
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
                                        ForEach(0..<100) { i in
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
                                    Picker("Sexo", selection: $modelUser.contentUser.sex) {
                                        Text("Femenino").tag("Femenino")
                                        Text("Masculino").tag("Masculino")
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .padding(.top, 3)
                                    .padding(.leading, -15)
                                    .font(.system(size: 11))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }
                            }
                        }
                        Group {
                            Text("Correo Electrónico")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            TextField("Correo Electrónico", text: $modelUser.contentUser.email)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                        }
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
                                        ForEach([
                                            "Aguascalientes",
                                            "Baja California",
//                                            "Baja California Sur",
//                                            "Campeche",
//                                            "Chiapas",
//                                            "Chihuahua",
//                                            "Ciudad de México",
//                                            "Coahuila",
//                                            "Colima",
//                                            "Durango",
//                                            "Estado de México",
//                                            "Guanajuato",
//                                            "Guerrero",
//                                            "Hidalgo",
//                                            "Jalisco",
//                                            "Michoacán",
//                                            "Morelos",
//                                            "Nayarit",
//                                            "Nuevo León",
//                                            "Oaxaca",
//                                            "Puebla",
//                                            "Querétaro",
//                                            "Quintana Roo",
//                                            "San Luis Potosí",
//                                            "Sinaloa",
//                                            "Sonora",
//                                            "Tabasco",
//                                            "Tamaulipas",
//                                            "Tlaxcala",
//                                            "Veracruz",
//                                            "Yucatán",
//                                            "Zacatecas"
                                        ], id: \.self) { estado in
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
                    HStack {
                        Button(action: {
                            showAlert = true
                        }) {
                            Text("Cancelar")
                                .foregroundColor(TitleBarColor.TitleBarColor)
                                .padding(.vertical, 16)
                                .padding(.horizontal)
                                .frame(maxWidth: .infinity)
                                .background(Color.white)
                                .cornerRadius(8)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 8)
                                        .stroke(TitleBarColor.TitleBarColor, lineWidth: 1)
                                )
                        }
                        .padding(.trailing, 4)
                        .alert(isPresented: $showAlert) {
                            Alert(
                                title: Text("Salir sin guardar"),
                                message: Text("Si sales, los datos actualizados no se guardarán. ¿Estás seguro de que quieres salir?"),
                                primaryButton: .default(Text("Cancelar")),
                                secondaryButton: .destructive(Text("Salir"), action: {
                                    //Falta implementar
                                })
                            )
                        }
                        
                        
                        Button(action: {
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
                                    sex: modelUser.contentUser.sex,
                                    profilePicture: modelUser.contentUser.profilePicture,
                                    createdAt: modelUser.contentUser.createdAt,
                                    updatedAt: Date()
                                    
                                
                                )
                                await modelUser.updateUserData(updatedUserData: updatedUser, userId: "abcd-1234-efgh-5679")
                            
                                
                            }
                        }) {
                            Text("Guardar")
                                .foregroundColor(.white)
                                .padding(.vertical, 16)
                                .padding(.horizontal)
                                .frame(maxWidth: .infinity)
                                .background(TitleBarColor.TitleBarColor)
                                .cornerRadius(8)
                        }
                        .padding(.leading, 4) // Añade padding para crear espacio entre los botones
                    }
                    .padding(.horizontal, 20) // Añade padding horizontal para que los botones no lleguen hasta el borde de la vista
                    .padding(.top, 24) // Reduciendo el padding top para acercar los botones

                    Spacer()

                }
                .padding(.top, 10)  // Ajusta este valor para cambiar el espacio entre "Cerrar sesión" y tu formulario

                Spacer()
                
                
            }
            .onAppear {
                Task {
                    await modelUser.fetchUserById(idUser: "abcd-1234-efgh-5679")
                }
            }
        }

    }
}

struct EditProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView(modelUser: UserViewModel())
    }
}
