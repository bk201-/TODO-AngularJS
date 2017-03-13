'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {
    it('should automatically redirect to /TODO when location hash/fragment is empty', function () {
        browser.get('index.html');
        expect(browser.getCurrentUrl()).toMatch("/TODO");
    });

    describe('TODO', function () {
        beforeEach(function () {
            browser.get('index.html#!/TODO');
        });

        it('should render TODO when user navigates to /TODO', function () {
            expect(element.all(by.css('[ng-view] .todo-title')).getText()).toMatch(/Tasks And Reminder/);
        });
    });
});
