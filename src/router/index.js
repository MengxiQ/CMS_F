import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/equipments',
    component: Layout,
    redirect: '/equipments/list',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'EquipmentList',
        component: () => import('@/views/equipments/equipmentList/index'),
        meta: { title: '设备列表', icon: 'table' }
      },
      {
        path: 'netconfUser',
        name: 'NetconfUser',
        component: () => import('@/views/equipments/netconfUser/index'),
        meta: { title: 'NetConf用户', icon: 'el-icon-user-solid' }
      },
      {
        path: 'batchUsers',
        name: 'BatchUsers',
        component: () => import('@/views/equipments/batchUsers/index'),
        meta: { title: '批量用户', icon: 'el-icon-user-solid' }
      },
      {
        path: 'detail/:ip',
        name: 'Detail',
        component: () => import('@/views/equipments/detail/index')

      }
    ]
  },

  {
    path: '/view',
    component: Layout,
    redirect: '/view/topos',
    meta: { title: '视图管理', icon: 'el-icon-guide' },
    children: [
      {
        path: 'topos',
        name: 'Topos',
        component: () => import('@/views/view/topos/index'),
        meta: { title: '拓扑列表', icon: 'el-icon-s-grid' }
      //   children: [
      //     {
      //       path: 'detail/:name',
      //       name: 'viewDetail',
      //       component: () => import('@/views/view/topos/detail/index'),
      //       meta: { title: '拓扑列表', icon: 'el-icon-s-grid' }
      //     }
      //   ]
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/view/edit/index'),
        meta: { title: '新增视图', icon: 'el-icon-edit-outline' }
      }
    ]
  },
  {
    path: '/configManage',
    component: Layout,
    redirect: '/configManage/templates',
    name: 'ConfigManage',
    alwaysShow: true,
    meta: { title: '配置管理', icon: 'nested' },
    children: [
      {
        path: 'templates',
        component: () => import('@/views/configManage/templates/list/index'), // Parent router-view
        name: 'Templates',
        meta: { title: '模板列表', icon: 'nested' }
      },
      {
        path: 'yangTool',
        component: () => import('@/views/configManage/yangTool/index'), // Parent router-view
        name: 'yangTool',
        meta: { title: 'Yang工具', icon: 'nested' }
      },
      {
        path: 'xmlTool',
        component: () => import('@/views/configManage/yangTool/index'), // Parent router-view
        name: 'xmlTool',
        meta: { title: 'xml测试工具', icon: 'nested' }
      }
    ]
  },

  {
    path: '/types',
    component: Layout,
    alwaysShow: true,
    meta: { title: '类型管理', icon: 'link' },
    children: [
      {
        path: 'templateTypes',
        name: 'templateTypes',
        component: () => import('@/views/typesManage/templateTypes/index'),
        meta: { title: '模板类型', icon: 'link' }
      },
      {
        path: 'unitTypes',
        name: 'UnitTypes',
        component: () => import('@/views/typesManage/unitTypes/index'),
        meta: { title: '设备型号', icon: 'link' }
      },
      {
        path: 'neTypes',
        name: 'NeTypes',
        component: () => import('@/views/typesManage/neTypes/index'),
        meta: { title: '设备类型', icon: 'link' }
      },
      {
        path: 'functionTypes',
        name: 'FunctionTypes',
        component: () => import('@/views/typesManage/functionTypes/index'),
        meta: { title: '功能列表', icon: 'link' }
      },
      {
        path: 'vendorTypes',
        name: 'VendorTypes',
        component: () => import('@/views/typesManage/vendorTypes/index'),
        meta: { title: '厂商列表', icon: 'link' }
      }
    ]
  },
  {
    path: '/batch',
    component: Layout,
    alwaysShow: true,
    meta: { title: '批量管理', icon: 'link' },
    children: [
      {
        path: 'templateTypes',
        name: 'BatchTemplateTypes',
        component: () => import('@/views/typesManage/templateTypes/index'),
        meta: { title: '批量配置', icon: 'link' }
      }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
