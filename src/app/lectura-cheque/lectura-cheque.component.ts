import { Component, OnInit } from '@angular/core';
import { Services } from '../services/app.service';
import { Cuentas, FirmaCheque, ReferenciaTitulares,
         ResponseValidFirma , ContratoReferencias, ResponseContratoReferencias, EliminaFileRerencia } from '../services/model.interface';
import Swal from 'sweetalert2';
import { NgProgress } from '@ngx-progressbar/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-lectura-cheque',
  templateUrl: './lectura-cheque.component.html',
  styleUrls: ['./lectura-cheque.component.css'],

})

export class LecturaChequeComponent implements OnInit {


  constructor(
    private _servicio: Services,
    public ngProgress: NgProgress,
    public _snackBar: MatSnackBar) {
  }

  // Almacena todas las cuentas para mostrar serivicio get
  getCuentas: Cuentas = {
    cuentas: []
  };

  // Objeto para servicio put - validar que una firma tenga coincidencia con una referencia
  validaFirmaCheque: FirmaCheque = {};

  // Objeto para mandar en un servicio las referencias agregadar
  agregarReferencias: ReferenciaTitulares = {};

  // Objeto para mandar en un servicio los datos para eliminar archivos de una referencia
  eliminarFileReferencias: EliminaFileRerencia = {};

  // Objeto para mandar en un servicio el contrato para obtener referencias
  agregarContrato: ContratoReferencias = {};

  // Respuesta del serivicio validarFirmaCheque
  responseValidaFirma: ResponseValidFirma = {};

  // Objeto para mandar en un servicio el contrato para obtener referencias
  responseContratoReferencias: ResponseContratoReferencias = {};

  // Objeto para almacenar los titulares de una cuenta seleccionada.
  titulares = [];

  // Objeto para almacenar las referencias
  listaReferencias = [];

  // pnl para mostrar los titulares de una cuenta seleccionada
  pnlTitulares = false;

  // pnl para mostrar las reglas de bastanteo de una respuesta al validar las firmas
  pnlBastanteo = false;

  // Variable que guarda el tipo del archivo seleccionado
  globalTypeFile;

  // Variables globales para asignarlos al objeto de validar y/o agrear referencia
  globalNoArchFirmaTitularValidar;
  globalNoArchFirmaTitularReferencia;
  globalNoArchContrato;

  globalNoArchReglaBastanteo; //ELIMINAR

  globalCuenta;
  globalTitular;

  // Varibles globales para almacenar un byte una imagen
  globalBytesReferencia;
  globalByteValidar;
  globalByteContrato;
  
  imgURL;

  // Bandera para almacenar el valor del input file se esta seleccionando
  banderaInput;

  // Bandera para almacena valor 1 si es para validar una firma y 2 si es extraercontrato
  banderaEvento;

  // Variables de ngModel para HTML
  itemTitular;
  eliminarItemTitular;
  coincidenciaPorcentaje;
  file;
  indiceReferencia;
  cta;
  chkPnl; // Variable que se utiliza solo para limpiar valores de tab Validacion cheque

  // Seleccion de Tab
  selectedMat = 0;

  // se utiliza para mostrar un mensaje cuando un evento se ejecuta de manera correcta
  messageEventError = '';
  messageEventExito = '';

  ngOnInit() {
    this.obtenerCuentas();
    this.coincidenciaPorcentaje = 90;
    // Metodo temporal para pruebas
    // this.reglaBastanteo();
    // this.selectedMat = 1;
  }

  // eventos que generan SnackBar con un mensaje concatenado dependiendo a la respuesta de servicios y/o mensaje harcodeado
  confirmacionRespuestaEventoMVError() {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-bar-backgroundcontainer'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this._snackBar.open(this.messageEventError, null, config);
  }

  confirmacionRespuestaEventoMVExitosa() {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-bar-backgroundcontainerExito'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this._snackBar.open(this.messageEventExito, null, config);
  }

