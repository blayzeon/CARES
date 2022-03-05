import data from "./data.JSON";
import mkDom from "./mkDom";

/* globals */
const mainC = document.querySelector('#maincontent');
const cData = data;
let aIndex = false;

// popup function
function testAlert(){
    alert('yes');
}

function createPopup(top, info, confirm="OK", cancel="Cancel", buttonFunction=testAlert, css=['popup']){
    // create a see-through gray background that prevents the user from clicking other things
    const fader = document.createElement('div');
    fader.setAttribute('id', 'fader');

    // creates the popup
    const newPopup = document.createElement('div');
    for (let i = 0; i < css.length; i+=1){
        newPopup.classList.add(css[i]);
    }
    const topbar = document.createElement('div');
    topbar.classList.add('grab');
    topbar.innerHTML = `<strong>📑 ${top}</strong>`;
    const contentSpan = document.createElement('span');
    const content = document.createElement('div');
    content.classList.add('flex-col');
    content.classList.add('margin-bottom');
    content.appendChild(info);
    const btnDiv = document.createElement('div');
    const ok = document.createElement('button');
    ok.innerText = confirm;
    const close = document.createElement('button');
    close.innerText = cancel;
    newPopup.appendChild(topbar);
    contentSpan.appendChild(content);
    btnDiv.appendChild(ok);
    btnDiv.appendChild(close);
    btnDiv.classList.add('flex');
    contentSpan.appendChild(btnDiv);
    newPopup.appendChild(contentSpan);

    const container = document.body;
    container.appendChild(fader);
    container.appendChild(newPopup);

    function deletePopup(){
        container.removeChild(fader);
        container.removeChild(newPopup);
    };

    ok.addEventListener('click', ()=>{
        buttonFunction();
        deletePopup();
    });

    close.addEventListener('click', ()=>{
        deletePopup();
    });

    function moveItem(node){
        // signal that the mouse is being held down
        let mouseDown = true;
        const offset = node.clientWidth / 2;

        onmousemove = function(e){
            if (mouseDown === true){
                node.style.left = `${e.clientX - offset}px`;
                node.style.top = `${e.clientY - 20}px`;
            }
        }

        onmouseup = function(){
            mouseDown = false;
            return;
        }
    }
    topbar.addEventListener('mousedown', (e)=>{
        moveItem(newPopup);
    });
}

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

function updateAs(account){
    console.log(account);
    for (let key in account.bna){
        document.querySelector(`#${key}`).value = account.bna[key];
    }
}

