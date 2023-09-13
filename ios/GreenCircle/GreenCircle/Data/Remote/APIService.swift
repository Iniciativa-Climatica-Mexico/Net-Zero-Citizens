//
//  APIService.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

import Foundation
import Alamofire


class APIService: UserRepository {
    func fetchUserData(completion: @escaping (User?, Error?) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/v1/users/1") else {
            completion(nil, NSError(domain: "Invalid URL", code: 1, userInfo: nil))
            return
        }

        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                completion(nil, error)
                return
            }

            do {
                // Imprime los datos JSON crudos para ayudar a diagnosticar el problema
                print(String(data: data, encoding: .utf8) ?? "Could not print raw JSON")

                // Intenta decodificar los datos JSON a un objeto User
               let user = try JSONDecoder().decode(User.self, from: data)
                completion(user, nil)
            } catch let error {
                // Si la decodificación falla, imprime el error para saber qué salió mal
                print("Decoding error: \(error)")
                completion(nil, error)
            }
        }

        task.resume()
    }

}


