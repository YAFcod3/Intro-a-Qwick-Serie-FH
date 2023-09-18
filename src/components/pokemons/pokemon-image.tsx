import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
  isPokemonVisible?:boolean
}

export const PokemonImage = component$( ({ id, size = 96, backImage = false ,isPokemonVisible=true}: Props) => {



    const imageLoaded = useSignal(false);
    //funcion para disparar efectos secundarios
    useTask$(({ track }) => {
      track(() => id); //dispara este efecto cada vez q el id cambia
      imageLoaded.value = false;
    });

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
      imageUrl = ` https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back//${id}.png`;
    }





    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          // style={{ width: `${size}px`, height: `${size}px` }}
        class={[{
            'hidden': !imageLoaded.value ,
              'brightness-0':!isPokemonVisible
          },'transition-all'] }
          width="96 "
          height="96"
          src={imageUrl}
          alt="Poke Sprite"
          onLoad$={() => {
            // setTimeout(() => {
              imageLoaded.value = true;
            // }, 2000);
          }}
        />
      </div>
    );
  }
);
