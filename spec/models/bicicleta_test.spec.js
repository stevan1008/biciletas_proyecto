var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www'); //Para Mongoose


describe('Testing Bicicletas', function() {

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
        
    });

    describe('Bicicleta.createInstance',() => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    expect(bicis[0].color).toEqual(aBici.color);
                    expect(bicis[0].modelo).toEqual(aBici.modelo);
                    expect(bicis[0].ubicacion[0]).toEqual(aBici.ubicacion[0]);
                    expect(bicis[0].ubicacion[1]).toEqual(aBici.ubicacion[1]);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);


                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    Bicicleta.add(aBici, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toEqual(aBici.color);
                            expect(targetBici.modelo).toEqual(aBici.modelo);
                            expect(targetBici.ubicacion[0]).toEqual(aBici.ubicacion[0]);
                            expect(targetBici.ubicacion[1]).toEqual(aBici.ubicacion[1]);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe borrar la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    Bicicleta.add(aBici, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.allBicis(function(err, bicis){
                            expect(bicis.length).toBe(1);
                            Bicicleta.removeByCode(1, function(error, response) {
                                Bicicleta.allBicis(function(err, bicis){
                                    expect(bicis.length).toBe(0);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});