# Datos

Los datos que alimentan el sitio provienen de un [Google spreadseet](https://docs.google.com/spreadsheets/d/1pS2nfpWqdWsNHgZ6EtLGPFmrN_5zZRZShXd1BHJkR8k/pubhtml).

Este spreadhseet se vuelca en archivos JSON estáticos dentro de [`public/static-files`](public/static-files)
que están a disposición para consumo.

### Consumo

Se recomienda consumir los archivos a través de [RawGit](https://rawgit.com), un
servicio que devuelve correctamente el `Content-Type` del contenido almacenado en GitHub.

Por ejemplo, en lugar de consumir directamente el archivo [`perfil.json`](static-files/perfil.json),
este se puede consumir por medio de RawGit con [esta URL para desarrollo](https://rawgit.com/RedCiudadana/Congreso/master/public/static-files/perfil.json).

### Archivos de datos

Los principales archivos de datos disponibles son:

##### [`perfil.json`](public/static-files/perfil.json)

Este archivo contiene los datos para el principal concepto a manejar dentro del sitio:
los perfiles de los candidatos. Acerca de estos se cuenta, por ejemplo, con la siguiente
información: `id`, `nombre`, `primerNombre`, `apellidos`, `distrito`, `direccion`, `partidoactual`, `partidopostulante``fb`, `tw`, `email`, `fotoUrl`.


##### [`partidos.json`](public/static-files/partidos.json)

Cuenta con pares key, value que contienen la información acerca de los partidos: `nombre`, `siglas`, `fb`, `tw`, `fundación` (fecha), `sercretariogeneral`, `telefono`, `estado`, `paginaWeb` y `email`.


##### [`asistencia.json`](public/static-files/evaluaciones.json)

Almacena la asistencia (integers: 1 asistió, 0 no asistió) de cada miembro del congreso: `perfilId`, `Sesion1`, `Sesion2`, `Sesion3`, `Sesion4`, `Sesion5`, `Sesion6`, `total` y `porcentaje`.


##### [`votaciones.json`](public/static-files/votaciones.json)

Almacena las votaciones (string: contra, favor) de las propuestas de cada miembro del congreso: `perfilId`, `ley1`, `ley2`, `ley3`, `ley4`, `ley5` y `ley6`.
