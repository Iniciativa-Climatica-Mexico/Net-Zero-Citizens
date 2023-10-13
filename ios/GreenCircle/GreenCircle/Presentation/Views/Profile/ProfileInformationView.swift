//import SwiftUI
//
//struct ProfileInformationView: View {
//    
//    @ObservedObject var modelUser: UserViewModel
//    
//    var body: some View {
//
//        
//        ZStack {
//            //Title Bar
//            VStack {
//                TitleBarView(
//                    title: "Mis Datos",
//                    leftIcon: "chevron.left",
//                    rightIcon: "pencil",
//                    leftDestination: { ProfileView(modelUser: UserViewModel()) },
//                    rightDestination: { EditProfileView(modelUser: UserViewModel()) }
//                )
//                .frame(height: 10)
//                .navigationBarBackButtonHidden(true)
//                .offset(y: -60)
//                
//                Spacer() // Esto empuja el TitleBarView hacia arriba
//            }
//            //Content
//            VStack {
//                VStack {
//                    
//                    Image("Sun")
//                    .resizable() // Hacer que la imagen sea redimensionable
//                    .frame(width: 100, height: 100)
//                    
//                    HStack {
//                        Text(modelUser.contentUser.firstName)
//                            .foregroundColor(Color.black)
//                            .font(.system(size: 16))
//                            .fontWeight(.semibold)
//                            .padding(.top, 12)
//                            .padding(.bottom, 2)
//                        
//                        Text(modelUser.contentUser.lastName)
//                            .foregroundColor(Color.black)
//                            .font(.system(size: 16))
//                            .fontWeight(.semibold)
//                            .padding(.top, 12)
//                            .padding(.bottom, 2)
//                    }
//                   
//                    NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
//                        .foregroundColor(TitleBarColor.TitleBarColor)
//                        .font(.system(size: 13))
//                        .fontWeight(.bold)
//                        .padding(.top, 8) // Añade padding para separar el botón del texto
//                    
//                }
//                .padding(.top, 70)
//                
//                Button(action: {
//                    // Acción del primer botón
//                }) {
//
//                    NavigationLink(destination: EditProfileView(modelUser: UserViewModel())) {
//                           Text("Editar")
//                            .foregroundColor(.white)
//                            .padding(.vertical, 10) // Reduce el padding vertical para hacer el botón menos largo
//                            .padding(.horizontal)
//                            .frame(maxWidth: .infinity)
//                            .background(TitleBarColor.TitleBarColor)
//                            .cornerRadius(8)
//                       }
//                }
//                .padding(.top, 16) // Aumenta el padding superior para separarlo más del botón de "Cerrar sesión"
//                .padding(.horizontal, 130) // Añade padding horizontal para hacer el botón menos ancho
//
//                ScrollView {
//                    VStack(alignment: .leading) {
//                        Group {
//                            Text("Nombre")
//                                 .padding(.top, 16)
//                                 .foregroundColor(Color("Secondary"))
//                                 .font(.system(size: 13))
//                                 .fontWeight(.semibold)
//                                
//                            
//                            TextField("Nombre", text: $modelUser.contentUser.firstName)
//                                .disabled(true)
//                                .padding(.top, 3)
//                                .font(.system(size: 13))
//                                .textFieldStyle(RoundedBorderTextFieldStyle())
//                                .foregroundColor(.gray)
//                            
//                        }
//                        
//                        Group {
//                            Text("Primer Apellido")
//                                .padding(.top, 16)
//                                .foregroundColor(Color("Secondary"))
//                                .font(.system(size: 13))
//                                .fontWeight(.semibold)
//                            
//                            TextField("Primer Apellido", text: $modelUser.contentUser.lastName)
//                                .disabled(true)
//                                .padding(.top, 3)
//                                .font(.system(size: 13))
//                                .textFieldStyle(RoundedBorderTextFieldStyle())
//                                .foregroundColor(.gray)
//                        }
//                        
//                        Group {
//                            Text("Segundo Apellido")
//                                .padding(.top, 16)
//                                .foregroundColor(Color("Secondary"))
//                                .font(.system(size: 13))
//                                .fontWeight(.semibold)
//                            
//                            TextField("Segundo Apellido", text: Binding(get: {
//                            modelUser.contentUser.secondLastName ?? "Segundo Apellido"
//                            }, set: { newValue in
//                                modelUser.contentUser.secondLastName = newValue
//                            }))
//                            .disabled(true)
//                            .padding(.top, 3)
//                            .font(.system(size: 13))
//                            .textFieldStyle(RoundedBorderTextFieldStyle())
//                            .foregroundColor(.gray)
//                            
//                        }
//                        
//                        HStack {
//                            VStack(alignment: .leading) {
//                                Text("Edad")
//                                    .padding(.top, 16)
//                                    .foregroundColor(Color("Secondary"))
//                                    .font(.system(size: 13))
//                                    .fontWeight(.semibold)
//                                
//                                TextField("Edad", text: Binding(
//                                    get: { String(modelUser.contentUser.age) }, // Convierte Int a String
//                                    set: { newValue in
//                                        if let newAge = Int(newValue) {
//                                            modelUser.contentUser.age = newAge
//                                        }
//                                    }
//                                ))
//                                .keyboardType(.numberPad)
//                                .padding(.top, 3)
//                                .font(.system(size: 13))
//                                .textFieldStyle(RoundedBorderTextFieldStyle())
//                                .foregroundColor(.gray)
//                                .disabled(true)
//                            }
//                            .padding(.trailing, 16) // Añade un padding para separar los dos VStack
//                            
//                            VStack(alignment: .leading) {
//                                Text("Género")
//                                    .padding(.top, 16)
//                                    .foregroundColor(Color("Secondary"))
//                                    .font(.system(size: 13))
//                                    .fontWeight(.semibold)
//                                
//                                TextField("Género", text: $modelUser.contentUser.sex)
//                                    .keyboardType(.phonePad)
//                                    .disabled(true)
//                                    .padding(.top, 3)
//                                    .font(.system(size: 13))
//                                    .textFieldStyle(RoundedBorderTextFieldStyle())
//                                    .foregroundColor(.gray)
//                            }
//                        }
//
//
//                        Group {
//                            Text("Correo Electrónico")
//                                .padding(.top, 16)
//                                .foregroundColor(Color("Secondary"))
//                                .font(.system(size: 13))
//                                .fontWeight(.semibold)
//                            
//                            TextField("Correo Electrónico", text: $modelUser.contentUser.email)
//                                .disabled(true)
//                                .padding(.top, 3)
//                                .font(.system(size: 13))
//                                .textFieldStyle(RoundedBorderTextFieldStyle())
//                                .foregroundColor(.gray)
//                        }
//                        
//                        Group {
//                            Text("Celular")
//                                .padding(.top, 16)
//                                .foregroundColor(Color("Secondary"))
//                                .font(.system(size: 13))
//                                .fontWeight(.semibold)
//                            
//                            TextField("Celular", text: $modelUser.contentUser.phoneNumber)
//                                .keyboardType(.phonePad)
//                                .disabled(true)
//                                .padding(.top, 3)
//                                .font(.system(size: 13))
//                                .textFieldStyle(RoundedBorderTextFieldStyle())
//                                .foregroundColor(.gray)
//                        }
//                        
//                        Group {
//                            VStack(alignment: .leading) {
//                                Text("Estado")
//                                    .padding(.top, 16)
//                                    .foregroundColor(Color("Secondary"))
//                                    .font(.system(size: 13))
//                                    .fontWeight(.semibold)
//                                
//                                TextField("Estado", text: $modelUser.contentUser.state)
//                                    .keyboardType(.phonePad)
//                                    .disabled(true)
//                                    .padding(.top, 3)
//                                    .font(.system(size: 13))
//                                    .textFieldStyle(RoundedBorderTextFieldStyle())
//                                    .foregroundColor(.gray)
//                            }
//                        }
//
//                        
//                    }
//                    .padding()
//                }
//                .padding(.top, 10)  // Ajusta este valor para cambiar el espacio entre "Cerrar sesión" y tu formulario
//
//                Spacer()
//                
//            }
//            .onAppear {
//                Task {
//                    await modelUser.fetchUserById(idUser: "abcd-1234-efgh-5679")
//                }
//            }
//        }
//        .onAppear {
//            Task {
//                // Realizar una nueva solicitud para obtener los datos actualizados del usuario
//                do {
//                    await modelUser.fetchUserById(idUser: "abcd-1234-efgh-5679")
//                }
//            }
//        }
//    }
//    
//    
//}
//
//struct ProfileInformationView_Previews: PreviewProvider {
//    static var previews: some View {
//        ProfileInformationView(modelUser: UserViewModel())
//    }
//}
//


