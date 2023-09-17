import SwiftUI

struct ProfileInformationView: View {
    
    @ObservedObject var modelUser: UserViewModel
    
    var body: some View {
        ZStack {
            //Title Bar
            VStack {
                TitleBarView(
                    title: "Mis Datos",
                    leftIcon: nil,
                    rightIcon: "pencil",
                    leftDestination: {  },
                    rightDestination: { EditProfileView(modelUser: UserViewModel()) }
                )
                .frame(height: 10)
                .navigationBarBackButtonHidden(true)
                .offset(y: -60)
                
                Spacer() // Esto empuja el TitleBarView hacia arriba
            }
            //Content
            VStack {
                VStack {
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
                    .padding(.top, 15) // Añade padding para mover el texto hacia abajo un poco

                    NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
                        .foregroundColor(TitleBarColor.TitleBarColor)
                        .font(.system(size: 13))
                        .fontWeight(.bold)
                        .padding(.top, 8) // Añade padding para separar el botón del texto
                    
                }
                .padding(.top, 150)
                
                Button(action: {
                    // Acción del primer botón
                }) {

                    NavigationLink(destination: EditProfileView(modelUser: UserViewModel())) {
                           Text("Editar")
                            .foregroundColor(.white)
                            .padding(.vertical, 10) // Reduce el padding vertical para hacer el botón menos largo
                            .padding(.horizontal)
                            .frame(maxWidth: .infinity)
                            .background(TitleBarColor.TitleBarColor)
                            .cornerRadius(8)
                       }
                }
                .padding(.top, 16) // Aumenta el padding superior para separarlo más del botón de "Cerrar sesión"
                .padding(.horizontal, 130) // Añade padding horizontal para hacer el botón menos ancho

                ScrollView {
                    VStack(alignment: .leading) {
                        Group {
                            Text("Nombre")
                                 .padding(.top, 16)
                                 .foregroundColor(Color("GreenColor"))
                                 .font(.system(size: 13))
                                 .fontWeight(.semibold)
                                
                            
                            TextField("Nombre", text: $modelUser.contentUser.firstName)
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
                            
                        }
                        
                        Group {
                            Text("Primer Apellido")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            
                            TextField("Primer Apellido", text: $modelUser.contentUser.lastName)
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
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
                            .disabled(true)
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .foregroundColor(.gray)
                            
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
                                        .fill(Color("GrayColor"))
                                        .overlay(RoundedRectangle(cornerRadius: 5)
                                                    .stroke(Color.gray, lineWidth: 0.1))
                                        .frame(height: 30)
                                    
                                    Picker("Edad", selection: $modelUser.contentUser.age) {
                                        ForEach(0..<100) { i in
                                            Text("\(i)").tag(i)
                                        }
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .disabled(true)
                                    .padding(.top, 3)
                                    .font(.system(size: 10))
                                    .padding(.leading, -15)
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
                                        .fill(Color("GrayColor"))
                                        .overlay(RoundedRectangle(cornerRadius: 5)
                                                    .stroke(Color.gray, lineWidth: 0.1))
                                        .frame(height: 30)
                                    
                                    Picker("Sexo", selection: $modelUser.contentUser.sex) {
                                        Text("Femenino").tag("Femenino")
                                        Text("Masculino").tag("Masculino")
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .disabled(true)
                                    .padding(.top, 3)
                                    .font(.system(size: 11))
                                    .padding(.leading, -15)
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
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
                        }
                        
                        Group {
                            Text("Celular")
                                .padding(.top, 16)
                                .foregroundColor(Color("GreenColor"))
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                            
                            TextField("Celular", text: $modelUser.contentUser.phoneNumber)
                                .keyboardType(.phonePad)
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
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
                                        .fill(Color("GrayColor"))
                                        .overlay(RoundedRectangle(cornerRadius: 5)
                                                    .stroke(Color.gray, lineWidth: 0.1))
                                        .frame(height: 30)
                                    
                                    Picker("Estado", selection: $modelUser.contentUser.state) {
                                        ForEach([
                                            "Aguascalientes",
                                            "Baja California",
                                            "Baja California Sur",
                                            "Campeche",
                                            "Chiapas",
                                            "Chihuahua",
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
                                    .disabled(true)
                                    .padding(.top, 3)
                                    .padding(.leading, -15)
                                    .font(.system(size: 11))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }
                            }
                        }

                        
                    }
                    .padding()
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

struct ProfileInformationView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileInformationView(modelUser: UserViewModel())
    }
}

