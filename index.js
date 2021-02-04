const addToPanier=document.getElementsByClassName('ajouterPanier');
const button=document.querySelector('.button');

let items=[];


for (let i = 0; i < addToPanier.length; i++) {
    addToPanier[i].addEventListener('click',function(e){
        const name =e.target.parentElement.children[1].textContent;
        const prix=e.target.parentElement.children[3].textContent;
        const description=e.target.parentElement.children[2].textContent;
        const qtee=e.target.parentElement.children[5].value;
        const qte=new Number(qtee)
   

        if(typeof(Storage) !="undefined"){
            let item={
                id:i+1,
                name:name,
                prix:prix,
                description:description,
                qte:qte
            }
          if(JSON.parse(localStorage.getItem('items'))===null){
             items.push(item);
            localStorage.setItem('items',JSON.stringify(items));
            window.location.reload();
          }else{
               const localitems = JSON.parse(localStorage.getItem('items'))
               localitems.map(data => {
            if (item.id==data.id) {
                const number=new Number(data.qte)
                console.log(number)
                console.log(typeof(number))
                item.qte += +number
                window.location.reload();
            } else {
              items.push(data)  
            }
              });
              items.push(item);
              localStorage.setItem('items',JSON.stringify(items));
              window.location.reload();

          }
        }else{
            console.log('le storage ne marche pas sur votre browser !!!')
        }        

    })
    
}

//panier
const panier=document.querySelector('.panier');
if(JSON.parse(localStorage.getItem('items'))==null){
    panier.innerHTML="<h1 style='text-align:center;color:green;'> il n'y'a pas de produit dans le panier</h1>"
}else{
    JSON.parse(localStorage.getItem('items')).map(data=>{
        panier.innerHTML +=`<tr><th>${data.id}</th>  <td>${data.name}</td>  <td>${data.description}</td>  <td> <a href='#' class='plus'><strong style='color:red'> + </strong></a>    ${data.qte} <a href='#' class='moin'><strong style='color:red'> - </strong></a> </td>  <td>${data.prix}</td> <td><a href='#' onclick=supprimer(this)><strong style='background-color:red'> Delete </strong> </a></td></tr></br><hr>`
    })
    button.innerHTML="<a href='#' style='background-color:green' onclick=deletePanier(this)>supprimer mon panier</a>"

}








//modifier le panier +
const buttonPlus=document.getElementsByClassName('plus');
const buttonMoin=document.getElementsByClassName('moin');
// let items=[];

for (let index = 0; index < buttonPlus.length; index++) {
  
    buttonPlus[index].addEventListener('click',function(e){
        JSON.parse(localStorage.getItem('items')).map(data=>{
            data.qte +=1
            items.push(data)
            localStorage.setItem('items',JSON.stringify(items));
            window.location.reload();
        })
     

    //    const elementSelectionner=JSON.parse(localStorage.getItem('items'))[index]
    //    elementSelectionner.qte +=1
    //    items.push(elementSelectionner);
    //    localStorage.setItem('items',JSON.stringify(items));
    //    window.location.reload()
        
})

}

//modifier le panier -

for (let index = 0; index < buttonMoin.length; index++) {
    buttonMoin[index].addEventListener('click',function(e){
        
    })
    
}

// buttonMoin.addEventListener('click',function(e){
//     alert('cool 2');
// })

// function plus(e){
//     JSON.parse(localStorage.getItem('items')).map(data=>{
//         for (let i = 0; i < data.length; i++) {
//         console.log("voila la data selectionner",data[i].qte);
            
//         }
//       //  console.log("voila la contite de la data selectionne",data.qte + "==>" +data.name);
//     //    data.qte +=1
//     //    items.push(data)
//     //    localStorage.setItem('items',JSON.stringify(items))
//     //   window.location.reload();
//     })
// }

// //modifier le panier -
// function moin(e){
//     JSON.parse(localStorage.getItem('items')).map(data=>{
//         data.qte -=1
//         items.push(data)
//         localStorage.setItem('items',JSON.stringify(items))
//         if(data.qte==0){
            
//              localStorage.removeItem('data')
//         localStorage.setItem('items',JSON.stringify(items))
 
//              window.location.reload();
//         }
//        window.location.reload();
//      })   


// }

//supprimer un item du panier
function supprimer(e){
// console.log(items)
    let elements=JSON.parse(localStorage.getItem('items')) 
    for (let index = 1; index < elements.length; index++) {
        items.splice(index,1)
        localStorage.setItem('items',JSON.stringify(items))
        window.location.reload();
    }
}




//supprimer le panier
function deletePanier(e){
    localStorage.clear();
    window.location.reload();
}

