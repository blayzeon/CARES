import data from "./data.JSON";
import mkDom from "./mkDom";

/* globals */
const mainC = document.querySelector('#maincontent');
const cData = data;
let account = 0;

/* create the sidebar content */
const sidebar = document.querySelector('#sidebar');
mkDom('label', 'Phone Number: ', [], [], sidebar);
const sidebarInput = mkDom('input', false, [['type','text']], []);
sidebar.appendChild(sidebarInput);
const sidebarBtn = mkDom('button', 'Lookup');
sidebar.appendChild(sidebarBtn);
mkDom('a', 'Advanced Search', [['href', '#']], [], sidebar);
mkDom('a', 'LEC Credit', [['href', '#']], [], sidebar);
mkDom('div', 'Links', [], ['navy-bg', 'ff-tnr', 'margin-top'], sidebar);
mkDom('a', 'Master Facility list', [['href', '#']], [], sidebar);
mkDom('a', 'Refund Form', [['href', '#']], [], sidebar);
mkDom('a', 'Research Page', [['href', '#']], [], sidebar);
mkDom('a', 'Connect Network', [['href', '#']], [], sidebar);
mkDom('a', 'CN Site Info', [['href', '#']], [], sidebar);
mkDom('a', 'Facility Services', [['href', '#']], [], sidebar);
const sidebarDeposit = mkDom('a', 'CC Deposit', [['href', '#']], []);
sidebar.appendChild(sidebarDeposit);
const sidebarCreateAccount = mkDom('a', 'Create Account', [['href', '#']], []);
sidebar.appendChild(sidebarCreateAccount);

sidebarBtn.addEventListener('click', ()=>{
    for (let i = 0; i < cData.accounts.length; i += 1){
        if (sidebarInput.value === cData.accounts[i].account){
            account = cData.account[i];
            return;
        }
    }
    console.log(false);
});


/* generate the different page types */
function accountSummary(){
    const asUl = mkDom('ul', false, [['id', 'as-container']]);

    // first row
    const asR1 = mkDom('li');

    // status
    const statusO = '<option>Active</option><option>Returned Mail</option><option>LEC/Inactive</option><option>Blocked</option>';
    const status = mkDom('select', statusO, [], [], asR1);

    // account type
    const atC = mkDom('div');
    mkDom('label', 'Account Type: ', [], [], atC);
    const accountTypeO = '<option></option><option>Advance Pay</option><option>Direct Bill</option><option>Friends and Family</option><option>APOC</option>';
    const accountType = mkDom('select', accountTypeO, [], [], atC);
    asR1.appendChild(atC);

    // i icon andshow contract exceptions
    const sceC = mkDom('div');
    mkDom('img', false, [['src', './img/info_italic.png']], [], sceC);
    mkDom('button', 'Show Contract Exceptions', [], [], sceC);
    asR1.appendChild(sceC);

    // next row
    const asR2 = mkDom('li');

    // phone indicator
    const piC = mkDom('div');
    mkDom('label', 'Phone Indicator: ', [], [], piC);
    const piO = '<option>Cell Phone</option><option>Land Line</option><option>No Override</option><option>Not Indicated</option><option>Block</option>';
    mkDom('select', piO, [], [], piC);
    asR2.appendChild(piC);

    mkDom('img', false, [['src', './img/info_italic.png']], [], asR2);

    // validation surcharge
    const vsC = mkDom('div');
    mkDom('label', 'Validation Surcharge: ', [], [], vsC);
    const vsO = '<option>Not Indicated</option><option>Yes</option><option>No</option>';
    mkDom('select', vsO, [], [], vsC);
    asR2.appendChild(vsC);

    // special rate
    const srC = mkDom('div');
    mkDom('label', 'Special Rate: ', [], [], srC);
    mkDom('select', false, [['disabled', 'true']], [], srC);
    asR2.appendChild(srC);

    // next row
    const asR3 = mkDom('li');
    mkDom('label', 'Customer Block Requested: ', [], [], asR3);
    const cbrCheck = mkDom('input', false, [['type', 'checkbox']], [], asR3);

    // next row
    const asR4 = mkDom('li');

    // avail bal
    mkDom('label', '<strong>Available: </strong>', [], [], asR4);
    const aBal = mkDom('span', '$0.00', [], [], asR4);

    // ledger bal
    mkDom('label', '<strong>Ledger: </strong>', [], [], asR4);
    const lBal = mkDom('span', '$0.00', [], [], asR4);

    // hold bal
    mkDom('label', '<strong>Hold Amount: </strong>', [], [], asR4);
    const hBal = mkDom('span', '$0.00', [], [], asR4);

    // liability bal
    mkDom('label', '<strong>Liability Limit: </strong>', [], [], asR4);
    const llBal = mkDom('span', '$0.00', [], [], asR4);

    // next row
    const asR5 = mkDom('li');

    // send bill
    const sbC = mkDom('div');
    mkDom('label', 'Send Bill: ', [], [], sbC);
    const sbO = '<option>No Export</option>';
    mkDom('select', sbO, [['disabled', 'true']], [], sbC);
    asR5.appendChild(sbC)

    // facility rates
    const frC = mkDom('div');
    mkDom('label', 'Facility Rates: ', [], [], frC);
    const frO = '<option></option><option>California Department of Corrections</option>';
    mkDom('select', frO, [['disabled', 'true']], [], frC);
    mkDom('button', 'View Rates', [], [], frC);
    asR5.appendChild(frC);

    // next row
    const asR6 = mkDom('li');

    // credit card block
    const ccbC = mkDom('div');
    mkDom('label', 'Credit Card Block: ', [], [], ccbC);
    const ccb = mkDom('input', false, [['type', 'checkbox']], [], ccbC);
    asR6.appendChild(ccbC);


    const asT = mkDom('div');
    asT.appendChild(asR1);
    asT.appendChild(asR2);
    asT.appendChild(asR3);
    asT.appendChild(asR4);
    asT.appendChild(asR5);
    asT.appendChild(asR6);
    asUl.appendChild(asT);

    // main BNA
    const bnaC = mkDom('div', false, [['id', 'as-bnaT']]);
    const bnaL = mkDom('div', false, [['id', 'as-bnaL']]);
    bnaC.appendChild(bnaL);
    const bnaR = mkDom('div', false);
    bnaC.appendChild(bnaR);
    const bnaB = mkDom('div', false, [['id', 'as-bnaB']]);
    const bnaBt = mkDom('div', false);
    bnaB.appendChild(bnaBt);
    const bnaBb = mkDom('div', false);
    bnaB.appendChild(bnaBb);

    asUl.appendChild(bnaC);
    asUl.appendChild(bnaB);
    mainC.appendChild(asUl);

    // bna L
    function mkInput(label, dc=bnaL){
        const div = document.createElement('div');
        div.classList.add('input-container');
        mkDom('label', `${label}: `, [], [], div);
        const input = mkDom('input', false, [['type', 'input']]);
        div.appendChild(input);
        dc.appendChild(div);
        return input;
    };

    const fName = mkInput('First Name');
    const lName = mkInput('Last Name');
    const address1 = mkInput('Address 1');
    const address2 = mkInput('Address 2');
    const zip = mkInput('Zip Code');
    const cityStateC1 = mkDom('div', false, [['id', 'city-state-container']], ['input-container']);
    bnaL.appendChild(cityStateC1);
    mkDom('label', 'City, State: ', [], [], cityStateC1);
    const cityStateC2 = mkDom('div', false, [['id', 'city-state-sub']], ['split-input']);
    cityStateC1.appendChild(cityStateC2);
    const city = mkDom('input', false, [['type', 'text']]);
    cityStateC2.appendChild(city);
    const state = mkDom('input', false, [['type', 'text']]);
    cityStateC2.appendChild(state);
    const phone1 = mkInput('Phone Number');
    const phone2 = mkInput('Alt Number');
    const email = mkInput('Email');
    const tax = mkInput('Federal Tax ID');
    const passcode = mkInput('IVR Passcode');

    
}

