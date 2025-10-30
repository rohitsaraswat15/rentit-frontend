export interface FormDataPost {
    id: string;
    userid: string;
    pname: string;
    pdetails: string;
    pcategory: string;
    pbrandmodel: string;
    pamount: string;
    ptime: string;
    psecurityDeposit: string;
    pdlocation: string;
    pddate: string;
    pdtime: string;
    pdelivery: string;
    pstate: string;
    pcity: string;
    image: string[]; // This will be the URL or base64 representation of the image
    pagreement: boolean;
    pownClausecheckbox: string;
    pownClause: string;
    date: string;
    postedBy: string;
    pfinalAgreement: boolean;
}

export interface FormData {
    id: string;
    userid: string;
    pname: string;
    pdetails: string;
    pcategory: string;
    pbrandmodel: string;
    pamount: string;
    ptime: string;
    psecurityDeposit: string;
    pdlocation: string;
    pddate: string;
    pdtime: string;
    pdelivery: string;
    pstate: string;
    pcity: string;
    image: string[]; // This will be the URL or base64 representation of the image
    pagreement: boolean;
    pownClausecheckbox: string;
    pownClause: string;
    date: string;
    postedBy: string;
    pfinalAgreement: boolean;
}