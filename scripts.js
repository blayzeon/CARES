/*

// DEFAULTS
document.getElementById("balance-available").value = "0.00";
document.getElementById("balance-ledger").value = "0.00";
document.getElementById("account-status").value = "lec-inactive";
document.getElementById("account-type").value = "";
// DEFAULTS

/* CONSTS for the accounts and functionality of the simulator */
let caresUser = `new.trainee`;
const TAX_RATE = 0.15;

/* date and time */
const DATE = new Date();
let currDay = DATE.getDate();
let currMonth = DATE.getMonth() + 1;
let currYear = DATE.getFullYear();
let currDate = `${currMonth}/${currDay}/${currYear}`;
function currTime() {
  let dynamicDate = new Date();
  return dynamicDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
}

// check ids
const CHECK1 = document.getElementById("popup-check1");
const CHECK2 = document.getElementById("popup-check2");
const CHECK3 = document.getElementById("popup-check3");
const CHECK4 = document.getElementById("popup-check4");
const CUSTOMER_BLOCK_REQUESTED = document.getElementById("customer-block");
const CREDIT_CARD_BLOCK = document.getElementById("credit-card-block");

/* Changes the inner HTML of an html element */
function changeProperty(elementId, property, newValue) {
  const elm = document.getElementById(elementId);

  elm[property] = newValue;
}

/* Toggles the styling of an html element */
function styleElm(elementId, property, state) {
  const elm = document.getElementById(elementId);

  elm.style[property] = state;
}

/* an array of the CARES pages */
const CARES_PAGES = [
  "container-summary",
  "container-transactions",
  "container-refund",
  "container-transaction-summary",
  "container-records",
  "container-tag",
  "container-statements",
  "container-reload",
  "container-alerts",
  "popup-cc-auths",
];

/* Toggles the display of multiple elements */
function toggleDisplay(idList, element) {
  // takes a list/array and toggles the display to "none"
  // if an element is provided, it will turn the indiviudal element on

  for (i = 0; i < idList.length; i++) {
    // hides all the items in the list provided
    styleElm(idList[i], "display", "none");
  }

  // shows the element specified
  styleElm(element, "display", "block");
}

/* 
    to-do:
    Account Summary flavor text added to document.getElementById('load-text')
*/

/* POPULATE CARES PAGES */

// Things the data should include:
/* 
        value
    * form-first-name
    * form-last-name 
    * form-address-1
    * form-address-2
    * form-zip-code
    * form-city
    * form-state
    * form-phone-number
    * form-alt-number
    * form-email
    * form-federal-tax-id
    * form-ivr-passcode
    * form-notes
    * form-authorized-user
    * account-status
    * account-type
    * balance-available
    * balance-ledger
    * balance-hold
    * balance-liability
     
        innerHTML
    * account-comments-body
    * call records
    * transactions
    * transaction summary
    * refunds
*/

// Stores & Creates CARES accounts
let facs = [
  {
    name: `CA_DOC-Corcoran Substance Abuse Facility (CA08)`,
    sub: `CA08`,
    id: 5662,
    center: `CA08`,
    system: `Focus Centralized HMP`,
    phone: `GTL`,
    orig: `5599920079`,
    rate: 0.025,
  },
  {
    name: `LA County-Men's Central Jail`,
    sub: `LC12`,
    id: 3573,
    center: `5756`,
    system: `ICMv`,
    phone: `PCS`,
    orig: `2136250581`,
    rate: 0.07,
  },
  {
    name: `OH_DRC-Ohio Reformatory for Women (ORW)`,
    sub: `OH58`,
    id: 7129,
    center: `OH27`,
    system: `ICMv`,
    phone: `GTL`,
    orig: `9373030121`,
    rate: 0.02,
  },
];

let accountList = [];
let transactionList = [
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 8889884768,
    addedBy: "AdvancePayPortal",
    transactionDate: "10/19/2021",
    transactionTime: "2:43:39 PM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "50.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 8889884768,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/19/2021",
    transactionTime: "2:43:39 PM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "4444442222220000",
    expDate: "1230",
    first6: "444444",
    first4: "4444",
    last4: "0000",
    ccCallingSystem: "ADVANCEPAY-IVR", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002400200JC320211014213838564",
    ccCode2: "077928",
    ccOrderId: "D1261169088",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "1.62",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 8889884768,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/19/2021",
    transactionTime: "2:43:39 PM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "3.00",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 8889884768,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/19/2021",
    transactionTime: "2:43:39 PM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550510,
    addedBy: `${caresUser}`,
    transactionDate: "10/19/2021",
    transactionTime: "2:43:39 PM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "50.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550510,
    addedBy: "skip",
    transactionDate: "10/28/2021",
    transactionTime: "4:40:22 PM",
    refunded: false,
    applied: true,
    ccAuths: true,
    creditCardNumber: "4444442222220000",
    expDate: "1225",
    first6: "444444",
    first4: "4444",
    last4: "0000",
    ccCallingSystem: "DSI-TRUSTDEPOSIT-WEB", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002400200LCA20211028175521060",
    ccCode2: "028926",
    ccOrderId: "H1181120027",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "ConnectNetwork",
    transactionDate: `12/31/${currYear - 1}`,
    transactionTime: "9:37:59 AM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "25.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "ConnectNetwork",
    transactionDate: `12/31/${currYear - 1}`,
    transactionTime: "9:37:59 AM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "55555544441111",
    expDate: "1130",
    first6: "555555",
    first4: "4444",
    last4: "1111",
    ccCallingSystem: "ADVANCEPAY-WEB", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002500001YAK20211029073728974",
    ccCode2: "417946",
    ccOrderId: "D1061738543",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.81",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "ConnectNetwork",
    transactionDate: `12/31/${currYear - 1}`,
    transactionTime: "9:37:59 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "3.00",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "ConnectNetwork",
    transactionDate: `12/31/${currYear - 1}`,
    transactionTime: "9:37:59 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "21.19",
    adjType: "ExpireFunds", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "Breakage AMES AdvancePay",
    transactionDate: currDate,
    transactionTime: currTime(),
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550610,
    addedBy: "AdvancePayPortal",
    transactionDate: "10/18/2021",
    transactionTime: "5:27:33 PM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "10.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550610,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/18/2021",
    transactionTime: "5:27:33 PM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "4444442222220000",
    expDate: "1230",
    first6: "424242",
    first4: "4444",
    last4: "0000",
    ccCallingSystem: "ADVANCEPAY-IVR", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002200200LCQ20211029065415587",
    ccCode2: "474972",
    ccOrderId: "H0980984795",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.33",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550610,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/18/2021",
    transactionTime: "5:27:33 PM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "3.00",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550610,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/18/2021",
    transactionTime: "5:27:33 PM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550730,
    addedBy: caresUser,
    transactionDate: "03/05/2020",
    transactionTime: "10:11:23 AM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "15.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "CC: 5555********0000",
    accountNumber: 2085550730,
    addedBy: caresUser,
    transactionDate: "03/05/2020",
    transactionTime: "10:15:43 AM",
    refunded: false,
    applied: false,
    ccAuths: false,
    creditCardNumber: "5555552222220000",
    expDate: "1020",
    first6: "555555",
    first4: "4444",
    last4: "0000",
    ccCallingSystem: "CARES", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002200200JB020211028125809863",
    ccCode2: "000180",
    ccOrderId: "H0980968302",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.48",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550730,
    addedBy: "CARES",
    transactionDate: "03/05/2020",
    transactionTime: "10:15:43 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "5.95",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550730,
    addedBy: "CARES",
    transactionDate: "03/05/2020",
    transactionTime: "10:15:43 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "8.57",
    adjType: "ExpireFunds", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550730,
    addedBy: "Breakage AMES AdvancePay",
    transactionDate: currDate,
    transactionTime: "12:48:22 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550810,
    addedBy: "AdvancePayPortal",
    transactionDate: "10/20/2021",
    transactionTime: "12:27:27 AM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "50.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550810,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/20/2021",
    transactionTime: "12:27:27 AM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "4111112222221234",
    expDate: "1230",
    first6: "411111",
    first4: "4111",
    last4: "1234",
    ccCallingSystem: "ADVANCEPAY-IVR", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002500001JCJ20211016215901135",
    ccCode2: "028516",
    ccOrderId: "D1261231574",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "1.62",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550810,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/20/2021",
    transactionTime: "12:27:27 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "3.00",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550810,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: "10/20/2021",
    transactionTime: "12:27:27 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "7.83",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 2085550520,
    addedBy: "Pay2Talk Queue",
    transactionDate: currDate,
    transactionTime: currTime(),
    refunded: true,
    applied: true,
    ccAuths: true,
    creditCardNumber: "5123452222224444",
    expDate: "1230",
    first6: "512345",
    first4: "5123",
    last4: "4444",
    ccCallingSystem: "AP_ONECALL_USAGE", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002500001JCJ20211016215901135",
    ccCode2: "028516",
    ccOrderId: "D1261231574",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "PaymenTech",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "AuthorizeOnly",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: "01112085550510",
    addedBy: "ConnectNetwork",
    transactionDate: "10/29/2021",
    transactionTime: "2:23:50 PM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "50.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: "01112085550510",
    addedBy: "ConnectNetwork",
    transactionDate: "10/29/2021",
    transactionTime: "2:23:50 PM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "4444442222220000",
    expDate: "1225",
    first6: "444444",
    first4: "4444",
    last4: "0000",
    ccCallingSystem: "ADVANCEPAY-WEB", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002200200JBT20211101172950814",
    ccCode2: "586202",
    ccOrderId: "H0981066988",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "0.00",
    adjType: "NewAccount", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 12085550720,
    addedBy: "AdvancePayPortal",
    transactionDate: currDate,
    transactionTime: "12:27:27 AM",
    refunded: false,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "50.00",
    adjType: "Deposit", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 12085550720,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: currDate,
    transactionTime: "12:11:13 AM",
    refunded: false,
    applied: false,
    ccAuths: true,
    creditCardNumber: "4111112222221234",
    expDate: "1230",
    first6: "411111",
    first4: "4111",
    last4: "1234",
    ccCallingSystem: "ADVANCEPAY-IVR", // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    ccStatus: "APPROVED",
    ccCode1: "709002500001JCJ20211016215901135",
    ccCode2: "028516",
    ccOrderId: "D1261231574",
    ccRejectCode1: "ACCEPT",
    ccRejectCode2: "000",
    ccVendor1: "ReD",
    ccVendor2: "Vantiv",
    ccTransactionType1: "Post-Auth",
    ccTransactionType2: "Payment",
    merchantId: "GTL",
  },
  {
    transactionTotal: "1.62",
    adjType: "3rdPartyFinancialTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 12085550720,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: currDate,
    transactionTime: "12:11:13 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
  {
    transactionTotal: "3.00",
    adjType: "DepositTransactionFee", // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
    comment: "",
    accountNumber: 12085550720,
    addedBy: "InContactMainAdvancePayIVR",
    transactionDate: currDate,
    transactionTime: "12:11:13 AM",
    refunded: true,
    applied: false,
    ccAuths: false,
  },
];

