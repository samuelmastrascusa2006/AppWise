import { Injectable } from '@angular/core';
import { TransaccionService } from './transaccion.service';
import { Transaccion, ResumenFinanciero } from '../models/transaccion.model';
import { CATEGORIAS, getCategoriaColor } from '../constants/categorias.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  constructor(private transaccionService: TransaccionService) { }

  getResumenFinanciero(): Observable<ResumenFinanciero> {
    return this.transaccionService.transacciones$.pipe(
      map(transacciones => this.calcularResumen(transacciones))
    );
  }

  getResumenMensual(mes: number, anio: number): Observable<ResumenFinanciero> {
    return this.transaccionService.transacciones$.pipe(
      map(transacciones => {
        const filtered = transacciones.filter(t => {
          const fecha = new Date(t.fecha);
          return fecha.getMonth() === mes && fecha.getFullYear() === anio;
        });
        return this.calcularResumen(filtered);
      })
    );
  }

  private calcularResumen(transacciones: Transaccion[]): ResumenFinanciero {
    const totalIngresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + Number(t.monto), 0);

    const totalGastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + Number(t.monto), 0);

    const saldo = totalIngresos - totalGastos;

    // Gastos por categoría
    const gastosCat: { [key: string]: number } = {};
    transacciones
      .filter(t => t.tipo === 'gasto')
      .forEach(t => {
        gastosCat[t.categoria] = (gastosCat[t.categoria] || 0) + Number(t.monto);
      });

    const gastosPorCategoria = Object.keys(gastosCat).map(cat => ({
      categoria: cat,
      monto: gastosCat[cat],
      porcentaje: totalGastos > 0 ? (gastosCat[cat] / totalGastos) * 100 : 0,
      color: getCategoriaColor(cat),
    })).sort((a, b) => b.monto - a.monto);

    // Ingresos por categoría
    const ingresosCat: { [key: string]: number } = {};
    transacciones
      .filter(t => t.tipo === 'ingreso')
      .forEach(t => {
        ingresosCat[t.categoria] = (ingresosCat[t.categoria] || 0) + Number(t.monto);
      });

    const ingresosPorCategoria = Object.keys(ingresosCat).map(cat => ({
      categoria: cat,
      monto: ingresosCat[cat],
      porcentaje: totalIngresos > 0 ? (ingresosCat[cat] / totalIngresos) * 100 : 0,
      color: getCategoriaColor(cat),
    })).sort((a, b) => b.monto - a.monto);

    return { saldo, totalIngresos, totalGastos, gastosPorCategoria, ingresosPorCategoria };
  }
}
