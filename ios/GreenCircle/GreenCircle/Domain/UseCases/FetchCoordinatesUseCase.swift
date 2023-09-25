import Foundation

protocol FetchCoordinatesUseCase {
    func getCoordinates(companyId: UUID) async -> PaginatedQuery<Company>?
}

class FetchCoordinatesUseCaseImpl: FetchCoordinatesUseCase {
    let getCoordinatesRepository: GetCoordinatesRepossitory
    
    static let shared = FetchCoordinatesUseCaseImpl()

    init(getCoordinatesRepository: GetCoordinatesRepossitory = GetCoordinatesRepossitory.shared) {
        self.getCoordinatesRepository = getCoordinatesRepository
    }

    func getCoordinates(companyId: UUID) async -> PaginatedQuery<Company>? {
        return await getCoordinatesRepository.getCoordinates(companyId: companyId)
    }
}