function NewAccount(
  accountNumber,
  firstName = "",
  lastName = "",
  address1 = "",
  address2 = "",
  zipCode = "",
  city = "",
  state = "",
  ivrPasscode = "",
  notes = "",
  authorizedUser = "",
  accountStatus = "active",
  accountType = "advancepay",
  available = "0.00",
  comments = "",
  policy1 = false,
  policy2 = false,
  policy3 = false,
  policy4 = false,
  customerBlock = false,
  ccBlock = false,
  created = true
) {
  this.accountNumber = accountNumber;
  this.firstName = firstName;
  this.lastName = lastName;
  this.address1 = address1;
  this.address2 = address2;
  this.zipCode = zipCode;
  this.city = city;
  this.state = state;
  this.phoneNumber = this.accountNumber;
  this.altNumber = "";
  this.email = "";
  this.federalId = "";
  this.ivrPasscode = ivrPasscode;
  this.notes = notes;
  this.authorizedUser = authorizedUser;
  this.originalLec = "Global Tel*Link";
  this.lastFacility = "";
  this.accountStatus = accountStatus;
  this.accountType = accountType;
  this.available = available;
  this.ledger = available;
  this.hold = "0.00";
  this.liability = "0.00";
  this.comments = comments;
  this.policy1 = policy1;
  this.policy2 = policy2;
  this.policy3 = policy3;
  this.policy4 = policy4;
  this.customerBlock = customerBlock;
  this.ccBlock = ccBlock;
  this.transactionList = "";
  this.refundList = "";
  this.callList = [];
  this.ccList = "";
  this.created = created;
}

/* Adds comments to the Account Summary page of the CARES account */
function addNewComment(commentToAdd) {
  // add the comment to the account
  let index = checkAccount(accountList);

  let oldComments = accountList[index].comments;
  let newComments =
    `<tr><td>${currDate}${currTime()}</td><td>${caresUser} ${commentToAdd}</td></tr>` +
    oldComments;
  accountList[index].comments = newComments; // save to the account

  changeProperty("account-comments-body", "innerHTML", newComments); // update HTML
}

/* Adds transactions to the various CARES pages and the account */
function NewTransaction(
  transactionTotal,
  adjType,
  comment = "",
  accountNumber = document.getElementById("lookup-number").value,
  addedBy = caresUser,
  transactionDate = currDate,
  transactionTime = currTime()
) {
  this.transactionTotal = transactionTotal;
  this.adjType = adjType; // "NewAccount", "Deposit", "AdjustmentIncrease", "AdjustmentDecrease", "FundsTransfer"
  this.comment = comment;
  this.accountNumber = accountNumber;
  this.addedBy = addedBy;
  this.transactionDate = transactionDate;
  this.transactionTime = transactionTime;
  this.refunded = false;
  this.applied = false;
  this.ccAuths = false;
  // If APOC, need a third row that is the same as the ccTransactionType2 but with Capture.  The other needs to be Void.

  if (adjType === "Deposit") {
    this.ccAuths = true;
    this.creditCardNumber = "6666664444442222";
    this.expDate = "1230";
    this.first6 = formatCard(this.creditCardNumber, "first", 6);
    this.first4 = formatCard(this.creditCardNumber, "first", 4);
    this.last4 = formatCard(this.creditCardNumber, "last", 4);
    this.ccCallingSystem = "CARES"; // "ADVANCEPAY-WEB", "AP_ONECALL_USAGE", "DSI-TRUSTDEPOSIT-WEB", "ICM", "TP-CORRECTIONSPYMT-WEB", "DSI-EMAIL-WEB"
    this.ccStatus = "APPROVED";
    this.ccCode1 = "709002400200JC320211014213838564";
    this.ccCode2 = "077928";
    this.ccOrderId = "D1261169088";
    this.ccRejectCode1 = "ACCEPT";
    this.ccRejectCode2 = "000";
    this.ccVendor1 = "ReD";
    this.ccVendor2 = "Vantiv";
    this.ccTransactionType1 = "Post-Auth";
    this.ccTransactionType2 = "Payment";
    this.merchantId = "";
  } else {
    this.ccAuths = false;
  }
}

function formatCard(number, section, amount) {
  // We will either need the firsr 6 or the first 4
  let numStr = String(number); // has to be a string because we don't want to accidentally add the cc digits
  let startAt = 0;
  let result = "";
  if (section == "last") {
    startAt = 12;
  }
  for (i = startAt; i < numStr.length; i++) {
    if (i < amount || section == "last") {
      result = result + numStr[i];
    } else {
      return result;
    }
  }
  return result;
}

accountList.push(
  new NewAccount(
    8889884768,
    "GTL",
    "IVR",
    "12021 SUNSET HILLS RD",
    "#100",
    "20190",
    "RESTON",
    "VA",
    1234,
    "GTL Trust IVR #",
    "none",
    "active",
    "advancepay",
    "0.00",
    `<tr><td>10/13/2021 9:06:03 AM</td><td>${caresUser} ghost call</td></tr>`,
    false,
    false,
    false,
    false,
    false,
    false
  )
);

// cycle through an object and returns the first index matching the current account we're on
function checkAccount(obj = accountList) {
  let accountNumber = document.getElementById("lookup-number").value;

  // returns the index of the CARES account
  for (j = 0; j < obj.length; j++) {
    if (obj[j].accountNumber == accountNumber) {
      return j;
    } else {
    }
  }

  // if we go through the loop and don't find the account, create a new one
  obj.push(
    new NewAccount(
      accountNumber,
      "" /* f.name */,
      "" /* l.name */,
      "" /* address1 */,
      "" /* address 2 */,
      "" /* zipcode */,
      "" /* city */,
      "" /* state */,
      "" /* passcode */,
      "" /* notes box */,
      "" /* authorized user */,
      "active" /* account status */,
      "" /* account type */,
      "0.00" /* balance */,
      "" /* comments */,
      false /* policy1 */,
      false /* policy2 */,
      false /* policy3 */,
      false /* policy4 */,
      false /* customer block */,
      false /* cc block */,
      false /* created? */
    )
  );
  transactionList.push(new NewTransaction("0.00", "NewAccount"));
  return j;
}

function loadAccount(index) {
  caresIds = [
    "lookup-number",
    "form-first-name",
    "form-last-name",
    "form-address-1",
    "form-address-2",
    "form-zip-code",
    "form-city",
    "form-state",
    "form-phone-number",
    "form-alt-number",
    "form-email",
    "form-federal-tax-id",
    "form-ivr-passcode",
    "form-notes",
    "form-authorized-user",
    "form-original-lec",
    "form-last-facility-called",
    "account-status",
    "account-type",
    "balance-available",
    "balance-ledger",
    "balance-hold",
    "balance-liability",
  ];

  // add transactions to the account
  loadTransactions(index);

  // load all the info to match the object
  let i = 0;
  for (key in accountList[index]) {
    if (i < caresIds.length) {
      changeProperty(caresIds[i], "value", accountList[index][key]);
      i++;
    }
  }

  // checkboxes
  CUSTOMER_BLOCK_REQUESTED.checked = accountList[index].customerBlock;
  CREDIT_CARD_BLOCK.checked = accountList[index].ccBlock;

  // account comments
  changeProperty(
    "account-comments-body",
    "innerHTML",
    accountList[index].comments
  );
  changeProperty(
    "transactions-body",
    "innerHTML",
    accountList[index].transactionList
  );
  changeProperty("refund-body", "innerHTML", accountList[index].refundList);

  // policy checklist
  changeProperty("popup-check1", "checked", accountList[index].policy1);
  changeProperty("popup-check2", "checked", accountList[index].policy2);
  changeProperty("popup-check3", "checked", accountList[index].policy3);
  changeProperty("popup-check4", "checked", accountList[index].policy4);
  updatePolicyChecklistColor();

  // update the load message
  if (accountList[index].created == false) {
    let buttonSpan = document.getElementById("load-text");
    changeProperty(
      "load-text",
      "innerHTML",
      `Account not found. Would you like to create one? <span id="button-goes-here"></span>`
    );

    // create the button
    const createAccBtn = document.createElement("button");
    createAccBtn.textContent = "Create Account";

    createAccBtn.onclick = function () {
      if (document.getElementById("account-type").value == "advancepay") {
        accountList[index].created = true;
        buttonSpan.removeChild(createAccBtn);
        changeProperty(
          "load-text",
          "innerHTML",
          `Advance Pay account ${accountList[index].accountNumber} loaded successfully.`
        );
      } else {
        alert("Please select the account type.");
      }
    };

    buttonSpan.appendChild(createAccBtn);
  } else {
    changeProperty(
      "load-text",
      "innerHTML",
      `Advance Pay account ${accountList[index].accountNumber} loaded successfully.`
    );
  }
}