sidebarBtn.addEventListener('click', ()=>{
    for (let i = 0; i < cData.accounts.length; i += 1){
        if (sidebarInput.value === cData.accounts[i].account){
            aIndex = cData.accounts[i];
            updateAs(aIndex);
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
    const statusO = '<option>Active</option><option>Returned Mail</option><option selected="true">LEC/Inactive</option><option>Blocked</option>';
    const status = mkDom('select', statusO, [['id', 'status']], [], asR1);

    // account type
    const atC = mkDom('div');
    mkDom('label', 'Account Type: ', [], [], atC);
    const accountTypeO = '<option></option><option>Advance Pay</option><option>Direct Bill</option><option>Friends and Family</option><option>APOC</option>';
    const accountType = mkDom('select', accountTypeO, [['id', 'type']], [], atC);
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
    mkDom('label', 'Phone Indicator: ', [['id', 'indicator']], [], piC);
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
    mkDom('label', 'Customer Block Requested: ', [['id', 'crBlock']], [], asR3);
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
    mkDom('label', 'Credit Card Block: ', [['id', 'ccBlock']], [], ccbC);
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
    const bnaR = mkDom('div', false, [['id', 'as-bnaR']]);
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
    function mkInput(label, dc=bnaL, type="input"){
        const div = document.createElement('div');
        div.classList.add('input-container');
        mkDom('label', `${label}: `, [], [], div);
        const input = mkDom('input', false, [['type', type]]);
        div.appendChild(input);
        dc.appendChild(div);
        return input;
    };

    // icon src
    const checkIcon = './img/yes.gif';
    const triIcon = './img/warning.png';
    const errorIcon = './img/error.gif';

    // form items
    const fName = mkInput('First Name');
    fName.setAttribute('id', 'name1');
    const lName = mkInput('Last Name');
    lName.setAttribute('id', 'name2')
    const address1 = mkInput('Address 1');
    address1.setAttribute('data', 'address');
    address1.setAttribute('id', 'address1');
    const address2 = mkInput('Address 2');
    address2.setAttribute('id', 'address2');
    const zip = mkInput('Zip Code');
    zip.setAttribute('data', 'address');
    zip.setAttribute('id', 'zip');
    zip.classList.add('half-width');
    const cityStateC1 = mkDom('div', false, [['id', 'city-state-container']], ['input-container']);
    bnaL.appendChild(cityStateC1);
    mkDom('label', 'City, State: ', [], [], cityStateC1);
    const cityStateC2 = mkDom('div', false, [['id', 'city-state-sub']], ['split-input']);
    cityStateC1.appendChild(cityStateC2);
    const city = mkDom('input', false, [['type', 'text'], ['id', 'city']]);
    city.setAttribute('data', 'address');
    cityStateC2.appendChild(city);
    const state = mkDom('input', false, [['type', 'text'], ['id', 'state']]);
    state.setAttribute('data', 'address');
    cityStateC2.appendChild(state);
    const addressIconC = mkDom('div');
    const addressIcon = mkDom('img', 'false', [['src', errorIcon]]);
    addressIcon.setAttribute('id', 'addressIcon');
    addressIcon.classList.add('ah-activator');
    addressIconC.appendChild(addressIcon);
    const hoverShape = mkDom('div', false, [], [['popup-shape']]);
    const aHoverMenu = mkDom('div', false, [['id', 'address-validation-popup']]);
    hoverShape.appendChild(aHoverMenu);
    addressIconC.appendChild(hoverShape);
    const ahmTop = mkDom('div', 'close');
    ahmTop.addEventListener('click', ()=>{
        hoverShape.classList.toggle('visible');
    });
    aHoverMenu.appendChild(ahmTop);
    const ahmContent = mkDom('div', 'Unable to validate address.');
    aHoverMenu.appendChild(ahmContent);
    addressIcon.addEventListener('click', ()=>{
        // when the address icon is clicked, it makes the hover menu visible
        hoverShape.classList.toggle('visible');
    });
    cityStateC2.appendChild(addressIconC);
    const phone1 = mkInput('Phone Number');
    phone1.setAttribute('id', 'phone1');
    const phone2 = mkInput('Alt Number');
    phone2.setAttribute('id', 'phone2');
    const email = mkInput('Email');
    email.setAttribute('id', 'email');
    const tax = mkInput('Federal Tax ID');
    tax.setAttribute('id', 'tax')
    const passcode = mkInput('IVR Passcode');
    passcode.setAttribute('id', 'passcode');

    const aInputs = document.querySelectorAll('[data="address"]');
    aInputs.forEach((ainput)=>{
        ainput.addEventListener('change', ()=>{
            if (zip.value === ""){
                // end if we do not have a zipcode
                return;
            }

            // remove the icon source because we will update it
            addressIcon.removeAttribute('src');
            
            // functions for address fix
            function fixAddress(index){
                address1.value = cData.addresses[index].address1;
                city.value = cData.addresses[index].city;
                state.value = cData.addresses[index].state;
                zip.value = cData.addresses[index].zip;
                addressIcon.setAttribute('src', checkIcon);
                ahmContent.innerText = ('Address is valid');
            };

            function addressSuggestion(index){
                const addressDataMatch = `
                    Address Found:<br>
                    ${cData.addresses[index].address1}<br>
                    ${cData.addresses[index].city}, ${cData.addresses[index].state}${cData.addresses[index].zip}<br>
                    Click here to update the address.
                `;
                addressIcon.setAttribute('src', triIcon);
                ahmContent.innerHTML = addressDataMatch;
                function clickFix(){
                    fixAddress(index);
                    ahmContent.removeEventListener('click', clickFix);
                }
                ahmContent.addEventListener('click', clickFix);
            }

            for (let i = 0; i < cData.addresses.length; i += 1){
                if (address1.value.toUpperCase() === cData.addresses[i].address1.toUpperCase()){
                    if (zip.value === cData.addresses[i].zip){
                        // if the address and zipcode match, check if we can change city/state
                        if (city.value === "" && state.value === ""){
                            // none already entered, we can change it
                            fixAddress(i);
                        } else {
                            // already got one, let's suggest we change it
                            addressSuggestion(i);
                        }
                        return;
                    } else {
                        addressSuggestion(i);
                        return;
                    }
                }
            }
            ahmContent.innerText = 'Unable to validate address.';
            addressIcon.setAttribute('src', errorIcon);
        });
    });

    // buttons
    const btnC = mkDom('div', false, [], ['margin-bottom', 'margin-top', 'flex']);
    const saveBtn = mkDom('button', 'Save Changes');
    const bnaBtn = mkDom('button', 'BNA This Number');
    btnC.appendChild(saveBtn);
    btnC.appendChild(bnaBtn);
    bnaL.appendChild(btnC);

    /* RIGHT SIDE */
    const taxCheck = mkInput('Tax Exempt', bnaR, 'checkbox');
    taxCheck.setAttribute('disabled', 'true');
    const notesC = mkDom('div', false, [], ['input-container', 'extra-input-width']);
    mkDom('label', 'Notes: ', [], [], notesC);
    const notes = mkDom('textarea', false, [['id', 'notes']]);
    notesC.appendChild(notes);
    bnaR.appendChild(notesC);
    const au = mkInput('Authorized User', bnaR);
    au.setAttribute('id', 'au');
    const olec = mkInput('Original LEC', bnaR);
    olec.setAttribute('id', 'lec');
    olec.setAttribute('disabled', 'true');
    const fac = mkInput('Last Facility Called', bnaR);
    fac.setAttribute('disabled', 'true');
    fac.setAttribute('id', 'facility');
    const origfC = mkDom('div', false, [], ['input-container', 'extra-input-width']);
    mkDom('label', 'Originating Facilities: ', [], [], origfC);
    const origF = mkDom('select', false, [['id', 'origF'], ['size', '4']]);
    origfC.appendChild(origF);
    bnaR.appendChild(origfC);
    const pclBtnC = mkDom('div', false, [], ['margin-top', 'margin-bottom']);
    const pclBtn = mkDom('button', 'Policy Check List');
    pclBtnC.appendChild(pclBtn);
    bnaR.appendChild(pclBtnC);

    pclBtn.addEventListener('click', ()=>{
        const pclPc = mkDom('div');

        // set up at own risk
        const option1 = mkDom('div');
        pclPc.appendChild(option1);
        const pol1 =  mkDom('input', false, [['type', 'checkbox']]);
        option1.appendChild(pol1);
        mkDom('label', 'Cell phone/VOIP setup at own risk', [], [], option1);

        // service fees
        const option2 = mkDom('div');
        pclPc.appendChild(option2);
        const pol2 =  mkDom('input', false, [['type', 'checkbox']]);
        option2.appendChild(pol2);
        mkDom('label', 'Service Fees', [], [], option2);

        // 90 days expiration
        const option3 = mkDom('div');
        pclPc.appendChild(option3);
        const pol3 =  mkDom('input', false, [['type', 'checkbox']]);
        option3.appendChild(pol3);
        mkDom('label', '90 Days Account Expiration', [], [], option3);

        // 189 days expiration
        const option4 = mkDom('div');
        pclPc.appendChild(option4);
        const pol4 =  mkDom('input', false, [['type', 'checkbox']]);
        option4.appendChild(pol4);
        mkDom('label', '180 Days Account Expiration', [], [], option4);

        function updatePolicies(save=true){
            if (save === false){
                pol1.checked = aIndex.policies[0];
                pol2.checked = aIndex.policies[1];
                pol3.checked = aIndex.policies[2];
                pol4.checked = aIndex.policies[3];
            } else {
                aIndex.policies[0] = pol1.checked;
                aIndex.policies[1] = pol2.checked;
                aIndex.policies[2] = pol3.checked;
                aIndex.policies[3] = pol4.checked;
            }
        }

        if (aIndex === false){
            // no account is loaded
        } else {
            updatePolicies(false);
        }

        createPopup('Policy Check List', pclPc, 'OK', 'Cancel', updatePolicies);
    })

    
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

    function returnButton2(){
        const active = document.querySelectorAll('.active2');
        active.forEach((item) =>{
            item.classList.remove('active2');
        });

        this.classList.add('active2');
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
        newTrans.addEventListener('click', returnButton2);
        
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

        if (i === 0){
            newItem.classList.add('active');
        }

        navContainer.appendChild(newItem);
    }

    // 
    mainC.appendChild(navContainer);
    mainC.appendChild(navExtra);
}



mainBar();
accountSummary();