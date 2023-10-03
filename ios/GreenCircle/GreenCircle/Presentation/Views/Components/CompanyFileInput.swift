//
//  CompanyFileInput.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 26/09/23.
//

import SwiftUI
import UIKit
import MobileCoreServices
import UniformTypeIdentifiers


struct CompanyFileInput: View {
    var title: String
    var description: String
    var fileDescription: String
    var bulletPoint : String?
    
    @ObservedObject var viewModel: CompanyViewModel
    
    @State private var isPickerPresented: Bool = false
    @State private var selectedFile: Data? = nil

    var body: some View {
        VStack{
            Divider()
            Button(action: {isPickerPresented = true}) {
                HStack{
                    VStack(alignment: .leading, spacing: 5) {
                        Text(title)
                            .foregroundColor(Color("GreenColor"))
                            .bold()
                            .font(.system(size: 14))
                            .padding(.leading, 30)
                            .truncationMode(.tail)
                            .multilineTextAlignment(.leading)
                        Text(description)
                            .foregroundColor(Color("GrayColor"))
                            .font(.system(size: 10))
                            .padding(.leading, 30)
                            .truncationMode(.tail)
                        Text(bulletPoint ?? "")
                            .foregroundColor(Color("GrayColor"))
                            .font(.system(size: 10))
                            .padding(.leading, 30)
                            .multilineTextAlignment(.leading)
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
        .sheet(isPresented: $isPickerPresented, onDismiss:{
        }) {
            DocumentPicker(selectedFile: $selectedFile, viewModel: viewModel, fileDescription: fileDescription)
        }
    }
}

struct DocumentPicker: UIViewControllerRepresentable {
    @Environment(\.presentationMode) var presentationMode
    @Binding var selectedFile: Data?
    
    // Add these lines
    var viewModel: CompanyViewModel
    var fileDescription: String
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, UIDocumentPickerDelegate{
        let parent: DocumentPicker
        
        init (_ parent: DocumentPicker){
            self.parent = parent
        }
        
        func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
            do{
                Task{
                    let (data, _) = try await URLSession.shared.data(from: urls.first!)
                    parent.selectedFile = data
                    parent.presentationMode.wrappedValue.dismiss()
                    
                    // Move the file upload operation here
                    if let selectedFile = parent.selectedFile {
                        let mimeType = "application/pdf"
                        await parent.viewModel.uploadFile(file: selectedFile, fileDescription: parent.fileDescription, mimeType: mimeType) 
                    }
                }
            }
            catch{
                print("Invalid Data")
            }
        }
        
        func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
    
    func makeUIViewController(context: Context) -> some UIViewController {
        let documentPicker = UIDocumentPickerViewController(forOpeningContentTypes: [UTType.pdf], asCopy: true)
        documentPicker.delegate = context.coordinator
        return documentPicker
    }
    
    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {
        // Not needed for this use case
    }
}


struct CompanyFileInput_Previews: PreviewProvider {
    static var previews: some View {
        CompanyFileInput(title: "Example Title", description: "Example Description", fileDescription: "Curriculum", viewModel: CompanyViewModel())
    }
}
