document.addEventListener("submit", (e) => {
  e.preventDefault();
});
async function deleteProd(url) {
  console.log('eliminado')
    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    })
    return response.json()
    
}
