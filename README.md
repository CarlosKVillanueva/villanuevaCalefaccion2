Proyecto realizado por Carlos Villanueva, para el curso de CODERHOUSE

La pagina es para una empresa familiar.

Cree el diseño y el contenido de todas las subpaginas.

En principio cree los estilos con CSS, pero al momento de ver SASS decidi realizar la pagina nuevamente con este preprocesador.

Hacia el final del curso, cree la configuracion de Gulp a la que fui agregandole mas y mas funcionalidad a medida que iba descubriendo el beneficio de esta herramienta.

Con Gulp se realizan las siguientes tareas

- Compilacion de SASS a CSS
- Minificacion de Archivo CSS (Con su archivo .map) y guardado en carpeta /dist
- Minificacion de Archivo JS (con su archivo .map) y guardado en carpeta /dist
- BrowserSync
- Conversion de diversos Formatos de Imagenes a Formato WEBP
- Copiado de Archivos a carpeta /dist (por ejemplo los necesarios para Bootstrap)

Ademas agregue un script para realizar la purga de archivos CSS y JS, bajando considerablemente su tamaño final con el objetivo de mejorar la performance del sitio.
