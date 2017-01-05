"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('nativescript-angular/router');
var page_1 = require('ui/page');
var platform_1 = require('platform');
var action_bar_1 = require('ui/action-bar');
var angular_1 = require('nativescript-telerik-ui/sidedrawer/angular');
var sidedrawer_1 = require('nativescript-telerik-ui/sidedrawer');
var SideDrawerPageComponent = (function () {
    function SideDrawerPageComponent(routerExtensions, activatedRoute, page, ngZone) {
        this.routerExtensions = routerExtensions;
        this.activatedRoute = activatedRoute;
        this.page = page;
        this.ngZone = ngZone;
        /**
         * On tap of any side-drawer item, hiding content if this flag is true.
         */
        this.isContentVisible = true;
        this.isTopVisible = true;
        /**
         * Navigation Menu Items
         */
        this.navMenu = [
            { name: 'Dashboard', commands: ['/home'] },
            { name: 'Manage Leads', commands: ['/about'] },
            { name: 'Manage Cases', commands: ['/contact'] },
            { name: 'Incomplete Cases', commands: ['/contact'] },
            { name: 'My Document', commands: ['/document'] },
            { name: 'Logout', commands: ['/logout'] },
            { name: 'Dashboard', commands: ['/home'] },
            { name: 'Manage Leads', commands: ['/about'] },
            { name: 'Manage Cases', commands: ['/contact'] },
            { name: 'Incomplete Cases', commands: ['/contact'] },
            { name: 'My Document', commands: ['/document'] },
            { name: 'Logout', commands: ['/logout'] },
            { name: 'Dashboard', commands: ['/home'] },
            { name: 'Manage Leads', commands: ['/about'] },
            { name: 'Manage Cases', commands: ['/contact'] },
            { name: 'Incomplete Cases', commands: ['/contact'] },
            { name: 'My Document', commands: ['/document'] },
            { name: 'Logout', commands: ['/logout'] }
        ];
        this.setActionBarIcon(this.page);
        this.setDrawerTransition();
    }
    SideDrawerPageComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
    };
    SideDrawerPageComponent.prototype.ngOnDestroy = function () {
        this.drawer.off('drawerClosed');
    };
    SideDrawerPageComponent.prototype.toggleSideDrawer = function () {
        this.drawer.toggleDrawerState();
    };
    /**
     * Navigates to next page after drawer is closed.
     */
    SideDrawerPageComponent.prototype.navigateTo = function (routeCommands) {
        var _this = this;
        this.drawer.closeDrawer();
        var currentUrl = this.routerExtensions.router.routerState.snapshot.url;
        var newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands);
        var newUrl = this.routerExtensions.router.serializeUrl(newUrlTree);
        if (currentUrl !== newUrl) {
            this.isContentVisible = false;
            this.drawer.on('drawerClosed', function () {
                _this.ngZone.run(function () {
                    _this.routerExtensions.navigate(routeCommands, {
                        clearHistory: true,
                        animated: false
                    });
                    _this.isContentVisible = true;
                });
            });
        }
    };
    SideDrawerPageComponent.prototype.setDrawerTransition = function () {
        if (platform_1.isAndroid) {
            this.drawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        }
        if (platform_1.isIOS) {
            this.drawerTransition = new sidedrawer_1.PushTransition();
        }
    };
    SideDrawerPageComponent.prototype.setActionBarIcon = function (page) {
        if (platform_1.isAndroid) {
            page.actionBar.navigationButton = this.getNavigationButton();
        }
        if (platform_1.isIOS) {
            page.actionBar.actionItems.addItem(this.getNavigationButton());
        }
    };
    SideDrawerPageComponent.prototype.getNavigationButton = function () {
        var navActionItem = new action_bar_1.ActionItem();
        navActionItem.icon = 'res://ic_menu_black';
        if (navActionItem.ios) {
            navActionItem.ios.position = 'left';
        }
        navActionItem.on('tap', this.toggleDrawer.bind(this));
        return navActionItem;
    };
    SideDrawerPageComponent.prototype.toggleDrawer = function () {
        this.drawer.toggleDrawerState();
    };
    SideDrawerPageComponent.prototype.navigateToDashboard = function () {
        this.routerExtensions.navigate(["home"], {
            clearHistory: true,
            animated: false
        });
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], SideDrawerPageComponent.prototype, "drawerComponent", void 0);
    SideDrawerPageComponent = __decorate([
        core_1.Component({
            selector: 'side-drawer-page',
            templateUrl: 'modules/shared/side-drawer-page/side-drawer-page.component.html',
            styleUrls: ['modules/shared/side-drawer-page/side-drawer-page.component.css']
        }), 
        __metadata('design:paramtypes', [router_2.RouterExtensions, router_1.ActivatedRoute, page_1.Page, core_1.NgZone])
    ], SideDrawerPageComponent);
    return SideDrawerPageComponent;
}());
exports.SideDrawerPageComponent = SideDrawerPageComponent;
//# sourceMappingURL=side-drawer-page.component.js.map