function loadTransactions(index) {
  // grab the current account
  let accountNumber = accountList[index].accountNumber;
  let account = accountList[index];
  let total = parseFloat(account.available);

  // grab the info for that account
  let accountTransactions = transactionList.filter(
    (transaction) => transaction.accountNumber == accountNumber
  );
  let html = account.transactionList; // for transactions page
  let html2 = account.refundList; // for refund page
  const dumpElm = document.getElementById("popup-refund-dump");

  // decrease list
  let decrease = [
    "AdjustmentDecrease",
    "3rdPartyFinancialTransactionFee",
    "DepositTransactionFee",
    "CallUsage",
    "Taxes",
    "ExpireFunds",
    "WriteOff",
  ];
  const parent = document.querySelector("#popup-refund-dump");
  let refundReason = `
        <select>
            <option>Refund</option>
        </select>`;
  for (i = 0; i < accountTransactions.length; i++) {
    let childId = `refund-dump-child${i}`;
    if (accountTransactions[i].applied != true) {
      // create a refund page for each transaction that is refundable
      if (
        accountTransactions[i].ccAuths === true &&
        accountTransactions[i].refunded === false
      ) {
        let child = document.createElement("div");
        child.setAttribute("id", childId);
        child.classList.add("popup-refund-dump");
        child.classList.add("popup-refund-dump-group");

        // refund form
        child.innerHTML = `
                <div><div id="popup-refund-close" onclick="styleElm('${childId}', 'display', 'none');">X</div></div>
                <div>
                    <fieldset>
                        <legend>Credit Card Refund Request</legend>
                        <form class="list-form">
                            <ul class="css-reset">
                                <li>
                                    <label>Request Date: </label>
                                    <input type="text" disabled value="${currDate}">
                                </li>
                                <li>
                                    <label>Rep's Name: </label>
                                    <input type="text" disabled value="${caresUser}">
                                </li>
                                <li>
                                    <label>Customer Account: </label>
                                    <input type="text" disabled value="${accountNumber}">
                                </li>
                                <li>
                                    <label>Customer's Name: </label>
                                    <input type="text" disabled value="${account.firstName} ${account.lastName}">
                                </li>
                                <li>
                                    <label>Merchant ID: </label>
                                    <input type="text" disabled value="${accountTransactions[i].merchantId}">
                                </li>
                                <li>
                                    <label>Credit Card Number: </label>
                                    <input type="text" disabled value="${accountTransactions[i].first6}******${accountTransactions[i].last4}">
                                </li>
                                <li>
                                    <label>Expiration Date: </label>
                                    <input type="text" disabled value="${accountTransactions[i].expDate}">
                                </li>
                                <li>
                                    <label>Transaction Date: </label>
                                    <input type="text" id="${childId}-date" disabled value="${accountTransactions[i].transactionDate}">
                                </li>
                                <li>
                                    <label>Transaction Total: </label>
                                    <input type="text" disabled id="${childId}-total" value="${accountTransactions[i].transactionTotal}">
                                </li>
                                <li>
                                    <label>Reason for Refund: </label>
                                    ${refundReason}
                                </li>
                                <li>
                                    <label>Refund Amount: </label>
                                    <input type="text" id="${childId}-amount" value="${accountTransactions[i].transactionTotal}">
                                </li>
                                <li>
                                    <label>Email Receipt: </label>
                                    <input type="checkbox" class="list-form-check">
                                </li>
                                <li>
                                    <label>Comment: </label>
                                    <textarea id="${childId}-comment"></textarea>
                                </li>
                            </ul>
                        </form>
                        <button type="button" onclick="submitRefund('${childId}')">Submit</button> <button type="button" onclick="styleElm('${childId}', 'display', 'none');">Close</button>
                    </fieldset>
                </div>
            `;

        parent.appendChild(child);
      }
      // refund page

      // apply the transactions to the transactions page & the balance
      if (decrease.includes(accountTransactions[i].adjType)) {
        total = total - parseFloat(accountTransactions[i].transactionTotal);
      } else {
        total = total + parseFloat(accountTransactions[i].transactionTotal);
      }

      // transactions page
      if (accountTransactions[i].addedBy != "skip") {
        html =
          `
                <tr>
                    <td>${accountTransactions[i].transactionDate} ${
            accountTransactions[i].transactionTime
          }</td>
                    <td>${accountTransactions[i].adjType}</td>
                    <td>${accountTransactions[i].addedBy}</td>
                    <td>${parseFloat(
                      accountTransactions[i].transactionTotal
                    ).toFixed(2)}</td>
                    <td>${parseFloat(total).toFixed(2)}</td>
                    <td>${accountTransactions[i].comment}</td>
                </tr>
            ` + html;
      }

      // refund page @@@
      if (accountTransactions[i].ccAuths == true) {
        let refundLink = `<a href="#" onclick="styleElm('${childId}', 'display', 'block')">Refund</a>`;
        if (accountTransactions[i].refunded == true) {
          refundLink = `cat`;
        }
        html2 = `
                    <tr>
                        <td>${refundLink}</td>
                        <td>${accountTransactions[i].transactionDate} ${accountTransactions[i].transactionTime}</td>
                        <td>${accountTransactions[i].addedBy}</td>
                        <td>${accountTransactions[i].transactionTotal}</td>
                        <td><img class="pointer" onclick='alert("${accountTransactions[i].first6}******${accountTransactions[i].last4}")' src="info_italic.png" alt="info"></td>
                        <td>${accountTransactions[i].comment}</td>
                    </tr>
                `;

        // unused(?)
        html3 = `
                    <form class="popup-refund-css>
                        <ul>
                            <li><label for=""></label></li>
                            <li><input type="text" value="${accountTransactions[i]}"></li>
                        </ul>
                    </form>
                `;
      }
      // apply the balance to the account summary page
      accountTransactions[i].applied = true;
    }
  }
  // update the transactions
  account.transactionList = html;
  account.refundList = html2;
  account.available = parseFloat(total).toFixed(2);
  account.ledger = account.available;

  let dumpElms = document.querySelectorAll(
    "#popup-refund-dump .popup-refund-dump"
  );
  dumpElms.forEach((elm) => (elm.style.display = "none"));
}