/* generate the account nav bar, the alert messages, and the add menu */
function mainBar(){
    /*
        Account Summary Page:
        * Everything is visible 
    */

    function returnButton(){
        const active = document.querySelectorAll('.active');
        active.forEach((item) =>{
            item.classList.remove('active');
        });

        this.classList.add('active');
        console.log(this.innerText);
    }

    const addMenu = mkDom('div'); // container
    const navExtra = mkDom('div', false, [['id', 'nav-extraC']], ['blue2-bg']);
    const alertMsg = mkDom('p', '&nbsp', [['id', 'nav-alert']]);

    const trans = [
        'CC Deposit',
        'Other Deposit',
        'Withdrawal',
        'Funds Transfer',
        'Adj Increase',
        'Adj Decrease',
        'Chargeback',
        'Ret Check'
    ];

    for (let i = 0; i < trans.length; i += 1){
        // open the array with 'Add ('
        if (i === 0){
            mkDom('span', 'Add (', [], [], addMenu);
        }

        const newTrans = mkDom('a', trans[i], [['href', '#']]);
        newTrans.addEventListener('click', returnButton);
        
        addMenu.appendChild(newTrans);
        
        // if it is the last item in the array, close if off with a )
        if (i === trans.length - 1){
            mkDom('span', ')', [], [], addMenu);
        } else {
            // otherwise add a divider
            mkDom('span', ' |&nbsp', [], [], addMenu);
        }
    }

    // 
    navExtra.appendChild(alertMsg);
    navExtra.appendChild(addMenu);

    const items = [
        'Account Summary',
        'Transactions',
        'Refund',
        'Transaction Summary',
        'CC Auths',
        'Call Records',
        'TAG Comments',
        'Statements',
        'Auto Reload',
        'Alerts'
    ];

    const navContainer = mkDom('div', false, [['id', 'nav-container']], ['blue1-bg']);
    for (let i = 0; i < items.length; i += 1){
        const newItem = mkDom('a', items[i], [['href', '#']]);
        newItem.addEventListener('click', returnButton);

        navContainer.appendChild(newItem);
    }

    // 
    mainC.appendChild(navContainer);
    mainC.appendChild(navExtra);
}



mainBar();
accountSummary();