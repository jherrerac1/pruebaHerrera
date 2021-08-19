import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { Empresa } from 'src/app/models/EmpresaModel';
import { BackEndService } from 'src/app/services/back-end.service';
import { Injectable } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell, Ul, Columns, Img } from 'pdfmake-wrapper';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FilePdfService {
  empresa: any;
  plan: any;
  cliente: any;
  contrato: any;
  equipos: any;
  constructor(private route: Router, private service: BackEndService, private empService: EmpreServicesService) { }



  Contrato(emp: any, cli: any, plan: any, contra: any) {

    //this.empService.empresaById(emp).subscribe( resp => {this.empresa = resp; });
    //this.service.retorna_Contrato(contra).subscribe( resp => { this.contrato = resp; });
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'CONTRATO DE ADHESION ' + cli.apellido.trim() + ' ' + cli.nombre.trim(),
      author: 'SXCONSOLE'
    });
    pdf.pageOrientation('portrait'); // 'landscape'
    pdf.pageSize('A4');
    // [left, top, right, bottom] or [horizontal, vertical]
    pdf.pageMargins([80, 60, 60, 40]);
    pdf.defaultStyle({ fontSize: 10 });
    pdf.add(new Txt('CONTRATO DE ADHESION').alignment('center').bold().fontSize(18).end);
    pdf.add(
      pdf.ln(3)
    );
    const str = contra.fecha_corte.split('-');
    const date = new Date(str[0], (str[1] - 1), str[2]);  // 2009-11-10
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayp", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = monthNames[date.getMonth()];//date.toLocaleString('default', { month: 'long' });
    pdf.add(new Txt(`En la ciudad de ${contra.ciudad} el ${str[2]} de ${month} del ${str[0]}, se celebra el presente contrato de Adhesión de servicios, por una parte, ${contra.razon_social}, en calidad de PERMISIONARIO debidamente representado por ${contra.representante_legal}, en su calidad de PERMISIONARIO, con los siguientes datos:`).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('NOMBRE/ RAZON COMERCIAL: ' + contra.razon_social).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('DIRECCION: ' + contra.direccion).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('PROVINCIA: ' + contra.rovincia).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('CANTON: ' + contra.ciudad).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('PARROQUIA: ' + contra.localidad).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('TELEFONOS: ' + contra.telefono + '-' + contra.telefono_add).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('RUC: ' + emp.ruc).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('CORREO ELECTRONICO: ' + emp.email).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('PAGINA WEB: ' + emp.site_web).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('A quien podrá denominarse simplemente “EL PRESTADOR”,').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('Y por otra parte: ' + cli.nombre + ' ' + cli.apellido).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('CEDULA/RUC: ' + cli.dni).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('DIRECCION: ' + cli.direccion).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('PROVINCIA: ' + cli.pro).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('CIUDAD: ' + cli.ciu).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('CANTON: ' + cli.lo).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('PARROQUIA: ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('TELEFONOS: ' + cli.telef).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('DIRECCION DONDE SERA PRESTADO EL SERVICIO: ' + cli.direccion).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('CORREO ELECTRONICO: ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('¿EL ABONADO O SUSCRIPTOR ES DE LA TERCERA EDAD O DISCAPACITADO?').alignment('justify').fontSize(10).style('arial').end);
    if (cli.discapacidad == 0) {
      pdf.add(new Txt('SI ___ NO _X_').alignment('justify').fontSize(10).style('arial').end);
    } else {
      pdf.add(new Txt('SI _X_ NO ___').alignment('justify').fontSize(10).style('arial').end);
    }

    pdf.add(new Txt('ACCEDE A TARIFA PREFERENCIAL      SI__  NO__,').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('A quien podrá denominarse simplemente como “ABONADO O SUSCRIPTOR”, siendo mayor de edad (en el caso de personas naturales), quienes de manera libre, voluntaria y por mutuo acuerdo celebran el presente contrato de Adhesión  de servicios, contenido en las siguientes cláusulas:').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DEFINICION.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('PRESTADOR:').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('es la persona Natural o Jurídica que posee el título habilitante para la prestación de los servicios de telecomunicaciones. ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('ABONADO O SUSCRIPTOR:').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El usuario que haya suscrito un contrato de adhesión con el prestador de servicios de telecomunicaciones”.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('PRIMERA.- ANTECEDENTES.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('“EL PRESTADOR” se encuentra autorizado para la prestación de servicios de Acceso a Internet de acuerdo a la Resolución No. 363-08-CONATEL-2011 del 28 de abril del 2011 y el Permiso para la Prestación de Servicios de Valor Agregado de fecha 30 de Junio de 2011 inscrito en el Tomo  93 a Fojas 9306 del Registro Público de Telecomunicaciones.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('SEGUNDA.-	OBJETO').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El prestador del servicio se compromete a proporcionar al ABONADO O SUSCRIPTOR el/los siguientes (s) servicio(s), para lo cual el prestador dispone de los correspondientes títulos habilitantes otorgados por ARCOTEL, de conformidad con el ordenamiento jurídico vigente:').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Ul([
      'MOVIL AVANZADO_____________________________________',
      'MOVIL AVANZADO A TRAVES DE OPERADOR MOVIL VIRTUAL (OMV)____________',
      'TELEFONIA FIJA',
      'TELECOMUNICACIONES POR SATELITE_________________________________',
      'VALOR AGREGADO_______________________________',
      'ACCESO A INTERNET____________________________',
      'TRONCALIZADOS________________________________',
      'COMUNALES____________________________________',
      'AUDIO Y VIDEO POR SUSCRIPCION________________',
      'PORTADOR_____________________________________',
    ]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('Las condiciones del/los servicio (s) que el ABONADO O SUSCRIPTOR va a contratar se encuentran detalladas en el ANEXO 1, el cual forma parte integrante del presente contrato.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('TERCERA. - VIGENCIA DEL CONTRATO:').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El presente contrato, tendrá una duración de ____________ y entrará en vigencia, a partir de la fecha de instalación y prestación efectiva del servicio.  La fecha inicial considerada para facturación para cada uno de los servicios contratados debe ser la de la activación de servicio, para dicho efecto, las partes suscribirán una Acta de Entrega – Recepción (ANEXO 4). ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Las partes se comprometen a respetar el plazo de vigencia pactado, sin perjuicio de que el ABONADO O SUSCRIPTOR pueda darlo por terminado unilateralmente, en cualquier tiempo, previa notificación  por medios físicos o electrónicos al prestador con por lo menos 15 días de anticipación, conforme lo dispuesto en las leyes orgánicas de Telecomunicaciones y de Defensa del Consumidor y sin que para ello este obligado a cancelar multas o recargos de valores de ninguna naturaleza. ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('EL ABONADO O SUSCRIPTOR acepta la renovación automática sucesiva del contrato SI___ NO___, en las mismas condiciones de este contrato, independientemente de su derecho a terminar la relación contractual conforme a la legislación aplicable, o solicitar en cualquier tiempo, con hasta (15) días de antelación a la fecha de renovación, su decisión de no renovación.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('CUARTA.- PERMANENCIA MINIMA: ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El ABONADO O SUSCRIPTOR se acoge al periodo de permanencia mínima de_________ en la prestación del servicio contratado? SI___ NO___ y recibir beneficios que serán establecidos en el ANEXO 1,  la permanencia mínima se acuerda, sin perjuicio de que el ABONADO O SUSCRIPTOR conforme lo determina la ley Orgánica de Telecomunicaciones, pueda dar por terminado el contrato en forma unilateral y anticipada, y en cualquier tiempo previa notificación  por medios físicos o electrónicos al prestador con por lo menos 15 días de anticipación, para cuyo efecto deberá proceder a cancelar los servicios efectivamente prestados o por los bienes solicitados y recibidos hasta la terminación del contrato.  ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('QUINTA.-	TARIFA Y FORMA DE PAGO.- ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El precio acordado por la instalación y puesta en funcionamiento por el Servicio de Acceso a Internet es el que consta en el ANEXO 1  y que firmado por las partes, es integrante del presente contrato, y se lo realiza de la siguiente forma.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Ul([
      'PAGO DIRECTO EN CAJAS DEL PRESTADOR DEL SERVICIO: SI__ NO__'
      , 'DEBITO AUTOMATICO CUENTA DE AHORRO O CORRIENTE:  SI__ NO__ '
      , 'PAGO EN VENTANILLA DE LOCALES AUTORIZADOS: SI__  NO__'
      , 'DEBITO AUTOMATICO CON TARJETA DE CREDITO:   SI__  NO__'
      , 'VIA TRANSFERENCIA VIA MEDIOS ELECTRONICOS:  SI__  NO__'
    ]).end);
    pdf.add(new Txt('SEXTA.-	COMPRA, ARRENDAMIENTO DE EQUIPOS.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El ABONADO O SUSCRIPTOR podrá solicitar el arrendamiento o adquisición del equipo puesto por el PRESTADOR, las condiciones de esa operación comercial  deberán ser detalladas en el ANEXO 2  y deberá incluir en forma clara las condiciones de los equipos, cantidad, precio, marca, estado, tiempo y cualquier otra condición de la compra/arrendamiento del equipo.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('SEPTIMA.-	USO DE INFORMACION PERSONAL.- ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El prestador se compromete a garantizar la privacidad, confidencialidad y protección de los datos personales entregados por los ABONADOS O SUSCRIPTORES, los mismos que NO podrán ser usados para la promoción comercial de servicios o productos, inclusive de la propia operadora; salvo autorización y consentimiento expreso del ABONADO O SUSCRIPTOR (ANEXO 3), el que constara como instrumento separado y distinto al presente contrato de adhesión de servicios a través de medios físicos o electrónicos, en dicho instrumento se deberá dejar constancia expresa de los datos personales o información que están expresamente autorizados; el plazo de la autorización y el objetivo que esta utilización persigue, conforme lo dispuesto en el artículo 121 del Reglamento General a la ley Orgánica de Telecomunicaciones.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El ABONADO O SUSCRIPTOR podrá revocar su consentimiento, sin que el prestador pueda condicionar o establecer requisitos para tal fin, adicionales a la simple voluntad del ABONADO O SUSCRIPTOR.  ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Además el PRESTADOR se compromete a implementar mecanismos necesarios para precautelar la información de datos personales de sus ABONADOS O SUSCRIPTORES,  incluyendo el secreto e inviolabilidad del contenido de sus comunicaciones, con las excepciones previstas en la ley y a  manejar de manera confidencial el uso, conservación y destino de los datos personales del ABONADO O SUSCRIPTOR, siendo su obligación entregar dicha información, únicamente, a  pedido de autoridad competente de conformidad al ordenamiento jurídico vigente.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('OCTAVA.-	RECLAMOS Y SOPORTE TECNICO.- ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El ABONADO O SUSCRIPTOR podrá requerir soporte técnico o presentar reclamos al prestador de servicios a través de los diferentes medios que ofrece la  AGENCIA DE REGULACION Y CONTROL DE LAS TELECOMUNICACIONES -  ARCOTEL.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('Para la atención de reclamos NO resueltos por el prestador, el ABONADO O SUSCRIPTOR podrá presentar sus denuncias y reclamos ante la AGENCIA DE REGULACION Y CONTROL DE LAS TELECOMUNICACIONES - ARCOTEL al 1800-567567 o para una atención personalizada directamente a las oficinas de las coordinaciones Zonales de la Arcotel, en el horario de  8:00 am a 5:00 pm,  página web de la Arcotel www.arcotel.gob.ec o al link http://reclamoconsumidor.arcotel.gob.ec/osTicket').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('NOVENA.-	DERECHOS DE LAS PARTES.- DERECHOS DEL ABONADO O SUSCRIPTOR.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('1.- A recibir el servicio de acuerdo a los términos estipulados en el presente contrato.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('2.- A obtener de su prestador la compensación por los servicios contratados y no recibidos por deficiencias en los mismos o el reintegro de valores indebidamente cobrados.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('3.- A que no se varíe el precio estipulado en el contrato o sus Anexos,  mientras dure la vigencia del mismo o no se cambien las condiciones de la prestación  a través de la suscripción de nuevos Anexos Técnico (s) y Comercial (es).').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('4.- A reclamar respecto de la calidad del servicio, cobros no contratados, elevaciones de tarifas, irregularidades en relación a la prestación del servicio ante la Defensoría del Pueblo y/o al Centro de Atención y Reclamos de la AGENCIA DE REGULACION Y CONTROL  DE LAS TELECOMUNICACIONES  - ARCOTEL ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('5.- A reclamar de manera integral por los problemas de calidad tanto de la Prestación de servicios de Acceso a Internet, así como por las deficiencias en el enlace provisto para brindar el servicio. En particular en los casos en que aparezca el “EL PRESTADOR” como revendedor del servicio portador. En este último caso, responderá  EL PRESTADOR plenamente a su ABONADO O SUSCRIPTOR conforme a la Ley Orgánica de Defensa del Consumidor, (independientemente de los acuerdos existentes entre los operadores o las responsabilidades ante las autoridades de telecomunicaciones).').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('6.- EL PRESTADOR reconoce a sus ABONADOS O SUSCRIPTORES todos los derechos que se encuentran determinados en Ley Orgánica de Telecomunicaciones y su Reglamento, Ley del Anciano y su reglamento,  Ley Orgánica de Defensa del Consumidor y su Reglamento; Ley Orgánica de Discapacidades y su reglamento, Reglamento para la prestación de Servicios de Telecomunicaciones y Servicios de Radiodifusión por Suscripción.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('7.- EL PRESTADOR no podrá bloquear, priorizar, restringir o discriminar de modo arbitrario y unilateral aplicaciones, contenidos o servicios, sin consentimiento expreso del ABONADO O SUSCRIPTOR o de autoridad competente.  Sin embargo, si el ABONADO O SUSCRIPTOR así lo requiere, EL PRESTADOR podrá ofrecer el servicio de control y bloqueo de contenidos que atenten contra la Ley, la moral o las buenas costumbres, debiendo informar al usuario el alcance, precio y modo de funcionamiento de estos y contar con la anuencia expresa del ABONADO O SUSCRIPTOR.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('8.- Cuando se utilicen medios electrónicos para la contratación, se sujetarán a las disposiciones de la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos.  ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('9.- A que el PRESTADOR le informe oportunamente sobre la interrupción, suspensión o averías de los servicios contratados y sus causas.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DERECHOS DEL PRESTADOR.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('1.-  A percibir el pago oportuno por parte de los ABONADOS O SUSCRIPTORES, por el servicio prestado, con sujeción a lo pactado en el presente contrato').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('2.- A suspender el servicio propuesto por falta de pago de los ABONADOS O SUSCRIPTORES, previa notificación  con dos días de anticipación, así como por uso ilegal de servicio calificado por autoridad competente, en este último caso con suspensión inmediata sin necesidad de notificación previa. ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('3.- Cobrar a los ABONADOS O SUSCRIPTORES, las tarifas conforme al ordenamiento jurídico vigente, y los pliegos tarifarios aprobados por la Dirección Ejecutiva de la ARCOTEL. ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA.- CALIDAD DEL SERVICIO.- SEXTA:   CALIDAD DEL SERVICIO.-').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('EL PRESTADOR cumplirá los estándares de calidad emitidos y verificados por los organismos regulatorios y de control de las telecomunicaciones en el Ecuador, no obstante detalla que prestará sus servicios al ABONADO O SUSCRIPTOR con los niveles de calidad especificados en el ANEXO 1, que debidamente firmado por las partes forma parte integrante de este contrato. Así como declara que el SERVICIO DE INTERNET DEDICADO tendrá: Disponibilidad 99,6% mensual calculada sobre la base de 720 horas al mes.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Para el cálculo de no disponibilidad del servicio no se considerará el tiempo durante el cual no se lo haya podido prestar debido a circunstancias de caso fortuito o fuerza mayor o  completamente ajenas al EL PRESTADOR. Para trabajos en caso de mantenimiento, en la medida de lo posible, deberán ser planificados en períodos de 4 horas después de la media noche, debiéndose notificar previamente el tiempo de no disponibilidad por mantenimiento y siguiendo lo previsto en la Ley Orgánica de Defensa del Consumidor.').alignment('justify').fontSize(10).style('arial').end);
    let numero: string = '';
    let email: string = '';
    let text10 = 'El Departamento Técnico del  PRESTADOR  recibirá requerimientos del ABONADO O SUSCRIPTOR, las 24 horas del día,  a través de los números ' + emp.telefono + ' o los que se haga conocer en el futuro al ABONADO O SUSCRIPTOR; o mediante e-mail: ' + emp.email + ',  lo registrará en el sistema haciendo la apertura de un registro y lo dirigirá al personal indicado.';
    text10 += 'El Departamento Técnico de EL PRESTADOR realizará el seguimiento de los requerimientos y el cumplimiento de la corrección del problema, en un plazo máximo de 24 horas contadas desde que se notifique  el problema.';
    pdf.add(new Txt(text10).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('De ser aplicable la compensación al ABONADO O SUSCRIPTOR, se realizara de conformidad con el ordenamiento jurídico vigente. ').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA PRIMERA.- TERMINACION: ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('El presente contrato terminará por las siguientes causas:').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Ul([
      'a)	Por mutuo acuerdo de las partes'
      , 'b)	Por incumplimiento de las obligaciones contractuales.'
      , 'c)	Por vencimiento del plazo de vigencia previa comunicación de alguna de las partes; '
      , 'd)	Por causas de fuerza mayor o caso fortuito debidamente comprobado;'
      , 'e)	Por falta de pago de 2 mensualidades por parte del ABONADO O SUSCRIPTOR.'
      , 'f)	El ABONADO O SUSCRIPTOR podrá dar por terminado unilateralmente el contrato en cualquier tiempo, previa notificación por escrito con al menos quince días calendario de anticipación a la finalización del período en curso, no obstante el ABONADO O SUSCRIPTOR tendrá la obligación de cancelar los saldos pendientes únicamente por los servicios prestados hasta la fecha de la terminación unilateral del contrato, así como los valores adeudados por la adquisición de los bienes necesarios para la prestación del servicio de ser el caso.  En este caso, EL PRESTADOR no podrá imponer al ABONADO O SUSCRIPTOR: multas, recargos o cualquier tipo de sanción, por haber decidido dar por terminado el contrato.'
      , 'g)	Si el ABONADO O SUSCRIPTOR utiliza los servicios contratados para fines distintos a los convenidos, o si los utiliza en prácticas contrarias a la ley, las buenas costumbres, la moral o cualquier forma que perjudique a EL PRESTADOR. '
    ]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA SEGUNDA.- OBLIGACIONES DE LAS PARTES: ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('EL PRESTADOR se obliga a lo siguiente:').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Ul([
      'Entregar o prestar oportuna y efectivamente el servicio de conformidad a las condiciones establecidas en el contrato y normativa aplicable, sin ninguna variación.'
      , 'A lo previsto en la Ley Orgánica de Defensa del Consumidor y su Reglamento; Ley Orgánica de Discapacidades y su reglamento, Ley del Anciano y su Reglamento, el reglamento para la prestación de Servicios de Telecomunicaciones y Servicios de Radiodifusión por Suscripción, así como lo dispuesto en las resoluciones de la ARCOTEL  y el correspondiente Título habilitante. '
      , 'Al pago de indemnizaciones por no cumplimiento de niveles de calidad estipulados en el presente contrato.'
      , 'El Prestador deberá cumplir con las disposiciones y normativa vigente relacionada a descuentos, exoneraciones, rebajas y tarifas preferenciales para EL ABONADO O SUSCRIPTOR con discapacidad y tercera edad de conformidad al ordenamiento jurídico vigente y sus futuras reformas. '
    ]).fontSize(10).alignment('justify').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('EL ABONADO O SUSCRIPTOR SE OBLIGA A:').bold().alignment('justify').fontSize(10).style('arial').end);
    //pdf.add(new Txt('').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Ul([
      'A pagar oportunamente los valores facturados por el servicio recibido, con sujeción a lo pactado en el presente contrato.',
      'A no realizar alteraciones a los equipos que puedan causar interferencias o daños a las redes'
      , 'Que las instalaciones eléctricas dentro de su infraestructura cuenten con energía eléctrica aterrizada y estabilizada;'
      , 'Que el (los) equipo(s) sean conectado (s) a un toma de UPS provista por este último'
      , 'Pago oportuno e íntegro de los valores pactados en el presente contrato. '
      , 'Asumir la responsabilidad por los actos de sus empleados, contratistas o subcontratistas por el mal uso que eventualmente diere a los servicios que se les presten; en especial si se usare los servicios o enlaces prestados en actividades contrarias a las leyes y regulaciones de telecomunicaciones.'
    ]).fontSize(10).alignment('justify').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA TERCERA.- CONTROVERSIAS: ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Las partes se comprometen a ejecutar de buena fe las obligaciones recíprocas que contraen mediante este contrato y a realizar todos los esfuerzos requeridos para superar de mutuo acuerdo cualquier controversia, los derechos u obligaciones adquiridos, mediante este contrato. En caso de no existir acuerdo entre las partes, estas se sujetarán a lo establecido en el ordenamiento jurídico vigente').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    let text13 = '** Las partes acuerdan que podrán solucionar sus controversias a través de la mediación, en el Centro de Mediación y Arbitraje de la Cámara de Comercio de Guayaquil, SI__ NO__';
    text13 = text13 + 'Si la mediación no llegare a producirse las partes acuerdan expresamente que se someten a un Arbitraje en Derecho ante el mismo centro, para lo cual renuncian a la jurisdicción ordinaria, y se someten expresamente al arbitraje, obligándose a acatar el laudo que expida el Tribunal Arbitral y se comprometen a no interponer ningún tipo de recurso en contra del laudo dictado, a más de los permitidos en la ley, para todo lo cual presentan las respectivas copias de cédulas de identidad y ciudadanía para el reconocimiento de firmas respectivo.';
    pdf.add(new Txt(text13).alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    // tabla
    pdf.add(new Columns(
      [new Txt('').width('*').end,
      new Table([
        ['', 'Acepto Cláusula arbitral', ''],
        ['', '', ''],
        ['', '_______________________________', ''],
        ['', 'Firma ABONADO O SUSCRIPTOR ', '']
      ]).width('auto').layout('noBorders').alignment('center').end,
      new Txt('').width('*').end]
    ).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('Las notificaciones que correspondan serán entregadas en el domicilio de cada una de las partes señalado en la cláusula primera del presente contrato, cualquier cambio de domicilio debe de ser comunicado por escrito a la otra parte en un plazo de 10 días, a partir del día siguiente en que el cambio se efectué').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA CUARTA. - EMPAQUETAMIENTOS DE SERVICIOS: ').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('la contratación incluye empaquetamiento de servicios:       SI __ NO__').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Los servicios del paquete y los beneficios para cada uno de los mismos están especificados en el ANEXO 1.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('DECIMA QUINTA.- ANEXOS:').bold().alignment('justify').fontSize(10).style('arial').end);
    pdf.add(new Txt('Es parte integrante del presente contrato el ANEXO 1, que contiene las condiciones particulares del servicio, así como los demás anexos y documentos que se incorporen de conformidad con el ordenamiento jurídico.').alignment('justify').fontSize(10).style('arial').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('Para constancia de lo anterior las partes firman en tres ejemplares del mismo tenor, en el cantón Daule el día 12 de junio del año 2020').alignment('justify').fontSize(10).style('arial').end);
    //tabla
    pdf.add(pdf.ln(5));
    const repreLegal = '';
    let firmaRepre = '\n___________________________________________________\n' + emp.representante_legal + '\n\t' + emp.cargo_repre;
    firmaRepre += '\n' + emp.razon_social;
    firmaRepre += '\nRUC: ' + emp.ruc;
    firmaRepre += '\n' + emp.email_repre;

    let firmaClie = '\n_____________________________________________________\n';
    firmaClie += '\nNombre: ' + cli.nombre.trim() + ' ' + cli.apellido;
    firmaClie += '\nC.I. Y/O RUC: ' + cli.dni;

    pdf.add(new Columns(
      [new Txt(firmaRepre).alignment('center').fontSize(10).end, new Txt(firmaClie).alignment('center').fontSize(10).end],
    ).columnGap(10).bold().end);

    // this.documentosPersonales(cli.dni);
    pdf.create().open();
    //pdf.create().download('CONTRATO');

  }

  Anexo1(emp: any, cli: any, plan: any, contra: any) {
    const pdf = new PdfMakeWrapper();
    pdf.info({ title: 'ANEXO 1 ', author: 'SXCONSOLE' });
    pdf.pageOrientation('landscape'); // 'landscape portrait'
    pdf.pageSize('A4');
    pdf.defaultStyle({ fontSize: 5 });
    // // [left, top, right, bottom] or [horizontal, vertical]
    pdf.pageMargins([35, 20, 15, 10]);
    pdf.add(new Txt('ANEXO 1. SERVICIO DE ACCESO A INTERNET').bold().alignment('center').fontSize(20).width('60%').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([[new Cell(new Txt('FECHA').bold().alignment('center').end).fillColor('gray').end,
    new Cell(new Txt(contra.fecha_corte).color('black').bold().alignment('center').end).end]]).widths([110, 100]).end);
    pdf.add(new Table([
      [new Cell(new Txt('Nombre de plan').bold().alignment('center').end).fillColor('gray').end,
      new Cell(new Txt(plan.descripcion).bold().alignment('center').end).end]

    ]).widths([110, 100]).end);
    pdf.add(new Table([
      [new Cell(new Txt('TÉRMINOS DEL CONTRATO').bold().alignment('center').end).fillColor('gray').end, ''],
      [new Txt('FECHAS DE PAGO:').alignment('left').end, ''],
      [new Txt('PERIODO DE FACTURACION').alignment('left').end, '']
    ]).widths([110, 200]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('RED DE ACCESO: ').bold().alignment('left').end);
    //// 
    pdf.add(new Table([
      [new Cell(new Txt('PAR DE COBRE').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('FIBRA OPTICA').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end, ''],
      [new Cell(new Txt('COAXIAL').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('INALAMBRICO').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end, ''],
      [new Cell(new Txt('OTROS').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end]
    ]).widths([110, 100, 100, 40, 200]).end);
    ////
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('TIPO DE CUENTA ').bold().alignment('left').end);
    //// 
    pdf.add(new Table([
      [new Cell(new Txt('RESIDENCIAL').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('CORPORATIVO').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end, ''],
      [new Cell(new Txt('CIBERCAFE').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('OTROS TIPOS').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end, ''],
      [new Cell(new Txt('VELOCIDAD EFECTIVA').end).colSpan(5).border([false, false, false, false]).end],
      [new Cell(new Txt('MINIMA HACIA EL CLIENTE:').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end, '',
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).colSpan(2).end]
    ]).widths([110, 100, 100, 40, 200]).end);
    ////
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('VELOCIDAD CONTRATADA:').bold().alignment('left').end);
    pdf.add(new Table([
      [
        new Cell(new Txt('COMERCIAL DE BAJADA:').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('COMERCIAL DE SUBIDA:').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end
      ],
      [new Cell(new Txt('').end).colSpan(8).border([false, false, false, false]).end],
      [
        new Cell(new Txt('MINIMA EFECTIVA DE BAJADA:').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('MINIMA EFECTIVA DE SUBIDA:').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end
      ]
    ]).widths([130, 80, 100, 40, 60, 130, 60, 60]).end);
    ////
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt('NIVEL DE COMPARTICION:').bold().alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt(contra.comparticion).alignment('center').end).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end
      ],
      [new Cell(new Txt('').end).colSpan(8).border([false, false, false, false]).end],
      [
        new Cell(new Txt('PERMANENCIA MINIMA:').bold().alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).end
      ], [
        new Cell(new Txt('').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('SI').alignment('center').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('NO').alignment('center').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('').fontSize(7).end).border([false, false, false, false]).end,
        new Cell(new Txt('TIEMPO').alignment('center').fontSize(7).end).border([false, false, false, false]).end,
      ],
      [
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('BENEFICIOS DE PERMANENCIA').fontSize(7).alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).colSpan(6).end
      ]
    ]).widths([130, 80, 100, 40, 60, 130, 60, 60]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('SERVICIOS ADICIONALES').bold().alignment('left').end);
    pdf.add(new Table([
      [
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('SI').alignment('center').end).end,
        new Cell(new Txt('NO').alignment('center').end).end,
        new Cell(new Txt('DESCRIPCION').alignment('center').end).end
      ]]).widths([210, 100, 150, 150]).end);
    pdf.add(new Table([
      [
        new Cell(new Txt('CUENTAS DE CORREO ELECTRONICO').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).colSpan(2).end,
        new Cell(new Txt('').alignment('left').end).end
      ],
      [
        new Cell(new Txt('OTROS SERVICIOS').alignment('left').end).end,
        new Cell(new Txt('').alignment('left').end).colSpan(2).end,
        new Cell(new Txt('').alignment('left').end).end
      ]
    ]).widths([210, 100, 309]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt('TARIFAS').bold().alignment('left').end);
    pdf.add(new Txt('VALORES A PAGAR UNA SOLA VEZ').fontSize(6).alignment('left').end);
    pdf.add(new Table([
      [new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
      new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end],
      [
        new Cell(new Txt('VALOR DE INSTALACION').end).end,
        new Cell(new Txt(contra.val_install).alignment('right').end).end,
        new Cell(new Txt('USD').alignment('left').end).border([false, false, false, false]).end]
    ]).widths([310, 309, 20]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [new Cell(new Txt('VALORES DE PAGO MENSUAL').alignment('center').end).end]
    ]).widths([741]).end);
    var install: number = +contra.val_install;
    var mensual: number = +plan.val_mensual;
    let total = install + mensual;
    pdf.add(new Table([
      [
        new Cell(new Txt('ITEM').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('VALOR').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt('ITEM').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('VALOR').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('PRECIO MENSUAL').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(plan.val_mensual).alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt('OTROS SERVICIOS').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('PRECIO INSTALACION').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(contra.val_install).alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt('OTROS SERVICIOS').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('OTROS').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').alignment('left').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('VALOR TOTAL').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(total.toString()).alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt('VALOR OTROS SERVICIOS').alignment('center').end).fillColor('gray').end,
        new Cell(new Txt('').alignment('right').end).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ]
    ]).widths([116, 116, 116, 116, 116, 116]).end);
    pdf.add(new Table([
      [
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('Sitio web para Consultas').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.email).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      // [new Cell(new Txt('').alignment('justify').end).colSpan(6).border([false, false, false, false]).end],
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('Sitio web para Consultas calidad del servicio').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.email).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ], [new Cell(new Txt('NOTA:  LAS TARIFAS NO INLCUYEN IMPUESTOS DE LEY ').bold().alignment('left').end).colSpan(6).border([false, false, false, false]).end]
    ]).widths([116, 116, 116, 116, 116, 116]).end);
    pdf.add(pdf.ln(2));
    pdf.add(new Table([
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, true, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('left').end).border([false, true, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.representante_legal).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('Cliente: ' + cli.nombre + ' ' + cli.apellido).alignment('center').end).border([false, false, false, true]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.cargo_repre).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt(cli.dni).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.razon_social).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ],
      [
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('justify').end).border([false, false, false, false]).end,
        new Cell(new Txt(emp.ruc).alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').alignment('center').end).border([false, false, false, false]).end,
        new Cell(new Txt('').end).border([false, false, false, false]).end
      ]
    ]).widths([116, 116, 116, 116, 116, 116]).end);
    pdf.create().open();
    //pdf.create().download('ANEXO 1');
  }

  Anexo2(emp: any, cli: any, equiC: any, equiA: any, contra: any) {
    const pdf = new PdfMakeWrapper();
    let fecha = '';
    pdf.info({
      title: 'ANEXO 2',
      author: 'SXCONSOLE'
    });
    pdf.pageOrientation('landscape'); // 'landscape portrait'
    pdf.pageSize('A4');
    // [left, top, right, bottom] or [horizontal, vertical]
    pdf.pageMargins([80, 60, 60, 40]);
    pdf.defaultStyle({ fontSize: 10 });
    pdf.add(new Table([
      [new Cell(new Txt('ANEXO 2. COMPRA/ARRENDAMIENTO DE EQUIPOS').bold().fontSize(14).alignment('center').end).end]
    ]).widths(['*']).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`FECHA`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${contra.fecha_corte}`).alignment('center').end).end
      ]
    ]).widths([150, 220]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`COMPRA DEL EQUIPO`).alignment('center').bold().end).border([false]).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [new Cell(new Txt(``).alignment('center').end).colSpan(2).border([false]).end],
      [
        new Cell(new Txt(`CONDICIONES DEL EQUIPO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`CANTIDAD`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`1`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`PRECIO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${equiC.val_equipo}`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`MARCA`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${equiC.marca}`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`MODELO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${equiC.modelo}`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`OBSERVACIONES`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`SERIE: ${equiC.serie}`).alignment('center').end).end
      ]
    ]).widths([200, 200]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`ARRENDAMIENTO DEL EQUIPO`).alignment('center').bold().end).border([false]).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [new Cell(new Txt(``).alignment('center').end).colSpan(2).border([false]).end],
      [
        new Cell(new Txt(`CONDICIONES DEL EQUIPO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`CANTIDAD`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`PRECIO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`MARCA`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${equiA.marca}`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`MODELO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(`${equiA.modelo}`).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`OBSERVACIONES`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`TIEMPO DE ARRENDAMIENTO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).end
      ]
    ]).widths([200, 200]).end);
    pdf.add(pdf.ln(5));
    pdf.add(
      new Table([
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).bold().end).border([false, false, false, true]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, true]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [new Cell(new Txt(``).end).border([false, false, false, false]).colSpan(5).end],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.representante_legal.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${cli.nombre.toUpperCase()} ${cli.apellido.toUpperCase()}`).alignment('center').end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.cargo_repre.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`CI: ${cli.dni}`).alignment('center').end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.razon_social.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.ruc}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ]
      ]).widths(['15%', '30%', '10%', '30%', '15%']).end
    );
    pdf.create().open();
    //pdf.create().download('ANEXO 2');
  }

  documentosPersonales(cli: string) {
    let imgs: any[];

    
   
    const pdf = new PdfMakeWrapper();
    //console.log(imgs);
    pdf.info({
      title: 'DOCUMENTOS CLIENTES',
      author: 'SXCONSOLE'
    });
    //http://157.245.177.172/Repository2/UPLOADS/DOCUMENTOSCLIENTES/
    pdf.pageOrientation('portrait'); // 'landscape portrait'
    pdf.pageSize('A4');
    pdf.pageMargins([80, 60, 60, 40]);
    pdf.defaultStyle({ fontSize: 12 });
    this.service.ListarDocumentosClientes(cli.trim()).subscribe(resp => {
      for (let index = 0; index < resp.length; index++) {
        //console.log(resp[index]);
        
      }
    });
    /*new Img('').build().then(img => {
      pdf.add(img);
    });*/
    //pdf.create().download();
    pdf.create().open();
  }

  Anexo3(emp: any, cli: any, plan: any, contra: any) {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'ANEXO 3',
      author: 'SXCONSOLE'
    });
    pdf.pageOrientation('portrait'); // 'landscape'
    pdf.pageSize('A4');
    // [left, top, right, bottom] or [horizontal, vertical]
    pdf.pageMargins([80, 60, 60, 40]);
    pdf.defaultStyle({ fontSize: 12 });
    pdf.add(new Table([
      [new Cell(new Txt('ANEXO 3:   AUTORIZACION DE USO DE INFORMACION PERSONAL ').bold().fontSize(14).alignment('center').end).end]
    ]).widths(['*']).end);
    pdf.add(pdf.ln(3));
    let cliente = '';
    let cedula = '';
    let empresa = '';
    let ciudad = '';
    let fecha = '';
    pdf.add(new Txt(`Yo ${cli.nombre.toUpperCase()} ${cli.apellido.toUpperCase()} , con Cedula de Identidad ${cli.dni}, AUTORIZO a ${emp.razon_social} hacer uso de mi información personal, la misma que podrá ser utilizada para:`).alignment('justify').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Ul([
      new Txt(`Subirlas a la página web, blogs, canales de video o cualquier soporte online oficial del PROVEEDOR ${emp.razon_social} con fines publicitarios, por el tiempo que dure el contrato.`).end
    ]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt(`EL PROVEEDOR se compromete a que la utilización de estas imágenes o videos, en ningún caso supondrá un menoscabo de la honra y reputación del ABONADO o SUSCRIPTOR.`).alignment('justify').end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt(`Y para que así conste lo firmo.`).alignment('justify').end);
    pdf.add(pdf.ln(5));
    pdf.add(
      new Table([
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`FIRMA:`).bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, true]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(`NOMBRE: ${cli.nombre.toUpperCase()} ${cli.apellido.toUpperCase()}`).bold().alignment('center').end).border([false, false, false, false]).colSpan(4).end
        ],
        [
          new Cell(new Txt(`CEDULA ID: ${cli.dni}`).bold().alignment('center').end).border([false, false, false, false]).colSpan(4).end
        ],
        [
          new Cell(new Txt(`ABONADO O SUSCRIPTOR`).bold().alignment('center').end).border([false, false, false, false]).colSpan(4).end
        ]
      ]).widths(['25%', '10%', '40%', '25%']).end
    );
    pdf.add(pdf.ln(2));
    const str = contra.fecha_corte.split('-');
    const date = new Date(str[0], (str[1] - 1), str[2]);  // 2009-11-10
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayp", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = monthNames[date.getMonth()];
    pdf.add(new Txt(`${contra.ciudad} a ${str[2]} de ${month} del ${str[0]}`).alignment('justify').end);
    pdf.create().open();
    //pdf.create().download('ANEXO 3');

  }

  Anexo4(cli: any, equi: any, plan: any, emp: any) {
    const pdf = new PdfMakeWrapper();
    let fecha = '';
    pdf.info({
      title: 'ANEXO 4',
      author: 'SXCONSOLE'
    });
    pdf.pageOrientation('landscape'); // 'landscape portrait'
    pdf.pageSize('A4');
    // [left, top, right, bottom] or [horizontal, vertical]
    pdf.pageMargins([80, 60, 60, 40]);
    pdf.defaultStyle({ fontSize: 10 });
    pdf.add(new Table([
      [new Cell(new Txt('ANEXO 4. ACTA DE ENTREGA - RECEPCION ').bold().fontSize(16).alignment('center').end).end]
    ]).widths(['*']).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`Cliente`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`ORDEN DE TRABAJO`).alignment('center').end).fillColor('gray').end
      ]
    ]).widths(['45%', '10%', '45%']).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`NOMBRE`).alignment('center').end).end,
        new Cell(new Txt(`${cli.apellido.toUpperCase()} ${cli.nombre.toUpperCase()}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`NUMERO DE ORDEN`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`C.I. Y/O RUC`).alignment('center').end).end,
        new Cell(new Txt(`${cli.dni}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`FECHA`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`TELEFONO CONTACTO`).alignment('center').end).end,
        new Cell(new Txt(`${cli.telef}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`ESTADO`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`E-MAIL`).alignment('center').end).end,
        new Cell(new Txt(`${cli.email}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`EJECUTIVO`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`PLAN`).alignment('center').end).end,
        new Cell(new Txt(`${plan.descripcion}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`DIRECCION DE INSTALACION`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`SERVICIOS`).alignment('center').end).end,
        new Cell(new Txt(`INTERNET`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(``).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ]
    ]).widths(['20%', '25%', '10%', '20%', '25%']).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`EQUIPO`).alignment('center').end).fillColor('gray').end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`ESTADO DE INSTALACION`).alignment('center').end).fillColor('gray').end
      ]
    ]).widths(['45%', '10%', '45%']).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Table([
      [
        new Cell(new Txt(`MARCA`).alignment('center').end).end,
        new Cell(new Txt(`${equi.marca}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`TOMA DE CORRIENTE`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`MODELO`).alignment('center').end).end,
        new Cell(new Txt(`${equi.modelo}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(`MATERIALES UTILIZADOS`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`ESTADO`).alignment('center').end).end,
        new Cell(new Txt(`${equi.estatus}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(``).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ],
      [
        new Cell(new Txt(`OBSERVACIONES`).alignment('center').end).end,
        new Cell(new Txt(`SERIE: ${equi.serie}`).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).border([false]).end,
        new Cell(new Txt(``).alignment('center').end).end,
        new Cell(new Txt(``).alignment('center').end).end
      ]
    ]).widths(['20%', '25%', '10%', '20%', '25%']).end);

    pdf.add(pdf.ln(6));
    pdf.add(
      new Table([
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).bold().end).border([false, false, false, true]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, true]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [new Cell(new Txt(``).end).border([false, false, false, false]).colSpan(5).end],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.representante_legal.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${cli.apellido.toUpperCase()} ${cli.nombre.toUpperCase()}`).alignment('center').end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.cargo_repre.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`CI: ${cli.dni}`).alignment('center').end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.razon_social.toUpperCase()}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ],
        [
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(`${emp.ruc}`).alignment('center').bold().end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end,
          new Cell(new Txt(``).end).border([false, false, false, false]).end
        ]
      ]).widths(['15%', '30%', '10%', '30%', '15%']).end
    );
    pdf.create().open();
    //pdf.create().download('ANEXO 4');
  }


}
