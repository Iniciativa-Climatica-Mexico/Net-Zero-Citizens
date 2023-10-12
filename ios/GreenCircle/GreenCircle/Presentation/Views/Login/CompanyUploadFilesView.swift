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
  var goBack: () -> Void

  var body: some View{
    VStack{
        HStack{
            Button(action: {
                goBack()
                
            }, label: {
                Image (systemName: "chevron.left")
                .foregroundColor(Color("Secondary"))
            })
            .padding(.leading, 30)
            Spacer()
            Image("Logo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 40, height: 40)
                    .padding(.trailing, 30)
        }
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
                .padding(.horizontal, 30)
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("En caso de contar con alguno de los siguientes documentos, por favor compártelo con nosotros")
                .font(.system(size: 14))
                .padding(.horizontal, 30)
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
        VStack(alignment: .leading ){
            Text("Servicios")
                .bold()
                .font(.system(size: 25))
                .padding(.top, 40)
                .padding(.bottom, 14)
            Text("Sube únicamente los documentos de los servicios que ofrece tu empresa.")
                .font(.system(size: 14))
                .lineSpacing(10)
                .padding(.bottom, 30)
        } .padding(.leading, 30)
        .padding(.trailing, 30)
        }
      }

   }

///__------------SECCIÓN 4---------
struct PanelesSection: View{
  // @State private var tempFiles: [String: Data] = [:]
  @State var panelesUploaded: Bool = false


  var body: some View {
    VStack{
        VStack(alignment: .leading, spacing: 10){
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
struct CalentadoresSection: View {
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
  @State private var showAlert = false
    var goPending: () -> Void
  // @State private var tempFiles: [String: Data] = [:]

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
            if privacidad && terminos {
                goPending()
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
            .background(privacidad && terminos ? Color("Secondary") : Color.gray)
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
    var goBack: () -> Void
  @Binding var photovoltaicToggle: Bool
  @Binding var solarToggle: Bool
    @State var ineUploaded: Bool = false
    @State var actaUploaded: Bool = false
    @State var curriculumUploaded: Bool = false
    @State var CDMXUploaded: Bool = false
    @State var PadronUploaded: Bool = false
    @State var panelesUploaded: Bool = false
    @State var calentadoresUploaded: Bool = false
    @State var cartaUploaded: Bool = false
    @State private var showAlert = false


        private var isFormComplete: Bool {
            return ineUploaded && actaUploaded && curriculumUploaded &&
                (CDMXUploaded || PadronUploaded) &&
                (panelesUploaded || cartaUploaded)
        }
  
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                FirstSection(goBack: goBack)
                SecondSection()
                ThirdSection()
                PanelesSection()
                if photovoltaicToggle == true && solarToggle == false {
                    PanelesSection()
                }
                else if solarToggle == true && photovoltaicToggle == false {
                    CalentadoresSection()
                }
                else if photovoltaicToggle == true && solarToggle == true{
                    CalentadoresSection()
                    PanelesSection()
                }
                SixthSection()
                SeventhSection(goPending: goPending)

            }
            .padding(.vertical, 20)
        }
    }
}


struct CompanyUploadFilesView_Previews: PreviewProvider {
    static var previews: some View {
        CompanyUploadFilesView(
            goPending: {},  // función vacía
            goBack: {},     // función vacía
            photovoltaicToggle: .constant(false),
            solarToggle: .constant(true)
        )
    }
}

