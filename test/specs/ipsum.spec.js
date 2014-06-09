describe("ipsum service", function() {
    var service;

    beforeEach(function() {
        module("ipsum");
        inject(function(ipsumService) {
            service = ipsumService;
        });
    })

    it("should return a number of words", function() {
        var actual = service.words(5);
        expect(actual.split(" ").length).toBe(5);
    });

    it("should return sentences", function() {
        var actual = service.sentences(5);
        expect(actual.length > 1).toBe(true);
    });

    it("should return paragraphs", function() {
        var actual = service.paragraphs(5);
        expect(actual.length > 1).toBe(true);
    });

    it("should capitalize the first letter of sentences", function() {
        var sentence = service.sentences(1);
        expect(sentence.substring(0,1).toUpperCase()).toBe(sentence.substring(0,1));
    });

    it("should end sentences with a period", function() {
        var sentence = service.sentences(1);
        expect(sentence.slice(-1)).toBe(".");
    });

    it("should give a random full name string", function() {
        var name = service.randomName();
        expect(name.full.split(" ").length).toBe(3);
    });

    it("should give a random name object", function() {
        var name = service.randomName();
        expect(name.first).toBeDefined();
        expect(name.last).toBeDefined();
        expect(name.mi).toBeDefined();
    });

    it("should give a random female name", function() {
        var name = service.randomName('f');
        expect(name.full.split(" ").length).toBe(3);
    });

    it("should give a random male name", function() {
        var name = service.randomName('m');
        expect(name.full.split(" ").length).toBe(3);
    });

    it("should return an item from a list", function() {
        var list = ['a'];
        var item = service.randomItem(list);
        expect(item).toBe('a');
    })

});

describe("ipsum name directive", function() {
    var elem
        ,scope
        ,compiled
        ,service;

    beforeEach(function() {
        module("ipsum");
    
        inject(function($rootScope, $compile, ipsumService) {
            compile = $compile;
            scope = $rootScope;
            service = ipsumService;
        });

        spyOn(service, 'randomMale').andCallFake(function() {
            return 'John';
        });

        spyOn(service, 'randomFemale').andCallFake(function() {
            return 'Jane';
        });

        spyOn(service, 'randomMi').andCallFake(function() {
            return 'X';
        })

        spyOn(service, 'randomLast').andCallFake(function() {
            return 'Doe';
        })

        service.femaleFirstNames = ['Jane'];
    });

    var compileAndDigest = function(html) {
        elem = angular.element(html);
        compiled = compile(elem);
        compiled(scope);
        scope.$digest();
    };

    it("should output a male first name", function() {
        compileAndDigest("<div ipsum-name='mf'></div>");
        expect(elem.text()).toBe('John');
    });

    it("should output a male first name and mi", function() {
        compileAndDigest("<div ipsum-name='mfm'></div>");
        expect(elem.text()).toBe('John X');
    });

    it("should output a male first name mi last", function() {
        compileAndDigest("<div ipsum-name='mfml'></div>");
        expect(elem.text()).toBe('John X Doe');
    });

    it("should output a female first name", function() {
        compileAndDigest("<div ipsum-name='ff'></div>");
        expect(elem.text()).toBe('Jane');
    });

    it("should output a last name", function() {
        compileAndDigest("<div ipsum-name='fl'></div>");
        expect(elem.text()).toBe('Doe');
    });    

    it("should output a MI", function() {
        compileAndDigest("<div ipsum-name='fm'></div>");
        expect(elem.text()).toBe('X');
    });    

    it("should respect the format order", function() {
        compileAndDigest("<div ipsum-name='mlmf'></div>");
        expect(elem.text()).toBe('Doe X John');
    })

});

describe("ipsum directive", function() {
    var elem
        ,scope
        ,compiled;

    beforeEach(function() {
        module("ipsum");
    
        inject(function($rootScope, $compile) {
            compile = $compile;
            scope = $rootScope;
        });

    });

    var compileAndDigest = function(html) {
        elem = angular.element(html);
        compiled = compile(elem);
        compiled(scope);
        scope.$digest();
    };

    it("should give N words for Nw", function() {
        compileAndDigest("<div ipsum='5w'></div>");
        expect(elem.text().split(" ").length).toBe(5);
    });

    it("should give N sentences for Ns", function() {
        compileAndDigest("<div ipsum='5s'></div>");
        expect(elem.text().match(/\./g).length).toBe(5);
    });

    it("should give N paragraphs for Np", function() {
        compileAndDigest("<div ipsum='5p'></div>");
        expect(elem.html().match(/<\/p>/g).length).toBe(5);
    });

    it("should combine options", function() {
        compileAndDigest("<div ipsum='5w10p'></div>");
        expect(elem.text().split(" ").length > 5).toBeTruthy();
        expect(elem.html().match(/<\/p>/g).length).toBe(10);
    });
});