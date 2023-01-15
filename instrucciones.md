## Instrucciones

En el HTML empezamos con un div y dos select, NO SE PUEDE AÑADIR NI QUITAR NADA

El ejercicio consiste en que se pueda seleccionar un día, un turno y una hora.

## Pasos

- Construye una interfaz básica con forma de calendario, grid ayuda 😊
- Para rellenar los días lo primero es saber cuantos días tiene el mes.

- Los meses normales son fáciles, pero febrero... Necesitas una función que te diga si un año es bisiesto o no.
- Son bisiestos todos los años divisibles por 4, excluyendo los que sean divisibles por 100, pero no los que sean divisibles por 400.

- Una vez que sepas el número de día que tiene el mes, es la hora de imprimir el calendario en pantalla.

- El siguiente paso será que el calendario empiece en el día correcto, para ello tendrás que saber qué día fue el día 1 de ese mes y colocarlo en la columna de grid correcta, el resto se ajustarán solos.

- Después tendrás que desactivar todos los días anteriores a hoy. Una clase especial y el cursor tendrá el valor "not-allowed", todos los demás días tendrán el valor del cursor en "pointer"

- El día de hoy estará representado en un color especial.

- Una vez que tengas todo eso el siguiente paso es poder reservar, al hacer click en un día se activará el primer select permitiendo seleccionar el número de personas.

  - De lunes a jueves se admiten reservas desde 1 a 8 personas.
  - viernes, sábado y domingo, se admiten reservas de 1 a 15 personas.

- Todos los horarios disponibles van en rangos de media hora en media hora.
  Los domingos sólo hay turno de mañana
  El turno de mañana empieza a las 6:00 y termina a las 14:00
  El turno de tarde empieza a las 15:00 y termina a las 22:00

- Enfoca cada select de forma independiente, con sus propias funciones, una de creación de options y otra que se encargue de saber cuantos options tiene cada una.

- Cada select estará desacivado hasta que se seleccione el anterior, y el primero se activará al seleccionar un día en el calendario. El botón sólo estará activado al haber seleccionado una opción válida en cada uno de los select.
