import HomePage from '../pages/home.vue'
import AboutPage from '../pages/about.vue'
import NotFoundPage from '../pages/not-found.vue'

import UserProfilePage from '../pages/profile.vue'

import SitemapViewPage from '../pages/page/sitemap-view.vue'
import PageViewPage from '../pages/page/page-view.vue'

import SettingsMenuPage from '../pages/settings/settings-menu.vue'
import ServiceSettingsPage from '../pages/settings/services/service-settings.vue'
import AddonsListPage from '../pages/settings/addons/addons-list.vue'
import AddonsAddPage from '../pages/settings/addons/addons-add.vue'
import AddonsConfigureBindingPage from '../pages/settings/addons/binding-config.vue'

import ItemsListPage from '../pages/settings/items/items-list-vlist.vue'
import ItemDetailsPage from '../pages/settings/items/item-details.vue'
import ItemEditPage from '../pages/settings/items/item-edit.vue'
import ItemsAddFromTextualDefinition from '../pages/settings/items/parser/items-add-from-textual-definition.vue'

import ThingsListPage from '../pages/settings/things/things-list.vue'
import ThingDetailsPage from '../pages/settings/things/thing-details.vue'
import AddThingChooseBindingPage from '../pages/settings/things/add/choose-binding.vue'
import AddThingChooseThingTypePage from '../pages/settings/things/add/choose-thing-type.vue'
import AddThingPage from '../pages/settings/things/add/thing-add.vue'

import InboxListPage from '../pages/settings/things/inbox/inbox-list.vue'

import SemanticModelPage from '../pages/settings/model/model.vue'

import RulesListPage from '../pages/settings/rules/rules-list.vue'

import PagesListPage from '../pages/settings/pages/pages-list.vue'

// import SchedulePage from '../pages/settings/schedule/schedule.vue'

import Analyzer from '../pages/analyzer/analyzer.vue'

import DeveloperToolsPage from '../pages/developer/developer-tools.vue'
import WidgetsListPage from '../pages/developer/widgets/widget-list.vue'
import ApiExplorerPage from '../pages/developer/api-explorer.vue'

