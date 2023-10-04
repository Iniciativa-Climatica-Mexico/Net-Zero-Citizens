//
//  RegisterCompanyView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct CompanyRegisterView: View {
  var goLogin: () -> Void
  var goForm: () -> Void
  var goMainMenu: () -> Void

  @StateObject var viewModel = LoginViewModel()
  @EnvironmentObject var user: UserData
  @State private var isPrivacyPolicyVisible = false
  private let privacyPolicyTextView = PrivacyPolicyTextView(dismiss: .constant(false))
    
  var body: some View {
    ZStack {

      BackgroundView()

      VStack(spacing: 40) {
        HeaderView(
          title: "Crear cuenta de empresa",
          subTitle: "Registrate con tu cuenta preferida")

        Spacer()

        VStack {
          GoogleSignInButton(style: .wide) {
            Task {
              let state = await viewModel
                .handleGoogleSignIn()
              switch state {
              case .newUser:
                goForm()
              case .success:
                goMainMenu()
              case .fail:
                break
              }
                        }
                    }
                    .alert("Algo salió mal", isPresented: $viewModel.showAlert) {
                        Button("Entendido", role: .cancel) {}
                    } message: {
                        Text("Intenta de nuevo por favor")
                    }
                    .padding(.horizontal)
                }

                Spacer()

                Divider().padding(.horizontal)

                HStack {
                    Text("¿No eres un proveedor?")
                    Spacer()
                    LinkButton("Inicia Sesión", buttonColor: .blue) {
                        goLogin()
                    }
                }
                .padding(.horizontal)

                LinkButton("Aviso de privacidad", buttonColor: .blue) {
                    isPrivacyPolicyVisible.toggle()
                }
                .padding(.bottom)
                
            }
            .foregroundColor(Color("MainText"))
        }
        .sheet(isPresented: $isPrivacyPolicyVisible) {
            privacyPolicyTextView
        }
    }
}

