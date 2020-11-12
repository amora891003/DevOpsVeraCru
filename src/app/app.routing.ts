import { Routes } from '@angular/router';
import { LecturaChequeComponent } from './lectura-cheque/lectura-cheque.component';

export const routes: Routes = [
    { path: '"/"', component: LecturaChequeComponent },
    { path: '', component: LecturaChequeComponent },
    { path: 'lectura-cheque', component: LecturaChequeComponent }

];
