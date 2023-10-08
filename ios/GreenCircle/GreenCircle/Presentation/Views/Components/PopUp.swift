//
//  PopUp.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 02/10/23.
//

import Foundation
import SwiftUI

struct PopUpView: View {
  
  @Binding var showPopUp: Bool
  @Binding var messagePopUp: String
  @Binding var showSuccess: Bool
  @Binding var deleteOperation: Bool
  var body: some View {
    if $showPopUp.wrappedValue {
      ZStack {
        Color.white
        VStack {
          if showSuccess {
            Text("Felicidades").font(.system(size: 22))
          } else {
            Text("¿Estás seguro?").font(.system(size: 22))
          }
          Spacer()
          Text(messagePopUp)
            .multilineTextAlignment(.center)
          Spacer()
          Button(action: {
            if showSuccess {
              showPopUp = false
            }
          }, label: {
            VStack {
              Divider()
              if showSuccess {
                Text("Close")
              } else {
                HStack {
                  Button(action: {
                    deleteOperation = false
                    showPopUp = false
                  }, label: {
                    Text("Cancelar")
                  }).zIndex(10)
                  Divider()
                  Button(action: {
                    deleteOperation = true
                    showPopUp = false
                  }, label: {
                    Text("Eliminar")
                      .foregroundColor(.red)
                  }).zIndex(10)
                }.frame(maxHeight: 15)
                .zIndex(6)
              }
            }
          })
          .zIndex(4)
        }.padding()
      }
      .frame(width: 250, height: 180, alignment: .center)
      .cornerRadius(10).shadow(radius: 20)
    }
  }
}