function applyTransaction(type, amount) {
  transactionList.push(new NewTransaction(amount, type));
  let index = checkAccount();
  loadAccount(index);
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function popUp(header, array = "none", event) {
  // header should be the name of the header icon that we're getting popup info for

  // mouse locations
  let xBefore = event.clientX;
  let yBefore = event.clientY;

  // container locations
  let x = xBefore * 1.05;
  let y = yBefore * 0.8;

  // div stuff
  const container = document.getElementById("popup-temp");
  const elmPop = document.createElement("div");
  elmPop.classList.add("popup-records-div");

  // add the flavor text
  if (header == "id" && array != "none") {
    // if the user clicked ID in call records...
    elmPop.innerHTML = `
        <div>
            <ul class="css-reset">
                <li><strong>Full Name:</strong> ${array.name}</li>
                <li><strong>Site ID:</strong> ${array.id}</li>
                <li><strong>Cost Center:</strong> ${array.center}</li>
                <li><strong>Inmate System:</strong>	${array.system}</li>
                <li><strong>Phone System:</strong> ${array.phone}</div></li>
            </ul>
        </div>`;
  } else if (header == "rate" && array != "none") {
    // if the user clicked rates in call records...
    x = 200;
    elmPop.innerHTML = `
        <div class="yellow-bg flex-column">
            <div class="strong" >RATES</div>
            <div class="container">
                <div class="flex-column strong">
                    <div class="strong purple-bg">Rate Type</div>
                    <div class="yellow-bg">IntraStateInterLata</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">SURCHG</div>
                    <div class="yellow-bg">0</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">Rate 1st Minute</div>
                    <div class="yellow-bg">${array.rate}</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">INIT DUR</div>
                    <div class="yellow-bg">60</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">Rate ADD'L Minute</div>
                    <div class="yellow-bg">${array.rate}</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">ADD'L DUR</div>
                    <div class="yellow-bg">60</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">Rate Period</div>
                    <div class="yellow-bg">1</div>
                </div>
                <div class="flex-column">
                    <div class="strong purple-bg">Miles</div>
                    <div class="yellow-bg">0 - 99999</div>
                </div>
            </div>
        </div>`;
  } else if (header == "cc" && array != "none") {
    elmPop.innerHTML = `666666******4444`;
  }

  let closeBtn = document.createElement("div");
  closeBtn.innerHTML = "x";
  closeBtn.classList.add("popup-records-btn");
  closeBtn.addEventListener("click", () => {
    elmPop.removeChild(closeBtn);
    container.removeChild(elmPop);
  });

  // remove the stuff to prevent dupes
  container.innerHTML = "";

  // add them to the document
  elmPop.appendChild(closeBtn);
  container.appendChild(elmPop);

  // adjust the div's location
  elmPop.style.position = "absolute";
  elmPop.style.left = x + "px";
  elmPop.style.top = y + "px";
}

/* STATIC ACCOUNTS */
// 8889884768 is [0]
accountList[0].callList.push({
  date: `10/18/2021 4:35:07 PM`,
  id: facs[0].id,
  orig: facs[0].orig,
  pin: 123456,
  duration: "0m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "D5",
  end: "",
  type: "H",
  rate: "5",
});
/* [1] */ accountList.push(
  new NewAccount(
    2085550510,
    "Betty",
    "Elderly",
    "111 COPLIN AVE",
    "",
    "85012",
    "PHOENIX",
    "AZ",
    "0510",
    "",
    "Charles Elderly",
    "lec-inactive",
    "advancepay",
    "0.00",
    "<tr><td>10/28/2021 4:28:52 PM</td><td>new.trainee Betty Elderly / 0510 / az_doc // account set up & provided payment instructions</td></tr>",
    true,
    true,
    true,
    true
  )
);
accountList[1].email = "belderly@customer.com";

/* [2] */ accountList.push(
  new NewAccount(
    2085550520,
    "Jess",
    "Baxter",
    "99 JAMES MARTIN CIR",
    "APT 208",
    "43085",
    "WORTHINGTON",
    "OH",
    "",
    "",
    "",
    "active",
    "advancepay",
    "0.00",
    "",
    false,
    false,
    false,
    false
  )
);
accountList[2].email = "jess.baxter0520@customer.com";
accountList[2].callList.push({
  date: `${currDate} ${currTime()}`,
  id: facs[1].sub,
  orig: facs[1].orig,
  pin: 123456,
  duration: "60m 0s",
  amt: "4.20",
  tax: "0.63",
  total: "4.83",
  start: "D0",
  end: "TO",
  type: "X",
  rate: "5",
});

/* [3] */ accountList.push(
  new NewAccount(
    2085550610,
    "Rae",
    "Brown",
    "1168 TENMILE",
    "",
    "14445",
    "KNOXVILLE",
    "OK",
    "",
    "",
    "",
    "active",
    "advancepay",
    "0.00",
    "",
    false,
    false,
    false,
    false
  )
);
accountList[3].email = "rbrown21@customer.com";

for (i = 1; i < 5; i++) {
  accountList[3].callList.push({
    date: `${currDate} 7:${i}${i * 2}:${i + 1}${i + 2} AM`,
    id: facs[1].sub,
    orig: facs[1].orig,
    pin: 123456,
    duration: "0m 0s",
    amt: "0.00",
    tax: "0.00",
    total: "0.00",
    start: "D5",
    end: "",
    type: "H",
    rate: "5",
  });
}

/* [4] */ accountList.push(
  new NewAccount(
    2085550730,
    "Gale",
    "Packington",
    "345 MELROSE ST",
    "",
    "44003",
    "SUFFOLK",
    "FL",
    "0730",
    "",
    "Iggy Martin",
    "lec-inactive",
    "advancepay",
    "0.00",
    "<tr><td>03/05/2020 10:11:23 AM</td><td>new.trainee Gale Packington / 0730 / Brevard County, FL // pymt $15 - gzv - new bal $8.57</td></tr>",
    true,
    true,
    true,
    true
  )
);
accountList[4].callList.push({
  date: `${currDate} 7:36:01 AM`,
  id: facs[0].sub,
  orig: facs[0].orig,
  pin: 123456,
  duration: "15m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "D0",
  end: "TO",
  type: "1",
  rate: "0",
});
/* [5] */ accountList.push(
  new NewAccount(
    2085550810,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "blocked",
    "advancepay",
    "0.00",
    '<tr class="red-text"><td>03/05/2020 10:11:23 AM</td><td>bduty changed the account status to BLOCKED.</td></tr>',
    false,
    false,
    false,
    false
  )
);
accountList[5].lastFacility = "LA County-Men's Central Jail";
for (i = 0; i < 9; i++) {
  let num1 = `${randomNum(5)}${randomNum(9)}`; // minutes
  let num2 = `${randomNum(5)}${randomNum(9)}`; // seconds

  let callMin = randomNum(59);
  let callSec = randomNum(59);
  let callDur = callMin;
  if ((callSec += 1)) {
    callDur++;
  }

  let callCost = facs[1].rate * callDur;
  let callTax = callCost * TAX_RATE;
  let callTotal = callCost + callTax;
  let endCode = "HU";
  if (callMin == 60) {
    endCode = "TO";
  }

  let date = `10/2${i}/2021`;
  let time = `${randomNum(11) + 1}:${num1}:${num2} PM`;
  accountList[5].callList.push({
    date: `${date} ${time}`,
    id: facs[1].sub,
    orig: facs[1].orig,
    pin: 123456,
    duration: `${callMin}m ${callSec}s`,
    amt: callCost.toFixed(2),
    tax: callTax.toFixed(2),
    total: callTotal.toFixed(2),
    start: "D0",
    end: endCode,
    type: "H",
    rate: "5",
  });

  transactionList.push(
    new NewTransaction(
      callCost,
      "CallUsage",
      "",
      2085550810,
      "HOUPASWVALSQL06",
      date,
      time
    )
  );
  transactionList.push(
    new NewTransaction(
      callTax,
      "Taxes",
      "",
      2085550810,
      "HOUPASWVALSQL06",
      date,
      time
    )
  );
}
transactionList.push(
  new NewTransaction(
    50.0,
    "AdjustmentDecrease",
    `<span class="yellow-text">GTL -- Adjustment Decrease on Account/Destination 2085550810 and credit card account (411111******1234) is because we received (1) chargeback dispute(s) for a total of ($50.00). The transaction date(s) was/were 10/20/2021. The dispute(s) was/were received ${currDate}. The reason for this dispute/action is "Card Absent Environment."</span>`,
    2085550810,
    "bduty"
  )
);
accountList[5].callList.push({
  date: `${currDate} ${currTime()}`,
  id: facs[1].sub,
  orig: facs[1].orig,
  pin: 123456,
  duration: "0m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "L2",
  end: "85",
  type: "H",
  rate: "5",
});

/* [6] 2085550720 */ accountList.push(
  new NewAccount(
    2085550720,
    "Nakita",
    "Waybe",
    "3112 VENTURA DR",
    "",
    "32696",
    "ENGLEWOOD",
    "DC",
    "0720",
    "no email",
    "none",
    "active",
    "advancepay",
    "0.00",
    `<tr><td>${currDate} 6:29:21 AM</td><td>new.trainee ms nakita waybe / new acc / pc 0720 / cx ci to xfer funds from wrong number but doesnt remember card - will call back<td><tr>`,
    true,
    true,
    true,
    false
  )
);
transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550720,
    caresUser,
    `${currDate}`,
    `6:26:12 AM`
  )
);
accountList[6].callList.push({
  date: `11/2/2021 8:51:35 AM`,
  id: facs[1].sub,
  orig: facs[1].orig,
  pin: 123456,
  duration: "0m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "BZ",
  end: "",
  type: "H",
  rate: "7",
});

// [7]
accountList.push(new NewAccount(12085550720));

/* [8] - 2085550710 call credit / ticket */
accountList.push(
  new NewAccount(
    2085550710,
    "Karen",
    "Johnson",
    "1324 MARIETTA ST",
    "APT 21",
    "95401",
    "SANTA ROSA",
    "CA",
    "0710",
    "Email: None",
    "NONE",
    "active",
    "advancepay",
    "0.00",
    "<tr><td>11/02/2021 9:19:11 AM</td><td>new.trainee karen johnson / cpni passed - pc 0710 / ca-doc  corcoran ca // call dropped after acc su </td></tr>",
    true,
    true,
    false,
    true
  )
);
accountList[8].lastFacility = facs[0].name;
transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550710,
    caresUser,
    "11/2/2021",
    "9:20:58 AM"
  )
);
transactionList.push(
  new NewTransaction(
    "5.00",
    "Deposit",
    "",
    2085550710,
    "CoMoWeb",
    "11/2/2021",
    "10:20:00 AM"
  )
);
transactionList.push(
  new NewTransaction(
    "0.00",
    "ServiceFee",
    "",
    2085550710,
    "CoMoWeb",
    "11/2/2021",
    "10:20:00 AM"
  )
);
transactionList.push(
  new NewTransaction(
    facs[0].rate,
    "CallUsage",
    "",
    2085550710,
    "HOUPASWVALSQL06"
  )
);
transactionList.push(
  new NewTransaction(0.01, "Taxes", "", 2085550710, "HOUPASWVALSQL06")
);
accountList[8].callList.push({
  date: `11/2/2021 8:51:35 AM`,
  id: facs[0].sub,
  orig: facs[0].orig,
  pin: 123456,
  duration: "1m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "D0",
  end: "TO",
  type: "0",
  rate: "1",
});
accountList[8].callList.push({
  date: `${currDate} ${currTime()}`,
  id: facs[0].sub,
  orig: facs[0].orig,
  pin: 123456,
  duration: "0m 52s",
  amt: 0.03,
  tax: 0.01,
  total: 0.04,
  start: "D0",
  end: "HU",
  type: "H",
  rate: "5",
});

/* [9] - 01112085550510 international */
accountList.push(
  new NewAccount(
    "01112085550510",
    "Betty",
    "Elderly",
    "111 COPLIN AVE",
    "",
    "85012",
    "PHOENIX",
    "AZ",
    "",
    "",
    "",
    "active",
    "advancepay",
    "0.00",
    "",
    true,
    true,
    true,
    true
  )
);
accountList[9].email = "belderly@customer.com";
transactionList.push(
  new NewTransaction(
    "0.00",
    "ServiceFee",
    "",
    "01112085550510",
    "ConnectNetwork",
    "10/29/2021",
    "2:23:50 PM"
  )
);

/* [10] -  2085550820 rates */
accountList.push(
  new NewAccount(
    2085550820,
    "Jose",
    "Davis",
    "2964 IRVING RD",
    "",
    "43150",
    "RUSHVILLE",
    "OH",
    "0820",
    "no email",
    "none",
    "active",
    "advancepay",
    "0.00",
    "<tr><td>11/02/2021 12:21:23 PM</td><td>new.trainee JOSE DAVIS / pc 0820 / OHDRC REFORM // AU: NONE / EMAIL NONE / POL READ / PAY $1 GZV NB $1 </td></tr>",
    true,
    true,
    true,
    true
  )
);
transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550820,
    caresUser,
    "11/2/2021",
    "12:10:11 AM"
  )
);
transactionList.push(
  new NewTransaction(
    "5.00",
    "Deposit",
    "",
    2085550820,
    "CARES",
    "11/2/2021",
    "12:15:11 AM"
  )
);
transactionList.push(
  new NewTransaction(
    "0.00",
    "ServiceFee",
    "",
    2085550820,
    "CARES",
    "11/2/2021",
    "12:15:11 AM"
  )
);

for (i = 0; i < 2; i++) {
  accountList[10].callList.push({
    date: `${currDate} ${currTime()}`,
    id: facs[2].sub,
    orig: facs[2].orig,
    pin: 123456,
    duration: "0m 0s",
    amt: "0.00",
    tax: "0.00",
    total: "0.00",
    start: "D5",
    end: "",
    type: "H",
    rate: "5",
  });
}

