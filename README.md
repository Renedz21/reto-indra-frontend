# Optimización y Refactorización del Proyecto de React Native con Expo

## Índice

- [Optimización y Refactorización del Proyecto de React Native con Expo](#optimización-y-refactorización-del-proyecto-de-react-native-con-expo)
  - [Índice](#índice)
  - [Descripción del Proyecto](#descripción-del-proyecto)
  - [Problemas Identificados](#problemas-identificados)
  - [Soluciones Aplicadas](#soluciones-aplicadas)
  - [Hooks Reutilizables](#hooks-reutilizables)
    - [Hook: `useFetch`](#hook-usefetch)
    - [Explicación:](#explicación)
  - [Refactorización del Componente `ItemList`](#refactorización-del-componente-itemlist)
    - [Cambios Principales:](#cambios-principales)
  - [Subcomponentes Creado: `Item`](#subcomponentes-creado-item)
    - [Ventajas del Subcomponente `Item`:](#ventajas-del-subcomponente-item)
  - [Conclusiones](#conclusiones)

## Descripción del Proyecto

El proyecto consiste en un componente de **React Native** que obtiene una lista de personajes desde la API pública de **Rick and Morty** y los muestra en pantalla. Los datos se cargan de manera paginada, permitiendo al usuario cargar más personajes a medida que llega al final de la lista.

## Problemas Identificados

1. **Dependencia incorrecta en `useEffect`**:

   - Se observó que el `useEffect` estaba configurado para depender de `items`. Esto provoca una llamada indefinida a la API, ya que cada vez que se actualiza `items`, el efecto se vuelve a ejecutar, causando un bucle de llamadas.

2. **Uso incorrecto de `map` en `renderItem`**:

   - En lugar de usar directamente el item proporcionado por el `FlatList`, se ejecutaba un `map` sobre `items`, lo que causaba errores de renderización y un mal manejo del renderizado de los elementos.

3. **Asignación incorrecta del estado `items`**:

   - La respuesta de la API no estaba siendo correctamente manejada. El uso de `response.json()` no estaba siendo await, lo que causaba que `setItems` se intentara ejecutar antes de obtener los datos, resultando en un estado indefinido.

4. **Carga inicial no manejada adecuadamente**:
   - El componente comenzaba en estado de carga (`loading`) pero no lo manejaba de forma adecuada en la llamada inicial de la API, lo que podía generar retrasos innecesarios en la primera renderización.

## Soluciones Aplicadas

1. **Corrección del uso de `useEffect`**:

   - Se modificó la dependencia de `useEffect` para que dependa de `page` y no de `items`. Esto asegura que la llamada a la API solo ocurra cuando se cambia de página y no cuando el estado de `items` cambia.

2. **Uso correcto de `renderItem` en `FlatList`**:

   - Se corrigió la lógica en el método `renderItem` para usar el parámetro `item` proporcionado por `FlatList` en lugar de recorrer todo el array de `items` con `map`. Esto garantiza que cada elemento sea renderizado de forma eficiente y evita sobrecargas innecesarias en la interfaz.

3. **Corrección de la promesa en `fetchItems`**:

   - Se añadió `await` correctamente a la llamada de `response.json()` para asegurar que los datos se reciban antes de actualizar el estado. De esta forma, `setItems` solo se ejecuta cuando se ha recibido la respuesta completa.

4. **Manejo adecuado del estado `loading`**:
   - El estado de `loading` se maneja de manera más adecuada, activándose correctamente antes de la carga de los datos y desactivándose una vez que la respuesta ha sido procesada. Esto optimiza la experiencia de usuario, mostrando un indicador de carga solo cuando es necesario.

## Hooks Reutilizables

### Hook: `useFetch`

Este hook maneja la lógica de obtención de datos de la API de manera reutilizable. Permite a cualquier componente que lo utilice realizar solicitudes HTTP y manejar la paginación de manera más simple y eficiente.

### Explicación:

- El hook mantiene tres estados: `data` (los datos obtenidos), `loading` (el estado de carga) y `error` (cualquier error que pueda ocurrir).
- La data se acumula en lugar de ser reemplazada cuando se cambia la página, lo que permite una experiencia fluida en la paginación.
- El hook mejora la separación de responsabilidades, manteniendo la lógica de obtención de datos desacoplada del componente principal.

## Refactorización del Componente `ItemList`

El componente `ItemList` fue refactorizado para mejorar su claridad, flexibilidad y escalabilidad. Ahora utiliza el hook `useFetch` para manejar la lógica de obtención de datos, y asegura una mejor experiencia de usuario con el `FlatList`.

### Cambios Principales:

1. **`maintainVisibleContentPosition`**: Esta propiedad asegura que, al cargar más datos, el usuario no sea devuelto al inicio de la lista, mejorando la experiencia de desplazamiento.
2. **Separación de Responsabilidades**: La lógica de obtención de datos se separa del componente principal mediante el hook `useFetch`. Esto mejora la modularidad y la capacidad de reutilización.

3. **Manejo Adecuado de Claves en `FlatList`**: Usamos `item.id` como clave única y, si no está disponible, el índice del array actúa como respaldo. Esto elimina los errores causados por claves duplicadas.

## Subcomponentes Creado: `Item`

Se creó el subcomponente `Item` para encapsular la lógica y presentación de cada elemento en la lista. Esto sigue el principio **SRP (Single Responsibility Principle)**, ya que el componente ahora está dedicado solo a la renderización de un ítem individual, mejorando así la legibilidad y el mantenimiento del código.

### Ventajas del Subcomponente `Item`:

- **Reutilización**: El componente `Item` puede ser reutilizado en diferentes partes del proyecto si es necesario.
- **Claridad**: Mejora la separación de preocupaciones al delegar la responsabilidad de la representación de un solo elemento a su propio componente.

## Conclusiones

Este refactor sigue los principios de **Clean Code**, **SOLID**, y patrones de diseño, mejorando la modularidad, reutilización y mantenibilidad del código.

- **Single Responsibility Principle (SRP)**: Cada parte del código tiene una responsabilidad única. Los componentes y hooks se han separado para hacer que el código sea más modular y fácil de mantener.
- **Claves Únicas**: Se ha abordado el problema de las claves duplicadas, eliminando los errores de renderización en `FlatList`.
- **Manejo de Estado y Datos**: El uso de un hook personalizado ayuda a gestionar de manera eficiente los estados y la lógica de datos, facilitando el mantenimiento y la reutilización del código en otros componentes.

Gracias a estos cambios, el código es más eficiente, escalable y fácil de entender y mantener.
