import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeFacturaJSON = (voucher: any) => {
  return {
    anticipos: [],
    close2u: {
      numero: "",
      tipoIntegracion: voucher[0].tipoIntegracion,
      tipoPlantilla: voucher[0].tipoPlantilla,
      tipoRegistro: voucher[0].tipoRegistro,
    },
    datosDocumento: {
      condicionPago: voucher[0].condicionPago,
      fechaEmision: voucher[0].fechaEmision,
      fechaVencimiento: voucher[0].fechaVencimiento,
      formaPago: voucher[0].formaPago,
      glosa: voucher[0].glosa,
      puntoEmisor: voucher[0].puntoEmisor,
      moneda: voucher[0].monedaDatosDoc,
      numero: voucher[0].numeroDatosDoc,
      ordencompra: voucher[0].ordencompra,
      serie: voucher[0].serie,
    },
    cuotas: [
      {
        numero: voucher[0].numeroCuota,
        monto: voucher[0].monto,
        fecha: voucher[0].fecha,
        moneda: voucher[0].monedaCuota,
      },
    ],
    descuentoGlobal: voucher[0].descuentoGlobal,
    detalleDocumento: [
      ...voucher.map((voucher: any) => ({
        cantidad: voucher.cantidadArt,
        codigoProducto: voucher.codigoProductoArt,
        aliasProducto: null,
        descripcion: voucher.descripcionArt,
        descuento: {
          monto: voucher.montoDescuentoArt,
        },
        isc: voucher.iscArt,
        numeroOrden: voucher.numeroOrdenArt,
        precioVentaUnitarioItem: voucher.precioVentaUnitarioItem,
        tipoAfectacion: voucher.tipoAfectacion,
        unidadMedida: voucher.unidadMedidaArt,
        valorReferencialUnitarioItem: voucher.valorReferencialUnitarioItem,
        valorVentaUnitarioItem: voucher.valorVentaUnitarioItem,
      })),
    ],
    detraccion: voucher[0].detraccion,
    emisor: {
      correo: voucher[0].correo,
      correoCopia: voucher[0].correoCopia,
      domicilioFiscal: {
        departamento: voucher[0].departamento,
        direccion: voucher[0].direccion,
        distrito: voucher[0].distrito,
        pais: voucher[0].pais,
        provincia: voucher[0].provincia,
        ubigeo: voucher[0].ubigeo,
        urbanizacion: voucher[0].urbanizacion,
      },
      nombreComercial: voucher[0].nombreComercial,
      nombreLegal: voucher[0].nombreLegal,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidad,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
    },
    facturaGuia: voucher[0].facturaGuia,
    informacionAdicional: {
      vendedor: voucher[0].vendedor,
      tipoOperacion: voucher[0].tipoOperacion,
    },
    otrosCargos: voucher[0].otrosCargos,
    percepcion: voucher[0].percepcion,
    receptor: {
      correo: voucher[0].correoReceptor,
      correoCopia: voucher[0].correoCopiaReceptor,
      domicilioFiscal: {
        departamento: voucher[0].departamenteoReceptor,
        direccion: voucher[0].direccionReceptor,
        distrito: voucher[0].distritoReceptor,
        pais: voucher[0].paisReceptor.toUpperCase(),
        provincia: voucher[0].provinciaReceptor,
        ubigeo: voucher[0].ubigeoReceptor,
        urbanizacion: voucher[0].urbanizacionReceptor,
      },
      nombreComercial: voucher[0].nombreComercialReceptor,
      nombreLegal: voucher[0].nombreLegalReceptor,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidadReceptor,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidadReceptor,
    },
    referencias: voucher[0].referencias,
    sector: {
      tipoTotalDescuentos: voucher[0].tipoTotalDescuentos,
      tipoCargo: voucher[0].tipoCargo,
    },
  };
};

