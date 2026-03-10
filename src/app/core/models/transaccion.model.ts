export interface Categoria {
    nombre: string;
    icono: string;
    color: string;
    tipo: 'gasto' | 'ingreso' | 'ambos';
}

export interface Transaccion {
    id: string;
    tipo: 'gasto' | 'ingreso';
    categoria: string;
    fecha: string;
    monto: number;
    descripcion?: string;
    foto?: string; // base64 string
}

export interface CategoriaPorcentaje {
    categoria: string;
    monto: number;
    porcentaje: number;
    color: string;
}

export interface ResumenFinanciero {
    saldo: number;
    totalIngresos: number;
    totalGastos: number;
    gastosPorCategoria: CategoriaPorcentaje[];
    ingresosPorCategoria: CategoriaPorcentaje[];
}
