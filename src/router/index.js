import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import AccountManagement from '../views/AccountManagement/AccountManagement'
import Menu from '../views/Menu/Menu'
import RoleManagement from '../views/RoleManagement/RoleManagement'
import Company from '../views/Basic_Data/Public_Data/Company'
import Shop from '../views/Basic_Data/Public_Data/Shop'
import Region from '../views/Basic_Data/Public_Data/Region'
import Site from '../views/Basic_Data/Public_Data/Site'
import Currency from '../views/Basic_Data/Public_Data/Currency'
import Upload from '../views/Upload/FinanceUploadFile'
import Clearance from '../views/Basic_Data/Basic_Logistics/Customs-clearance'
import Declaration from '../views/Basic_Data/Basic_Logistics/Customs-declaration'
import Err from '../views/Err/Err'
import Freight from '../views/Freight/Freight'
import CprUpload from '../views/Upload/CprUploadFile'
import Business from '../views/Upload/BusinessUploadFile'//业务报告
import Deliver from '../views/Upload/DeliverUploadFile'//发货通知
import OarUpload from '../views/Upload/OarUploadFile'//OAR
import OrderUpload from '../views/Upload/OrderUploadFile'//订单报告
import Receive from '../views/Upload/ReceiveUploadFile'//接收库存
import Return from '../views/Upload/ReturnUploadFile'//退货报告
import StrUpload from '../views/Upload/StrUploadFile'//STR
import Terminal from '../views/Upload/TerminalUploadFile'//期末库存
import Category from '../views/Basic_Data/Public_Data/Category'//产品类目
import Exchange from '../views/Basic_Data/Public_Data/Exchange-rate'//汇率
import Measurement from '../views/Basic_Data/Public_Data/Measurement'//计量单位
import OPI from '../views/Basic_Data/Public_Data/OPI'//产品信息
import HL from '../views/Upload/HlUploadFile'//HL
import Warehouse from '../views/Basic_Data/Public_Data/Warehouse'//仓库
import YyFinanceUploadFile from '../views/Upload/YyFinanceUploadFile'//运营财务导入
import Edition from '../views/System/Edition'//版本信息
import Company_inf from '../views/System/Company_inf'//公司信息
import Register from '../views/System/Register'//注册信息
import OP_Sales_target from '../views/Operate/Amazon/Sales/Sales_target'//运营管理销售目标
import OP_Sales_plan from '../views/Operate/Amazon/Sales/Sales_plan'//运营管理销售计划
import OP_Monthly_cost from '../views/Operate/Amazon/Cost/Monthly_cost'//运营管理月度仓储费
import OP_Order_cost from '../views/Operate/Amazon/Cost/Order_cost'//运营管理订单处理费
import OP_Permanent_cost from '../views/Operate/Amazon/Cost/Permanent_cost'//运营管理长期仓储费
import OP_Business_Report from '../views/Operate/Amazon/Presentation/Business_Report'//运营管理业务报告
import OP_Return_Report from '../views/Operate/Amazon/Presentation/Return_Report'//运营管理退货报告
import OP_Settlement_Report from '../views/Operate/Amazon/Presentation/Settlement_Report'//运营管理结算报告
import OP_Transaction_Report from '../views/Operate/Amazon/Presentation/Transaction_Report'//运营管理交易报告
import OP_Ad_CPR from '../views/Operate/Amazon/Advertisement/Ad_CPR'//运营管理CPR
import OP_Ad_CPR_week from '../views/Operate/Amazon/Advertisement/Ad_CPR_week'//运营管理CPR周
import OP_Ad_Hl from '../views/Operate/Amazon/Advertisement/Ad_HL'//运营管理HL
import OP_Ad_OAR from '../views/Operate/Amazon/Advertisement/Ad_OAR'//运营管理OAR
import OP_Ad_OAR_week from '../views/Operate/Amazon/Advertisement/Ad_OAR_week'//运营管理OAR周
import OP_Ad_STR from '../views/Operate/Amazon/Advertisement/Ad_STR'//运营管理STR
import OP_Receiving_stock from '../views/Operate/Amazon/Stock/Receiving_stock'//运营管理接收库存
import OP_Ending_stock from '../views/Operate/Amazon/Stock/Ending_stock'//运营管理期末库存
import OP_Shipment_not from '../views/Operate/Amazon/Stock/Shipment_not'//运营管理出货通知单
import OP_Transfer_not from '../views/Operate/Amazon/Stock/Transfer_not'//运营管理移仓通知单
import OP_FBA_stock from '../views/Operate/Amazon/Stock/FBA_stock'//FBA遗弃
import OP_Feedback from '../views/Operate/Amazon/Other/Feedback'//Feedback
import OP_Review from '../views/Operate/Amazon/Other/Review'//Review
import OP_Closing from '../views/Operate/Ending/Closing_accounts'//期末关帐
import OP_Settle from '../views/Operate/Ending/Settle_accounts'//期末结账
import LOG_Status from '../views/Logistics/Logistics-tracking/Logistics_status'//物流状态
import LOG_Query from '../views/Logistics/Logistics-tracking/Logistics_query'//物流查询
import LOG_Record from '../views/Logistics/Logistics-tracking/Delivery_record'//物流发货记录
import LOG_Customs from '../views/Logistics/Export-management/Customs'//物流报关单
import LOG_Packing from '../views/Logistics/Export-management/Packing'//物流装箱单
import LOG_Invoice from '../views/Logistics/Export-management/Invoice'//发票
import LOG_Contract from '../views/Logistics/Export-management/contract'//外销合同
import Bas_Transport from '../views/Basic_Data/Basic_Logistics/Transport_nature'//物流性质
import Bas_Types from '../views/Basic_Data/Basic_Logistics/Types'//物流运输类型
import Bas_Err from '../views/Basic_Data/Basic_Logistics/Err'//物流异常类型
import Bas_Freight from '../views/Basic_Data/Basic_Logistics/Freight_company'//物流货运公司
import Exp_Declare from '../views/Basic_Data/Basic_Logistics/Export_management/Declare'//出口管理申报要素
import Exp_HS from '../views/Basic_Data/Basic_Logistics/Export_management/HS_Code'//出口管理HS
import Exp_Off from '../views/Basic_Data/Basic_Logistics/Export_management/Off_Shore_Company'//出口管理离岸公司
import Purchase from '../views/Basic_Data/Basic_Purchase/Price'//采购价格
import Nation from '../views/Basic_Data/Basic_Personnel/Nation'//民族
import Ama_Describe from '../views/Basic_Data/Basic_Operate/Amazon/Describe'//亚马逊描述
import Ama_Order from '../views/Basic_Data/Basic_Operate/Amazon/Order_processing'//订单处理类
import Ama_Payment from '../views/Basic_Data/Basic_Operate/Amazon/Payment_type'//付款类型
import Ama_Type from '../views/Basic_Data/Basic_Operate/Amazon/Type'//亚马逊Type
import Ama_Warehouse from '../views/Basic_Data/Basic_Operate/Amazon/Warehouse'//亚马逊仓库
import Sup_Delivery from '../views/Basic_Data/Basic_Operate/Supplementary/Delivery'//辅助资料发货方式
import Sub_Platform from '../views/Basic_Data/Basic_Operate/Supplementary/Platform_type'//辅助资料平台类型
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta: {
        showLogin: true
      },
      children: [
        {
          path: '/index/accountManagement/:id',
          component: AccountManagement
        },
        {
          path: '/index/roleManagement/:id',
          component: RoleManagement
        },
        {
          path: '/index/menu/:id',
          component: Menu
        },
        {
          path: '/index/company/:id',
          component: Company
        },
        {
          path: '/index/shop/:id',
          component: Shop
        },
        {
          path: '/index/region/:id',
          component: Region
        },
        {
          path: '/index/site/:id',
          component: Site
        },
        {
          path: '/index/currency/:id',
          component: Currency
        },
        {
          path: '/index/upload/:id',
          component: Upload
        },
        {
          path: '/index/Customs-clearance/:id',
          component: Clearance
        },
        {
          path:'/index/Customs-declaration/:id',
          component:Declaration
        },
        {
         path:'/index/Err/:id',
         component:Err
        },
        {
          path:'/index/Freight/:id',
          component:Freight
        },
        {
          path:'/index/cpr-upload/:id',
          component:CprUpload
        },
        {
          path:'/index/Business/:id',
          component:Business
        },
        {
          path:'/index/Deliver/:id',
          component:Deliver
        },
        {
          path:'/index/OarUpload/:id',
          component:OarUpload
        },
        {
          path:'/index/OrderUpload/:id',
          component:OrderUpload
        },
        {
          path:'/index/Receive/:id',
          component:Receive
        },
        {
          path:'/index/Return/:id',
          component:Return
        },
        {
          path:'/index/StrUpload/:id',
          component:StrUpload
        },
        {
          path:'/index/Terminal/:id',//期末库存
          component:Terminal
        },
        {
          path:'/index/CategoryItem/:id',//产品类目
          component:Category
        },
        {
          path:'/index/Exchange/:id',//汇率
          component:Exchange
        },
        {
          path:'/index/Measurement/:id',//计量单位
          component:Measurement
        },
        {
          path:'/index/OpiItem/:id',//OPI
          component:OPI
        },
        {
          path:'/index/HL/:id',//HL
          component:HL
        },
        {
          path:'/index/Warehouse/:id',//仓库
          component:Warehouse
        },
        {
          path:'/index/yy-upload/:id',
          component:YyFinanceUploadFile
        },
        {
          path:'/index/Edition/:id',//版本信息
          component:Edition
        },
        {
          path:'/index/Company_inf/:id',//公司信息
          component:Company_inf
        },
        {
          path:'/index/Register/:id',//注册信息
          component:Register
        },
        {
          path:'/index/OP_Sales_target/:id',//运营管理销售目标
          component:OP_Sales_target
        },
        {
          path:'/index/OP_Sales_plan/:id',//运营管理销售计划
          component:OP_Sales_plan
        },
        {
          path:'/index/OP_Monthly_cost/:id',//运营管理月度仓储费
          component:OP_Monthly_cost
        },
        {
          path:'/index/OP_Order_cost/:id',//运营管理订单处理费
          component:OP_Order_cost
        },
        {
          path:'/index/OP_Permanent_cost/:id',//运营管理长期仓储费
          component:OP_Permanent_cost
        },
        {
          path:'/index/OP_Business_Report/:id',//运营管理业务报告
          component:OP_Business_Report
        },
        {
          path:'/index/OP_Settlement_Report/:id',//运营管理结算报告
          component:OP_Settlement_Report
        },
        {
          path:'/index/OP_Return_Report/:id',//运营管理退货报告
          component:OP_Return_Report
        },
        {
          path:'/index/OP_Transaction_Report/:id',//运营管理交易报告
          component:OP_Transaction_Report
        },
        {
          path:'/index/OP_Ad_CPR/:id',//运营管理CPR
          component:OP_Ad_CPR
        },
        {
          path:'/index/OP_Ad_CPR_week/:id',//运营管理CPR周
          component:OP_Ad_CPR_week
        },
        {
          path:'/index/OP_Ad_Hl/:id',//运营管理HL
          component:OP_Ad_Hl
        },
        {
          path:'/index/OP_Ad_OAR/:id',//运营管理OAR
          component:OP_Ad_OAR
        },
        {
          path:'/index/OP_Ad_OAR_week/:id',//运营管理OAR周
          component:OP_Ad_OAR_week
        },
        {
          path:'/index/OP_Ad_STR/:id',//运营管理STR
          component:OP_Ad_STR
        },
        {
          path:'/index/OP_Receiving_stock/:id',//运营管理接收库存
          component:OP_Receiving_stock
        },
        {
          path:'/index/OP_Ending_stock/:id',//运营管理期末库存
          component:OP_Ending_stock
        },
        {
          path:'/index/OP_Shipment_not/:id',//运营管理出货通知单
          component:OP_Shipment_not
        },
        {
          path:'/index/OP_Transfer_not/:id',//运营管理移仓通知单
          component:OP_Transfer_not
        },
        {
          path:'/index/OP_FBA_stock/:id',//FBA遗弃
          component:OP_FBA_stock
        },
        {
          path:'/index/OP_Feedback/:id',//Feedback
          component:OP_Feedback
        },
        {
          path:'/index/OP_Review/:id',//Review
          component:OP_Review
        },
        {
          path:'/index/OP_Closing/:id',//期末关帐
          component:OP_Closing
        },
        {
          path:'/index/OP_Settle/:id',//期末结账
          component:OP_Settle
        },
        {
          path:'/index/LOG_Status/:id',//物流状态
          component:LOG_Status
        },
        {
          path:'/index/LOG_Query/:id',//物流查询
          component:LOG_Query
        },
        {
          path:'/index/LOG_Record/:id',//物流发货记录
          component:LOG_Record
        },
        {
          path:'/index/LOG_Customs/:id',//物流报关单
          component:LOG_Customs
        },
        {
          path:'/index/LOG_Packing/:id',//物流装箱单
          component:LOG_Packing
        },
        {
          path:'/index/LOG_Invoice/:id',//发票
          component:LOG_Invoice
        },
        {
          path:'/index/LOG_Contract/:id',//外销合同
          component:LOG_Contract
        },
        {
          path:'/index/Bas_Transport/:id',//物流性质
          component:Bas_Transport
        },
        {
          path:'/index/Bas_Types/:id',//物流运输类型
          component:Bas_Types
        },
        {
          path:'/index/Bas_Err/:id',//物流异常类型
          component:Bas_Err
        },
        {
          path:'/index/Bas_Freight/:id',//物流货运公司
          component:Bas_Freight
        },
        {
          path:'/index/Exp_Declare/:id',//出口管理申报要素
          component:Exp_Declare
        },
        {
          path:'/index/Exp_HS/:id',//出口管理HS
          component:Exp_HS
        },
        {
          path:'/index/Exp_Off/:id',//出口管理离岸公司
          component:Exp_Off
        },
        {
          path:'/index/Purchase/:id',//采购价格
          component:Purchase
        },
        {
          path:'/index/Nation/:id',//民族
          component:Nation
        },
        {
          path:'/index/Ama_Describe/:id',//亚马逊描述
          component:Ama_Describe
        },
        {
          path:'/index/Ama_Order/:id',//订单处理类
          component:Ama_Order
        },
        {
          path:'/index/Ama_Payment/:id',//付款类型
          component:Ama_Payment
        },
        {
          path:'/index/Ama_Type/:id',//亚马逊Type
          component:Ama_Type
        },
        {
          path:'/index/Ama_Warehouse/:id',//亚马逊仓库
          component:Ama_Warehouse
        },
        {
          path:'/index/Sup_Delivery/:id',//辅助资料发货方式
          component:Sup_Delivery
        },
        {
          path:'/index/Sub_Platform/:id',//辅助资料平台类型
          component:Sub_Platform
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
