import data from "./data.JSON";
import mkDom from "./mkDom";

/* globals */
const user = `new.trainee`;
const mainC = document.querySelector('#maincontent');
const cData = data;
let aIndex = false;

// date global
const dateO = new Date();
const date = dateO.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});

// popup function
function testAlert(){
    alert('yes');
}

function removeChildren(parent, removeParent=true){
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }

    if (removeParent === true){
        parent.remove();
    }

};

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
        removeChildren(fader);
        removeChildren(newPopup);
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
        const offsetY = node.clientHeight;

        onmousemove = function(e){
            if (mouseDown === true){
                node.style.left = `${e.clientX - offset}px`;
                node.style.top = `${e.clientY}px`;
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

function createPopup2(color="#72A3D5", contentNode, titleText="title", submitText="Add Item", closeText="x"){
    const container = document.createElement('div');
    container.setAttribute('class', 'adjustment-popup');
    container.setAttribute('style', `background: ${color}`);

    const top = document.createElement('div');
    const title = document.createElement('div');
    title.innerHTML = titleText;
    const closeBtn = document.createElement('button');
    closeBtn.innerText = closeText;
    closeBtn.addEventListener('click', ()=>{
        removeChildren(container);
    });
    top.appendChild(title);
    top.appendChild(closeBtn);


    const mid = document.createElement('div');
    mid.appendChild(contentNode);

    const bottom = document.createElement('div');
    const submitBtn = document.createElement('button');
    submitBtn.innerText = submitText;
    submitBtn.addEventListener('click', ()=>{
        removeChildren(container);
    });
    bottom.appendChild(submitBtn);


    container.appendChild(top);
    container.appendChild(mid);
    container.appendChild(bottom);

    document.body.appendChild(container);

    return submitBtn;
}

function calcBalance(account){
    const transactions = account.transactions;

    let balance = 0;

    for (let i = 0; i < transactions.length; i += 1){
        if (transactions[i].calc === 'add'){
            balance += parseFloat(transactions[i].amount);
        } else {
            balance -= parseFloat(transactions[i].amount);
        }
    }
    return balance.toFixed(2);
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

function updateAs(account, action="load"){
    const alertText = document.getElementById('nav-alert');
    // bna
    function loadBna(){
        alertText.innerText = `Advance Pay account ${sidebarInput.value} loaded successfully.`;
        for (let key in account.bna){
            document.querySelector(`#${key}`).value = account.bna[key];
        }

        const balances = document.querySelectorAll('[data="balance"]');
        balances.forEach((balance)=>{
            balance.innerText = `$${total}`;
        });
    }

    const total = calcBalance(account);
    function saveBna(){
        alertText.innerText = `Advance Pay account ${sidebarInput.value} saved successfully.`;
        for (let key in account.bna){
            account.bna[key] = document.querySelector(`#${key}`).value;
        }
    }

    // comments
    function loadComments(){
        const commentC = document.querySelector('#account-comments');
        let table = '';
        for (let i = 0; i < account.comments.length; i += 1){
            table = `<tr><td>${account.comments[i][0]}</td><td>${user} ${account.comments[i][1]}</td></tr>` + table;   
        }
        commentC.innerHTML = `<table><thead><tr><th>Date</th><th>Comment</th></tr></thead><tbody>${table}</body></table>`;
    }

    function saveComments(comment){
        account.comments.push([date, comment]);
        loadComments();
    }

    if (action === "load"){
        loadBna();
        loadComments();
    } else if (action === "save"){
        saveBna();
    } else {
        saveComments(action);
    }
}

// lookup button
sidebarInput.addEventListener('keyup', ()=>{
    // prevent letters
    const inputArray = sidebarInput.value.split('');
    const lastLetter = inputArray[inputArray.length-1];
    const lastRemoved = inputArray.pop()
    const numbers = /^[0-9]+$/;
    if (lastLetter.match(numbers)){
        // good to go
        return;
    } else {
        sidebarInput.value = inputArray.join('');
        return;
    }
});

sidebarBtn.addEventListener('click', ()=>{
     for (let i = 0; i < cData.accounts.length; i += 1){
        if (sidebarInput.value === cData.accounts[i].account){
            // set the account index
            aIndex = cData.accounts[i];

            // set the policies button style
            const policyBtn = document.getElementById('pcl-btn');
            if (aIndex.policies.toString() === [true, true, true, true].toString()){
                policyBtn.setAttribute('style', 'background: rgb(114, 163, 213');
            } else {
                policyBtn.removeAttribute('style');
            }

            // update the account
            updateAs(aIndex);
            return;
        }
    }

    // no account found
    const index = cData.accounts.length; 
    cData.accounts.push(
        {
            "account": sidebarInput.value,
            "policies": ["false", "false", "false", "false"], 
            "bna": {
                "status": "LEC/Inactive",
                "type": "",
                "indicator": "Not Indicated",
                "crBlock": "false",
                "ccBlock": "false",
                "name1": "",
                "name2": "",
                "address1": "",
                "address2": "",
                "zip": "",
                "city": "",
                "state": "",
                "phone1": sidebarInput.value,
                "phone2": "",
                "email": "",
                "tax": "",
                "passcode": "",
                "notes": "",
                "au": "",
                "lec": "",
                "facility": ""
            },
            "comments": [],
            "transactions": [],
            "calls": []
        }
    );

    // empty the BNA 
    aIndex = cData.accounts[index];
    updateAs(aIndex);

    const msg = document.createElement('span');
    msg.innerHTML = 'Account not found. Would you like to create one?&nbsp';
    const btn = document.createElement('button');
    btn.innerText = 'Create Account';

    const container = document.getElementById('nav-alert');
    container.innerHTML = '';
    container.appendChild(msg);
    container.appendChild(btn);

    btn.addEventListener('click', ()=>{
        // if account type isn't selected, alert the user
        const accountTypeValue = document.getElementById('type').value;
        if (accountTypeValue === ""){
            alert('Please select an account type.');
            return;
        } else {
            updateAs(aIndex, "save");
            updateAs(aIndex);
            updateAs(aIndex, `accessed the account`);
        }
    }); 
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
    const aBal = mkDom('span', '$0.00', [['data', 'balance']], [], asR4);

    // ledger bal
    mkDom('label', '<strong>Ledger: </strong>', [], [], asR4);
    const lBal = mkDom('span', '$0.00', [['data', 'balance']], [], asR4);

    // hold bal
    mkDom('label', '<strong>Hold Amount: </strong>', [], [], asR4);
    const hBal = mkDom('span', '$0.00', [['data', 'balance']], [], asR4);

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
    const bnaC = mkDom('div', false, [['id', 'as-bnaT']]); // top bar
    const bnaL = mkDom('div', false, [['id', 'as-bnaL']]); // left bna
    bnaC.appendChild(bnaL);
    const bnaR = mkDom('div', false, [['id', 'as-bnaR']]); // right bna
    bnaC.appendChild(bnaR);
    const bnaB = mkDom('div', false, [['id', 'as-bnaB']]); // account comments
    const bnaBtopC = mkDom('div', false, [], ['blue2-bg']); // top container
    bnaB.appendChild(bnaBtopC);
    mkDom('p', 'Account Comments', [], ['strong'], bnaBtopC); // "account comments"
    const bnaBaddBtn = mkDom('a', '&nbsp(Add New)', [], ['no-link']); // add new comment
    bnaBtopC.appendChild(bnaBaddBtn);
    bnaBaddBtn.addEventListener('click', ()=>{
        if (aIndex === false){
            // no account
            return;
        } else {
            const addNewTitle = `Comment Type: <select>
                    <option></option>
                    <option>IVR</option>
                    <option>CreditLimitChange</option>
                    <option>Complaint</option>
                    <option>Connect Network</option>
                    <option>Trust</option>
                    <option>Chargeback</option>
                    <option>Inquiry-Payment/Balance</option>
                    <option>Inquiry-Rates</option>
                    <option>Inquiry-Refund/Close Account</option>
                    <option>Account Setup</option>
                    <option>Block Issue</option>
                    <option>Wireless Activation Team</option>
                    <option>Research Team</option>
                    <option>AP International Team</option>
                    <option>Fax Team Update</option>
                    <option>General</option>
            </select>`;
            const addNewContent = document.createElement('div');
            const label = document.createElement('label');
            label.innerText = 'Comment: ';
            const commentText = document.createElement('textarea');
            commentText.setAttribute('class', 'textfield');
            addNewContent.appendChild(label);
            addNewContent.appendChild(commentText);

            const popupBtn = createPopup2('#006699', addNewContent, addNewTitle, 'Add Comment');
            popupBtn.addEventListener('click', ()=>{
                if (aIndex === false){
                    return;
                }

                updateAs(aIndex, commentText.value);
            });
        }
    })
    const bnaBb = mkDom('div', false, [['id', 'account-comments']]); // for dumping comments
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
    saveBtn.addEventListener('click', ()=>{
        if (aIndex === false){
            return;
        }

        updateAs(aIndex, 'save')
    });
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
    const pclBtn = mkDom('button', 'Policy Check List', [['id', 'pcl-btn']]);
    pclBtnC.appendChild(pclBtn);
    bnaR.appendChild(pclBtnC);

    pclBtn.addEventListener('click', ()=>{
        const pclPc = mkDom('div');

        // set up at own risk
        const option1 = mkDom('div');
        pclPc.appendChild(option1);
        const pol0 =  mkDom('input', false, [['type', 'checkbox']]);
        option1.appendChild(pol0);
        mkDom('label', 'Cell phone/VOIP setup at own risk', [], [], option1);

        // service fees
        const option2 = mkDom('div');
        pclPc.appendChild(option2);
        const pol1 =  mkDom('input', false, [['type', 'checkbox']]);
        option2.appendChild(pol1);
        mkDom('label', 'Service Fees', [], [], option2);

        // 90 days expiration
        const option3 = mkDom('div');
        pclPc.appendChild(option3);
        const pol2 =  mkDom('input', false, [['type', 'checkbox']]);
        option3.appendChild(pol2);
        mkDom('label', '90 Days Account Expiration', [], [], option3);

        // 189 days expiration
        const option4 = mkDom('div');
        pclPc.appendChild(option4);
        const pol3 =  mkDom('input', false, [['type', 'checkbox']]);
        option4.appendChild(pol3);
        mkDom('label', '180 Days Account Expiration', [], [], option4);

        function updatePolicies(save=true){
            if (aIndex === false){
                // no account is loaded
                return
            }

            if (save === false){
                pol0.checked = aIndex.policies[0];
                pol1.checked = aIndex.policies[1];
                pol2.checked = aIndex.policies[2];
                pol3.checked = aIndex.policies[3];
            } else {
                const polNodes = [
                    [pol0.checked, 'PCCellPhone'],
                    [pol1.checked, 'PCServiceFees'],
                    [pol2.checked, 'PC90DaysAccountExpiration'],
                    [pol3.checked, 'PC180DaysAccountExpiration'],
                ]
                let changed = [];
                for (let i = 0; i < aIndex.policies.length; i += 1){
                    if (polNodes[i][0].toString() !== aIndex.policies[i].toString()){
                        aIndex.policies[i] = polNodes[i][0];
                        updateAs(aIndex, `updated the account attribute for ${polNodes[i][1]} to ${polNodes[i][0]}.`);
                    }
                }
                const policyBtn = document.getElementById('pcl-btn');
                if (aIndex.policies.toString() === [true, true, true, true].toString()){
                    policyBtn.setAttribute('style', 'background: rgb(114, 163, 213');
                } else {
                    policyBtn.removeAttribute('style');
                }
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