//
//  ContentView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 04/09/23.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            NavigationView {
                ProfileView(modelUser: UserViewModel())
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
       
    }
}