// export const makeFacturaJSON = (voucher: any) => {
//   return {
//     anticipos: [],
//     close2u: {
//       numero: "",
//       tipoIntegracion: voucher[0].tipoIntegracion,
//       tipoPlantilla: voucher[0].tipoPlantilla,
//       tipoRegistro: voucher[0].tipoRegistro,
//     },
//     datosDocumento: {
//       condicionPago: voucher[0].condicionPago,
//       fechaEmision: voucher[0].fechaEmision,
//       fechaVencimiento: voucher[0].fechaVencimiento,
//       formaPago: voucher[0].formaPago,
//       glosa: voucher[0].glosa,
//       puntoEmisor: voucher[0].puntoEmisor,
//       moneda: voucher[0].monedaDatosDoc,
//       numero: voucher[0].numeroDatosDoc,
//       ordencompra: voucher[0].ordencompra,
//       serie: voucher[0].serie,
//     },
//     cuotas: [
//       {
//         numero: voucher[0].numeroCuota,
//         monto: voucher[0].monto,
//         fecha: voucher[0].fecha,
//         moneda: voucher[0].monedaCuota,
//       },
//     ],
//     descuentoGlobal: voucher[0].descuentoGlobal,
//     detalleDocumento: [
//       ...voucher.map((voucher: any) => ({
//         cantidad: voucher.cantidadArt,
//         codigoProducto: voucher.codigoProductoArt,
//         aliasProducto: null,
//         descripcion: voucher.descripcionArt,
//         descuento: {
//           monto: voucher.montoDescuentoArt,
//         },
//         isc: voucher.iscArt,
//         numeroOrden: voucher.numeroOrdenArt,
//         precioVentaUnitarioItem: voucher.precioVentaUnitarioItem,
//         tipoAfectacion: voucher.tipoAfectacion,
//         unidadMedida: voucher.unidadMedidaArt,
//         valorReferencialUnitarioItem: voucher.valorReferencialUnitarioItem,
//         valorVentaUnitarioItem: voucher.valorVentaUnitarioItem,
//       })),
//     ],
//     detraccion: voucher[0].detraccion,
//     emisor: {
//       correo: voucher[0].correo,
//       correoCopia: voucher[0].correoCopia,
//       domicilioFiscal: {
//         departamento: voucher[0].departamento,
//         direccion: voucher[0].direccion,
//         distrito: voucher[0].distrito,
//         pais: voucher[0].pais,
//         provincia: voucher[0].provincia,
//         ubigeo: voucher[0].ubigeo,
//         urbanizacion: voucher[0].urbanizacion,
//       },
//       nombreComercial: voucher[0].nombreComercial,
//       nombreLegal: voucher[0].nombreLegal,
//       numeroDocumentoIdentidad: "10223161419",
//       tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
//     },
//     facturaGuia: voucher[0].facturaGuia,
//     informacionAdicional: {
//       vendedor: voucher[0].vendedor,
//       tipoOperacion: voucher[0].tipoOperacion,
//     },
//     otrosCargos: voucher[0].otrosCargos,
//     percepcion: voucher[0].percepcion,
//     receptor: {
//       correo: voucher[0].correoReceptor,
//       correoCopia: voucher[0].correoCopiaReceptor,
//       domicilioFiscal: {
//         departamento: voucher[0].departamenteoReceptor,
//         direccion: voucher[0].direccionReceptor,
//         distrito: voucher[0].distritoReceptor,
//         pais: voucher[0].paisReceptor.toUpperCase(),
//         provincia: voucher[0].provinciaReceptor,
//         ubigeo: voucher[0].ubigeoReceptor,
//         urbanizacion: voucher[0].urbanizacionReceptor,
//       },
//       nombreComercial: voucher[0].nombreComercialReceptor,
//       nombreLegal: voucher[0].nombreLegalReceptor,
//       numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidadReceptor,
//       tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidadReceptor,
//     },
//     referencias: voucher[0].referencias,
//     sector: {
//       tipoTotalDescuentos: voucher[0].tipoTotalDescuentos,
//       tipoCargo: voucher[0].tipoCargo,
//     },
//   };
// };

