//
//  CompanyRegisterDividerView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 25/09/23.
//

import Foundation
import SwiftUI

struct CompanyRegisterDividerView: View {
  var goUploadCompanyFiles: (Binding<Bool>, Binding<Bool>) -> Void
    
  @Binding var photovoltaicToggle: Bool
  @Binding var solarToggle: Bool
  @State private var showAlert: Bool = false

  @EnvironmentObject var userData: UserData
  var body: some View {
    VStack(alignment: .leading) {
      VStack {
        CompanyRegisterHeaderView()
          .padding(.bottom, 10)
        Divider().padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
      }.padding(.bottom, 55)
      
      VStack(spacing: 40) {
        ZStack {
          RoundedRectangle(cornerRadius: 10)
            .fill(.gray).opacity(0.1)
            .frame(maxWidth: 270, maxHeight: 50)
            .padding(.horizontal)
          HStack {
            Toggle(isOn: $photovoltaicToggle){
              Text("Sistemas Fotovoltaicos")
            }.toggleStyle(SwitchToggleStyle(tint: Color("GreenCustom")))
          }.foregroundColor(Color("GreenCustom"))
            .frame(maxWidth: 255).padding()
        }

        ZStack {
          RoundedRectangle(cornerRadius: 10)
            .fill(.gray).opacity(0.1)
            .frame(maxWidth: 270, maxHeight: 50)
          HStack {
            Toggle(isOn: $solarToggle){
              Text("Calentadores Solares")
            }.toggleStyle(SwitchToggleStyle(tint: Color("GreenCustom")))
          }.foregroundColor(Color("GreenCustom"))
            .frame(maxWidth: 255).padding()
        }

        
      }.frame(maxWidth: .infinity, alignment: .center)

      Spacer()
      HStack {
        Spacer()
        MainButton("Continuar", action: {
            if photovoltaicToggle || solarToggle {
              goUploadCompanyFiles($photovoltaicToggle,$solarToggle)
            } else {
              showAlert = true
            }
          })
        .padding(.horizontal)
        .alert(isPresented: $showAlert) {
          Alert(title: Text("Error"),
                message: Text("Selecciona al menos uno"),
                dismissButton: .default(Text("Okay!"))
          )
        }
        Spacer()
      }
    }
  }
}
