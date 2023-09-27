//
//  ComplaintViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 27/09/23.
//

import Foundation


/// Struct representando la información necesaria para crear una compañía en el backend
struct PostComplaintData {
    let complaintSubject: String
    let complaintDescription: String?
}

/// ViewModel de la vista del formulario para registrar compañía
class ComplaintViewModel: ObservableObject {
    var repository = ComplaintRepository.shared
    
    @MainActor
    func handleSubmit(complaintSubject: String, complaintDescription: String?) async {
        let complaintData = PostComplaintData(complaintSubject: complaintSubject, complaintDescription: complaintDescription)
        do {
            try validate(complaintData)
            await repository.postComplaint(complaint: complaintData)
        } catch {
            print("Error submitting complaint: \(error)")
        }
    }
    
    private func validate(_ data: PostComplaintData) throws {
        if data.complaintSubject.isEmpty {
            throw CustomError.mainError
        }
    }
}