/* [11] -  2085550530 unlimited calling */
accountList.push(new NewAccount(2085550530));
transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550530,
    caresUser,
    currDate,
    "7:54:11 AM"
  )
);
accountList[11].comments = `<tr><td>${currDate} 7:26:21 AM</td><td>male voice // cx said made pymt online for special jail phone # // 666666******4444 exp 01/22 // adv no results // cx will call bank</td></tr>`;

/* [12] -  2085550620 blocking accounts */
accountList.push(new NewAccount(2085550620));
transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550620,
    caresUser,
    currDate,
    "7:51:55 AM"
  )
);
accountList[12].comments = `<tr><td>${currDate} 7:56:13 AM</td><td>cx refused to provide name // cx wanted to block all calls // put cx on hold but call disconnected</td></tr>`;
for (i = 0; i < 10; i++) {
  accountList[12].callList.push({
    date: `${currDate} 7:4${i}:${randomNum(4) + 1}${randomNum(8) + 1} AM`,
    id: facs[0].sub,
    orig: facs[0].orig,
    pin: 123456,
    duration: "0m 0s",
    amt: "0.00",
    tax: "0.00",
    total: "0.00",
    start: "D5",
    end: "",
    type: "H",
    rate: "5",
  });
}

/* [13] -  2085550901 no call records */
accountList.push(
  new NewAccount(
    2085550901,
    "James",
    "Brown",
    "4976 FULTON ST",
    "",
    "26101",
    "PARKERSBURG",
    "WV",
    "0901",
    "no email",
    "none",
    "active",
    "advancepay",
    "0.00",
    `<tr><td>${currDate} 5:51:22 AM</td><td>new.trainee James Brown / pc 0901 / FAC UNKNOWN // cx will call back when they know what facility </td></tr>`,
    true,
    true,
    true,
    true
  )
);

transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550901,
    caresUser,
    currDate,
    "5:51:22 AM"
  )
);

/* [14] -  2085550902 dropped calls */
accountList.push(
  new NewAccount(
    2085550902,
    "Stephanie",
    "Miller",
    "2437 APPLE LN",
    "",
    "61602",
    "PEORIA",
    "IL",
    "0902",
    "steph.miller@gmail.com",
    "none",
    "active",
    "advancepay",
    "0.00",
    `<tr><td>${currDate} 6:45:11 AM</td><td>new.trainee James Brown / pc 0901 / FAC UNKNOWN // cx will call back when they know what facility </td></tr>`,
    true,
    true,
    true,
    true
  )
);

transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550902,
    caresUser,
    currDate,
    "6:45:11 AM"
  )
);

transactionList.push(
  new NewTransaction(
    "10.00",
    "Deposit",
    "",
    2085550902,
    "ConnectNetwork",
    currDate,
    "6:45:11 AM"
  )
);
transactionList.push(
  new NewTransaction(
    returnFee(10),
    "ServiceFee",
    "",
    2085550902,
    "ConnectNetwork",
    currDate,
    "6:45:11 AM"
  )
);

function addCall(facIndex, accountIndex, time) {
  transactionList.push(
    new NewTransaction(
      facs[facIndex].rate,
      "CallUsage",
      "",
      accountList[accountIndex].accountNumber,
      "HOUPASWVALSQL06"
    )
  );

  accountList[accountIndex].callList.push({
    date: `${currDate} ${time} AM`,
    id: facs[facIndex].sub,
    orig: facs[facIndex].orig,
    pin: 123456,
    duration: "1m 0s",
    amt: facs[facIndex].rate.toFixed(2),
    tax: "0.00",
    total: facs[facIndex].rate.toFixed(2),
    start: "D0",
    end: "HU",
    type: "H",
    rate: "7",
  });
}

for (let i = 0; i < 4; i += 1) {
  const time = `${6}:5${i}:${randomNum(5)}${randomNum(9)}`;
  addCall(0, 14, time);
}

/* [15] -  2085550903 no call records */
accountList.push(
  new NewAccount(
    2085550903,
    "Samantha",
    "Decker",
    "9218 SUMMERHOUSE RD",
    "",
    "03054",
    "MERRIMACK",
    "NH",
    "",
    "samd03@yahoo.com",
    "",
    "lec-inactive",
    "advancepay",
    "0.00",
    "",
    true,
    true,
    true,
    true
  )
);

transactionList.push(
  new NewTransaction(
    "0.00",
    "NewAccount",
    "",
    2085550903,
    "InContactMainAdvancePayIVR",
    "05/01/2019",
    "12:35:11 PM"
  )
);

transactionList.push(
  new NewTransaction(
    "25.00",
    "Deposit",
    "",
    2085550903,
    "InContactMainAdvancePayIVR",
    "05/01/2019",
    "12:35:11 PM"
  )
);

transactionList.push(
  new NewTransaction(
    "25.00",
    "AdjustmentDecrease",
    "",
    2085550903,
    "Breakage AMES AdvancePay",
    "11/01/2019",
    "12:35:11 PM"
  )
);

accountList[15].callList.push({
  date: `11/01/2019 8:51:35 AM`,
  id: facs[1].sub,
  orig: facs[1].orig,
  pin: 123456,
  duration: "0m 0s",
  amt: "0.00",
  tax: "0.00",
  total: "0.00",
  start: "L6",
  end: "01",
  type: "H",
  rate: "7",
});

// STATIC ACCOUNTS

changeProperty("refund-page-type", "value", "");
document.getElementById("refund-page-type").addEventListener("change", () => {
  // change the refund page depending on what is selected
  let selectElm = document.getElementById("refund-page-type");
  let refundPages = document.querySelectorAll(".popup-refund-dump-group");
  let remainingAmt = document.getElementById("account-closure-remaining"); // amt remaining div

  // set the defaults
  remainingAmt.value = accountList[checkAccount()].available;
  remaingAmtFloat = parseFloat(remainingAmt.value);
  document.getElementById("refund-page-save").disabled = true;
  document.getElementById("refund-page-cancel").disabled = false;

  refundPages.forEach((page) => {
    // sets the refund amounts to their default
    let total = page.querySelector("li:nth-child(9) input");
    let refundAmt = page.querySelector("li:nth-child(11) input");

    refundAmt.value = total.value;
  });

  styleElm("account-closure-remaining-div", "visibility", "hidden");
  styleElm("account-closure-buttons", "visibility", "hidden");
  ///@@@
  if (selectElm.value == "refund") {
    styleElm("refund-table", "visibility", "visible");
  } else if (selectElm.value == "account-closure") {
    styleElm("refund-table", "visibility", "visible");
    styleElm("account-closure-buttons", "visibility", "visible");
    styleElm("account-closure-remaining-div", "visibility", "visible");

    refundPages.forEach((page) => {
      // sets the refund amounts to a lesser amount if needed
      let refundAmt = page.querySelector("li:nth-child(11) input");

      if (refundAmt.value > remaingAmtFloat) {
        refundAmt.value = remaingAmtFloat;
      }
    });
  } else {
    styleElm("refund-table", "visibility", "hidden");
  }
});

/* ONCLICK EVENTS */
function openCaresAcc() {
  // switch to account summary page
  toggleDisplay(CARES_PAGES, "container-summary");
  styleElm("container-refund", "display", "block");
  const refundPg = document.getElementById("container-refund");
  refundPg.classList.toggle("hide-me");

  let index = checkAccount(accountList);
  loadAccount(index);
  refundPg.classList.toggle("hide-me");
  styleElm("container-refund", "display", "none");
}

