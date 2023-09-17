//
//  EcoInfoViewModelTest.swift
//  GreenCircleTests
//
//  Created by Dani Gutiérrez on 16/09/23.
//

import XCTest
@testable import GreenCircle

struct EcoInfoViewModelTestStruct {

  let fetchEcoInfoUseCase: FetchAllEcoInfoUseCaseProtocol

  init () {
    self.fetchEcoInfoUseCase = FetchAllEcoInfoUseCase()
  }

  /// Filtrar solamente un elemento donde alguna descripción o cover image es igual al string mutado
  /// - Parameters: String to search
  /// - Returns: EcoInfo?
  func filterEcoInfoNoString(toSearch: String) async -> EcoInfo? {
    if let resultEcoInfo = await fetchEcoInfoUseCase.fetchAllEcoInfo() {

      let filteredEcoInfo = resultEcoInfo.filter { ecoInfo in
        if toSearch.prefix(1) == "N" {
          return ecoInfo.description == toSearch
        } else if toSearch.prefix(1) == "p" {
          return ecoInfo.coverImage == toSearch
        }
         return false
       }

       if let firstMatchingEcoInfo = filteredEcoInfo.first {
         return firstMatchingEcoInfo
       }

    }
    return nil
  }

  /// Test when [EcoInfo]? has not a coverImage
  /// expected  "No se ha puesto  en este post..."but still [EcoInfo]?  is fetched
  func fetchAllEcoInfoNoDescription () async {

    let stringToSearch = "No se ha puesto descripción en este post..."
    _ = XCTestExpectation(description: "Fetch EcoInfo Data")

     // Llamada asíncrona a filterEcoInfoNoString
    let ecoInfoNoDes = await filterEcoInfoNoString(toSearch: stringToSearch)

    if let unwrappedDescription = ecoInfoNoDes?.description {
      XCTAssertEqual(unwrappedDescription, stringToSearch)
    } else {
      XCTFail("result?.description is nil")
    }
    XCTAssertNotNil(ecoInfoNoDes)
  }
  /// Test when [EcoInfo]? has not a cover image
  /// expected person.crop.circle.badge.xmark but still  [EcoInfo]? is fetched
  func fetchAllEcoInfoNoCoverImage () async {

    let stringToSearch = "person.crop.circle.badge.xmark"
    _ = XCTestExpectation(description: "Fetch EcoInfo Data")

    // Llamada asíncrona a filterEcoInfoNoString
    let ecoInfoNoCov = await filterEcoInfoNoString(toSearch: stringToSearch)
    // Si hay alguna cover photo nil
    if let unwrappedDescription = ecoInfoNoCov?.coverImage, ecoInfoNoCov?.coverImage?.prefix(1) == "p" {
      XCTAssertEqual(unwrappedDescription, stringToSearch)
    } else {
      XCTAssertNil(ecoInfoNoCov?.coverImage)
    }
    // Nil porque no hay ningun cover image nulo
    XCTAssertNil(ecoInfoNoCov)
  }
}

final class EcoInfoViewModelTest: XCTestCase {

  var helpTestEcoInfoViewModel: EcoInfoViewModelTestStruct!

  override func setUpWithError() throws {
    _ = EcoInfoViewModelTestStruct()
  }

  override func tearDownWithError() throws {
    helpTestEcoInfoViewModel = nil
  }

  func test_ecoInfoViewModel_noDescription_shouldSet_noSeHaPuestoDesc() async {
    let helpTestEcoInfoViewModel = EcoInfoViewModelTestStruct()
    await helpTestEcoInfoViewModel.fetchAllEcoInfoNoDescription()
  }

  func test_ecoInfoViewModel_noCoverImage_shouldSet_crossCoverImage() async {
    let helpTestEcoInfoViewModel = EcoInfoViewModelTestStruct()
    await helpTestEcoInfoViewModel.fetchAllEcoInfoNoCoverImage()
  }
  func testPerformanceExample() throws {
    // This is an example of a performance test case.
    self.measure {
      // Put the code you want to measure the time of here.
    }
  }
}
