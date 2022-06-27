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
  invoiceDateUnix: Date
  invoiceDate: string
  paymentTerms: string
  paymentDueDateUnix: Date
  paymentDueDate: string
  productDescription: string
  invoicePending: string
  invoiceDraft: boolean
  invoiceItemList: Array<InvoiceItem>
  invoiceTotal: number
}

export interface InvoiceItem {
  id: number
  name: string
  qty: number
  price: number
  total: number
}
