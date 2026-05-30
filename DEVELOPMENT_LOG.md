# Development Log — Rick & Morty Explorer

## Proceso de desarrollo

Este proyecto fue desarrollado como prueba técnica para una posición de Aprendiz Frontend Developer. Es mi primer proyecto en Angular, viniendo de un background en React Native y TypeScript.

---

## Decisiones tomadas

### Estructura del workspace
Se siguió la estructura recomendada por la prueba un workspace Angular con dos proyectos internos: `ui-lib` para la librería de componentes y `demo-app` para la aplicación que la consume. Todos los componentes de `ui-lib` se exportan únicamente desde `public-api.ts`.

### Signals API sobre decoradores
Se usó `input()`, `output()` y `model()` de Angular 17+ en todos los componentes, evitando `@Input()` y `@Output()`. Esta decisión fue requerida por la prueba y resultó en un código más limpio y reactivo.

### Tabla genérica con inputs especiales
La tabla usa un tipo genérico `T extends Record<string, unknown>` para no conocer el dominio de los datos. Para casos especiales como la foto y el badge de status se agregaron inputs opcionales (`showImage`, `statusKey`) en lugar de hardcodear lógica de dominio dentro del componente.

### Estado centralizado en servicio
Todo el estado de la app vive en `ResourceService` usando signals privados con exposición readonly hacia los componentes. Los componentes no hacen llamadas HTTP directas — solo leen signals y llaman métodos del servicio.

El servicio usa `@Injectable({ providedIn: 'root' })` — esto significa que Angular crea una sola instancia del servicio para toda la app (singleton). Todos los componentes que lo inyecten comparten exactamente el mismo estado. Por eso cuando el recurso activo cambia en el servicio, la tabla y los selects se actualizan automáticamente sin necesidad de pasarles los datos manualmente.

### Filtro de status deshabilitado para episodios y ubicaciones
La API de Rick & Morty solo soporta filtro por status para Characters. Para Episodes y Locations el select se deshabilita automáticamente con `[disabled]="resourceService.resource() !== 'character'"`.

### Foto como columna especial
La imagen del personaje no se incluyó como columna normal del array `columns` para mantener la tabla genérica. Se maneja con el input `showImage` que agrega una columna de foto circular antes de las demás.

---

## Retos encontrados y cómo se resolvieron

### Dependencia circular en ui-lib
Al intentar usar `ButtonComponent` dentro de `TableComponent`, el build fallaba con "circular dependency on itself" porque `table.ts` importaba desde `'ui-lib'` que es la misma librería. Se resolvió cambiando el import a una ruta relativa interna: `'../button/button'`.

### Tailwind CSS v4 instalado por defecto
Angular 21 instaló Tailwind v4 automáticamente, pero la prueba requería v3. Se desinstalaron los paquetes de v4 (`tailwindcss`, `@tailwindcss/postcss`) y se instalaron los de v3 (`tailwindcss@3`, `postcss`, `autoprefixer`). También se actualizó el `.postcssrc.json` para usar la configuración correcta de v3.

### Tailwind no aplicaba estilos
Los estilos de Tailwind no se aplicaban porque el `tailwind.config.js` estaba en la raíz pero Angular lo buscaba desde la carpeta de `demo-app`. Se solucionó copiando el archivo a `projects/demo-app/tailwind.config.js` con los paths ajustados.

### Tipo genérico de la tabla — limitación encontrada
La tabla usa un tipo genérico `T extends Record<string, unknown>` para ser agnóstica al dominio. Sin embargo, esto obligó a agregar `[key: string]: unknown` en cada interface de modelo (`Character`, `Episode`, `Location`) para que TypeScript las aceptara como tipos válidos.

Esta solución funciona pero tiene un costo el index signature debilita el tipado estricto de las interfaces porque le dice a TypeScript "acepta cualquier key adicional". En un proyecto de producción evaluaría usar un enfoque diferente: en lugar de una tabla completamente genérica, podría definir un tipo union explícito o usar un mapper que transforme los datos antes de pasarlos a la tabla, manteniendo las interfaces limpias y el tipado estricto.

### `[object Object]` en columnas de Origin y Location
Los campos `origin` y `location` de `Character` son objetos `{ name, url }`, no strings. La tabla los mostraba como `[object Object]`. Se resolvió con el método `getNestedValue` que accede a propiedades anidadas usando notación de punto (`origin.name`).

### Select no se limpiaba visualmente al cambiar recurso
Al cambiar de recurso el servicio reseteaba el status internamente, pero el `ui-select` no se enteraba porque no tenía un valor bindeado. Se resolvió usando `model()` con `[(value)]="statusValue"` y reseteando el signal desde `onResourceChange()`.

### Carpetas generadas fuera de src/app
Al generar componentes y servicios con `ng generate`, algunos quedaron fuera de `src/app` porque el comando se ejecutó desde una carpeta incorrecta. Se movieron manualmente con `mv` al directorio correcto.

---

## Uso de herramientas de IA

Este proyecto fue desarrollado con asistencia de Claude (Anthropic) como guía de aprendizaje, dado que es mi primer proyecto en Angular.

### Cómo se usó
- Claude explicó conceptos de Angular (signals, standalone components, OnPush, servicios) antes de escribir cada parte
- Se consultó sobre dudas puntuales durante el desarrollo: cómo estructurar las peticiones HTTP, cómo manejar errores, cómo resolver warnings de TypeScript
- Cada fragmento de código fue revisado, entendido y en algunos casos corregido antes de aplicarlo
- Se usó para redactar y estructurar los archivos de documentación (README.md y DEVELOPMENT_LOG.md) el contenido y las decisiones son propias, Claude ayudó a presentarlas de forma clara y profesional

### Qué se aceptó y por qué
- La estructura de signals privados con exposición readonly en el servicio es una buena práctica que separa claramente qué puede modificar el estado y qué solo puede leerlo
- El uso de `computed()` para `rows` permite que la tabla reaccione automáticamente cuando cambia el recurso activo sin lógica adicional en los componentes
- El método `getNestedValue` con `reduce` solución elegante para acceder a propiedades anidadas de forma dinámica

### Qué se rechazó o modificó
- Se rechazó usar `any` en varios puntos se reemplazó con tipos más específicos o index signatures
- La primera versión del modal no usaba `ui-card` se corrigió para cumplir el requisito de la prueba