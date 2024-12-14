describe( 'Swag Labs Saucedemo Test', ()=> {
    it ('Should log in successfully with Standard_user valid credentials', () => {
        // Visitar la URL
        cy.visit('https://www.saucedemo.com/');
    
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Verificar que se ha iniciado sesión correctamente
        cy.wait(2000);
        cy.url().should('include', '/inventory');

      });
      
      it('Should add products to the cart', () => {
        // Visitar la URL e iniciar sesión
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Verificar que se ha iniciado sesión correctamente
        cy.url().should('include', '/inventory');
    
        // Agregar productos al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
        // Verificar que los productos se agregaron correctamente
        cy.get('.shopping_cart_badge').should('have.text', '2');
      });

      it('Completa checkout and logout with standard_user', () => {
        // Iniciar sesión con standard_user
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Agregar productos al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
        // Ir al carrito y proceder al checkout
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
    
        // Completar la información del checkout
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
    
        // Finalizar el checkout
        cy.get('[data-test="finish"]').click();
    
        // Verificar que el checkout se haya completado
        cy.contains('Gracias por su visita').should('be.visible');
    
        // Logout
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    
        // Verificar que el usuario fue deslogueado
        cy.url().should('include', '/');
      });

      it('Should complete checkout and logout with problem_user', () => {
        // Iniciar sesión con problem_user
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('problem_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Agregar productos al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
        // Ir al carrito y proceder al checkout
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
    
        // Completar la información del checkout
        cy.get('[data-test="firstName"]').type('Jane');
        cy.get('[data-test="lastName"]').type('Smith');
        cy.get('[data-test="postalCode"]').type('54321');
        cy.get('[data-test="continue"]').click();
    
        // Finalizar el checkout
        cy.get('[data-test="finish"]').click();
    
        // Verificar que el checkout se haya completado
        cy.contains('Gracias por su compra').should('be.visible');
    
        // Logout
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    
        // Verificar que el usuario fue deslogueado
        cy.url().should('include', '/');
      });
   });
   

