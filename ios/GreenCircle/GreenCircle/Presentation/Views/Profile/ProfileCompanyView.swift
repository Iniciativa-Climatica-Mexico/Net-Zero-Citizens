//
//  ProfileCompanyView.swift
//  GreenCircle
//
//  Created by Diego Iturbe Bravo on 07/09/23.
//

import SwiftUI




struct ProfileCompanyView: View {
    @ObservedObject var modelCompany: CompanyViewModel

    var body: some View {
        
      NavigationView {
        ZStack {
          // Title Bar
          VStack {
            
            TitleBarView(
              title: "Mi Compañia",
              leftIcon: nil,
              rightIcon: "person.fill",
              leftDestination: {  },
              rightDestination: { EditProfileView(modelUser: UserViewModel()) }
            )
            .frame(height: 10)
            .offset(y: -60)
            .navigationBarBackButtonHidden(true)
            Spacer() // Esto empuja el TitleBarView hacia arriba
          }
          //----------------------Perfil-------------------------------
          VStack {
            
            //Imagen provicional
            Image("Sun")
              .resizable()// Hacer que la imagen sea redimensionable
              
              .frame(width: 115, height: 115)
              .aspectRatio(contentMode: .fit)
              .background()
              .cornerRadius(100)
              .shadow(color: .gray, radius: 2)
              
              //Nombre del usuario
              Text(  "SunCity Mexico" ) //modelCompany.contentUser.name)
                .foregroundColor(TitleBarColor.TitleBarColor)
                .font(.title)
                .fontWeight(.bold)
                .padding(.top, 10)
                .padding(.bottom, 2)

              
              Text(  "Soluciones de Energía renovable para la poblacion mexicana." ) //modelCompany.contentUser.description)
                  .foregroundColor(.black)
                .font(.body)
                .fontWeight(.semibold)
                .frame(maxWidth:270,alignment: .center)
                .multilineTextAlignment(.center)
                .padding(.top, 0)
                .padding(.bottom, 2)
              
              Text(  "Calz. de los Arcos 168-1, Loma Dorada, 76060")
                //modelCompany.contentUser.namestreet: "", streetNumber: zipCode: city: state:  )
                  .foregroundColor(.black)
                .font(.body)
                .fontWeight(.semibold)
                .frame(maxWidth:240,alignment: .center)
                .multilineTextAlignment(.center)
                .padding(.top, 0)

             Text(  "Santiago de Queretaro, Queretaro")
                     //modelCompany.contentUser.city: state:  )
                 .foregroundColor(.black)
               .font(.body)
               .fontWeight(.semibold)
               .frame(maxWidth:270,alignment: .center)
               .multilineTextAlignment(.center)
               .padding(.bottom, 2)
                                 //frame max height
            /*
            
             
            //Bot{on cerrar sesión con navegaci{on provicional
            NavigationLink("Cerrar Sesión", destination: Example2View())
              .foregroundColor(TitleBarColor.TitleBarColor)
              .font(.system(size: 13))
              .fontWeight(.bold)
              .padding(.top, 4)
            */
             
            //----------------Sección de Contacto------------------
            Text("Contacto")
                .font(.title3)
                .fontWeight(.bold)
                .padding(.top, 20)
                .padding(.leading)
                .foregroundColor(.black)
                .frame(maxWidth: .infinity, alignment: .leading)
              VStack {
                  Text("Telefono: 55 5929 5761 ")//viewModel.contentCompany.phone!))")
                      .padding(.leading)
                      .frame(maxWidth: .infinity, alignment: .leading)
                  Text("WhatsApp: 55 5929 5761 ")//viewModel.contentCompany.email!))")
                      .padding(.leading)
                      .frame(maxWidth: .infinity, alignment: .leading)
                  Text("Pagina Web: www.suncity.com.mx ")//viewModel.contentCompany.webPage!))")
                      .padding(.leading)
                      .frame(maxWidth: .infinity, alignment: .leading)
                      .foregroundColor(.black)
                  Text("Correo Electronico: sun@city.mx ")//viewModel.contentCompany.phone!))")
                      .padding(.leading)
                      .frame(maxWidth: .infinity, alignment: .leading)
              }
              .padding(.top,2)
              .padding(.leading)
              
              
              
              
            //----------------------Estrellas--------------------------
              HStack {
                ForEach(0..<5, id: \.self) { index in
                    Image(systemName: index < Int(4.0) ?  "star.fill" : "star")//viewModel.contentCompany.score!) ? "star.fill" : "star")
                }.foregroundColor(Color("GreenCustom"))
                  Text("\(Int(4.0)) / 5")//viewModel.contentCompany.score!))")
              }.font(.system(size: 20))
                .foregroundColor(Color("GreenCustom"))
                .padding(.top, 20)
                .padding(.bottom, 10)
            //----------------------Botones------------------------------
            
             // Button(action: {
                // Implementación futura
             // })
                
              NavigationLink(destination:  EditProfileView(modelUser: UserViewModel())) {
                Text("Editar perfil")
                  .foregroundColor(.white)
                  .padding(.vertical, 16)
                  .padding(.horizontal)
                  .frame(maxWidth: .infinity)
                  .background(TitleBarColor.TitleBarColor)
                  .cornerRadius(8)
              }
              .padding(.leading,10) // Añade padding para crear espacio entre los botones
             
              .padding(.horizontal, 100) // Añade padding horizontal para que los botones no lleguen hasta el borde de la vista
              
              .padding(.top, 24) // Reduciendo el padding top para acercar los botones
            
            
          }
          .padding(.top, 60)
          .frame(maxHeight:730,alignment: .topLeading)
          /*.onAppear {
            Task {
              await modelCompany.fetchCompanyById(idCompany: "46c8e4dd-3a65-472f-8ff0-5b8d017db6a7")
            }
          }*/
          
          
        }
        
        
        
        
       /* .onAppear {
          Task {
            // Nueva solicitud para obtener los datos actualizados del usuario
            do {
              await modelCompany.fetchCompanyById(idCompany: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
            }
          }*/
      }
        
    }
        
        
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileCompanyView(modelCompany: CompanyViewModel())

    }
}




