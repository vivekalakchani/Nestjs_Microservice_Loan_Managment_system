// import { Test, TestingModule } from '@nestjs/testing';
// import { LoanService } from './loan.service';
// import { getModelToken } from '@nestjs/mongoose';

// describe('LoanService', () => {
//   let service;
//   const mockLoanModel = {
//     getLoans: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         LoanService,
//         {
//           provide: getModelToken('Loan'), // Use the correct token for LoanModel
//           useValue: mockLoanModel, // Provide the mock object
//         },
//       ],
//     }).compile();

//     service = await module.get<LoanService>(LoanService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { LoanService } from './loan.service';
// import { getModelToken } from '@nestjs/mongoose';

// describe('LoanService', () => {
//   let service: LoanService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [LoanService],
//     }).compile();

//     service = module.get<LoanService>(LoanService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { LoanService } from './loan.service';

// describe('LoanService', () => {
//   let service;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [LoanService],
//     }).compile();

//     service = module.get<LoanService>(LoanService);
//   });

//   // Add more test cases for other service methods as needed.
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { LoanController } from './loan.controller';
// import { LoanService } from './loan.service';

// describe('LoanController', () => {
//   let loanController: LoanController;
//   let loanService: LoanService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [LoanController], // Add your controller here
//       providers: [LoanService], // Add your service here
//     }).compile();

//     loanService = module.get<LoanService>(LoanService);
//     loanController = module.get<LoanController>(LoanController);
//   });

//   it('should be defined', () => {
//     expect(loanController).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { getModelToken } from '@nestjs/mongoose';
import { Loan } from './model/loan.schema'; // Adjust the import path as needed

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getModelToken('Loan'), // Use the model name or token
          useValue: {}, // Provide a mock of your Loan model
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
