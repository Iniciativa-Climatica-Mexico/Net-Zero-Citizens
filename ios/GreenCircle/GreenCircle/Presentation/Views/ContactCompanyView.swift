//
//  ContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation
import SwiftUI

struct ContactCompanyView: View {
    @StateObject var contactCompanyViewModel = CompanyViewModel()
    
    var body: some View {
        VStack {
            Text(contactCompanyViewModel.contentCompany.email)
        }.onAppear {
            Task {
                await contactCompanyViewModel.getCompanyById(idCompany: 1)
            }
        }
    }
}