// export const makeFacturaJSON = (voucher: any) => {
//   console.log({
//     anticipos: [],
//     close2u: {
//       numero: "",
//       tipoIntegracion: voucher[0].tipoIntegracion,
//       tipoPlantilla: voucher[0].tipoPlantilla,
//       tipoRegistro: voucher[0].tipoRegistro,
//     },
//     datosDocumento: {
//       condicionPago: voucher[0].condicionPago,
//       fechaEmision: voucher[0].fechaEmision,
//       fechaVencimiento: voucher[0].fechaVencimiento,
//       formaPago: voucher[0].formaPago,
//       glosa: voucher[0].glosa,
//       puntoEmisor: voucher[0].puntoEmisor,
//       moneda: voucher[0].monedaDatosDoc,
//       numero: voucher[0].numeroDatosDoc,
//       ordencompra: voucher[0].ordencompra,
//       serie: voucher[0].serie,
//     },
//     cuotas: [
//       {
//         numero: voucher[0].numeroCuota,
//         monto: voucher[0].monto,
//         fecha: voucher[0].fecha,
//         moneda: voucher[0].monedaCuota,
//       },
//     ],
//     descuentoGlobal: voucher[0].descuentoGlobal,
//     detalleDocumento: [
//       ...voucher.map((voucher: any) => ({
//         cantidad: voucher.cantidadArt,
//         codigoProducto: voucher.codigoProductoArt,
//         aliasProducto: null,
//         descripcion: voucher.descripcionArt,
//         descuento: {
//           monto: voucher.montoDescuentoArt,
//         },
//         isc: voucher.iscArt,
//         numeroOrden: voucher.numeroOrdenArt,
//         precioVentaUnitarioItem: voucher.precioVentaUnitarioItem,
//         tipoAfectacion: voucher.tipoAfectacion,
//         unidadMedida: voucher.unidadMedidaArt,
//         valorReferencialUnitarioItem: voucher.valorReferencialUnitarioItem,
//         valorVentaUnitarioItem: voucher.valorVentaUnitarioItem,
//       })),
//     ],
//     detraccion: voucher[0].detraccion,
//     emisor: {
//       correo: "jbueno@guruverso.com",
//       correoCopia: "jhonadelbuenovillarroel@gmail.com",
//       domicilioFiscal: {
//         departamento: voucher[0].departamento,
//         direccion: voucher[0].direccion,
//         distrito: voucher[0].distrito,
//         pais: voucher[0].pais,
//         provincia: voucher[0].provincia,
//         ubigeo: voucher[0].ubigeo,
//         urbanizacion: voucher[0].urbanizacion,
//       },
//       nombreComercial: voucher[0].nombreComercial,
//       nombreLegal: voucher[0].nombreLegal,
//       numeroDocumentoIdentidad: "10223161419",
//       tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
//     },
//     facturaGuia: voucher[0].facturaGuia,
//     informacionAdicional: {
//       vendedor: "jhonadelbuenovillarroel@guruverso.com",
//       tipoOperacion: voucher[0].tipoOperacion,
//     },
//     otrosCargos: voucher[0].otrosCargos,
//     percepcion: voucher[0].percepcion,
//     receptor: {
//       correo: "jbueno@guruverso.com",
//       correoCopia: "jhonadelbuenovillarroel@gmail.com",
//       domicilioFiscal: {
//         departamento: voucher[0].departamenteoReceptor,
//         direccion: voucher[0].direccionReceptor,
//         distrito: voucher[0].distritoReceptor,
//         pais: voucher[0].paisReceptor.toUpperCase(),
//         provincia: voucher[0].provinciaReceptor,
//         ubigeo: voucher[0].ubigeoReceptor,
//         urbanizacion: voucher[0].urbanizacionReceptor,
//       },
//       nombreComercial: voucher[0].nombreComercialReceptor,
//       nombreLegal: voucher[0].nombreLegalReceptor,
//       numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidadReceptor,
//       tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidadReceptor,
//     },
//     referencias: voucher[0].referencias,
//     sector: {
//       tipoTotalDescuentos: voucher[0].tipoTotalDescuentos,
//       tipoCargo: voucher[0].tipoCargo,
//     },
//   });
// };

