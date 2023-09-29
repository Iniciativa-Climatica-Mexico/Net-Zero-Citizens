//
//  CompanyUploadFilesView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 25/09/23.
//

import Foundation
import SwiftUI


struct CompanyUploadFilesView: View {
  var goPending: () -> Void

  @Binding var photovoltaicToggle: Bool
  @Binding var solarToggle: Bool
  
  var body: some View {
    // TODO: ScrollView showing content depending on bindings
    // TODO: Also, get Company Observable object and modify it
    VStack {
      if photovoltaicToggle && !solarToggle {
//        CompanyFileInput(title: "Example Title", description: "Example Description", viewModel: CompanyViewModel())
      } else if solarToggle && !photovoltaicToggle {
//        CompanyFileInput(title: "Example Title", description: "Example Description", viewModel: CompanyViewModel())
      }
      else {
//          CompanyFileInput(title: "Example Title", description: "Example Description", viewModel: CompanyViewModel())
      }
    }
  }
}
