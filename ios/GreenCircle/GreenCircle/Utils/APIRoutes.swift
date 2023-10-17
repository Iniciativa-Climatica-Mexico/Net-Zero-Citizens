//
//  APIRoutes.swift
//  GreenCircle
//
//  Created by Dan FuPo on 08/10/23.
//

import Foundation

//APIRoutes.baseURL
struct APIRoutes {
    static let baseURL = "http://localhost:4000/api/v1"
    
    struct Company {
        static let base = "\(baseURL)/company"
        static let create = "/create"
        static let assign = "/:companyId/assign"
        static let geocoding = "/geocoding"
      static let addProduct = "/:companyId/add/products"
    }
    
    struct Complaint {
        static let base = "\(baseURL)/complaints"
        static let create = "/create"
    }
    
    struct EcoInfo {
        static let base = "\(baseURL)/ecoInfo"
        static let ecoInfo = "/ecoInfo/"
    }
    
    struct Favourite {
        static let base = "\(baseURL)/favourites"
        static let post = "/create"
        static let delete = "/delete/:companyId/user/:userId"
        static let getAll = "/user/:userId"
        static let get = "/:favouriteId"
    }
    
    struct Survey {
        static let base = "\(baseURL)/survey"
        static let pending = "/pending/:userId"
        static let submitSurvey = "/:surveyId/answer/:userId"
    }
    
    struct Auth {
        static let base = "\(baseURL)/auth"
        static let googleLogin = "/login/google"
        static let login = "/login/credentials"
        static let register = "/register/credentials"
    }
    
    struct User {
        static let base = "\(baseURL)/users"
        static let userId = "/:userId"
        static let credentials = "/users/credentials"
    }
    
    struct Review {
        static let base = "\(baseURL)/review"
        static let companyReview = "/:company"
        static let userReview = "/:user"
        static let postReview = "/company"
    }
}

