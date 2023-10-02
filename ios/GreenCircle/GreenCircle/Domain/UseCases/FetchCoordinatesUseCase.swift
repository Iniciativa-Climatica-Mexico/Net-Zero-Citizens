import Foundation

protocol FetchCoordinatesUseCase {
    func getCoordinates(companyId: UUID) async -> PaginatedQuery<CompanyCoordinates>?
}

class FetchCoordinatesUseCaseImpl: FetchCoordinatesUseCase {
    let getCoordinatesRepository: GetCoordinatesRepository
    
    static let shared = FetchCoordinatesUseCaseImpl()

    init(getCoordinatesRepository: GetCoordinatesRepository = GetCoordinatesRepository.shared) {
        self.getCoordinatesRepository = getCoordinatesRepository
    }

    func getCoordinates(companyId: UUID) async -> PaginatedQuery<CompanyCoordinates>? {
        return await getCoordinatesRepository.getCoordinates()
    }
}