  limpiarDatosReferencia() {
    $('#idImagenChequeReferencia').val('');
    document.getElementById('nombreArchivoReferencia').innerText = '';
    this.itemTitular = '';
  }

  limpiarDatoContrato() {
    // LIMPIA TODO LO REFERIDO A LOS VALORES DEL COMBO CUENTA
    this.globalCuenta = '';
    this.cta = '';

    // LIMPIA TODO LO REFERENTE A LO QUE ESTA DENTRO DE UN PANEL
    this.globalTitular = '';
    this.itemTitular = '';
    this.globalNoArchContrato = '';
    this.globalByteContrato = '';

    // LIMPIA EL INPUT FILE SELECCIONADO
    this.banderaInput = 0;
    $('#idExtraImagen').val('');
    document.getElementById('nombreArchivoContrato').innerText = '';
  }

  limpiarValCheque() {
    // LIMPIA TODO LO REFERIDO A LOS VALORES DEL COMBO CUENTA
    this.globalCuenta = '';
    this.cta = '';
    // LIMPIA Y RESETEA LOS VALORES DEL CHK QUE APARECE DESPUES DE SELECCIONAR UNA CUENTA
    this.chkPnl = false;
    this.pnlTitulares = false;
    // LIMPIA TODO LO REFERENTE A LO QUE ESTA DENTRO DE UN PANEL
    this.globalTitular = '';
    this.itemTitular = '';
    this.eliminarItemTitular = '';
    this.globalBytesReferencia = '';
    this.globalNoArchFirmaTitularReferencia = '';
    this.agregarReferencias = {};
    this.listaReferencias = [];
    this.titulares = [];
    this.indiceReferencia = 0;

    // LIMPIA EL INPUT FILE SELECCIONADO
    this.banderaInput = 0;
    
    this.globalTypeFile = '';
    // LIMPIA LOS VALORES DE LA IMAGEN SELECCIONADA AL PRICIPIO DEL APP Y BYTES, REFERENTE
    this.validaFirmaCheque = {};
    this.responseValidaFirma = {};
    this.globalNoArchFirmaTitularValidar = '';
    this.globalByteValidar = '';
    $('#idImagenValCheque').val('');
    document.getElementById('nombreArchivoCheque').innerText = '';
  }

  limpiarValoresGenerales() {
    if (this.banderaEvento == 1) {
      this.limpiarValCheque();
      console.log('cheque');
      
    } else if (this.banderaEvento == 2) {
      this.limpiarDatoContrato();
      console.log('contrato');
    }
  }

  limpiarTabs(event, ref){
    if (event.index == 1) {
      this.limpiarDatoContrato();
    } else {
      this.limpiarValCheque();
    }
  }

  limpiarAlValidar() {
    this.pnlBastanteo = false;
    this.responseValidaFirma.porcentaje = '';
  }

  bandereSeleccion(value) {
    this.banderaInput = value;
  }


