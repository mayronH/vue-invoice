import { defineStore } from 'pinia'
import { Invoice } from '../types'
import app from '../firebase/firebaseInit'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoiceData: [] as Array<Invoice>,
    invoicesLoaded: false,
    currentInvoiceArray: [] as Array<Invoice>,
  }),
  getters: {
    getInvoices: async (state) => {
      const db = getFirestore(app)

      const docSnap = await getDocs(collection(db, 'invoices'))

      docSnap.forEach((doc) => {
        if (
          !state.invoiceData.some((invoice) => invoice.invoiceId === doc.id)
        ) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePaid: doc.data().invoicePaid,
          }

          state.invoiceData.push(data)
        }
      })

      state.invoicesLoaded = true
    },
  },
  actions: {
    getCurrentInvoice(id: string | string[]) {
      this.currentInvoiceArray = this.invoiceData.filter((invoice: Invoice) => {
        return invoice.invoiceId === id
      })
    },
  },
})
