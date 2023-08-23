import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const  showBackImage=useSignal(false)
  const pokemonId = useSignal(1); //state tipo signals para primitivos /number/string/boolean..
  // const pokemon2=useStore()   //state para compuestos / array ,object ...




  //funcion serializada
  const changePokemon =$((value:number)=>{

    if (pokemonId.value + value <= 0)  return

    // pokemonId.value = pokemonId.value + value
    pokemonId.value += value

  })




  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <PokemonImage id={pokemonId.value} size={100} backImage={showBackImage.value}/>

      <div class="mt-2">
        <button class="btn btn-primary" onClick$={()=>changePokemon(-1)}>
          Anterior
        </button>
        <button class="btn btn-primary" onClick$={() => changePokemon(+1)}>
          Siguiente
        </button>
        <button class="btn btn-primary" onClick$={() =>showBackImage.value= !showBackImage.value}>
          Voltear
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "Mi App Poke Qwick",
    },
  ],
};
