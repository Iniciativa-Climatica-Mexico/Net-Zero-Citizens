//
//  CompanyUploadFilesView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 25/09/23.
//

//import Foundation
//import SwiftUI
//
//
//struct CompanyUploadFilesView: View {
//  var goPending: () -> Void
//
//  @Binding var photovoltaicToggle: Bool
//  @Binding var solarToggle: Bool
//
//  var body: some View {
//    // TODO: ScrollView showing content depending on bindings
//    // TODO: Also, get Company Observable object and modify it
//    VStack {
//      if photovoltaicToggle && !solarToggle {
//
//      } else if solarToggle && !photovoltaicToggle {
//      }
//      else {
//      }
//    }
//  }
//}


//
//  CompanyFilesView.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 26/09/23.
//

import SwiftUI


///__------------SECCIÓN 1---------
struct FirstSection: View {
  @State var ineUploaded: Bool = false
  @State var actaUploaded: Bool = false
  // @State private var tempFiles: [String: Data] = [:]

  var body: some View{
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Subir Documentos")
                .bold()
                .font(.system(size: 32))
                .padding(.horizontal, 30)
                .padding(.top, 40)
                .padding(.bottom, 22)
            Text("Para poder validar  tu empresa, te pedimos puedas compartir con nosotros los siguientes documentos.")
                .font(.system(size: 16))
                .padding(.horizontal, 30)
                .lineSpacing(10)
                .padding(.bottom, 30)
        }
        VStack(){
            CompanyFileInput(
                title: "INE representate legal",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "INE representante legal",
                viewModel: CompanyViewModel())
            .padding(.bottom, -9)

            CompanyFileInput(
                title: "Acta Constitutiva",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Acta constitutiva",
                viewModel: CompanyViewModel())
        }
    }

  }
}

///__------------SECCIÓN 2---------
struct SecondSection: View{
  // @State private var tempFiles: [String: Data] = [:]
  @State var curriculumUploaded: Bool = false

  var body: some View{
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Curriculum")
                .bold()
                .font(.system(size: 25))
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("Este archivo deberá incluir:")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Presentación curricular (documento)")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Listado de productos y servicios a ofrecer")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Constancia de 5 proyectos verificables realizados con la tecnología ofertada.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
        }.padding(.leading, 29.6)
            .padding(.bottom, 30)
            .padding(.trailing, 30)
        VStack(){
            CompanyFileInput(
                title: "Curriculum",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Curriculum",
                viewModel: CompanyViewModel())
            .padding(.bottom, -9)
        }
    }

  }
}

///__------------SECCIÓN 3---------
struct ThirdSection: View{
  // @State private var tempFiles: [String: Data] = [:]
  @State var CDMXUploaded: Bool = false
  @State var PadronUploaded: Bool = false

  var body: some View{
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Certificaciones (Opcional)")
                .bold()
                .font(.system(size: 25))
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("En caso de contar con alguno de los siguientes documentos, por favor compártelo con nosotros")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
        } .padding(.bottom, 30)
        VStack(){
            CompanyFileInput(
                title: "Comprobante Directorio de Instaladores Certificados de la CDMX",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Directorio de instaladores certificados de CDMX",
                viewModel: CompanyViewModel())
            .multilineTextAlignment(.leading)
            .padding(.bottom, -9)


            CompanyFileInput(
                title: "Comprobante Padrón de Empresas Especializadas FIDE",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Padron de empresas especializadas FIDE",
                viewModel: CompanyViewModel())
         }
      }

   }
}

///__------------SECCIÓN 4---------
struct FourthSection: View{
  // @State private var tempFiles: [String: Data] = [:]
  @State var panelesUploaded: Bool = false


