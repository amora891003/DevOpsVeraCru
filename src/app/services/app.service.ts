import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Globals } from '../globals';



@Injectable()
export class Services {

     constructor(private http: Http, private globals: Globals) {
     }

     baseUrl = this.globals.urlService;
     // baseUrlES = this.globals.urlServiceExpertSystem;

     headerServices() {
          const contentHeaders = new Headers();
          contentHeaders.append('Accept', 'application/json');
          contentHeaders.append('Content-Type', 'application/json');
          contentHeaders.append('Content-Type', 'text/plain;charset=UTF-8');
          const header = new RequestOptions({ headers: contentHeaders });
          return header;
        }

     obtenerCuentas() {
          return this.http.get(this.baseUrl + 'obtenerCuentas', this.headerServices());
     }

     guardarReferenciasTitulares(objectR) {
          return this.http.put(this.baseUrl + 'agregarRefrenciasATitulares', objectR);
     }

     /*setValidarFirmaCheque(validaFirma) {
          return this.http.put(this.baseUrl + 'validarFirmaCheque', validaFirma);
     }*/

     setValidarFirmaCheque(validaFirma) {
          return this.http.put('http://172.16.0.77:9022/' + 'validarFirmaCheque', validaFirma);
     }

     aplicarReglasDeBastanteo(reglaB) {
          return this.http.put(this.baseUrl + 'aplicarReglasDeBastanteo', reglaB);
     }

     actualizarReglaDeBastanteo(rablaB) {
          return this.http.put(this.baseUrl + 'actualizarReglaDeBastanteo', rablaB);
     }

     validarCheckstock(validCh) {
          return this.http.put(this.baseUrl + 'validarCheckstock', validCh);
     }

     extraerReferenciaContrato(contrato) {
          return this.http.put('http://172.16.0.116:9910/' + 'contrato', contrato);
     }

     eliminarFileReferencia(titular) {
          return this.http.put('http://172.16.0.77:9022/' + 'borraReferencias', titular);
     }
}
