//
//  MailContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/10/23.
//

import Foundation
import SwiftUI

struct MailContactCompanyView : View {
  var email: String
  
  var body: some View {
    HStack{
      Image(systemName: "envelope")
      Text(email)
    }.contextMenu {
      ShareLink(item: email) {
        Label("Compartir: \(email)", systemImage:  "square.and.arrow.up")
      }
    }
  }
}