  public onFileChanged(event): void {
    console.log(event);
    
    this.selectedFile(event.target);
    console.log(event.target.files[0])
    const imagen: File = event.target.files[0];
    if (this.banderaInput == 1) {
    this.globalNoArchFirmaTitularValidar = imagen.name;
    } else if (this.banderaInput == 2) {
      this.globalNoArchFirmaTitularReferencia = imagen.name;
    } else if (this.banderaInput == 3) {
    this.globalNoArchContrato = imagen.name;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }


  selectedFile(inputValue: any): void {

    const imagen: File = inputValue.files[0];
    const t = imagen.type;
    const tipo = t.substr(t.indexOf('/') + 1);

    if (tipo !== 'tiff' && tipo !== 'bmp' && tipo !== 'jpeg') {
      this.presentarAlerta('warning', 'Formato de imagen no soportado.', '');
    } else {
      const myReader: FileReader = new FileReader();

      this.globalTypeFile = tipo;


      myReader.onloadend = (e) => {
        this.file = myReader.result;
        if (this.banderaInput == 1) {
          this.globalByteValidar = btoa(this.file);
          this.validaFirmaCheque.firmaReferenciaBytes = btoa(this.file);
          document.getElementById('nombreArchivoCheque').innerText = imagen.name;
        } else if (this.banderaInput == 2) {
          this.globalBytesReferencia = btoa(this.file);
          document.getElementById('nombreArchivoReferencia').innerText = imagen.name;
        } else if (this.banderaInput == 3) {
          this.globalByteContrato = btoa(this.file);
          document.getElementById('nombreArchivoContrato').innerText = imagen.name;
        }
      };
      myReader.readAsBinaryString(imagen);
    }
  }

  obtenerCuentas() {
    this.pnlTitulares = false;
    this._servicio.obtenerCuentas().subscribe(data => {
      this.getCuentas = JSON.parse(data.text());
    });
  }

  obtenerTitularCuenta(item) {
    this.listaReferencias = [];
    this.globalCuenta = item.cta;
    this.pnlTitulares = true;
    this.titulares = [];
    this.titulares.push(item.titular1, item.titular2);
  }

  obtenerNombreTitular(item) {
    this.globalTitular = item;
  }

  // Metodo que se utiliza para agregar un registro a un objeto "referencias"
  agregarReferecia() {
    this.agregarReferencias = {}; // se limpia el array para no duplicar registros

    this.agregarReferencias.cuenta = this.globalCuenta;
    this.agregarReferencias.titular = this.globalTitular;
    this.agregarReferencias.firmaReferenciaNombre = this.globalNoArchFirmaTitularReferencia;
    this.agregarReferencias.firmaReferenciaBytes = this.globalBytesReferencia;
    this.listaReferencias.push(this.agregarReferencias);
    this.limpiarDatosReferencia();
    /* if (this.listaReferencias.length <= 1) {
      this.guardarReferecias();
    }*/
    console.log(this.listaReferencias);

  }

  eliminarReferencia(item) {
    this.indiceReferencia = this.listaReferencias.indexOf(item);
    this.listaReferencias.splice(this.indiceReferencia, 1);
  }

  // Metodo para guardar en la base de datos la informacion de referencias
  guardarReferecias() {
    this._servicio.guardarReferenciasTitulares(this.listaReferencias).subscribe(data => {
      if (data.json().resultado === 'OK') {
        this.presentarAlerta('success', 'Se guardarón las Referencias.', '');
        this.listaReferencias = [];
      }
    });
  }

  // Funcion para convertir byte a blob
  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // Metodo para extraer en las referencias de un contrato
  extraerReferenciaDeContrato(value) {
    this.banderaEvento = value; // Almacena el valor de la bandera en este caso 2 para limpiar campos de acuerdo a donde se ejecute la accion
    this.agregarContrato = {}; // se limpia el array para no duplicar registros
    this.agregarContrato.cuenta = this.globalCuenta;
    this.agregarContrato.titular = this.globalTitular;

    this.agregarContrato.arregloCheque = this.globalByteContrato;
    this.ngProgress.ref('pBar').start();
    this._servicio.extraerReferenciaContrato(this.agregarContrato).subscribe(data => {
      this.responseContratoReferencias = data.json();

      const contentType = 'application/json';
      const blob = this.b64toBlob(this.responseContratoReferencias.listaFirmas[0], contentType);
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = blobURL;
      a.download = this.responseContratoReferencias.nombre + ".tif";
      a.click();
      window.URL.revokeObjectURL(blobURL);
        
        this.ngProgress.ref('pBar').complete(); // Termina con la el spiner
        this.presentarAlerta('success', 'Extracción Correcta', '');
        this.limpiarValoresGenerales();
        this.agregarContrato = {};
    });
  }

  validarFirmaCheque(value) {
    this.banderaEvento = value;
    const nombre = (this.globalNoArchFirmaTitularValidar !== undefined ) ? this.globalNoArchFirmaTitularValidar.split(/[_.]/) : '';
    console.log(nombre);
    
    this.ngProgress.ref('pBar').start();
    this.validaFirmaCheque.esCheque = 'true';
    this.validaFirmaCheque.cuenta = this.globalCuenta;
    this.validaFirmaCheque.firmaReferenciaNombre = this.globalNoArchFirmaTitularValidar;
    this.validaFirmaCheque.firmaReferenciaBytes = this.globalByteValidar;
    this.validaFirmaCheque.titular = nombre[1];

    this.ngProgress.ref('pBar').start();
    this._servicio.setValidarFirmaCheque(this.validaFirmaCheque).subscribe(data => {
      this.responseValidaFirma = data.json();


      this.ngProgress.ref('pBar').complete(); // Termina con la el spiner

      // CODIGO COMENTADO POR POSIBLE USO
      /*this.msjValidaChk = 'Ocurrió un error al validar el cheque.';
      $('#validacionFirmaCheque').modal('show');
      // this.presentarAlerta('error', 'Ocurrió un error al validar el cheque.', '');*/

      this.validacionFirma(); // Metodo que asgina mensajes dependiendo de la respuesta
    },
    error => {
      this.limpiarAlValidar();
      this.limpiarValoresGenerales();
      this.ngProgress.ref('pBar').complete();
      this.presentarAlerta('error', 'Ocurrió un error al validar las firmas.', '');
    });
  }

  validacionFirma() {
    if (Number(this.responseValidaFirma.porcentaje) >= this.coincidenciaPorcentaje) {
      // Las firmas son autenticas
      this.presentarAlerta('success', 'Se identificarón '+ this.responseValidaFirma.numFirmas + ' firma(s).', ' El porcentaje de coincidencia fue de ' + this.responseValidaFirma.porcentaje
      + '% lo cual sobrepasa el umbral indicado.');
      // this.pnlBastanteo = true;
      this.limpiarValoresGenerales();
    } else if (Number(this.responseValidaFirma.porcentaje) <= this.coincidenciaPorcentaje) {
      this.presentarAlerta('error', 'El porcentaje de coincidencia fue de ' + this.responseValidaFirma.porcentaje
      + '% lo cual está por debajo del umbral indicado.', '');
      this.pnlBastanteo = false;
      this.limpiarValoresGenerales();
    } else if (this.responseValidaFirma.porcentaje === 'ERROR') {
      this.presentarAlerta('error', 'Ocurrió un error al validar las firmas.', '');
      this.limpiarValoresGenerales();
    }
  }

  // Metodo que se encarga de limpiar las carpetas e imagenes donde se almacenan las referencias de el
  // titular seleccionado de acuerdo a la cuenta
  eliminaFileReferecias() {
    this.eliminarFileReferencias = {};

    this.eliminarFileReferencias.cuenta = this.globalCuenta;
    this.eliminarFileReferencias.titular = this.globalTitular;

    console.log(this.eliminarFileReferencias);
    
    this.ngProgress.ref('pBar').start();
    this._servicio.eliminarFileReferencia(this.eliminarFileReferencias).subscribe(data => {
      let response = data.json();

      this.ngProgress.ref('pBar').complete(); // Termina con la el spiner

      this.presentarAlerta('success', 'Se eliminaron todas las referencias del titular seleccionado.', '');
      this.eliminarItemTitular = '';
    },
    error => {
      this.ngProgress.ref('pBar').complete();
      this.presentarAlerta('error', 'Ocurrió un error al eliminar las Referencias.', '');

      // this.messageEvent = 'Ocurrió un Error al Insertar el Registro.';
      // this.estatus = this.fallido;
      // this.confirmacionRespuesta();
    });

  }

  presentarAlerta(tipo, titulo, mensaje) {
    Swal.fire({
      type: tipo,
      title: titulo,
      text: mensaje
    });
  }

}








