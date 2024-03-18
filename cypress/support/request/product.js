Cypress.Commands.add('productPage',()=>{
    cy.request({
      url:`${Cypress.env().productPage }` ,
      method:'GET',
      headers: {
        Authorization: `Bearer ${Cypress.env().token}`
      } 
    }).then(response=>{
      expect(response.status).to.eq(200)
    })
   })
   Cypress.Commands.add('addProduct', (name, img, id, price) => {
    cy.request({
      url: `${Cypress.env().baseUrlApi}/create-product`,
      method: 'POST',
      headers: {
        token: Cypress.env().token,
      },
      body: {
        name: name,
        img: img,
        id: id,
        price: price,
      },
    })
    
  });
  
  Cypress.Commands.add('editProduct', (name, img, price) => {
    cy.addProduct('Nombre', 'Imagen', 'ID', 'Precio') // Ejemplo de llamada a addProduct con valores.
      .then(product_Id => {
        cy.request({
          url: `${Cypress.env().baseUrlApi}/product/${product_Id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
          },
          body: {
            name: name,
            img: img,
            price: price,
          },
        })
       
      });
  });
  
  
  
   Cypress.Commands.add('getProduct', (productId) => {
  
    Cypress.env('currentProductId', productId);
    
    cy.request({
      url: `https://pushing-it.onrender.com/api/products?id=${productId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cypress.env().token}`
      }
    }).then((response) => {
      const responseBody = response.body;    
      if (responseBody.products.docs.length === 0) {
        cy.log("The product has not been found");
      }
      else{
        const getProductID = responseBody.products.docs[0]._id
        Cypress.env('productID', getProductID)
        cy.log('The product has been found')
      }
  
    });
  });

  Cypress.Commands.add('deleteProduct', (id) => {
    cy.request({
        method: "GET",
        url: `https://pushing-it.onrender.com/api/products?id=${id}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `https://pushing-it.onrender.com/api/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        }).then(()=>{
          cy.log('The existing product had been deleted')
        })
    });

});
  
  
  
    Cypress.Commands.add('getProductById', (productID)=>{
      cy.request({
        url: `https://pushing-it.onrender.com/api/products?id=${productID}`,
        method: 'GET',
        failsOnStatus:false,
        headers: {
          Authorization: `Bearer ${Cypress.env().token}`
        }
    
      }).then(product=>{
        const productName =  product.body.products.docs[0].name
        const productPrice =  product.body.products.docs[0].price
        Cypress.env('productName', productName)
        Cypress.env('productPrice', productPrice)
       
       })
  
    })

    Cypress.Commands.add('GetProductByName', (productName) => {
      cy.request({
          method: "GET",
          url: `https://pushing-it.onrender.com/api//products?name=${productName}`,
          failsOnStatusCode: false,
          headers: {
              Authorization: `Bearer ${Cypress.env().token}`
          }
      })
  })

  Cypress.Commands.add('GetProductByID', (id) => {
    cy.request({
        method: "GET",
        url: `https://pushing-it.onrender.com/api/products?name=${id}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    })
})

    
  