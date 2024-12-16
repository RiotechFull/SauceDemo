describe( 'Swag Labs Saucedemo Test', {testIsolation :false }, ()=> {
  
  beforeEach ('should visit the page', () => {
   //  cy.clearCookies();   no es util por el momento ya que blanquea los siguientes it 
    //cy.log('Puchuflito')
});

  it ('Login correcto con credencialesválidas de Standard_user', () => {
    // Visitar la URL
    const user = 'standard_user';
    const password = 'secret_sauce';
    cy.login(user, password);

    cy.wait(2000)

    // Verificar que se ha iniciado sesión correctamente
    cy.wait(2000);
    cy.url().should('include', '/inventory');

  });
  
  it('Agregar productos al carrito', () => {
    // Agregar productos al carrito
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verificar que los productos se agregaron correctamente
    cy.get('.shopping_cart_badge').should('have.text', '2');

    cy.wait(2000); 
  });

  it('Completa checkout and logout with standard_user', () => {
   
    // Ir al carrito y proceder al checkout
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    // Completar la información del checkout
    cy.get('[data-test="firstName"]').type('Viviana');
    cy.get('[data-test="lastName"]').type('Guillen');
    cy.get('[data-test="postalCode"]').type('5850');
    cy.get('[data-test="continue"]').click();

    // Finalizar el checkout
    cy.get('[data-test="finish"]').click();

    // Verificar que el checkout se haya completado
    cy.contains('Thank you for your order!').should('be.visible');

    // Logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Verificar que el usuario fue deslogueado
    cy.url().should('include', '/');
  });

  // with problem_user
  it('Should complete checkout and logout with problem_user', () => {
  //it.only('Should complete checkout and logout with problem_user', () => {
    // Iniciar sesión con problem_user
    const user = 'problem_user';
    const password = 'secret_sauce';
    cy.login(user, password);
    cy.wait(2000)


    // Agregar productos al carrito
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Ir al carrito y proceder al checkout
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Completar la información del checkout
    cy.get('[data-test="firstName"]').type('Viviana');
    cy.get('[data-test="lastName"]').type('Guillen');
    cy.get('[data-test="postalCode"]').type('5850');
    cy.get('[data-test="continue"]').click();

    // Finalizar el checkout
    cy.get('[data-test="finish"]').click();

    // Verificar que el checkout se haya completado
    cy.contains('Thank you for your order!').should('be.visible');

    // Logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Verificar que el usuario fue deslogueado
    cy.url().should('include', '/');
  });
});