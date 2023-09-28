//
//  RatingCompanyView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 13/09/23.
//  Modified by Diego Vega on 28/09/23.
//

import SwiftUI

struct ScrollViewRating: View {
  var idCompany: UUID
  @Binding var dispScrollView: Bool
  @Binding var isPressed: [String: Bool]
  
  var body: some View {
    NavigationStack {
      if dispScrollView && !isPressed["Producto", default: false] && !isPressed["Contacto", default: false] {
        ScrollView {
          VStack {
            HStack {
                CustomButtonOption(isPressed: $isPressed, content: "Producto")
                CustomButtonOption(isPressed: $isPressed, content: "Contacto")
                CustomButtonOption(isPressed: $isPressed, content: "Reviews")
            }
          }
          .padding(.top, 10)
        }
        .navigationTitle("Reviews!")
          .navigationBarTitleDisplayMode(.inline)
      } else {
        ContactCompanyView(idCompany: idCompany).onAppear { dispScrollView = false }
      }
    }
  }
}

struct ScrollViewRating_Previews: PreviewProvider {
    static var previews: some View {
        ScrollViewRating(idCompany: UUID(), dispScrollView: .constant(true), isPressed: .constant(["Producto": false, "Contacto": false]))
    }
}

//var body: some View {
//
//
//        if dispScrollView && !isPressed["Servicio", default: false] && !isPressed["Contacto", default: false] {
//            ScrollView {
//                VStack {
//                    HStack {
//                        CustomButtonOption(isPressed: $isPressed, content: "Servicio")
//                        CustomButtonOption(isPressed: $isPressed, content: "Contacto")
//                        CustomButtonOption(isPressed: $isPressed, content: "Reviews")
//                    }
//
//                    VStack(alignment: .leading) {
//                        Text("Califica al proveedor").font(.title)
//                        Text("Comparte tu opinion sobre este proveedor")
//
//                        HStack(alignment: .top, spacing: 10) {
//                            Spacer()
//
//                            StarRatingView(rating: $userRating)
//                                .customSectionPadding()
//
//                            Spacer()
//                        }
//                        .customSectionPadding()
//
//                        VStack {
//                            Text("Escribe una opinión")
//                                .font(.headline)
//                                .foregroundColor(Color("GreenCustom"))
//                                .onTapGesture {
//                                    isSecondViewPresented = true
//                                }
//                                .sheet(isPresented: $isSecondViewPresented) {
//                                    OpinionsView(userRating: $userRating)
//                                }
//                        }
//                        .customSectionPadding()
//
//                        Text("Opiniones del proveedor").font(.title)
//
//                        VStack {
//                                RatingView(rating: 4, numberOfReviews: 123)
//                            }
//
//                        Divider()
//
//                        VStack {
//
//                            ReviewCardProvider(reviewViewModel: ReviewViewModel(),
//                                               profilePicture: Image(systemName: "person.circle.fill"))
//
//                            ReviewCardProvider(reviewViewModel: ReviewViewModel(),
//                                               profilePicture: Image(systemName: "person.circle.fill"))
//
//                        }
//
//                    }
//                    .padding(EdgeInsets(top: 40, leading: 20, bottom: 0, trailing: 20))
//                }
//            }
//
//        } else {
//            ContactCompanyView().onAppear { dispScrollView = false }
//        }
//    }
//}

struct OpinionsView: View {
    @State private var title: String = ""
    @State private var description: String = ""
    @State private var isSubscribed: Bool = false
    @Binding var userRating: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Comparte tu opinión").font(.title).bold()
            
            Text("¿Cómo calificarías la atención y servicio del proveedor?")
            
            StarRatingView(rating: $userRating).padding().customSectionPadding()
            
            Text("Escribe una opinión").font(.title2).bold().padding(.top, 20)
            
            Text("(Opcional)")
            
            Text("Tus comentarios ayudan a otros usuarios a conocer mejor a un proveedor").customTextPadding()

            VStack(alignment: .leading, spacing: 10) {
                Text("Escribe un título para la opinión").foregroundColor(Color.gray).bold().padding(.top, 20)
                
                TextField("¿Cuál es la idea general?", text: $title)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
                
                Text("Danos tu opinión").foregroundColor(Color.gray).bold().padding(.top, 20)
                
                TextField("Describe tu experiencia", text: $description)
                    .padding().frame(height: 150)
                    .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
                
                Button(action: {
                    // Realiza la acción de envío del formulario
                    print("Formulario enviado")
                }) {
                    Text("Publicar")
                        .padding().frame(maxWidth: .infinity).background(Color("BlueCustom"))
                        .foregroundColor(.white).cornerRadius(10).customSectionPadding()
                }
            }
        }
        .padding(EdgeInsets(top: 20, leading: 20, bottom: 0, trailing: 20))
    }
}

// Components

struct RatingView: View {
    var rating: Int
    var numberOfReviews: Int
    
    var body: some View {
        HStack {
            VStack(alignment: .center) {
                Text(String(format: "%.1f", rating))
                    .font(.system(size: 60, weight: .bold, design: .default)).foregroundColor(Color("GreenCustom"))
                
                Spacer()
            }
            
            VStack(alignment: .leading) {
                HStack {
                    ForEach(0..<5) { index in
                        Image(systemName: index < Int(rating) ? "star.fill" : "star")
                            .foregroundColor(Color("GreenCustom"))
                    }
                }
                .font(.headline)
                
                Text("\(numberOfReviews) opiniones")
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
    }
}


struct StarView: View {
    @Binding var rating: Int
    let index: Int
    let label: String

    var body: some View {
        ZStack {
            VStack {
                Image(systemName: rating >= index ? "star.fill" : "star")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 40, height: 40)
                    .foregroundColor(Color("GreenCustom"))
                    .padding(.trailing, 20)
                    .onTapGesture {
                        rating = index
                    }
            }

            Text(label)
                .font(.caption)
                .offset(x: -10, y: 35)
        }
    }
}


struct StarRatingView: View {
    @Binding var rating: Int

    var body: some View {
            HStack {
                StarView(rating: $rating, index: 1, label: "Malo")
                ForEach(2...4, id: \.self) { index in
                    StarView(rating: $rating, index: index, label: "")
                }
                StarView(rating: $rating, index: 5, label: "Excelente")
            }
        }
}

// Utilities

extension View {
    func customSectionPadding() -> some View {
        return self.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    }
    func customTextPadding() -> some View {
        return self.padding(EdgeInsets(top: 7, leading: 0, bottom: 7, trailing: 0))
    }
}