// When a number is entered, and the lookup button is pressed, consistently populate all the pages with preset or generated data
if (document.body.contains(document.getElementById("lookup-button")) == true) {
  document.getElementById("lookup-button").addEventListener("click", () => {
    openCaresAcc();
  });

  // CHANGE PAGES
  document.getElementById("nav-as").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-summary");
  });

  // refund
  document.getElementById("nav-refund").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-refund");
  });

  document.getElementById("refund-page-no-cc").addEventListener("click", () => {
    // alert msg
    const msg = `Are you sure the refund cannot be processed through credit card transactions? Click Ok to continue or Cancel to cancel.`;

    if (confirm(msg)) {
      // user pressed ok - open the no cc window
      styleElm("popup-no-cc", "display", "block");

      // display the stuffs
      let userAcc = accountList[checkAccount()];
      let refundAmt = document.getElementById("popup-no-cc-amt");
      let userEmail = document.getElementById("popup-no-cc-email");
      userEmail.value = "";
      document.getElementById("no-cc-comment").value = "";
      document.getElementById("popup-no-cc-bal").value = userAcc.available;
      refundAmt.value = userAcc.available;

      // checkbox
      let noCcCheck = document.getElementById("popup-no-cc-checkbox");
      noCcCheck.checked = false;
      noCcCheck.addEventListener("click", () => {
        if (noCcCheck.checked == true) {
          if (userAcc.email != "") {
            userEmail.value = userAcc.email;
          } else {
            alert("The current account does not have an email address.");
            noCcCheck.checked = false;
          }
        } else {
          userEmail.value = "";
        }
      });

      // submit and cancel
      document.getElementById("no-cc-submit").addEventListener("click", () => {
        transactionList.push(
          new NewTransaction(
            refundAmt.value,
            "AdjustmentDecrease",
            `Adjust account balance for non-credit card transaction check refund request.`
          )
        );
        styleElm("popup-no-cc", "display", "none");
        loadAccount(checkAccount());
      });

      document.getElementById("no-cc-cancel").addEventListener("click", () => {
        styleElm("popup-no-cc", "display", "none");
      });
    } else {
      // do nothing
    }
  });

  document.getElementById("popup-no-cc-close").addEventListener("click", () => {
    styleElm("popup-no-cc", "display", "none");
  });

  // transactions
  document.getElementById("nav-trans").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-transactions");
    styleElm("transactions-table", "visibility", "hidden"); // hide the transaction records
  });
  document
    .getElementById("container-transactions-search")
    .addEventListener("click", () => {
      styleElm("transactions-table", "visibility", "visible"); // hide the transaction records
    });

  document.getElementById("nav-ts").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-transaction-summary");
  });

  document.getElementById("nav-cr").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-records"); // switch to call records page
    document.getElementById("customer-call-records-body").innerHTML = "";
  });

  // when call records search is clicked
  document
    .getElementById("container-records-search")
    .addEventListener("click", () => {
      // populate customer-call-records with call records for the account
      let index = checkAccount();
      let callRecords = "";
      let recordBody = document.getElementById("customer-call-records-body");
      if (accountList[index].callList != "") {
        for (i = 0; i < accountList[index].callList.length; i++) {
          callRecords =
            `
                    <tr>
                        <td>${accountList[index].callList[i].date}</td>
                        <td class="pointer generated-call-record" id="call-records-id"><strong>${accountList[index].callList[i].id}</strong></td>
                        <td>${accountList[index].callList[i].orig}</td>
                        <td><strong>${accountList[index].callList[i].pin}</strong></td>
                        <td>${accountList[index].callList[i].duration}</td>
                        <td>$${accountList[index].callList[i].amt}</td>
                        <td>$${accountList[index].callList[i].tax}</td>
                        <td>$${accountList[index].callList[i].total}</td>
                        <td><img class="pointer" src="info_italic.png" alt="info"></img></td>
                        <td><strong>${accountList[index].callList[i].start}</strong></td>
                        <td><strong>${accountList[index].callList[i].end}</strong></td>
                        <td><strong>${accountList[index].callList[i].type}</strong></td>
                        <td class="pointer generated-rate-record" id="call-records-rates"><strong>${accountList[index].callList[i].rate}</strong></td>
                        <td>Feature Disabled</td>
                        <td><a href="http://hcares/csguide/default.aspx"><img class="pointer" src="info_r.png" alt="(R)"></img></a></td>
                    </tr>
                ` + callRecords;
        }

        // find the array needed for the right facility to populate
        let facIndex = 0;
        for (i = 0; i < facs.length; i++) {
          if (accountList[index].callList[0].id == facs[i].sub) {
            facIndex = i;
          }
        }

        // set event listeners to clicking in the call records work
        document.getElementById("customer-call-records-body").innerHTML =
          callRecords;
        document.querySelectorAll(".generated-call-record").forEach((call) => {
          call.addEventListener("click", (event) => {
            popUp("id", facs[facIndex], event);
          });
        });

        document.querySelectorAll(".generated-rate-record").forEach((call) => {
          call.addEventListener("click", (event) => {
            popUp("rate", facs[facIndex], event);
          });
        });
      } else {
        recordBody.innerHTML = "<td>There are no records to display.</td>";
      }
    });

  document.getElementById("nav-tc").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-tag");
  });

  document.getElementById("nav-sm").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-statements");
  });

  document.getElementById("nav-ar").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-reload");
  });

  document.getElementById("nav-alerts").addEventListener("click", () => {
    toggleDisplay(CARES_PAGES, "container-alerts");
  });

  // CUSTOMER REQUESTED BLOCK
  CUSTOMER_BLOCK_REQUESTED.addEventListener("click", () => {
    // We don't want to check/uncheck it quite yet
    CUSTOMER_BLOCK_REQUESTED.checked = !CUSTOMER_BLOCK_REQUESTED.checked;

    // block
    const MESSAGE1 = `Advise the customer that blocking their phone number will not allow them to receive any calls from any facility serviced by GTL. Make sure they wish to continue before activating the block.`;

    // unblock
    const MESSAGE2 = `Advise the customer that unblocking their phone number will allow them to receive any calls from any facility serviced by GTL. Make sure they wish to continue before deactivating the block.`;

    // Window pops up when "Customer Block Requested:" checkbox is clicked
    styleElm("popup-customer-block-requested", "visibility", "visible");
    styleElm("popup-customer-block-requested", "left", "180px");

    if (CUSTOMER_BLOCK_REQUESTED.checked == true) {
      // display the message for when we are removing the block
      changeProperty("block-unblock-message", "innerHTML", MESSAGE2);
    } else {
      // display the message for when we are adding the block
      changeProperty("block-unblock-message", "innerHTML", MESSAGE1);
    }
  });

  document.getElementById("popup-button2").addEventListener("click", () => {
    // Hides the "Customer block Requested:" window when cancel is clicked
    styleElm("popup-customer-block-requested", "visibility", "hidden");
    styleElm("popup-customer-block-requested", "left", "-100000px");
  });

  document.getElementById("popup-button1").addEventListener("click", () => {
    // Hides the "Customer block Requested:" window when OK is clicked
    styleElm("popup-customer-block-requested", "visibility", "hidden");
    styleElm("popup-customer-block-requested", "left", "-100000px");

    // Apply the change
    CUSTOMER_BLOCK_REQUESTED.checked = !CUSTOMER_BLOCK_REQUESTED.checked;
    if (CUSTOMER_BLOCK_REQUESTED.checked == true) {
      accountList[checkAccount()].customerBlock = true;
    } else {
      accountList[checkAccount()].customerBlock = false;
    }
  });
  // CUSTOMER REQUESTED BLOCK

  // CC BLOCK CHECKBOX
  CREDIT_CARD_BLOCK.addEventListener("click", () => {
    // grab the checkbox

    // we don't want it changed quite yet
    CREDIT_CARD_BLOCK.checked = !CREDIT_CARD_BLOCK.checked;

    // set the displayed messages
    const MESSAGE1 = `Are you sure you want to block credit card payment for the current account?`;
    const MESSAGE2 = `Are you sure you want to unblock credit card payment for the current account?`;

    if (CREDIT_CARD_BLOCK.checked == true) {
      result = confirm(MESSAGE2);
    } else {
      result = confirm(MESSAGE1);
    }

    if (result == true) {
      // now we want to check it
      CREDIT_CARD_BLOCK.checked = !CREDIT_CARD_BLOCK.checked;

      if (CREDIT_CARD_BLOCK.checked == true) {
        accountList[checkAccount()].ccBlock = true;
      } else {
        accountList[checkAccount()].ccBlock = false;
      }
    }
  });
  // CC BLOCK CHECKBOX

  // POLICY CHECKLIST
  document.getElementById("policy-check-list").addEventListener("click", () => {
    // Shows the window
    styleElm("popup-policy-checklist", "visibility", "visible");
    styleElm("popup-policy-checklist", "left", "40%");
  });

  function updatePolicyChecklistColor() {
    // color the button depending on how many things we've checked off
    if (
      (CHECK1.checked == true &&
        CHECK2.checked == true &&
        CHECK3.checked == true) ||
      CHECK4.checked == true
    ) {
      styleElm("policy-check-list", "backgroundColor", "#72A3D5");
    } else {
      styleElm("policy-check-list", "backgroundColor", "");
    }
  }

  document
    .getElementById("popup-policy-button1")
    .addEventListener("click", () => {
      // Hides the window
      styleElm("popup-policy-checklist", "visibility", "hidden");
      styleElm("popup-policy-checklist", "left", "-100000px");

      // Color the button accordingly to how many things we have checked off
      updatePolicyChecklistColor();

      // update CARES
      const CHECK1 = document.getElementById("popup-check1");
      const CHECK2 = document.getElementById("popup-check2");
      const CHECK3 = document.getElementById("popup-check3");
      const CHECK4 = document.getElementById("popup-check4");

      let message = `updated the account attribute for `;
      let index = checkAccount(accountList);

      if (accountList[index].policy1 != CHECK1.checked) {
        addNewComment(`${message}PCCellPhone to ${CHECK1.checked}.`);
        accountList[index].policy1 = CHECK1.checked;
      }

      if (accountList[index].policy2 != CHECK2.checked) {
        addNewComment(`${message}PCServiceFees to ${CHECK2.checked}.`);
        accountList[index].policy2 = CHECK2.checked;
      }

      if (accountList[index].policy3 != CHECK3.checked) {
        addNewComment(
          `${message}PC90DaysAccountExpiration to ${CHECK3.checked}.`
        );
        accountList[index].policy3 = CHECK3.checked;
      }

      if (accountList[index].policy4 != CHECK4.checked) {
        addNewComment(
          `${message}PC180DaysAccountExpiration to ${CHECK4.checked}.`
        );
        accountList[index].policy4 = CHECK4.checked;
      }
    });

  document
    .getElementById("popup-policy-button2")
    .addEventListener("click", () => {
      // Hides the window
      styleElm("popup-policy-checklist", "visibility", "hidden");
      styleElm("popup-policy-checklist", "left", "-100000px");
    });

  // POLICY CHECKLIST

  // ACCOUNT COMMENTS
  document
    .getElementById("add-new-account-comment")
    .addEventListener("click", () => {
      // Shows the window
      styleElm("popup-comment-box", "visibility", "visible");
      styleElm("popup-comment-box", "left", "40%");
    });

  document
    .getElementById("popup-comment-close")
    .addEventListener("click", () => {
      // Hides the window
      styleElm("popup-comment-box", "visibility", "hidden");
      styleElm("popup-comment-box", "left", "-100000px");
    });

  document
    .getElementById("popup-comment-submit")
    .addEventListener("click", () => {
      // Hides the window
      styleElm("popup-comment-box", "visibility", "hidden");
      styleElm("popup-comment-box", "left", "-100000px");

      // update the comments
      let newComment = document.getElementById("popup-comment-message");
      addNewComment(newComment.value);
    });

  // ACCOUNT COMMENTS
}

// ADJUSTMENTS AND DEPOSITS

// REFUNDS

document.getElementById("refund-page-cancel").addEventListener("click", () => {
  submitRefund("cancel");
});

document.getElementById("refund-page-save").addEventListener("click", () => {
  submitRefund("save");
});

