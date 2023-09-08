//
//  ProfileInformationView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//

import SwiftUI

struct ProfileInformationView: View {
        @State private var firstName: String = "Frida"
        @State private var lastName: String = "Bailleres"
        @State private var secondLastName: String = "González"
        @State private var sex: String = "Femenino"
        @State private var phoneNumber: String = "442 490 2772"
        @State private var state: String = "QRO."
        @State private var password: String = "MeGustaDanielH"
        @State private var email: String = "bailleres.frida@gmail.com"
        @State private var age: Int = 20
        @State private var profilePicture: Image = Image("profile_placeholder")
    
    var body: some View {
        
        VStack {
            // TitleBarView (No forma parte del ScrollView)
            TitleBarView(
                title: "Mis Datos",
                leftIcon: nil,  // Nombre SF Symbol para ícono izquierdo
                rightIcon: "pencil",            // Nombre SF Symbol para ícono derecho
                leftDestination: {  },  // View a la que se navegará con el ícono izquierdo
                rightDestination: { ProfileInformationView()}                 // View a la que se navegará con el ícono derecho
            )
            .frame(height: 55)  // Espacio entre el titel bar y el contenido
            .navigationBarBackButtonHidden(true)  // Ocultar botón "back" predeterminado
            .offset(y: -60)  // Ajustar TitleBar a la altura correcta
            
            VStack {
                        profilePicture
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 103, height: 103)
                            .clipShape(Circle())
                            .overlay(Circle().stroke(TitleBarColor.TitleBarColor, lineWidth: 1))
                        
                HStack{
                            Text(firstName)
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .bold()
                                .padding(.top, 12)
                    
                            Text(lastName)
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .fontWeight(.semibold)
                                .padding(.top, 12)
                                .padding(.bottom, 2)
                    
                        }
                
                        NavigationLink("Cerrar Sesión",destination: Example2View())
                                .foregroundColor(TitleBarColor.TitleBarColor)
                                .font(.system(size: 13))
                                .fontWeight(.bold)
                            

                    }
                    .onAppear {
                        // Aquí tendrías que reemplazar "Nombre Apellido" y "profile_placeholder" con la información real del usuario loggeado
                        // Suponiendo que tienes una función 'fetchUserProfile' que establece los valores de 'userName' y 'userImage' con los datos del usuario
                        // fetchUserProfile()
                    }
            
            
            
            
            // ScrollView (Esta parte sí se desplaza)
            ScrollView {
                VStack(alignment: .leading) {
                   
                //Text Field Nombre
                    Text("Nombre")
                        .padding(.top, 16)
                        .foregroundColor(.black)
                        .font(.system(size: 13))
                        .fontWeight(.semibold)
                    
                    TextField("Nombre", text:$firstName)
                        .disabled(true)
                        .padding(.top, 3)
                        .font(.system(size: 13))
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .foregroundColor(.gray)
                    
                //Text Field Primer Apellido
                    Text("Primer Apellido")
                        .padding(.top, 16)
                        .foregroundColor(.black)
                        .font(.system(size: 13))
                        .fontWeight(.semibold)
                    
                    TextField("Primer Apellido", text:$lastName)
                        .disabled(true)
                        .padding(.top, 3)
                        .font(.system(size: 13))
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .foregroundColor(.gray)
                    
                    //Text Field Segundo Apellido
                        Text("Segundo Apellido")
                            .padding(.top, 16)
                            .foregroundColor(.black)
                            .font(.system(size: 13))
                            .fontWeight(.semibold)
                        
                        TextField("Segundo Apellido", text:$secondLastName) //Cambiar
                            .disabled(true)
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .foregroundColor(.gray)
                    
                    HStack{
                        
                        VStack{
                            Text("Edad")
                                .padding(.top, 16)
                                .foregroundColor(.black)
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                                .padding(.leading, -75)
                            
                            TextField("Edad", text:$sex) //Cambiar
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
                        }
    
                        
                        VStack{
                            Text("Sexo")
                                .padding(.top, 16)
                                .foregroundColor(.black)
                                .font(.system(size: 13))
                                .fontWeight(.semibold)
                                .padding(.leading, -75)
                            
                            TextField("Sexo", text:$sex) //Cambiar
                                .disabled(true)
                                .padding(.top, 3)
                                .font(.system(size: 13))
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .foregroundColor(.gray)
                            
                        }
                        
                    

                    }
                    
                    //Text Field Email
                        Text("Correo Electrónico")
                            .padding(.top, 16)
                            .foregroundColor(.black)
                            .font(.system(size: 13))
                            .fontWeight(.semibold)
                        
                        TextField("Correo Electrónico", text:$email) //Cambiar
                            .disabled(true)
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .foregroundColor(.gray)
                    
                    
                    //Text Field Email
                        Text("Estad")
                            .padding(.top, 16)
                            .foregroundColor(.black)
                            .font(.system(size: 13))
                            .fontWeight(.semibold)
                        
                        TextField("Estado", text:$state) //Cambiar
                            .disabled(true)
                            .padding(.top, 3)
                            .font(.system(size: 13))
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .foregroundColor(.gray)
                    
                   
                    
                    



    
                }
                .padding() // Agrega padding alrededor del VStack

            }
        }

    }
}

struct ProfileInformationView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileInformationView()
    }
}
