//
//  RatingCompanyView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 13/09/23.
//

import SwiftUI

struct ScrollViewRating: View {
    @Binding var dispScrollView: Bool
    @Binding var isPressed: [String: Bool]
    
    var body: some View {
        if dispScrollView && !isPressed["Producto", default: false] && !isPressed["Contacto", default: false] {
            ScrollView {
                VStack {
                    HStack {
                        CustomButtonOption(isPressed: $isPressed, content: "Producto")
                        CustomButtonOption(isPressed: $isPressed, content: "Contacto")
                        CustomButtonOption(isPressed: $isPressed, content: "Reviews")
                    }
                }
            }
        } else {
            ContactCompanyView().onAppear { dispScrollView = false }
        }
    }
}
