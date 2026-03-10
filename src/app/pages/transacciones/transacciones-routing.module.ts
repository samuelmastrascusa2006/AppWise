import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTransaccionesPage } from './lista-transacciones/lista-transacciones.page';
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';

const routes: Routes = [
    {
        path: '',
        component: ListaTransaccionesPage
    },
    {
        path: 'detalle/:id',
        component: DetalleTransaccionPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransaccionesPageRoutingModule { }
