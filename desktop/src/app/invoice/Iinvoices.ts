export interface IInvoices {
    uuid: string;
    date: string;
    orderId: string;
    items: number;
    total: number;
    status: string;
    SalesOrder: any;
    InvoiceDetails: any;
}
