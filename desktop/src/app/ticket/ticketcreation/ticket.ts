export interface Ticket {
    Type: string;
    description: string;
    Status: string;
    assignedToUuid: string;
    createdByUuid: string;
    salesorder: any[];
    organizationUuid: String;
    createdByUser : any;
}