export default [
  {
    path: '/',
    component: HomePage,
    // keepAlive: true,
    options: {
      // animate: false
      transition: 'f7-dive'
    }
  },
  {
    path: '/page/:uid',
    component: PageViewPage
  },
  {
    path: '/sitemap/:sitemapId/:pageId',
    component: SitemapViewPage
  },
  {
    path: '/about/',
    component: AboutPage,
    options: {
      animate: false
    }
  },
  {
    path: '/setup-wizard/',
    async (routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const widgetEditComponent = () => import(/* webpackChunkName: "setup-wizard" */ '../pages/wizards/setup-wizard.vue')
      // resolve promise
      widgetEditComponent().then((vc) => {
        // resolve with component
        resolve({
          component: vc.default
        },
        (routeTo.params.uid === 'add') ? {
          props: {
            createMode: true
          }
        } : {})
      })
    }
  },
  {
    path: '/profile/',
    component: UserProfilePage,
    options: {
      animate: false
    }
  },
  {
    path: '/settings/',
    component: SettingsMenuPage,
    keepAlive: true,
    routes: [
      {
        path: 'items',
        component: ItemsListPage,
        routes: [
          {
            path: 'add',
            component: ItemEditPage,
            options: {
              props: {
                createMode: true
              }
            }
          },
          {
            path: 'add-from-textual-definition',
            component: ItemsAddFromTextualDefinition
          },
          {
            path: ':itemName',
            component: ItemDetailsPage,
            routes: [
              {
                path: 'edit',
                component: ItemEditPage
              },
              {
                path: 'metadata/:namespace',
                async (routeTo, routeFrom, resolve, reject) {
                  // dynamic import component; returns promise
                  const editorComponent = () => import(/* webpackChunkName: "metadata-edit" */ `../pages/settings/items/metadata/item-metadata-edit.vue`)
                  // resolve promise
                  editorComponent().then((vc) => {
                    // resolve with component
                    resolve({
                      component: vc.default
                    })
                  })
                }
              }
            ]
          }
        ]
      },
      {
        path: 'pages',
        component: PagesListPage,
        routes: [
          {
            path: ':type/:uid',
            async (routeTo, routeFrom, resolve, reject) {
              // dynamic import component; returns promise
              const editorComponent = () => import(/* webpackChunkName: "[request]" */ `../pages/settings/pages/${routeTo.params.type}/${routeTo.params.type}-edit.vue`)
              // resolve promise
              editorComponent().then((vc) => {
                // resolve with component
                resolve({
                  component: vc.default
                },
                (routeTo.params.uid === 'add') ? {
                  props: {
                    createMode: true
                  }
                } : {})
              })
            }
          }
        ]
      },
      {
        path: 'things/',
        component: ThingsListPage,
        routes: [
          {
            path: 'add',
            component: AddThingChooseBindingPage,
            routes: [
              {
                path: 'install-binding',
                component: AddonsAddPage,
                options: {
                  props: {
                    addonType: 'binding'
                  }
                }
              },
              {
                path: ':bindingId',
                component: AddThingChooseThingTypePage,
                routes: [
                  {
                    path: ':thingTypeId',
                    component: AddThingPage
                  }
                ]
              }
            ]
          },
          {
            path: 'inbox',
            component: InboxListPage
          },
          {
            path: ':thingId',
            component: ThingDetailsPage
          }
        ]
      },
      {
        path: 'model',
        component: SemanticModelPage
        // keepAlive: true
        // routes: [
        //   {
        //     path: ':itemName',
        //     component: ItemDetailsPage,
        //     routes: [
        //       {
        //         path: 'edit',
        //         component: ItemEditPage
        //       }
        //     ]
        //   }
        // ]
      },
      {
        path: 'rules/',
        component: RulesListPage,
        routes: [
          {
            path: ':ruleId',
            async (routeTo, routeFrom, resolve, reject) {
              // dynamic import component; returns promise
              const ruleEditComponent = () => import(/* webpackChunkName: "rule-edit" */ '../pages/settings/rules/rule-edit.vue')
              // resolve promise
              ruleEditComponent().then((vc) => {
                // resolve with component
                resolve({
                  component: vc.default
                },
                (routeTo.params.ruleId === 'add') ? {
                  props: {
                    createMode: true
                  }
                } : {})
              })
            },
            routes: [
              {
                path: 'script/:moduleId',
                async (routeTo, routeFrom, resolve, reject) {
                  // dynamic import component; returns promise
                  const ruleEditComponent = () => import(/* webpackChunkName: "rule-script-edit" */ '../pages/settings/rules/script/script-edit.vue')
                  // resolve promise
                  ruleEditComponent().then((vc) => {
                    // resolve with component
                    resolve({
                      component: vc.default
                    },
                    (routeTo.params.ruleId === 'add') ? {
                      props: {
                        createMode: true
                      }
                    } : {})
                  })
                }
              }
            ]
          }
        ]
      },
      {
        path: 'scripts/',
        component: RulesListPage,
        options: {
          props: {
            showScripts: true
          }
        },
        routes: [
          {
            path: ':ruleId',
            async (routeTo, routeFrom, resolve, reject) {
              // dynamic import component; returns promise
              const ruleEditComponent = () => import(/* webpackChunkName: "script-edit" */ '../pages/settings/rules/script/script-edit.vue')
              // resolve promise
              ruleEditComponent().then((vc) => {
                // resolve with component
                resolve({
                  component: vc.default
                },
                (routeTo.params.ruleId === 'add') ? {
                  props: {
                    createMode: true
                  }
                } : {})
              })
            }
          }
        ]
      },
      {
        path: 'schedule/',
        async (routeTo, routeFrom, resolve, reject) {
          // dynamic import component; returns promise
          const scheduleComponent = () => import(/* webpackChunkName: "schedule" */ '../pages/settings/schedule/schedule.vue')
          // resolve promise
          scheduleComponent().then((vc) => {
            // resolve with component
            resolve({
              component: vc.default
            })
          })
        },
        routes: [
          {
            path: 'add',
            async (routeTo, routeFrom, resolve, reject) {
              // dynamic import component; returns promise
              const ruleEditComponent = () => import(/* webpackChunkName: "rule-edit" */ '../pages/settings/rules/rule-edit.vue')
              // resolve promise
              ruleEditComponent().then((vc) => {
                // resolve with component
                resolve({
                  component: vc.default
                }, {
                  props: {
                    createMode: true,
                    schedule: true
                  }
                })
              })
            }
          }
        ]
      },
      // {
      //   path: 'inbox/',
      //   component: InboxListPage
      // },
      {
        path: 'addons/:addonType',
        component: AddonsListPage,
        routes: [
          {
            path: 'add',
            component: AddonsAddPage
          },
          {
            path: ':bindingId/config',
            component: AddonsConfigureBindingPage
          }
        ]
      },
      {
        path: 'services/:serviceId',
        component: ServiceSettingsPage
      }
    ]
  },
  {
    path: '/developer/',
    component: DeveloperToolsPage,
    options: {
      animate: false
    },
    routes: [
      {
        path: 'widgets/',
        component: WidgetsListPage,
        routes: [
          {
            path: ':uid',
            async (routeTo, routeFrom, resolve, reject) {
              // dynamic import component; returns promise
              const widgetEditComponent = () => import(/* webpackChunkName: "widget-edit" */ '../pages/developer/widgets/widget-edit.vue')
              // resolve promise
              widgetEditComponent().then((vc) => {
                // resolve with component
                resolve({
                  component: vc.default
                },
                (routeTo.params.uid === 'add') ? {
                  props: {
                    createMode: true
                  }
                } : {})
              })
            }
          }
        ]
      },
      {
        path: 'add-items-dsl',
        component: ItemsAddFromTextualDefinition
      },
      {
        path: 'api-explorer',
        component: ApiExplorerPage
      }
    ]
  },
  {
    path: '/analyzer/',
    popup: {
      component: Analyzer
    }
  },
  /* For Cordova */
  {
    path: '/res/(.*)',
    redirect: '/'
  },
  {
    path: '/home/',
    redirect: '/'
  },
  // temp disable
  // {
  //   path: '/android_asset/(.*)',
  //   redirect: '/'
  // },
  // {
  //   path: '/var/containers/(.*)',
  //   redirect: '/'
  // },
  {
    path: '(.*)',
    component: NotFoundPage
  }
]
