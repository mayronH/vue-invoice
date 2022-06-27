export interface Invoice {
  invoiceId: string
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
  invoicePending: boolean
  invoiceDraft: boolean
  invoiceItemList: Array<InvoiceItem>
  invoiceTotal: number
  invoicePaid: boolean
}

export interface InvoiceItem {
  id: string
  name: string
  qty: number
  price: number
  total: number
}
