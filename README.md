# Sistema de Gestión Inmobiliaria

## Integrantes del Grupo

Moises Elias Salas

Orozco Kevin Roy

---

## Descripción

Este proyecto consiste en el desarrollo de un sitio web para la gestión de una inmobiliaria utilizando ASP.NET Core MVC, C#, Entity Framework Core y SQL Server mediante migraciones.

El sistema permite administrar propietarios, inquilinos, tipos de inmuebles, inmuebles, reservas, pagos y usuarios. También permite gestionar la disponibilidad de los inmuebles, realizar reservas, registrar pagos, administrar imágenes y generar diferentes reportes.

---

## Acceso al sistema

El sistema cuenta con un usuario administrador integrado en la base de datos mediante la configuración inicial de Entity Framework Core.

### Administrador

**Correo:** [admin@inmobiliaria.com](mailto:admin@inmobiliaria.com)

**Contraseña:** 1234

El usuario administrador posee permisos para gestionar usuarios y realizar las operaciones que requieren permisos de administrador.

---

## Propietarios

Se desarrolló el ABM de propietarios, permitiendo:

* Listar propietarios.
* Agregar nuevos propietarios.
* Editar propietarios existentes.
* Eliminar propietarios.

---

## Inquilinos

Se desarrolló el ABM de inquilinos, permitiendo:

* Listar inquilinos.
* Agregar nuevos inquilinos.
* Editar inquilinos existentes.
* Eliminar inquilinos.

---

## Tipos de Inmueble

Se desarrolló el ABM de tipos de inmueble, permitiendo:

* Listar tipos de inmueble.
* Agregar nuevos tipos.
* Editar tipos existentes.
* Eliminar tipos.

---

## Inmuebles

Se desarrolló la gestión de inmuebles, permitiendo:

* Listar inmuebles.
* Agregar nuevos inmuebles.
* Editar inmuebles existentes.
* Eliminar inmuebles.
* Asociar un inmueble con un propietario.
* Asociar un inmueble con un tipo de inmueble.
* Registrar dirección.
* Registrar cupo.
* Registrar coordenadas.
* Registrar precio por día.
* Establecer el porcentaje de seña.
* Suspender temporalmente un inmueble.
* Establecer una imagen de portada.
* Asociar múltiples imágenes al inmueble.

Los inmuebles suspendidos no aparecen como disponibles para nuevas reservas.

---

## Reservas

El sistema permite gestionar reservas de inmuebles, permitiendo:

* Crear reservas.
* Consultar reservas.
* Editar reservas.
* Validar superposición de fechas.
* Buscar inmuebles disponibles entre determinadas fechas.
* Registrar el monto por día.
* Asociar un inquilino a una reserva.
* Asociar un inmueble a una reserva.
* Registrar el usuario que creó la reserva.
* Registrar el usuario que terminó anticipadamente una reserva.
* Realizar extensiones mediante una nueva reserva.
* Finalizar anticipadamente una reserva.

La terminación anticipada calcula automáticamente la multa correspondiente y registra el pago de la misma.

---

## Pagos

El sistema permite registrar y administrar los pagos asociados a las reservas.

Se permite:

* Registrar pagos.
* Consultar pagos de una reserva.
* Registrar fecha de pago.
* Registrar monto.
* Registrar método de pago.
* Anular pagos.
* Registrar el usuario que creó el pago.
* Registrar el usuario que anuló el pago.

Los pagos anulados no son eliminados físicamente de la base de datos, sino que permanecen registrados con su estado correspondiente.

---

## Usuarios y roles

El sistema cuenta con autenticación y manejo de roles.

Se implementaron los siguientes roles:

* Administrador
* Empleado

El administrador puede:

* Gestionar usuarios.
* Crear empleados.
* Administrar las operaciones que requieren permisos de administrador.
* Eliminar entidades.
* Consultar información de auditoría.

El empleado puede:

* Trabajar con las funcionalidades permitidas por el sistema.
* Modificar su propio perfil.
* Modificar sus datos personales.
* Cambiar su contraseña.
* Administrar su avatar.

La información de auditoría se encuentra disponible únicamente para los usuarios con permisos de administrador.

---

## Reportes

El sistema cuenta con diferentes reportes para consultar información de la inmobiliaria.

Se implementaron:

### Inmuebles y propietarios

Permite consultar los inmuebles junto con su propietario, tipo, precio y estado de disponibilidad.

También permite filtrar los inmuebles por estado:

* Todos
* Disponibles
* Suspendidos

