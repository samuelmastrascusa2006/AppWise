import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TransaccionesPageRoutingModule } from './transacciones-routing.module';
import { ListaTransaccionesPage } from './lista-transacciones/lista-transacciones.page';
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TransaccionesPageRoutingModule
    ],
    declarations: [
        ListaTransaccionesPage,
        DetalleTransaccionPage
    ]
})
export class TransaccionesPageModule { }
