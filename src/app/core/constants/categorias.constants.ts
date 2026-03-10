import { Categoria } from '../models/transaccion.model';

export { Categoria };

export const CATEGORIAS: Categoria[] = [
    { nombre: 'Alimentación', icono: 'fast-food-outline', color: '#FF6B6B', tipo: 'gasto' },
    { nombre: 'Transporte', icono: 'car-outline', color: '#4ECDC4', tipo: 'gasto' },
    { nombre: 'Vivienda', icono: 'home-outline', color: '#45B7D1', tipo: 'gasto' },
    { nombre: 'Salud', icono: 'medkit-outline', color: '#96CEB4', tipo: 'gasto' },
    { nombre: 'Ocio', icono: 'game-controller-outline', color: '#FFEAA7', tipo: 'gasto' },
    { nombre: 'Salario', icono: 'cash-outline', color: '#6C5CE7', tipo: 'ingreso' },
    { nombre: 'Otros', icono: 'ellipsis-horizontal-outline', color: '#A29BFE', tipo: 'ambos' },
];

export const TIPOS_TRANSACCION = [
    { valor: 'gasto', nombre: 'Gasto' },
    { valor: 'ingreso', nombre: 'Ingreso' },
];

export function getCategoriaByNombre(nombre: string): Categoria | undefined {
    return CATEGORIAS.find(c => c.nombre === nombre);
}

export function getCategoriaIcon(nombre: string): string {
    return getCategoriaByNombre(nombre)?.icono || 'ellipsis-horizontal-outline';
}

export function getCategoriaColor(nombre: string): string {
    return getCategoriaByNombre(nombre)?.color || '#A29BFE';
}