### Inmuebles por propietario

Permite seleccionar un propietario y consultar los inmuebles asociados al mismo.

### Reservas por período

Permite seleccionar dos fechas y consultar las reservas que se encuentran dentro o se superponen con el período seleccionado.

### Pagos de una reserva

Permite consultar los pagos asociados a una reserva determinada.

### Inmuebles disponibles entre fechas

Permite seleccionar un período y consultar los inmuebles que se encuentran disponibles durante esas fechas, teniendo en cuenta las reservas existentes y las terminaciones anticipadas.

---

## Auditoría

El sistema registra información sobre los usuarios que realizan determinadas operaciones.

En las reservas se registra:

* Usuario que creó la reserva.
* Usuario que realizó la terminación anticipada, cuando corresponde.

En los pagos se registra:

* Usuario que creó el pago.
* Usuario que anuló el pago, cuando corresponde.

Esta información se muestra en los detalles correspondientes y está disponible para los administradores.

---

## Base de datos

La aplicación utiliza SQL Server como sistema de gestión de base de datos y Entity Framework Core para realizar la conexión entre la aplicación y la base de datos.

La estructura y evolución de la base de datos se gestionan mediante migraciones de Entity Framework Core.

También se encuentra disponible el archivo:

`BDInmobiliaria.sql`

Este archivo permite crear las tablas necesarias para ejecutar el proyecto.

Para trabajar con la base de datos es necesario tener instalado:

* SQL Server 2022
* SQL Server Management Studio (SSMS)

---

## Tecnologías utilizadas

* C#
* ASP.NET Core MVC
* Entity Framework Core
* SQL Server
* Vue.js
* HTML
* CSS
* JavaScript

---

## Estructura del proyecto

El proyecto se encuentra organizado utilizando una arquitectura basada en:

* Models
* Controllers
* API Controllers
* Repositories
* Views
* Vue / JavaScript
* Data
* Migrations
* wwwroot

---

## Modelo entidad-relación

### PROPIETARIO

```text
+---------------------------+
|       PROPIETARIO         |
+---------------------------+
| PK IdPropietario          |
|    Nombre                 |
|    Apellido               |
|    DNI                    |
|    Telefono               |
|    Email                  |
+---------------------------+
```

### INQUILINO

```text
+---------------------------+
|        INQUILINO          |
+---------------------------+
| PK IdInquilino            |
|    DNI                    |
|    NombreCompleto         |
|    Telefono               |
|    Email                  |
+---------------------------+
```

### TIPO INMUEBLE

```text
+---------------------------+
|       TIPO INMUEBLE       |
+---------------------------+
| PK IdTipoInmueble         |
|    Nombre                 |
+---------------------------+
```

### INMUEBLE

```text
+---------------------------+
|         INMUEBLE          |
+---------------------------+
| PK IdInmueble             |
| FK IdPropietario          |
| FK IdTipoInmueble         |
|    Direccion              |
|    Cupo                   |
|    Coordenadas            |
|    PrecioPorDia           |
|    PorcentajeSena         |
|    Disponible             |
|    ImagenPortada          |
+---------------------------+
```

### RESERVA

```text
+---------------------------+
|          RESERVA          |
+---------------------------+
| PK IdReserva              |
| FK IdInquilino            |
| FK IdInmueble             |
|    FechaInicio            |
|    FechaFin               |
|    MontoPorDia            |
| FK IdUsuarioCreacion      |
| FK IdUsuarioTerminacion   |
|    FechaTerminacion       |
+---------------------------+
```

### PAGO

```text
+---------------------------+
|           PAGO            |
+---------------------------+
| PK IdPago                 |
| FK IdReserva              |
|    FechaPago              |
|    Monto                  |
|    MetodoPago             |
| FK IdUsuarioCreacion      |
| FK IdUsuarioAnulacion     |
|    Anulado                |
+---------------------------+
```

### USUARIO

```text
+---------------------------+
|          USUARIO          |
+---------------------------+
| PK IdUsuario              |
|    Nombre                 |
|    Apellido               |
|    Email                  |
|    Password               |
|    Rol                    |
|    Avatar                 |
+---------------------------+
```

---

## Relaciones

```text
Propietario "1" --> "0..*" Inmueble
TipoInmueble "1" --> "0..*" Inmueble
Inquilino "1" --> "0..*" Reserva
Inmueble "1" --> "0..*" Reserva
Reserva "1" --> "0..*" Pago
Usuario "1" --> "0..*" Reserva
Usuario "1" --> "0..*" Pago
```
