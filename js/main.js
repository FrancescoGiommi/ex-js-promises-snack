//! Snack 1
// Ottieni il titolo di un post con una Promise.

/*Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.*/

function getPostTitle(id) {
  const titlePost = new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => resolve(post.title))
      .catch(reject);
  });

  return titlePost;
}

getPostTitle(1)
  .then((title) => console.log(`Il titolo del post è ${title}`))
  .catch((error) => console.error(error));

//! Bonus
function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then((res) => res.json())
          .then((user) => resolve({ ...post, user }))
          .catch(reject);
      });
  });
}

getPost(1)
  .then((post) => console.log("Post completo", post))
  .catch((error) => console.error(error));

//! Snack 2
/* Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. 

Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

Bonus: HOF con closure per memorizzare l'ultimo lancio

Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!". */

function creaLanciaDado() {
  const numeroDado = new Promise((resolve, reject) => {
    setTimeout(() => {
      const probablyFail = Math.random();

      if (probablyFail < 0.2) {
        reject(console.log("Il dado si è incastrato"));
      } else {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        resolve(console.log(`è uscito il numero ${randomNumber}`));
      }
    }, 3000);
  });
  return function () {
    const result1 = numeroDado;
    const result2 = numeroDado;
    if (result1 === result2) {
      console.log("Incredibile!");
    }
  };
}

creaLanciaDado();
// .then((result) => console.log(result))
// .catch((error) => console.error(error));