/*
struct PrivacyPolicyView: View {
    @Binding var dismiss: Bool

    var body: some View {
        ScrollView {
            VStack {
                Text("AVISO DE PRIVACIDAD \nDE \nINICIATIVA CLIMÁTICA DE MÉXICO A.C.")
                    .multilineTextAlignment(.center)
                    .font(.title).bold()
                    .padding(.bottom)

                Group {
                    Text("En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de Particulares (la “Ley”), y demás relacionadas, nos permitimos informarle sobre las características y finalidades del tratamiento que se dará a sus datos personales que por el ejercicio de sus actividades realice Iniciativa Climática de México AC. (“ICM”)")
                        .padding(.bottom)

                    Text("Identidad del responsable y domicilio").padding(.bottom).font(.headline)
                    Text("Iniciativa Climática de México AC es una asociación civil, donataria autorizada, con domicilio fiscal y  de sus oficinas operativas en Calle Miguel Laurent 70, Tlacoquemecatl del Valle, Del. Benito Juárez, CDMX, CP. 03200, Tel. 01 55 5335 1282, es responsable de recabar sus datos personales, del uso y almacenamiento que se le dé a los mismos y de su debida protección.")
                        .padding(.bottom)
                }

                Group {
                    Text("Respecto de la información de sus datos personales, proporcionada personal y directamente por usted, ya sea de manera verbal o por escrito, por correo electrónico o correspondencia, tarjetas de presentación, o por llenado de formularios de contactos y de datos personales, y también recabada a través de nuestro sitio de Internet, o cualesquier otro medio, le comunicamos que seguimos los principios exigidos por la legislación vigente: licitud, consentimiento, información, finalidad, lealtad, confidencialidad, seguridad, proporcionalidad y responsabilidad.")
                        .padding(.bottom)

                    Text("Finalidades del tratamiento de los datos personales")
                        .padding(.bottom).font(.headline).multilineTextAlignment(.center)
                    Text("(a) Mantener un registro actualizado de los donantes, colaboradores, clientes y proveedores  de ICM;\n\n(b) Dar cumplimiento a obligaciones contraídas con nuestros donantes, clientes, proveedores y con autoridades gubernamentales según la legislación del caso que aplique;")
                        .padding(.bottom)
                }

                Group {
                    Text("Datos personales recabados").padding(.bottom).font(.headline)
                    Text("Para el cumplimento de los objetivos antes mencionados, podemos recabar sus datos personales de distintas formas. Usualmente recabamos sus datos cuando usted nos los proporciona directamente (a través de nuestros empleados o de nuestra página de Internet). En ocasiones, recabamos sus datos de manera indirecta, a través de otras fuentes permitidas por la Ley.\n\nRecabamos sus datos de forma directa cuando usted mismo nos los proporciona ya sea personalmente o vía electrónica o a través de nuestra página de Internet y cuando celebramos un convenio o contrato con usted. Los datos personales que obtenemos pueden ser: (i) nombre, razón o denominación social; (ii) domicilio; (iii) compañía y cargo que ocupa; (iv) teléfono; (v) correo electrónico; y (vi) en caso de ser necesario, sus datos académicos como trayectoria educativa, títulos, y cédula profesional, mismos que estarán sujetos a un tratamiento controlado.\n\nAsimismo, podemos recabar aquellos datos considerados como financieros o patrimoniales, en términos de la Ley, entre los cuales se encuentran (i) tipo y números de cuentas bancarias; (ii) comprobantes fiscales, (iii) clave en el Registro Federal de Contribuyentes, y (iv) número de seguridad social.")
                        .padding(.bottom)

                    Text("Datos personales sensibles").padding(.bottom).font(.headline)
                }

                Group {
                    Text("En caso de que ICM recabe datos personales sensibles (aquellos que puedan revelar aspectos como origen racial o étnico, estado de salud presente y futuro, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas o preferencias sexuales), éstos serán tratados únicamente para las finalidades previstas en este Aviso de Privacidad.\n\nLos datos personales que se recaben, formarán parte de una base de datos que permanecerá vigente durante el tiempo que exista ICM, o durante el periodo necesario para cumplir la finalidad mencionada, por lo que adoptaremos todas y cada una de las medidas de seguridad administrativa, física y técnica, establecidas en la Ley, necesarias para salvaguardar su información personal de cualquier daño, pérdida, alteración, destrucción o del uso, acceso o tratamiento no autorizado.\n\nEstas herramientas pueden ser deshabilitadas. Para conocer el procedimiento para hacerlo, comuníquese a nuestro Departamento de Datos Personales en la dirección de nuestras oficinas.")
                    .padding(.bottom)

                Text("Procedimiento para limitar el uso o divulgación de los datos personales").padding(.bottom).font(.headline).multilineTextAlignment(.center)
                Text("Medios para ejercer los derechos ARCO, revocación del consentimiento y negativa para el tratamiento de datos personales\n\nUsted tiene derecho de acceder, rectificar y cancelar sus datos personales, así como oponerse al tratamiento de los mismos o revocar su consentimiento que para tal fin haya otorgado, a través del procedimiento que hemos implementado.\n\nCon el objeto de facilitarle el ejercicio de tales derechos, le invitamos a hacer una petición por escrito dirigida a la Dirección de Finanzas y Soporte Operativo, ya sea personalmente en la dirección señalada para tales efectos o a través del envío de un correo electrónico a la siguiente dirección: contacto@iniciativaclimatica.org\n\nEn un plazo máximo de 20 días hábiles desde la recepción de su solicitud, atenderemos su petición y le informaremos sobre su procedencia, la cual le facilitaremos de su conocimiento a través de la misma vía de recepción.")
                    .padding(.bottom)
                }

                Group {
                    Text("Transferencia de los datos personales").padding(.bottom).font(.headline)
                    Text("ICM se reserva el derecho de compartir sus datos personales con sus empleados y encargados, quienes tratarán su información por cuenta de ICM exclusivamente.\n\nAsimismo, le informamos que sus datos personales no serán transferidos ni tratados, dentro y/o fuera del país, por personas distintas a ICM.")
                    .padding(.bottom)

                    Text("Modificaciones al Aviso de Privacidad").padding(.bottom).font(.headline)
                    Text("Nos reservamos el derecho a modificar o actualizar en cualquier momento los términos y condiciones del presente Aviso de Privacidad, acción que se notificará mediante un anuncio en la página de Internet.")
                }

                Button("Cerrar") {
                    dismiss.toggle()
                }
                .foregroundColor(.blue)
            }
            .padding()
        }
    }
}

struct CompanyRegisterView_Previews: PreviewProvider {
    static var previews: some View {
        CompanyRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
    }
}
*/
