'use strict';

describe('authFact service', function () {
    describe('AuthFact should not be null', function () {
        beforeEach(module('343LandingPageApp'));
        it('returns 1', inject(function (authFact) { //parameter name = service name

            expect(authFact).not.toBeNull();

        }));
    });
});