export const makeBoletaJSON = (voucher: any) => {
  return {
    anticipos: [],
    close2u: {
      numero: "",
      tipoIntegracion: voucher[0].tipoIntegracion,
      tipoPlantilla: voucher[0].tipoPlantilla,
      tipoRegistro: voucher[0].tipoRegistro,
    },
    datosDocumento: {
      condicionPago: voucher[0].condicionPago,
      fechaEmision: voucher[0].fechaEmision,
      fechaVencimiento: voucher[0].fechaVencimiento,
      formaPago: voucher[0].formaPago,
      glosa: voucher[0].glosa,
      puntoEmisor: voucher[0].puntoEmisor,
      moneda: voucher[0].monedaDatosDoc,
      numero: voucher[0].numeroDatosDoc,
      ordencompra: voucher[0].ordencompra,
      serie: voucher[0].serie,
    },
    cuotas: [
      {
        numero: voucher[0].numeroCuota,
        monto: voucher[0].monto,
        fecha: voucher[0].fecha,
        moneda: voucher[0].monedaCuota,
      },
    ],
    descuentoGlobal: voucher[0].descuentoGlobal,
    detalleDocumento: [
      ...voucher.map((boleta: any) => ({
        cantidad: boleta.cantidadArt,
        codigoProducto: boleta.codigoProductoArt,
        aliasProducto: null,
        descripcion: boleta.descripcionArt,
        descuento: {
          monto: boleta.montoDescuentoArt,
        },
        isc: boleta.iscArt,
        numeroOrden: boleta.numeroOrdenArt,
        precioVentaUnitarioItem: boleta.precioVentaUnitarioItem,
        tipoAfectacion: boleta.tipoAfectacion,
        unidadMedida: boleta.unidadMedidaArt,
        valorReferencialUnitarioItem: boleta.valorReferencialUnitarioItem,
        valorVentaUnitarioItem: boleta.valorVentaUnitarioItem,
      })),
    ],
    detraccion: voucher[0].detraccion,
    emisor: {
      correo: voucher[0].correo,
      correoCopia: voucher[0].correoCopia,
      domicilioFiscal: {
        departamento: voucher[0].departamento,
        direccion: voucher[0].direccion,
        distrito: voucher[0].distrito,
        pais: voucher[0].pais,
        provincia: voucher[0].provincia,
        ubigeo: voucher[0].ubigeo,
        urbanizacion: voucher[0].urbanizacion,
      },
      nombreComercial: voucher[0].nombreComercial,
      nombreLegal: voucher[0].nombreComercial,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidad,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
    },
    facturaGuia: voucher[0].facturaGuia,
    informacionAdicional: {
      vendedor: voucher[0].vendedor,
      tipoOperacion: voucher[0].tipoOperacion,
    },
    otrosCargos: voucher[0].otrosCargos,
    percepcion: voucher[0].percepcion,
    receptor: {
      correo: voucher[0].correoReceptor,
      correoCopia: voucher[0].correoCopiaReceptor,
      domicilioFiscal: {
        departamento: voucher[0].departamenteoReceptor,
        direccion: voucher[0].direccionReceptor,
        distrito: voucher[0].distritoReceptor,
        pais: voucher[0].paisReceptor.toUpperCase(),
        provincia: voucher[0].provinciaReceptor,
        ubigeo: voucher[0].ubigeoReceptor,
        urbanizacion: voucher[0].urbanizacionReceptor,
      },
      nombreComercial: voucher[0].nombreComercialReceptor,
      nombreLegal: voucher[0].nombreLegalReceptor,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidadReceptor,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidadReceptor,
    },
    referencias: voucher[0].referencias,
    sector: {
      tipoTotalDescuentos: voucher[0].tipoTotalDescuentos,
      tipoCargo: voucher[0].tipoCargo,
    },
  };
};

