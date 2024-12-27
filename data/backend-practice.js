const xhr = new XMLHttpRequest();

//  event listener goes ahead of the request so 
//  the event listener is active before we make the call
xhr.addEventListener('load', ()=> {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send(); //  asynchronous code - does not wait until the response is received
