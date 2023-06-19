/// <reference types="cypress" />

describe('share location', () => {
	beforeEach(() => {
		cy.visit('/').then((win) => {
			cy.stub(win.navigator.geolocation, 'getCurrentPosition')
				.as('getUserPosition')
				.callsFake((cb) => {
					setTimeout(() => {
						cb({ coords: { latitude: 37.33, longitude: 65.33 } });
					}, 100);
				});
		});
	});
	it('should fetch the user location', () => {
		cy.get('[data-cy="get-loc-btn"]').click();
		cy.get('@getUserPosition').should('have.been.called');
		cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
		cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
	});

	it('should share a location URL', () => {
		cy.get('[data-cy="name-input"]').type('Jon Zherka');
		cy.get('[data-cy="get-loc-btn"]').click();
	});
});
