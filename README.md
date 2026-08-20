Sistema de Gestión Inmobiliaria
Descripción

Este proyecto consistia en el desarrollo de un sitio web para la gestión de una inmobiliaria utilizando ASP.NET Core MVC, C#, Entity Framework Core y SQL Server.

El sistema permite administrar la información de los propietarios e inquilinos mediante operaciones ABM (Alta, Baja y Modificacion), ademas de consultar los registros almacenados en la base de datos.


Se desarrolló el ABM de propietarios, permitiendo:

Listar propietarios.
Agregar nuevos propietarios.
Editar propietarios existentes.
Eliminar propietarios.
Inquilinos

Se desarrolló el ABM de inquilinos, permitiendo:

Listar inquilinos.
Agregar nuevos inquilinos.
Editar inquilinos existentes.
Eliminar inquilinos.
Base de datos

La aplicación utiliza SQL Server como sistema de gestión de base de datos y Entity Framework Core para realizar la conexión entre la aplicación y la base de datos.

La estructura de la base de datos se encuentra en el archivo:

BDInmobiliaria.sql

Este archivo permite crear las tablas necesarias para ejecutar el proyecto.

Para trabajar con la base de datos es necesario tener instalado:

SQL Server 2022
SQL Server Management Studio (SSMS)
Estructura del proyecto
modelo entidad-relacion
aun no hay relacion 
+---------------------------+
|       PROPIETARIO         |
+---------------------------+
| PK IdPropietario          |
|    Nombre                 |
|    Apellido               |
+---------------------------+


+---------------------------+
|        INQUILINO          |
+---------------------------+
| PK Id                     |
|    DNI                    |
|    NombreCompleto         |
|    Telefono               |
|    Email                  |
+---------------------------+

Integrantes
moises salas 
Kevin Orozco
Tomás migliozzi
