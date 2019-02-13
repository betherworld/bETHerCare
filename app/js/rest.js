import $ from 'jquery';

// The web3provider is a shared frontend and backend service for communicating
// with the blockchain. Inherit from it to use web3.
export default class Rest {
  constructor() {
    const url = "http://localhost:3000";
    this.fetch = (resource) => fetch(url + resource);
  }

  populateAccounts(id) {
    this.fetch("/api/accounts").then(x => x.json()).then(data => {
      for (let account of data) {
        let element = $(`<div> ${account} </div>`);
        $(id).append(element);
      }
    });
  }
}
