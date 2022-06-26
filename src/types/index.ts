export interface Invoice {
  billerStreetAddress: string
  billerCity: string
  billerZipCode: string
  billerCountry: string
  clientName: string
  clientEmail: string
  clientStreetAddress: string
  clientCity: string
  clientZipCode: string
  clientCountry: string
  invoiceDateUnix: string
  invoiceDate: Date
  paymentTerms: string
  paymentDueDateUnix: string
  paymentDueDate: Date
  productDescription: string
  invoicePending: string
  invoiceDraft: boolean
  invoiceItemList: Array<InvoiceItem>
  invoiceTotal: number
}

export interface InvoiceItem {
  name: string
  qty: number
  price: number
  total: number
}
