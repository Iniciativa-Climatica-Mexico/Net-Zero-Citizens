//
//  ComplaintsRepository.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 27/09/23.
//

import Foundation

/// Class representing the structure of the API for complaints
class ComplaintAPI {
  static let base = APIRoutes.Complaint.base
  struct Routes {
    //static let create = "/:userId/:companyId"
    static let create = "/create"
  }
}

/// Protocol with the functions of the complaints repository
protocol ComplaintRepositoryProtocol {
  func postComplaint(complaint: PostComplaintData) async
    func fetchComplaintById(complaintId: UUID) async -> Complaint?
  // You can add more functions here if you like.
}

/// Class with the functions of the complaints repository
class ComplaintRepository: ComplaintRepositoryProtocol {
    /// Initialization of backend service
    let service: NetworkAPIService
    /// Initialization of singleton of complaint repository
    static let shared = ComplaintRepository()
    let uRepositoty = UserRepository()
    /// Constructor that takes the value of the backend service
    init(service: NetworkAPIService = NetworkAPIService.shared) {
        self.service = service
    }
    
    /// Fetch complaint by UUID by calling the method of the backend service
    /// - Parameters: UUID of the complaint
    /// - Returns: Complaint model
    func fetchComplaintById(complaintId: UUID) async -> Complaint? {
        return await service
            .getRequest(URL(string:
                                "\(ComplaintAPI.base)/\(complaintId.uuidString.lowercased())")!)
    }
    
    /// Function that calls the connection service with the API to post a new complaint
    /// - Parameters:
    ///   - authToken: authentication token
    ///   - complaint: the object with the information of the complaint
    func postComplaint(complaint: PostComplaintData) async {
        let userId = uRepositoty.getAuthData()!.user.uuid
        //Hacerla no hardcodeada
        
        let body: [String: Any] = [
            "complaint": [
                "userId": userId,
                "companyId": complaint.companyId.lowercased(),
                "complaintSubject": complaint.complaintSubject,
                "complaintDescription": complaint.complaintDescription ?? "",
                "complaintStatus": "active"
            ] as [String : Any]
        ]
        
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: body, options: .prettyPrinted)
            print(String(data: jsonData, encoding: .utf8) ?? "Invalid JSON")
        } catch {
            print("Error encoding JSON: \(error)")
        }
        
        //let enpoint = "\(ComplaintAPI.base)/\(userId)/\(companyId)"
        let enpoint = "\(ComplaintAPI.base)\(ComplaintAPI.Routes.create)"
        print("Enpoint: \(enpoint)")
        let _: NoResponse? = await NetworkAPIService.shared
            .postRequest(URL(string: enpoint)!, body: body)
        
        // http://localhost:4000/api/v1/complaints/:userId/:complaintId
    }

  // If you need functions to fetch all complaints or other operations,
  // you can add them below in a similar fashion as `CompanyRepository`.
}
