//
//  CompanyFilesView.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 26/09/23.
//

import SwiftUI

struct CompanyFilesView: View {
    var body: some View {
        
        ScrollView{
            Group{
                VStack{
                    VStack(alignment: .leading, spacing: 10){
                        Text("Subir Documentos")
                            .bold()
                            .font(.system(size: 32))
                            .padding(.horizontal, 30)
                            .padding(. top, 40)
                            .padding(.bottom, 22)
                        Text("Para poder validar  tu empresa, te pedimos puedas compartir con nosotros los siguientes documentos.")
                            .font(.system(size: 16))
                            .padding(.horizontal, 30)
                            .lineSpacing(10)
                            .padding(.bottom, 30)
                    }
                    VStack(){
                        CompanyFileInput(title: "INE representate legal", description: "Hasta 50 MB por archivo y en .pdf")
                            .padding(.bottom, -9)
                        
                        CompanyFileInput(title: "Acta Constitutiva", description: "Hasta 50 MB por archivo y en .pdf")
                    }
                }
            }
            Group{
                VStack{
                    VStack(alignment: .leading, spacing: 10){
                        Text("Curriculum")
                            .bold()
                            .font(.system(size: 25))
                            .padding(. top, 40)
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
                        .padding(. trailing, 30)
                    VStack(){
                        CompanyFileInput(title: "Curriculum", description: "Hasta 50 MB por archivo y en .pdf")
                            .padding(.bottom, -9)
                    }
                }
                
            }
            Group{
                VStack{
                    VStack(alignment: .leading, spacing: 10){
                        Text("Certificaciones (Opcional)")
                            .bold()
                            .font(.system(size: 25))
                            .padding(. top, 40)
                            .padding(.bottom, 14)
                        Text("En caso de contar con alguno de los siguientes documentos, por favor compártelo con nosotros")
                            .font(.system(size: 14))
                            .lineSpacing(10)
                            .padding(.bottom, 3)
                    } .padding(.bottom, 30)
                    VStack(){
                        CompanyFileInput(title: "Comprobante Directorio de Instaladores Certificados de la CDMX", description: "Hasta 50 MB por archivo y en .pdf")
                            .multilineTextAlignment(.leading)
                            .padding(.bottom, -9)
                        
                        
                        CompanyFileInput(title: "Comprobante Padrón de Empresas Especializadas FIDE", description: "Hasta 50 MB por archivo y en .pdf")
                    }
                }
                
            }
            Group{
                VStack{
                    VStack(alignment: .leading, spacing: 10){
                        Text("Servicios")
                            .bold()
                            .font(.system(size: 25))
                            .padding(. top, 40)
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
                        .padding(. trailing, 30)
                    VStack(){
                        CompanyFileInput(title: "Certificaciones Sistemas Fotovoltaicos", description: "Hasta 50 MB por archivo y en .pdf")
                        
                        
                    }
                }
                
            }
            
            Group{
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
                        .padding(. trailing, 30)
                    VStack(){
                        CompanyFileInput(
                            title: "Presión Mayor a 294k Pa",
                            description: "Hasta 50 MB por archivo y en .pdf",
                            bulletPoint: "• NOM-027-ENER/SCH-2018\n• NMX-ES-004-NORMEX-2015\n• DTESTV + Informe de pruebas de laboratorio"
                        )
                        .padding(.bottom, -9)
                        
                        CompanyFileInput(
                            title: "Presión Menor a 294k Pa",
                            description: "Hasta 50 MB por archivo y en .pdf",
                            bulletPoint: "• 5 proyectos verificables con antigüedad mayor a 5 años (descripción, contratos, fotografías).\n• Proporcionar datos para facilitar la comprobación de dichas instalaciones."
                        )
                        
                    }
                }
                
            }
            Group{
                VStack{
                    VStack(alignment: .leading, spacing: 10){
                        Text("Firmar Carta Compromiso")
                            .bold()
                            .font(.system(size: 25))
                            .padding(. top, 40)
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
                        .padding(. trailing, 30)
                    VStack(){
                        CompanyFileInput(title: "Carta Compromiso", description: "Hasta 50 MB por archivo y en .pdf")
                            .padding(.bottom, -9)
                    }
                }
                
            }
            
            Group{
                @State  var privacidad = false
                @State  var terminos = false
                
                VStack {
                    Toggle("Acepto las políticas de privacidad", isOn: $privacidad)
                        .font(.system(size: 16))
                        .padding(.bottom, 10)
                    Toggle("Acepto los términos y condiciones", isOn: $terminos)
                        .font(.system(size: 16))
                }.padding(.horizontal, 40)
                    .padding(.top, 30)
                
                
                Button(action: {}) {
                    Text("Finalizar Registro")
                        .foregroundColor(.white)
                        .padding(.vertical, 12)
                        .padding(.horizontal)
                        .frame(maxWidth: 200)
                        .background(Color("GreenCustom"))
                        .cornerRadius(8)
                }.padding(.top, 30)
                
                
            }
        }
    }
    
    struct CompanyFilesView_Previews: PreviewProvider {
        static var previews: some View {
            CompanyFilesView()
        }
    }
}
