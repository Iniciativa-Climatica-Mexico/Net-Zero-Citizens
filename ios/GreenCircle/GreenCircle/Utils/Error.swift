//
//  Error.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

/// Error personalizado para uso dentro de la app
enum GCError: Error {
  case requestFailed
  case validationError(String)
}