export const makeNotaCreditoJSON = (voucher: any) => {
  return {
    anticipos: [],
    close2u: {
      numero: "",
      tipoIntegracion: voucher[0].tipoIntegracion,
      tipoPlantilla: voucher[0].tipoPlantilla,
      tipoRegistro: voucher[0].tipoRegistro,
    },
    comprobanteAjustado: {
      fechaEmision: voucher[0].fechaEmisionDocAjus,
      numero: voucher[0].numeroDatosDocAjus,
      serie: voucher[0].serieAjus,
      tipoDocumento: voucher[0].tipoDocumentoAjus,
    },
    datosDocumento: {
      condicionPago: voucher[0].condicionPago,
      fechaEmision: voucher[0].fechaEmision,
      fechaVencimiento: voucher[0].fechaVencimiento,
      formaPago: voucher[0].formaPago,
      glosa: voucher[0].glosa,
      puntoEmisor: voucher[0].puntoEmisor,
      moneda: voucher[0].monedaDatosDoc,
      numero: voucher[0].numeroDatosDoc,
      ordencompra: voucher[0].ordencompra,
      serie: voucher[0].serie,
    },
    descuentoGlobal: voucher[0].descuentoGlobal,
    detalleDocumento: [
      ...voucher.map((notaCredito: any) => ({
        cantidad: notaCredito.cantidadArt,
        codigoProducto: notaCredito.codigoProductoArt,
        aliasProducto: null,
        descripcion: notaCredito.descripcionArt,
        descuento: {
          monto: notaCredito.montoDescuentoArt,
        },
        isc: notaCredito.iscArt,
        numeroOrden: notaCredito.numeroOrdenArt,
        precioVentaUnitarioItem: notaCredito.precioVentaUnitarioItem,
        tipoAfectacion: notaCredito.tipoAfectacion,
        unidadMedida: notaCredito.unidadMedidaArt,
        valorReferencialUnitarioItem: notaCredito.valorReferencialUnitarioItem,
        valorVentaUnitarioItem: notaCredito.valorVentaUnitarioItem,
      })),
    ],
    detraccion: voucher[0].detraccion,
    emisor: {
      correo: voucher[0].correo,
      correoCopia: voucher[0].correoCopia,
      domicilioFiscal: {
        departamento: voucher[0].departamento,
        direccion: voucher[0].direccion,
        distrito: voucher[0].distrito,
        pais: voucher[0].pais,
        provincia: voucher[0].provincia,
        ubigeo: voucher[0].ubigeo,
        urbanizacion: voucher[0].urbanizacion,
      },
      nombreComercial: voucher[0].nombreComercial,
      nombreLegal: voucher[0].nombreLegal,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidad,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
    },
    facturaGuia: voucher[0].facturaGuia,
    informacionAdicional: {
      vendedor: voucher[0].vendedor,
      tipoOperacion: voucher[0].tipoOperacion,
    },
    motivo: voucher[0].motivo,
    otrosCargos: voucher[0].otrosCargos,
    percepcion: voucher[0].percepcion,
    receptor: {
      correo: voucher[0].correoReceptor,
      correoCopia: voucher[0].correoCopiaReceptor,
      domicilioFiscal: {
        departamento: voucher[0].departamenteoReceptor,
        direccion: voucher[0].direccionReceptor,
        distrito: voucher[0].distritoReceptor,
        pais: voucher[0].paisReceptor
          ? voucher[0].paisReceptor.toUpperCase()
          : voucher[0].paisReceptor,
        provincia: voucher[0].provinciaReceptor,
        ubigeo: voucher[0].ubigeoReceptor,
        urbanizacion: voucher[0].urbanizacionReceptor,
      },
      nombreComercial: voucher[0].nombreComercialReceptor,
      nombreLegal: voucher[0].nombreLegalReceptor,
      numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidadReceptor,
      tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidadReceptor,
    },
    referencias: voucher[0].referencias,
    sector: {
      tipoTotalDescuentos: voucher[0].tipoTotalDescuentos,
      tipoCargo: voucher[0].tipoCargo,
    },
  };
};

// Funciones útiles para manejar permisos y accesos de usuarios a la intranet

