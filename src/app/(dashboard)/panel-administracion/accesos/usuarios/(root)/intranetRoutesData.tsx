export const intranetRoutesData = [
  {
    name: "Facturación",
    path: "/panel-administracion/comprobantes",
    isLink: false,
    checked: false,
    children: [
      {
        name: "Comp. de venta",
        path: "/panel-administracion/comprobantes/comprobantes-de-venta",
        isLink: false,
        checked: false,
        children: [
          {
            name: "Emitir",
            path: "/panel-administracion/comprobantes/comprobantes-de-venta/emitir",
            isLink: true,
            checked: false,
            children: [],
          },
          {
            name: "Listado",
            path: "/panel-administracion/comprobantes/comprobantes-de-venta/voucher-list",
            isLink: true,
            checked: false,
            children: [],
          },
        ],
      },
      {
        name: "Comp. de recepción",
        path: "/panel-administracion/comprobantes/comprobantes-de-recepcion",
        isLink: false,
        checked: false,
        children: [],
      },
    ],
  },
  {
    name: "Almacén",
    path: "/panel-administracion/almacen",
    isLink: false,
    checked: false,
    children: [
      {
        name: "Ubicaciones",
        path: "/panel-administracion/almacen/ubicaciones",
        isLink: true,
        checked: false,
        children: [],
      },
    ],
  },
  {
    name: "Accesos",
    path: "/panel-administracion/accesos",
    isLink: false,
    checked: false,
    children: [
      {
        name: "Usuarios",
        path: "/panel-administracion/accesos/usuarios",
        isLink: true,
        checked: false,
        children: [],
      },
    ],
  },
];
