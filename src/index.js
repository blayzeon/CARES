import data from "./data.JSON";
import mkDom from "./mkDom";

const accounts = data;
console.log(accounts);

/* create the sidebar content */
const sidebar = document.querySelector('#sidebar');
mkDom('label', 'Phone Number: ', [], [], sidebar);
mkDom('input', false, [['type','text']], [], sidebar);
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