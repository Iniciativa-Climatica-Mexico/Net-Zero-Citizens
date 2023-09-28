//
//  HideKeyboard.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 28/09/23.
//

import SwiftUI

extension View {
    func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}
