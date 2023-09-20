<<<<<<< HEAD
//
//  CustomCornerImage.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import SwiftUI

struct RoundedCorner: Shape {
  var radius: CGFloat = .infinity
  var corners: UIRectCorner = .allCorners
  
  /// Realizar curvaturas de esquinas de imagenes
  /// regresa una figura aplicando esas curvaturas
  func path(in rect: CGRect) -> Path {
    let path = UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
    return Path(path.cgPath)
  }
}
/// Aplicación de curvaturas a esquinas de vista
/// - Parameters: radio, y esquinas a curvar
extension View {
  func roundedCorner(_ radius: CGFloat, corners: UIRectCorner) -> some View {
    clipShape(RoundedCorner(radius: radius, corners: corners) )
  }
}
=======

>>>>>>> a4abd9313522219223a693d043bfb7277282e554
