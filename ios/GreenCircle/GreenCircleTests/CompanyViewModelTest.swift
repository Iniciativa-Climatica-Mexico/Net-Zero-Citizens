//
//  CompanyViewModelTest.swift
//  GreenCircleTests
//
//  Created by Dani Gutiérrez on 15/09/23.
//

import XCTest
@testable import GreenCircle

func makeUUIDString(uuidConvert: String) -> UUID {
  guard let uuid = UUID(uuidString: uuidConvert) else {
    fatalError("Failed to create UUID from string")
  }
  return uuid
}

struct CompanyViewModelTestStruct {
  let specificUUIDString = "a3c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e"
  let notRightUUIDString = "12c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e8f"
  let specificUUID: UUID
  let notSpecificUUID: UUID
  let fetchCompanyUseCase: FetchCompanyInfoUseCase
  
  init () {
    self.specificUUID = makeUUIDString(uuidConvert: specificUUIDString)
    self.notSpecificUUID = makeUUIDString(uuidConvert: notRightUUIDString)
    self.fetchCompanyUseCase = FetchCompanyInfoUseCaseImpl()
  }
  /// Test when company has not a web page
  /// expected nil but still Company() is fetched
  func fetchCompanyByIdNoWebPage () async {
    _ = XCTestExpectation(description: "Fetch Company Data")
     // Llamada asíncrona a fetchCompanyById
     let result = await fetchCompanyUseCase.fetchCompanyById(id: specificUUID)
    
    XCTAssertEqual(result?.webPage, nil)
    XCTAssertNotNil(result)
  }
  /// Test when company has not a profile picture
  /// expected nil but still Company() is fetched
  func fetchCompanyByIdNoProfilePicture () async {
    _ = XCTestExpectation(description: "Fetch Company Data")
     // Asynchronous call to fetchCompanyById
     let result = await fetchCompanyUseCase.fetchCompanyById(id: specificUUID)
    
    XCTAssertEqual(result?.profilePicture, nil)
    XCTAssertNotNil(result)
  }
  
  /// Test when company is not in database
  /// expected nil Company
  func fetchCompanyByIdNotFound () async {
    _ = XCTestExpectation(description: "Fetch Company Data")
     // Asynchronous call to fetchCompanyById
     let result = await fetchCompanyUseCase.fetchCompanyById(id: notSpecificUUID)
    XCTAssertNil(result)
  }
}

final class CompanyViewModelTest: XCTestCase {
  
  var helpTestCompany: CompanyViewModelTestStruct!

  override func setUpWithError() throws {
    _ = CompanyViewModelTestStruct()
  }

  override func tearDownWithError() throws {
    helpTestCompany = nil
  }

  /// Test when company has not a web page
  /// expected nil but still Company() is fetched
  func test_companyViewModel_noWebPage_webPageEqualNil() async {
    let helpTestCompany = CompanyViewModelTestStruct()
    await helpTestCompany.fetchCompanyByIdNoWebPage()
  }
  /// Test when company has not a profile picture
  /// expected nil but still Company() is fetched
  func test_companyViewModel_noProfilePict_shouldBeEqualNil() async {
    let helpTestCompany = CompanyViewModelTestStruct()
    await helpTestCompany.fetchCompanyByIdNoWebPage()
  }
  
  /// Test when company is not in database
  /// invalid UUID
  func test_companyViewModel_noUuid_shouldBeEqualNil() async {
    let helpTestCompany = CompanyViewModelTestStruct()
    await helpTestCompany.fetchCompanyByIdNotFound()
  }
  
  func testPerformanceExample() throws {
      // This is an example of a performance test case.
      self.measure {
          // Put the code you want to measure the time of here.
      }
  }

}
