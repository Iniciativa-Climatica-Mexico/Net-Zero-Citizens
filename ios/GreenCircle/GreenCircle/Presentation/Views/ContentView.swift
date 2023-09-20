//
//  ContentView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import SwiftUI



struct ContentView: View {
    @StateObject var contentViewModel = ContentViewModel()
    var body: some View {
                CardView()
        }
    
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
