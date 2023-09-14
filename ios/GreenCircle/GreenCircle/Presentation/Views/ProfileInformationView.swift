import SwiftUI

struct ProfileInformationView: View {
    
    @ObservedObject var modelUser: UserViewModel
    
    var body: some View {
        ZStack {
            //Title Bar
            VStack {
                TitleBarView(
                    title: "Mis datos",
                    leftIcon: nil,
                    rightIcon: "pencil",
                    leftDestination: { },
                    rightDestination: { }
                )
                .frame(height: 10)
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
                            .bold()
                            .padding(.top, 12)
                        
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

                ScrollView {
                    VStack(alignment: .leading) {
                        Group {
                            Text("Nombre")
                                 .padding(.top, 16)
                                 .foregroundColor(.black)
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
                                .foregroundColor(.black)
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
                                .foregroundColor(.black)
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
                                    .foregroundColor(.black)
                                    .font(.system(size: 13))
                                    .fontWeight(.semibold)
                                
                                ZStack {
                                    RoundedRectangle(cornerRadius: 5)
                                        .stroke(Color.gray, lineWidth: 1)
                                        .frame(height: 34)
                                    
                                    Picker("Edad", selection: $modelUser.contentUser.age) {
                                        ForEach(0..<100) { i in
                                            Text("\(i)").tag(i)
                                        }
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .padding(.top, 3)
                                    .font(.system(size: 13))
                                    .foregroundColor(.gray)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }
                            }
                            .padding(.trailing, 16) // Añade un padding para separar los dos VStack
                            
                            VStack(alignment: .leading) {
                                Text("Sexo")
                                    .padding(.top, 16)
                                    .foregroundColor(.black)
                                    .font(.system(size: 13))
                                    .fontWeight(.semibold)
                                
                                ZStack {
                                    RoundedRectangle(cornerRadius: 5)
                                        .stroke(Color.gray, lineWidth: 0.5)
                                        .frame(height: 34)
                                    
                                    Picker("Sexo", selection: $modelUser.contentUser.sex) {
                                        Text("Femenino").tag("Femenino")
                                        Text("Masculino").tag("Masculino")
                                        // Añade aquí cualquier otra opción que desees
                                    }
                                    .pickerStyle(MenuPickerStyle())
                                    .padding(.top, 3)
                                    .font(.system(size: 13))
                                    .foregroundColor(.gray)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.horizontal, 10)
                                }
                            }
                        }


                        Group {
                            Text("Correo Electrónico")
                                .padding(.top, 16)
                                .foregroundColor(.black)
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
                                .foregroundColor(.black)
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
                    }
                    .padding()
                }
                .padding(.top, 15)  // Ajusta este valor para cambiar el espacio entre "Cerrar sesión" y tu formulario

                Spacer()
                
            }
            .onAppear {
                Task {
                    await modelUser.fetchUserById(idUser: "1")
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

