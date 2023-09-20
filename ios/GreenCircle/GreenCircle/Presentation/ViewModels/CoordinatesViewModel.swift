import Foundation

/// Implementación de view model de modelo de Compañía
class CompanyViewModel: ObservableObject {
    /// Repositorio para obtener datos de compañía
    private let getCoordinatesRepository: GetCoordinatesRepossitory
    
    /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var companiesCoordinates: PaginatedQuery<Dummy>?
    
    /// Para implementar el repositorio en la vista que llame al ViewModel de Compañía
    init(getCoordinatesRepository: GetCoordinatesRepossitory = .shared) {
        self.getCoordinatesRepository = getCoordinatesRepository
    }
    
    @MainActor
    /// Obtener información de la compañía mediante el repositorio
    func getCoordinates() async {
        let resultCompany = await GetCoordinatesRepossitory.getCoordinates(companyId: UUID)
        DispatchQueue.main.async {
            self.contentCompany = resultCompany
        }
    }
}