  var body: some View {
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Servicios")
                .bold()
                .font(.system(size: 25))
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("Sube únicamente los documentos de los servicios que ofrece tu empresa.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 30)
            Text("Sistemas Fotovoltaicos")
                .fontWeight(.semibold)
                .font(.system(size: 20))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("Por favor, comparte con nosotros un documento que incluya las siguientes certificaciones.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 20)
            Text("- EC0586.01 Instalación de sistemas fotovoltaicos en residencias, comercios e industrias.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
            Text("- LEC1180 Asesoría técnica- comercial en proyectos de generación distribuida fotovoltaica. ")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
            Text("- EC1181 Supervisión de sistemas fotovoltaicos en residencia, comercio e industria.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 5)
        } .padding(.bottom, 30)
            .padding(.leading, 30)
            .padding(.trailing, 30)
        VStack(){
            CompanyFileInput(
                title: "Certificaciones Sistemas Fotovoltaicos",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription:"Certificaciones sistemas fotovoltaicos",
                viewModel: CompanyViewModel())
        }
    }

  }
}

///__------------SECCIÓN 5---------
struct FifthSection: View {
  // @State private var tempFiles: [String: Data] = [:]
  @State var calentadoresUploaded: Bool = false


  var body: some View{
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Calentadores Solares")
                .fontWeight(.semibold)
                .font(.system(size: 20))
                .lineSpacing(10)
                .padding(.top,70)
                .padding(.bottom, 3)
            Text("Por favor, comparte con nosotros un documento que incluya las siguientes certificaciones.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 20)
            Text("- NMX-ES-001-2005.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
            Text("- ISO 9806 + Informe de pruebas de laboratorio. ")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
            Text("- EC-0325 “Instalación de sistema de calentamiento solar de agua termosifónico en vivienda sustentable.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
            Text("-EC-0473 “Instalación del sistema de calentamiento solar de agua de circulación forzada con termotanque.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 10)
        } .padding(.bottom, 30)
            .padding(.leading, 30)
            .padding(.trailing, 30)
        VStack(){
            CompanyFileInput(
                title: "Presión Mayor a 294k Pa",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Archivos presion mayor a 294k Pa",
                bulletPoint: "• NOM-027-ENER/SCH-2018\n• NMX-ES-004-NORMEX-2015\n• DTESTV + Informe de pruebas de laboratorio" ,
                viewModel: CompanyViewModel())
            .padding(.bottom, -9)

            CompanyFileInput(
                title: "Presión Menor a 294k Pa",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Archivos presion menor a 294k Pa",
                bulletPoint: "• 5 proyectos verificables con antigüedad mayor a 5 años (descripción, contratos, fotografías).\n• Proporcionar datos para facilitar la comprobación de dichas instalaciones." ,
                viewModel: CompanyViewModel())

        }
    }
  }
}

///__------------SECCIÓN 6---------
struct SixthSection: View{
  // @State private var tempFiles: [String: Data] = [:]
  @State var cartaUploaded: Bool = false

  var body: some View{
    VStack{
        VStack(alignment: .leading, spacing: 10){
            Text("Firmar Carta Compromiso")
                .bold()
                .font(.system(size: 25))
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("Para terminar tu registro, te pedimos puedas firmar una carta compromiso de seguridad y garantía, la cual debe contener:")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Garantía por escrito de 5 años contra defectos de fabricación y 1 año contra defectos en la instalación.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Programa de mantenimiento por los siguientes 5 años.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("- Manual de operación para usuario final.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
            Text("-Elementos de operación y seguridad: jarro de aire, válvula anti-retorno, by-pass.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 3)
        }.padding(.leading, 34)
            .padding(.bottom, 30)
            .padding(.trailing, 30)
        VStack(){
            CompanyFileInput(
                title: "Carta de Compromiso",
                description: "Hasta 50 MB por archivo y en .pdf",
                fileDescription: "Carta de compromiso",
                viewModel: CompanyViewModel())
            .padding(.bottom, -9)
        }
    }
  }
}

///__------------SECCIÓN 7--------

struct SeventhSection: View{
  @State var ineUploaded: Bool = false
  @State var actaUploaded: Bool = false
  @State var curriculumUploaded: Bool = false
  @State var CDMXUploaded: Bool = false
  @State var PadronUploaded: Bool = false
  @State var panelesUploaded: Bool = false
  @State var calentadoresUploaded: Bool = false
  @State var cartaUploaded: Bool = false
  @State private var showAlert = false
  // @State private var tempFiles: [String: Data] = [:]


  private var isFormComplete: Bool {
      return ineUploaded && actaUploaded && curriculumUploaded &&
      (CDMXUploaded || PadronUploaded) &&
      (panelesUploaded || cartaUploaded)
  }

//  private func saveFiles() async -> Bool {
//      let viewModel = CompanyViewModel() // Idealmente, este debería ser un ObservedObject compartido
//
//      var success = true
//      for (description, file) in tempFiles {
//          do {
//              let mimeType = "application/pdf"
//              try await viewModel.uploadFile(file: file, fileDescription: description, mimeType: mimeType)
//          } catch {
//              success = false
//              break
//          }
//      }
//
//      return success
//  }


  @State var privacidad = false
  @State var terminos = false

  var body: some View{

    VStack {
        Toggle("Acepto las políticas de privacidad", isOn: $privacidad)
            .font(.system(size: 16))
            .padding(.bottom, 10)
        Toggle("Acepto los términos y condiciones", isOn: $terminos)
            .font(.system(size: 16))
    }.padding(.horizontal, 40)
        .padding(.top, 30)


    Button(action: {
        Task {
            if isFormComplete && privacidad && terminos {

            } else {
                showAlert = true
            }
        }
    }) {
        Text("Finalizar Registro")
            .foregroundColor(.white)
            .padding(.vertical, 12)
            .padding(.horizontal)
            .frame(maxWidth: 200)
            .background(isFormComplete && privacidad && terminos ? Color("GreenCustom") : Color.gray)
            .cornerRadius(8)
    }
    .alert(isPresented: $showAlert) {
        Alert(title: Text("Error"), message: Text("Necesitas subir todos los archivos y aceptar los términos y condiciones."), dismissButton: .default(Text("Aceptar")))
    }
    .padding(.top, 30)

  }

}

///__------------PRINCIPAL--------
struct CompanyUploadFilesView: View {
  var goPending: () -> Void
  @Binding var photovoltaicToggle: Bool
  @Binding var solarToggle: Bool
  
    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                FirstSection()
                SecondSection()
                ThirdSection()
                FourthSection()
                FifthSection()
                SixthSection()
                SeventhSection()

            }
            .padding(.vertical, 20)
        }
    }
}

