# Rick & Morty Explorer

Angular workspace con una librería de componentes reutilizable (`ui-lib`) y una aplicación demo (`demo-app`) que consume la [Rick and Morty API](https://rickandmortyapi.com/).

---

## Arquitectura

```
rick-and-morty/
├── projects/
│   ├── ui-lib/          ← Librería de componentes reutilizables
│   │   └── src/
│   │       ├── public-api.ts
│   │       └── lib/
│   │           ├── button/
│   │           ├── card/
│   │           ├── select/
│   │           └── table/
│   └── demo-app/        ← App que consume la librería
│       └── src/
│           └── app/
│               ├── components/
│               ├── models/
│               └── services/
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Compilar la librería (requerido antes de servir la app)
ng build ui-lib

# Servir la demo app
ng serve demo-app
```

Abrir el navegador en `http://localhost:4200`

---

## API de componentes

### `ui-button`

```html
<ui-button
  label="Click me"
  variant="primary"
  size="md"
  [disabled]="false"
  [loading]="false"
  (clicked)="onClicked()"
/>
```

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `label` | `string` | `''` | Texto visible del botón |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Bloquea la interacción |
| `loading` | `boolean` | `false` | Muestra spinner y bloquea el click |

| Output | Tipo | Descripción |
|--------|------|-------------|
| `clicked` | `void` | Emite solo si no está disabled ni loading |

---

### `ui-card`

```html
<ui-card
  title="Personaje"
  subtitle="Humano · Vivo"
  elevation="raised"
  (headerClicked)="onHeaderClick()"
>
  <p>Contenido proyectado aquí</p>
</ui-card>
```

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `title` | `string` | `''` | Título del header |
| `subtitle` | `string \| null` | `null` | Subtítulo opcional |
| `elevation` | `'flat' \| 'raised' \| 'outlined'` | `'flat'` | Estilo visual del contenedor |

| Output | Tipo | Descripción |
|--------|------|-------------|
| `headerClicked` | `void` | Emite al hacer clic en el header |

---

### `ui-select`

```html
<ui-select
  label="Resource"
  placeholder="Select a resource"
  [options]="options"
  [loading]="false"
  [disabled]="false"
  [(value)]="selectedValue"
  (selectionChange)="onChange($event)"
/>
```

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Lista de opciones `{ label, value }` |
| `label` | `string` | `''` | Etiqueta visible sobre el select |
| `placeholder` | `string` | `'Select an option'` | Texto cuando no hay selección |
| `loading` | `boolean` | `false` | Muestra skeleton |
| `disabled` | `boolean` | `false` | Bloquea la interacción |

| Model | Tipo | Descripción |
|-------|------|-------------|
| `value` | `string \| null` | Two-way binding del valor seleccionado |

| Output | Tipo | Descripción |
|--------|------|-------------|
| `selectionChange` | `SelectOption` | Emite el objeto completo al cambiar |

---

### `ui-table`

```html
<ui-table
  [columns]="columns"
  [rows]="rows"
  [loading]="false"
  [showImage]="true"
  [statusKey]="'status'"
  emptyMessage="No results found"
  [errorMessage]="null"
  (actionTriggered)="onAction($event)"
/>
```

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Definición de columnas `{ key, header }` |
| `rows` | `T[]` | `[]` | Datos a renderizar |
| `loading` | `boolean` | `false` | Muestra skeleton rows |
| `emptyMessage` | `string` | `'No hay resultados'` | Mensaje cuando rows está vacío |
| `errorMessage` | `string \| null` | `null` | Mensaje de error visible |
| `showImage` | `boolean` | `false` | Muestra columna de foto circular |
| `imageSource` | `string` | `'image'` | Key del campo de imagen en el row |
| `statusKey` | `string \| null` | `null` | Key del campo de status para mostrar badge |

| Output | Tipo | Descripción |
|--------|------|-------------|
| `actionTriggered` | `TableAction<T>` | Emite `{ action: 'view' \| 'delete', row: T }` |

---

## Decisiones de diseño

**Signals API sobre decoradores** — Se usó `input()`, `output()` y `model()` de Angular 17+ en todos los componentes de la librería, evitando los decoradores `@Input()` y `@Output()` como lo exige la prueba.

**Tabla genérica** — `ui-table` usa un tipo genérico `T extends Record<string, unknown>` para no conocer el dominio de los datos. Solo renderiza columnas y emite acciones.

**Estado centralizado en servicio** — Todo el estado de la app (recurso activo, filtro, loading, error, resultados) vive en `ResourceService` usando signals. Los componentes no hacen llamadas HTTP directas.

**Filtro de status deshabilitado** — Episodes y Locations no tienen campo `status` en la API, por lo que el select de filtro se deshabilita automáticamente cuando el recurso activo no es Characters.

**Foto como columna especial** — La tabla recibe `showImage` y `imageSource` como inputs en lugar de incluir la imagen como columna normal, para mantener la tabla genérica y no acoplarla al dominio.

---

## Tecnologías

- Angular 21
- TypeScript (strict mode)
- Tailwind CSS v3
- Lucide Angular (iconos)
- Rick and Morty API