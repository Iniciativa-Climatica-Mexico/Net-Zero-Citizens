//
//  ComplaintModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 27/09/23.
//

import Foundation

struct Complaint: Codable {
    let complaintId: UUID
    let userId: UUID
    let companyId: UUID
    let complaintSubject: String
    let complaintDescription: String
    let complaintStatus: String
}
