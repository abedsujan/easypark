const fs = require('fs');
class Invoice {
    constructor() {
        const fileData = fs.readFileSync('./data/invoice.json').toString();
        this._invoiceData = JSON.parse(fileData);

    }

    getAll() {
        return this._invoiceData;
    }
    getInvoiceById(id) {
        return this._invoiceData.filter((invoice => {
            return invoice.id == id
        }));

    }
    addInvoice(invoice) {
        // return true if new invoice added, otherwise return false
        this._invoiceData.push(invoice);
        fs.writeFileSync('./data/invoice.json', this._invoiceData);
    }


}
module.exports = Invoice;