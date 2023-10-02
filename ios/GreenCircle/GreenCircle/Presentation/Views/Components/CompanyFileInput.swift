//
//  CompanyFileInput.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 26/09/23.
//

import SwiftUI
import UIKit
import MobileCoreServices

struct CompanyFileInput: View {
    var title: String
    var description: String
    
    @State private var isPickerPresented: Bool = false
    @State private var selectedFile: URL? = nil

    var body: some View {
        VStack{
            Divider()
            Button(action: {
                isPickerPresented = true
            }) {
                HStack{
                    VStack(alignment: .leading, spacing: 5) {
                        Text(title)
                            .foregroundColor(Color("GreenColor"))
                            .bold()
                            .font(.system(size: 14))
                            .padding(.leading, 30)
                            .truncationMode(.tail)
                        
                        Text(description)
                            .foregroundColor(Color("GrayColor"))
                            .font(.system(size: 10))
                            .padding(.leading, 30)
                            .truncationMode(.tail)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    
                    Image(systemName: "chevron.right")
                        .foregroundColor(Color("GreenColor"))
                        .padding(.trailing, 30)
                }
                .padding()
            }
            Divider()
        }
        .sheet(isPresented: $isPickerPresented, onDismiss:{}) {
            DocumentPicker()
        }
    }
}

struct DocumentPicker: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> some UIViewController {
        let documentPicker = UIDocumentPickerViewController(documentTypes: [kUTTypePDF as String], in: .import)
        return documentPicker
    }
    
    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {
        // Not needed for this use case
    }
}

struct CompanyFileInput_Previews: PreviewProvider {
    static var previews: some View {
        CompanyFileInput(title: "Example Title", description: "Example Description")
    }
}