function submitRefund(id) {
  // if we're on 'Refund', add a refund transaction immediately based off of the elm id
  const select = document.getElementById("refund-page-type");

  function processRefund(id) {
    if (id === "save") {
      // account closure - the funds aren't actually removed for this???
      let refundTotal = document.getElementById("balance-available");

      // block CARES
      changeProperty("account-status", "value", "blocked");
      accountList[checkAccount()].accountStatus = "blocked";

      document.getElementById("refund-page-save").disabled = true; // save button
      document.getElementById("refund-page-cancel").disabled = true; // cancel button

      // add comment
      addNewComment(
        `added Account Closure request for amount $${refundTotal.value}.`
      );
      loadAccount(checkAccount());
    } else {
      // add a transaction & mark as refunded, then load the account
      let amt = document.getElementById(`${id}-amount`);
      let date = document.getElementById(`${id}-date`);
      let cmt = `${caresUser} added adjustment decrease for Refund request. Transaction date: ${date.value}.`;
      transactionList.push(
        new NewTransaction(amt.value, "AdjustmentDecrease", cmt)
      );
      // total, adjustment type, comment

      addNewComment(`added Refund request for amount $${amt.value}.`);
      loadAccount(checkAccount());
    }
  }

  if (id == "cancel") {
    let remainingAmt = document.getElementById("account-closure-remaining"); // amt remaining div
    remainingAmt.value = accountList[checkAccount()].available;

    document.getElementById("refund-page-save").disabled = true; // save button
  } else if (id == "save") {
    // submit the refund
    processRefund(id);
  } else {
    // if we're on 'Account Closure', only refund if 'Save' is clicked @@@
    if (select.value == "account-closure") {
      // reduce the amount needed to close the account
      let remainingAmt = document.getElementById("account-closure-remaining"); // amt remaining div
      let amt = document.getElementById(`${id}-amount`);
      let remainingTotal = remainingAmt.value - amt.value;
      remainingAmt.value = remainingTotal.toFixed(2);

      if (remainingTotal == 0) {
        document.getElementById("refund-page-save").disabled = false; // save button
      }

      styleElm(`${id}`, "display", "none");
    } else {
      processRefund(id);
    }
  }

  // delete the div if we submit a refund

  // create an event listener to delete it if the select gets changed

  /* 
        I could put them inside of a div and then take them out if the page is changed
        if (document.body.contains(document.getElementById('nav-refund')) == true){} // yea this rings as true even when the page changes...

        OR have JS create/delete the refund div... hmmm

        Have it clear during the page change function?
    */
}
// REFUNDS

// adj increase
document.getElementById("adj-increase").addEventListener("click", () => {
  const adjBox = document.getElementById("popup-adj-box");
  const adjTitle = document.getElementById("popup-adj-title");
  const adjAmount = document.getElementById("popup-adj-amount");
  const adjComment = document.getElementById("pop-adj-comment");
  const closeButton = document.getElementById("popup-adj-close");
  const addTransaction = document.getElementById("popup-adj-confirm");

  // transfer
  const adjTransferBox = document.getElementById("popup-adj-legend-box");

  // style the element for Adjustment Increase option
  styleElm("popup-adj-box", "display", "block");
  adjTitle.innerText = "Adjustment Increase";
  adjTransferBox.style.display = "none";
  adjBox.style.height = "199.4px";
  adjBox.style.background = "#008000";

  // close button
  closeButton.onclick = function () {
    styleElm("popup-adj-box", "display", "none");
  };

  // apply transaction
  addTransaction.onclick = function () {
    transactionList.push(
      new NewTransaction(
        adjAmount.value,
        "AdjustmentIncrease",
        adjComment.value
      )
    );
    styleElm("popup-adj-box", "display", "none");
    loadAccount(checkAccount());
  };
});

// adj decrease
document.getElementById("adj-decrease").addEventListener("click", () => {
  const adjBox = document.getElementById("popup-adj-box");
  const adjTitle = document.getElementById("popup-adj-title");
  const adjAmount = document.getElementById("popup-adj-amount");
  const adjComment = document.getElementById("pop-adj-comment");
  const closeButton = document.getElementById("popup-adj-close");
  const addTransaction = document.getElementById("popup-adj-confirm");

  // transfer
  const adjTransferBox = document.getElementById("popup-adj-legend-box");
  const adjCaption = document.getElementById("popup-adj-legend-caption");
  const adjNumber = document.getElementById("popup-adj-number");

  // style the element for Adjustment Decrease option
  adjTransferBox.style.display = "flex";
  styleElm("popup-adj-box", "display", "block");
  adjTitle.innerText = "Adjustment Decrease";
  adjCaption.innerText = "Transfer Funds To (optional)";
  adjBox.style.height = "282.65px";
  adjBox.style.background = "maroon";

  // close button
  closeButton.onclick = function () {
    styleElm("popup-adj-box", "display", "none");
  };

  // apply transaction
  addTransaction.onclick = function () {
    transactionList.push(
      new NewTransaction(
        adjAmount.value,
        "AdjustmentDecrease",
        adjComment.value
      )
    );
    if (adjNumber.value != "") {
      transactionList.push(
        new NewTransaction(
          adjAmount.value,
          "AdjustmentIncrease",
          adjComment.value,
          adjNumber.value
        )
      );
    }
    styleElm("popup-adj-box", "display", "none");
    loadAccount(checkAccount());
  };
});

document.getElementById("funds-transfer").addEventListener("click", () => {
  const adjBox = document.getElementById("popup-adj-box");
  const adjTitle = document.getElementById("popup-adj-title");
  const adjAmount = document.getElementById("popup-adj-amount");
  const adjComment = document.getElementById("pop-adj-comment");
  const closeButton = document.getElementById("popup-adj-close");
  const addTransaction = document.getElementById("popup-adj-confirm");

  // transfer
  const adjTransferBox = document.getElementById("popup-adj-legend-box");
  const adjCaption = document.getElementById("popup-adj-legend-caption");
  const adjNumber = document.getElementById("popup-adj-number");

  // style the element for Funds Transfer option
  adjTransferBox.style.display = "flex";
  styleElm("popup-adj-box", "display", "block");
  adjTitle.innerText = "Funds Transfer";
  adjCaption.innerText = "Transfer Funds To";
  adjBox.style.height = "282.65px";
  adjBox.style.background = "#800080";

  // close button
  closeButton.onclick = function () {
    styleElm("popup-adj-box", "display", "none");
  };

  // apply transaction
  addTransaction.onclick = function () {
    transactionList.push(
      new NewTransaction(
        adjAmount.value,
        "AdjustmentDecrease",
        adjComment.value
      )
    );
    transactionList.push(
      new NewTransaction(
        adjAmount.value,
        "AdjustmentIncrease",
        adjComment.value,
        adjNumber.value
      )
    );
    styleElm("popup-adj-box", "display", "none");
    loadAccount(checkAccount());
  };
});

function returnFee(amount) {
  return parseFloat(amount * 0.0325 + 5.95).toFixed(2);
}

document.getElementById("popup-cc-deposit-sf").addEventListener("click", () => {
  const sf = document.getElementById("popup-cc-deposit-sf-msg");
  const amnt = document.getElementById("popup-cc-deposit-amount").value;
  styleElm("popup-cc-deposit-sf-msg", "display", "block");

  const fee = parseFloat(amnt) > 0 ? parseFloat(amnt) : 0;
  sf.innerHTML = '<div class="bold underline">SYSTEM MESSAGES(S): </div>';
  sf.innerHTML +=
    fee > 0
      ? `Total service charge will be: $${returnFee(amnt)}.`
      : "A valid non-zero amount is required to check the service fee.";
});

document.getElementById("adj-deposit").addEventListener("click", () => {
  let index = checkAccount();
  let fullName = `${accountList[index].firstName} ${accountList[index].lastName}`;

  if (document.getElementById("lookup-number").value != "") {
    styleElm("popup-cc-deposit", "left", "10rem");
    changeProperty("popup-cc-deposit-name", "value", fullName);
    changeProperty(
      "popup-cc-deposit-address",
      "value",
      accountList[index].address1
    );
    changeProperty("popup-cc-deposit-city", "value", accountList[index].city);
    changeProperty("popup-cc-deposit-state", "value", accountList[index].state);
    changeProperty("popup-cc-deposit-zip", "value", accountList[index].zipCode);

    // adds the cc year dates
    const ccExpYear = document.getElementById("popup-cc-deposit-ccdate2");
    let newOptions = "<option></option>";
    let year = currYear;
    for (i = 0; i < 10; i++) {
      newOptions = newOptions + `<option>${year}</option>`;
      year++;
    }
    ccExpYear.innerHTML = newOptions;
  } else {
    changeProperty(
      "load-text",
      "innerHTML",
      `Please enter a valid account number and click on 'Lookup' before attempting this action.`
    );
  }
});

document
  .getElementById("popup-cc-deposit-cancel")
  .addEventListener("click", () => {
    styleElm("popup-cc-deposit", "left", "-100000px");
  });

document
  .getElementById("popup-cc-deposit-submit")
  .addEventListener("click", () => {
    const amt = document.getElementById("popup-cc-deposit-amount");
    const cmt = document.getElementById("popup-cc-deposit-comment");
    const msg = document.getElementById("popup-cc-deposit-system-message");

    msg.innerHTML = "";

    if (amt.value == "") {
      msg.innerHTML = `Payment dollar amount is required.`;
    } else if (isNaN(amt.value) != false) {
      msg.innerHTML = `Please enter a valid payment amount.`;
    } else if (document.getElementById("popup-cc-deposit-name").value == "") {
      msg.innerHTML = `Full name is a required field.`;
    } else if (
      document.getElementById("popup-cc-deposit-address").value == "" ||
      document.getElementById("popup-cc-deposit-city").value == "" ||
      document.getElementById("popup-cc-deposit-zip").value == ""
    ) {
      msg.innerHTML = `Full billing address is required.`;
    } else if (
      document.getElementById("popup-cc-deposit-ccnumber").value ==
        "popup-cc-deposit-ccdate1" ||
      document.getElementById("popup-cc-deposit-cccode").value == "" ||
      document.getElementById("popup-cc-deposit-ccdate1").value == "" ||
      document.getElementById("popup-cc-deposit-ccdate2").value == ""
    ) {
      msg.innerHTML = `Credit card information is required.`;
    } else {
      // apply the deposit
      const fee = returnFee(amt.value);
      transactionList.push(new NewTransaction(amt.value, "Deposit", cmt.value));
      transactionList.push(
        new NewTransaction(fee, "AdjustmentDecrease", "service fee")
      );
      styleElm("popup-adj-box", "display", "none");
      loadAccount(checkAccount());

      // reset the form
      amt.value = "";
      cmt.value = "";
      document.getElementById("popup-cc-deposit-ccnumber").value = "";
      document.getElementById("popup-cc-deposit-ccdate1").value = "";
      document.getElementById("popup-cc-deposit-ccdate2").value = "";
      document.getElementById("popup-cc-deposit-cccode").value = "";

      msg.innerHTML = "Payment went through successfully.";
    }
    // display the confirmation message
    styleElm("popup-cc-msg-div", "display", "block");
  });

