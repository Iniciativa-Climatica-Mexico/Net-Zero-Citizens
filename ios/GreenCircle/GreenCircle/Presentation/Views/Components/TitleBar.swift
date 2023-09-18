//
//  TitleBar.swift
//  GreenCircle
//
//  Created by Dan FuPo on 18/09/23.
//

import SwiftUI

struct TitleBar: View {
  Rectangle()
    .foregroundColor(.clear)
    .frame(width: 375, height: 53)
    .background(Color(red: 0.33, green: 0.49, blue: 0.55))
    .offset(x: 0, y: -438.50)
  Text("Green Circle")
    .font(Font.custom("Roboto", size: 17).weight(.medium))
    .foregroundColor(.white)
    .offset(x: -0.50, y: -436.50)
}

struct TitleBar_Previews: PreviewProvider {
  static var previews: some View {
    TitleBar()
  }
}
