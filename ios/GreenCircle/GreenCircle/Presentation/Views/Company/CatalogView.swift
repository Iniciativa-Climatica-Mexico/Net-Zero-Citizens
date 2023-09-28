//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import SwiftUI


struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  @State var availableProducts = false

    var body: some View {
            NavigationStack {
                List(viewModel.companies) { company in
                    ZStack {
                        NavigationLink(destination: ContactCompanyView(idCompany: company.companyId)) {
                            EmptyView()
                        }.buttonStyle(PlainButtonStyle())
                        
                        RoundedRectangle(cornerRadius: 15, style: .continuous)
                            .fill(Color.white)
                            .shadow(color: .gray.opacity(0.2), radius: 5, x: 0, y: 5)
                            .frame(width: 350, height: 160)

                        HStack(spacing: 15) {
                            if let imageURL = URL(string: company.images?.first?.imageUrl ?? "") {
                                AsyncImage(url: imageURL) { phase in
                                    switch phase {
                                    case .empty:
                                        Image(systemName: "square.fill")
                                            .resizable()
                                            .frame(width: 80, height: 80)
                                            .foregroundColor(.gray.opacity(0.5))
                                            .cornerRadius(10)
                                    case .success(let image):
                                        image
                                            .resizable()
                                            .scaledToFit()
                                            .cornerRadius(10)
                                            .frame(width: 80, height: 80)
                                    case .failure:
                                        Text("Error")
                                    @unknown default:
                                        fatalError()
                                    }
                                }
                            } else {
                                Image(systemName: "square.fill")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                                    .foregroundColor(.gray.opacity(0.5))
                                    .cornerRadius(10)
                            }

                            VStack(alignment: .leading, spacing: 5) {
                                Text(company.name)
                                    .font(.system(size: 16))
                                    .fontWeight(.bold)
                                    .foregroundColor(.black)

                                HStack(spacing: 2) {
                                    Image(systemName: "location.fill")
                                        .foregroundColor(.green)
                                    Text("\(company.streetNumber ?? "") \(company.street ?? "")")
                                        .foregroundColor(.green)
                                        .font(.footnote)
                                }

                                HStack(spacing: 2) {
                                    ForEach(0..<5) { index in
                                        Image(systemName: index < 3 ? "star.fill" : "star")
                                            .foregroundColor(.green)
                                    }
                                    Text("(0)") // este '0' puede ser reemplazado con el número real de reseñas en el futuro
                                        .foregroundColor(.green)
                                        .font(.footnote)
                                }
                            }

                            Spacer()

                            Image(systemName: "heart")
                                .foregroundColor(.gray)

                        }.padding(.horizontal, 25)
                    }
                    .listRowSeparator(.hidden)
                    .listRowInsets(.init(top: 10, leading: 10, bottom: 10, trailing: 10))
                    .padding(.vertical, 5)
                }
                .padding(EdgeInsets(top: 0, leading: 2, bottom: 0, trailing: 2))
                .listRowInsets(.init(top: 10, leading: 10, bottom: 0, trailing: 10))
                .listStyle(.plain)
                .navigationTitle("Proveedores")
                .navigationBarTitleDisplayMode(.inline)
            }
            .accentColor(.white)
            .onAppear {
                Task {
                    await viewModel.fetchAllCompanies()
                }
            }
        }
    
}
    