// ADJUSTMENTS AND DEPOSITS

// SAVE CHANGES
document.getElementById("form-save-changes").addEventListener("click", () => {
  caresIds = [
    document.getElementById("lookup-number"),
    document.getElementById("form-first-name"),
    document.getElementById("form-last-name"),
    document.getElementById("form-address-1"),
    document.getElementById("form-address-2"),
    document.getElementById("form-zip-code"),
    document.getElementById("form-city"),
    document.getElementById("form-state"),
    document.getElementById("form-phone-number"),
    document.getElementById("form-alt-number"),
    document.getElementById("form-email"),
    document.getElementById("form-federal-tax-id"),
    document.getElementById("form-ivr-passcode"),
    document.getElementById("form-notes"),
    document.getElementById("form-authorized-user"),
    document.getElementById("form-original-lec"),
    document.getElementById("form-last-facility-called"),
    document.getElementById("account-status"),
    document.getElementById("account-type"),
  ];

  // add transactions to the account
  let index = checkAccount();

  // load all the info to match the object
  let i = 0;
  for (key in accountList[index]) {
    if (i < caresIds.length) {
      accountList[index][key] = `${caresIds[i].value}`;
      i++;
    }
  }

  changeProperty(
    "load-text",
    "innerText",
    `Advance Pay account ${accountList[index].accountNumber} was updated successfully.`
  );
});
// SAVE CHANGES

// UPDATE DATES //
function updateCalDates() {
  // this updates all the calender dates
  let startDates = document.querySelectorAll(".start-date");
  let endDates = document.querySelectorAll(".end-date");

  let monthFixed = currMonth;
  let dayFixed = currDay;

  if (monthFixed < 10) {
    monthFixed = `0${monthFixed}`;
  }

  if (dayFixed < 10) {
    dayFixed = `0${dayFixed}`;
  }

  let modDate = `${currYear - 1}-${monthFixed}-${dayFixed}`;

  endDates.forEach((endDate) => {
    endDate.value = `${currYear}-${monthFixed}-${dayFixed}`;
  });

  startDates.forEach((startDate) => {
    startDate.value = modDate;
  });
}

updateCalDates();
// UPDATE DATES //

// CC AUTHS PAGE:
document.querySelector(".cc-auths-close").addEventListener("click", () => {
  styleElm("popup-cc-auths", "display", "none");
  document.getElementById("auths-type").value = "destination";
  updateCcAuthsInput();
});

// update the transactions page
function updateCcAuthsTransactions(
  searchType,
  searchKey,
  searchValue = document.getElementById("auths-search").value
) {
  /*
        searchType = "destination", "first6", "first4", "last4"
        searchKey = accountNumber, first6 + last4, first4 + last4, last4 
        searchValue = auths-search.value
    */
  let trans = transactionList.filter(
    (account) => account[searchKey] == searchValue && account.ccAuths === true
  );
  if (
    document.body.contains(document.getElementById("auths-search2")) == true
  ) {
    // if we have a second input, we need to search by both
    let searchValue2 = document.getElementById("auths-search2");
    trans = transactionList.filter(
      (account) =>
        account[searchKey] == searchValue &&
        account.last4 == searchValue2.value &&
        account.ccAuths === true
    );
  }

  let destinationHead = `
        <tr>
            <th>Calling System</th>
            <th>Date</th>
            <th>CC Num</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Code</th>
            <th>Order ID</th>
            <th>Reject Code</th>
            <th>Vendor</th>
            <th>Transaction Type</th>
        </tr>
    `;

  let elseHead = `
        <tr>
            <th>Calling System</th>
            <th>Status</th>
            <th>Destination</th>
            <th>CC Number</th>
            <th>Exp</th>
            <th>Amount</th>
            <th>Auth Code</th>
            <th>Order ID</th>
            <th>Add Date</th>
            <th>Vendor</th>
            <th>Transaction Type</th>
        </tr>
    `;
  const head = document.querySelector("#cc-auths-head");

  // cc auths body
  let html = "";
  if (trans.length != 0) {
    document.getElementById("cc-auths-error").innerText = "";
    if (searchType == "destination") {
      head.innerHTML = destinationHead;
      for (i = 0; i < trans.length; i++) {
        if (trans.ccCallingSystem != "AP_ONECALL_USAGE") {
          html =
            `
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td></td>
                        <td>${trans[i].ccRejectCode1}</td>
                        <td>${trans[i].ccVendor1}</td>
                        <td>${trans[i].ccTransactionType1}</td>
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode2}</td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].ccRejectCode2}</td>
                        <td>${trans[i].ccVendor2}</td>
                        <td>${trans[i].ccTransactionType2}</td>
                    </tr>
                ` + html;
        } else {
          html =
            `
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$0.00</td>
                        <td></td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>0</td>
                        <td>PaymenTech</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td></td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>00</td>
                        <td>PaymenTech</td>
                        <td>Capture</td>
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td></td>
                        <td>${trans[i].ccRejectCode1}</td>
                        <td>${trans[i].ccVendor1}</td>
                        <td>${trans[i].ccTransactionType1}</td>
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode2}</td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].ccRejectCode2}</td>
                        <td>${trans[i].ccVendor2}</td>
                        <td>${trans[i].ccTransactionType2}</td>
                    </tr>
                ` + html;
        }
      }
    } else {
      head.innerHTML = elseHead;
      for (i = 0; i < trans.length; i++) {
        if (trans.ccCallingSystem != "AP_ONECALL_USAGE") {
          html =
            `
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td></td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].ccVendor1}</td>
                        <td>${trans[i].ccTransactionType1}</td>                      
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].ccVendor2}</td>
                        <td>${trans[i].ccTransactionType2}</td>   
                    </tr>
                ` + html;
        } else {
          html =
            `
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$0.00</td>
                        <td></td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>PaymenTech</td>
                        <td>Void</td>                      
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td></td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>PaymenTech</td>
                        <td>Capture</td>   
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td></td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].ccVendor1}</td>
                        <td>${trans[i].ccTransactionType1}</td>                      
                    </tr>
                    <tr>
                        <td>${trans[i].ccCallingSystem}</td>
                        <td>${trans[i].ccStatus}</td>
                        <td>${trans[i].accountNumber}</td>
                        <td>${trans[i].first6}******${trans[i].last4}</td>
                        <td>${trans[i].expDate}</td>
                        <td>$${trans[i].transactionTotal}</td>
                        <td>${trans[i].ccCode1}</td>
                        <td>${trans[i].ccOrderId}</td>
                        <td>${trans[i].transactionDate}</td>
                        <td>${trans[i].ccVendor2}</td>
                        <td>${trans[i].ccTransactionType2}</td>   
                    </tr>
                ` + html;
        }
      }
    }
  } else {
    document.getElementById("cc-auths-error").innerText =
      "No records found. Please change search criteria and try again.";
    let emptyRows = ``;
    if (searchType != "destination") {
      head.innerHTML = elseHead;
      emptyRows += `<td></td>`;
    } else {
      head.innerHTML = destinationHead;
    }
    for (i = 0; i < 10; i++) {
      emptyRows += `<td></td>`;
    }
    html = `<tr>${emptyRows}</tr>`;
  }

  return html;
}

// When the page is opened
document.querySelector("#nav-cca").addEventListener("click", () => {
  const accountNumber = document.getElementById("lookup-number");
  let body = document.querySelector("#cc-auths-body");

  if (accountNumber.value != "") {
    // open CC Auths if the account exists
    styleElm("popup-cc-auths", "display", "flex");
    document.querySelector("#auths-type").value = "destination";

    // set the phone number to match the account
    document.querySelector("#auths-search").value = accountNumber.value;
    body.innerHTML = updateCcAuthsTransactions(
      "destination",
      "accountNumber",
      accountNumber.value
    );
  } else {
    alert("Please enter a valid phone number before performing this action.");
  }
});

// when the search type is changed
function updateCcAuthsInput() {
  const searchType = document.querySelector("#auths-type");
  const searchSpan = document.querySelector("#auths-search-inputs");
  searchSpan.innerHTML = `<input type="number" id="auths-search">`;

  if (searchType.value == "destination" || searchType.value == "last4") {
    searchSpan.innerHTML = `<input type="number" id="auths-search">`;
  } else {
    searchSpan.innerHTML = `<input type="number" style="width:69.3335px" id="auths-search"><input type="number" style="width:69.3335px" id="auths-search2">`;
  }
}
document.querySelector("#auths-type").addEventListener("change", () => {
  updateCcAuthsInput();
});

// when search is clicked
document.querySelector("#auths-button1").addEventListener("click", () => {
  // check the search type
  const searchType = document.querySelector("#auths-type");

  // search by the parameters given
  if (searchType.value == "destination") {
    document.querySelector("#cc-auths-body").innerHTML =
      updateCcAuthsTransactions("destination", "accountNumber");
  } else {
    document.querySelector("#cc-auths-body").innerHTML =
      updateCcAuthsTransactions(searchType.value, searchType.value);
  }
});

// listen for enter
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    openCaresAcc();
  }
});

//
