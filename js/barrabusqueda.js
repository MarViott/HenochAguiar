mocha.setup('bdd');
const expect = chai.expect;

describe('Search Container', function() {
    it('should have a div with class "search-container"', function() {
        const container = document.querySelector('.search-container');
        expect(container).to.exist;
    });

    it('should contain an input with id "search-input" and placeholder "Buscar..."', function() {
        const input = document.getElementById('search-input');
        expect(input).to.exist;
        expect(input.type).to.equal('text');
        expect(input.placeholder).to.equal('Buscar...');
    });

    it('should contain a button with id "search-button" and title "Buscar"', function() {
        const button = document.getElementById('search-button');
        expect(button).to.exist;
        expect(button.title).to.equal('Buscar');
    });

    it('should contain an <i> element with class "fas fa-search" inside the button', function() {
        const button = document.getElementById('search-button');
        const icon = button.querySelector('i.fas.fa-search');
        expect(icon).to.exist;
    });
});

mocha.run();