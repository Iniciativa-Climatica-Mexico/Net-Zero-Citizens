import chai from "chai";
import chaiExclude from "chai-exclude";
import { db, initDB } from "../src/configs/database.config";
import { unwrap } from "./utils";
import * as ComplaintService from "../src/services/complaints.service";
import Complaint from "../src/models/complaint.model";

chai.use(chaiExclude);
const { expect } = chai;
const complaint = {
    complaintId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8",
    userId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8",
    companyId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8",
    complaintSubject: "Productos Defectuosos",
    complaintDescription: "El producto no funciona",
    complaintStatus: "active",
};
const complaint2 = {
    complaintId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b9",
    userId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b9",
    companyId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b9",
    complaintSubject: "Productos",
    complaintStatus: "active",
};


beforeEach(async () => {
    await db.drop()
    await initDB()
  })

describe("Complaints", () => {
    describe("getAllComplaints", () => {
        it("should return all complaints", async () => {
            await Complaint.create(complaint);
            await Complaint.create(complaint2);
            const res = await ComplaintService.getAllComplaints({start:0, pageSize:3});
            expect(res).to.have.lengthOf(2);
            console.log(res);
        });
    }
    );
    describe("getComplaintById", () => {
        it("should return a complaint", async () => {
            await Complaint.create(complaint);
            const res = await unwrap(ComplaintService.getComplaintById('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
    describe("getComplaintsByUserId", () => {
        it("should return a complaint", async () => {
            await Complaint.create(complaint);
            const res = await unwrap(ComplaintService.getComplaintByUser('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8', {start:0, pageSize:3}));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
    describe("getComplaintsByCompanyId", () => {
        it("should return a complaint", async () => {
            await Complaint.create(complaint);
            const res = await unwrap(ComplaintService.getComplaintByCompany('8de45630-2e76-4d97-98c2-9ec0d1f3a5b9', {start:0, pageSize:3}));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
    describe("createComplaint", () => {
        it("should create a complaint", async () => {
            const res = await unwrap(ComplaintService.createComplaint({complaintId:'8de45630-2e76-4d97-98c2-9ec0d1f3a5b8', companyId:'8de45630-2e76-4d97-98c2-9ec0d1f3a5b8', userId:'56786543fhgf', complaintSubject: 'Productos Defectuosos', complaintDescription: 'El producto no funciona', complaintStatus: 'active'}));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
    describe("flagComplaintAsInactive", () => {
        it("should flag a complaint as inactive", async () => {
            await Complaint.create(complaint);
            const res = await unwrap(ComplaintService.flagComplaintAsInactive('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
    describe("flagComplaintAsInvalid", () => {
        it("should flag a complaint as invalid", async () => {
            await Complaint.create(complaint);
            const res = await unwrap(ComplaintService.flagComplaintAsInvalid('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'));
            expect(res).excluding("createdAt").to.deep.equal(complaint);
        });
    }
    );
});





