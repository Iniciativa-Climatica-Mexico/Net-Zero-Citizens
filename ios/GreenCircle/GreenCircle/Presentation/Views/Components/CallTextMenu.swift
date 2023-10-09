//
//  CallTextMenu.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/10/23.
//

import Foundation
import SwiftUI

struct CallTextMenuView: View {
  var phone: String
  var body: some View {
    HStack {
      Image(systemName: "phone")
      Text("Número telefónico: " + phone)
    }.contextMenu {
      Button {
        if let phoneURL = URL(string: ("tel://" + (phone))) {
          if UIApplication.shared.canOpenURL(phoneURL) {
            UIApplication.shared.open(phoneURL)
          } else {
            print("Can't open url on this device")
          }
        }
      } label:  {
        Label("Llamar a: \(phone)", systemImage: "phone")
          .padding()
      }
    }
  }
}
