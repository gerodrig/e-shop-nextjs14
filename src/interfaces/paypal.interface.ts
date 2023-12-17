interface Amount {
    currency_code: string;
    value:         string;
}

interface Payee {
    email_address: string;
    merchant_id:   string;
}

interface PurchaseUnit {
    reference_id: string;
    amount:       Amount;
    payee:        Payee;
    invoice_id:   string;
}

interface Link {
    href:   string;
    rel:    string;
    method: string;
}



export interface PayPalOrderStatusResponse {
    id:             string;
    intent:         string;
    status:         string;
    purchase_units: PurchaseUnit[];
    create_time:    string;
    links:          Link[];
}

