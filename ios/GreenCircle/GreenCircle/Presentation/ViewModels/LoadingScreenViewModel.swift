//
//  CoordinatorViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 26/09/23.
//

import Foundation

class LoadingScreenViewModel: ObservableObject {
    @Published var loader1 = true
    @Published var loader2 = false
  
    func hideLoaderAfterTime() {
        let time : CFTimeInterval = 5.45
        DispatchQueue.main.asyncAfter(deadline: .now() + time) {
            self.loader1 = false
            self.loader2 = true
        }
      }
    
}
