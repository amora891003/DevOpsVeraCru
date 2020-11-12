export interface Cuentas {
    cuentas?;
}

export interface FirmaCheque {
    cuenta?: string;
    esCheque?: string;
    firmaReferenciaNombre?: string;
    firmaReferenciaBytes?: string;
    titular?: string;
}

export interface ReferenciaTitulares {
    cuenta?: string;
    titular?: string;
    firmaReferenciaNombre?: string;
    firmaReferenciaBytes?: string;
}

export interface ContratoReferencias {
    cuenta?: string;
    titular?: string;
    arregloCheque?: string;
}

export interface ResponseContratoReferencias {
    nombre?: string;
    listaFirmas?;
}

export interface ResponseValidFirma {
    porcentaje?: string;
    numFirmas?: string;
}

export interface EliminaFileRerencia {
    cuenta?: string;
    titular?: string;
}


