//
//  CompanyImagesModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 12/09/23.
//

import Foundation

enum FileDescription: String, CaseIterable, Codable {
    case ineRepresentanteLegal = "INE representante legal"
    case actaConstitutiva = "Acta constitutiva"
    case curriculum = "Curriculum"
    case directorioInstaladoresCDMX = "Directorio de instaladores certificados de CDMX"
    case padronEmpresasFIDE = "Padron de empresas especializadas FIDE"
    case certificacionesSistemasFotovoltaicos = "Certificaciones sistemas fotovoltaicos"
    case nom027 = "NOM-027-ENER/SCH-2018"
    case nmx004 = "NMX-ES-004-NORMEX-2015"
    case archivosPresionMayor = "Archivos presion mayor a 294k Pa"
    case archivosPresionMenor = "Archivos presion menor a 294k Pa"
    case cartaCompromiso = "Carta de compromiso"
    case imagen = "Imagen"
    case otro = "Otro"
}

enum FileFormat: String, CaseIterable, Codable {
    case jpg = ".jpg"
    case jpeg = ".jpeg"
    case png = ".png"
    case pdf = ".pdf"
    case docx = ".docx"
    case xlsx = ".xlsx"
    case pptx = ".pptx"
}

class CompanyFiles: NSObject, Codable, Identifiable {
    var companyFileId: UUID
    var companyId: UUID
    var fileUrl: String! // Cambiar a obligatorio
    var fileDescription: FileDescription
    var fileFormat: FileFormat?

    var company: Company?

//    init(companyFileId: UUID = UUID(),
//         companyId: UUID,
//         fileUrl: String?, // Cambiar a obligatario
//         fileDescription: FileDescription,
//         fileFormat: FileFormat?,
//         company: Company?) {
//        self.companyFileId = companyFileId
//        self.companyId = companyId
//        self.fileUrl = fileUrl
//        self.fileDescription = fileDescription
//        self.fileFormat = fileFormat
//        self.company = company
    }
//}