export const updateRoutePermissionByPath = (
  routes: RoutePermissionInterface[],
  path: string,
  checked: boolean
): RoutePermissionInterface[] => {
  return routes.map((route) => {
    if (route.path === path) {
      // Si el path coincide, actualiza el checked
      return { ...route, checked };
    }
    if (route.children && route.children.length > 0) {
      // Si tiene hijos, llama recursivamente
      if (route.children.some((child) => child.checked === true)) {
        return {
          ...route,
          children: updateRoutePermissionByPath(route.children, path, checked),
        };
      } else {
        return {
          ...route,
          children: updateRoutePermissionByPath(route.children, path, checked),
        };
      }
    }
    return route;
  });
};

export const updateRoutePermissionForAdmin = (
  routes: RoutePermissionInterface[]
): RoutePermissionInterface[] => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      // Llamada recursiva para los hijos
      route.children = updateRoutePermissionForAdmin(route.children);
      // Actualizar el checked en base a los hijos
      route.checked = true;
    } else if (route.children && route.children.length === 0 && !route.isLink) {
      route.checked = route.isLink ? true : false;
    } else if (route.children && route.children.length === 0 && route.isLink) {
      route.checked = true;
    }
    return route;
  });
};
export const updateRoutePermissionCheckedStatus = (
  routes: RoutePermissionInterface[]
): RoutePermissionInterface[] => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      // Llamada recursiva para los hijos
      route.children = updateRoutePermissionCheckedStatus(route.children);
      // Actualizar el checked en base a los hijos
      route.checked = route.children.some((child) => child.checked);
    } else if (route.children && route.children.length === 0 && !route.isLink) {
      route.checked = route.isLink ? route.checked : false;
    }

    return route;
  });
};
export const routePermissionStatusForAccessRouteIsTrue = (
  routes: RoutePermissionInterface[]
): boolean => {
  let hasAccess = false;

  if (hasAccess) {
    return hasAccess;
  }

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].children && routes[i].children.length > 0) {
      hasAccess = routePermissionStatusForAccessRouteIsTrue(routes[i].children);
    }
    if (routes[i].path === "/panel-administracion/accesos/usuarios") {
      hasAccess = routes[i].checked;
    }
  }

  return hasAccess;
};

export interface RoutePermissionInterface {
  id: string;
  name: string;
  path: string;
  isLink: boolean;
  checked: boolean;
  icon: string;
  hasParents: boolean;
  children: RoutePermissionInterface[];
}

export const updateNewRoutePermissionsForUser = ({
  newRoutePermissions,
  routePermissions,
}: {
  newRoutePermissions: RoutePermissionInterface[];
  routePermissions: RoutePermissionInterface[];
}) => {
  let newUpdatedRoutePermissions = newRoutePermissions;

  routePermissions.map((route: RoutePermissionInterface) => {
    if (route.children && route.children.length > 0) {
      // Si tiene hijos, llama recursivamente
      newUpdatedRoutePermissions = updateNewRoutePermissionsForUser({
        newRoutePermissions: newUpdatedRoutePermissions,
        routePermissions: route.children,
      });
    } else {
      newUpdatedRoutePermissions = updateRoutePermissionByPath(
        newUpdatedRoutePermissions,
        route.path,
        route.checked
      );
    }
  });

  return updateRoutePermissionCheckedStatus(newUpdatedRoutePermissions);
};

export const voucherQueryHeadersDevelopment = {
  "Content-Type": "application/json",
  Authorization: "Basic VWFwaUBmYXN0bGFuZ5wZTpMYXV0bzI2MTAk",
  "X-Auth-Token":
    "p5Hp14nCxoiYTQCMmN2rfnbn8iraY8rEotiPsPrkhFrIJxH8aX+6cJilmD1YK64B",
};

export const voucherQueryHeadersProduction = {
  "Content-Type": "application/json",
  Authorization: "Basic QzJVYXV0b0BjbG9zZTJ1LnBlOkMyVWF1dG8yJCQ=",
  "X-Auth-Token": "MjAxNDQ2NDAyNjk=",
};
