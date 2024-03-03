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
    }).then((response) => {
      const productID = response.body.product.id;
      const product_Id = response.body.product._id;
      window.localStorage.setItem('productID', productID);
      window.localStorage.setItem('product_ID', product_Id);
      Cypress.env().productId = productID;
      Cypress.env().product_Id = product_Id;
      cy.log(`Created product with ID: ${productID}`);
      cy.log(`Created product with ID: ${product_Id}`);
      return cy.wrap(productID);
    });
  });
  
  Cypress.Commands.add('editProduct', (name, img, price) => {
    const product_Id = Cypress.env().product_Id;
  
    cy.request({
      url: `${Cypress.env().baseUrlApi}product/${product_Id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cypress.env().token}`,
      },
      body: {
        name: name,
        img: img,
        price: price,
      },
    }).then((response) => {
      const productName = response.body.product.name;
      const productPrice = response.body.product.price;
      const productImg = response.body.product.img;
      const productID = response.body.product.id;
      const product_Id = response.body.product._id;
      
  
      Cypress.env('product_Id', product_Id);
      Cypress.env('editedProductName', productName);
      Cypress.env('editedProductPrice', productPrice);
      Cypress.env('editedProductImg', productImg);
      Cypress.env('productID', productID);
       
      expect(response.status).to.eq(202);
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
  
  Cypress.Commands.add('deleteProduct', () => {
    
    const productId = Cypress.env('productID');
  
    if (!productId) {
      cy.log("Product ID not found in the environment variable");
      return;
    }
  
    cy.request({
      url: `${Cypress.env().baseUrlApi}product/${productId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cypress.env().token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(202);
      cy.log("Product deleted successfully");  
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
  