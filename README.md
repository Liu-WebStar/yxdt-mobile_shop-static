# yxdt-mobile_shop-static
项目描述：手机端商城类项目，在公司PC端商城上线且维护稳定后公司要求开发移动端商城，我在此项目中担任项目负责人，此版本是项目开发前期我在开发完静态页面时保存的一个静态版本，此版本不含任何请求接口等相关功能。

应用技术：HTML5，CSS3，vue.js，vue-router ，axios，vuex等。

技术要点：
1、主要应用技术有HTML5，CSS3，vue，vue-router，axios，pubsub.js，组件通信，组件化开发等。
2、项目引入了vant组件库，自主开发UI功能组件库如阴影弹窗、全屏弹窗、时间线、评分组件等，自主开发插件库如全局函数控制页面Loading、自定义指令、过滤器等，项目中实现了图片懒加载、列表页上拉刷新、下拉加载数据等功能。
3、使用amfe-flexible和postcss-pxtorem实现了rem自动转换的功能，其中amfe-flexible插件进行初始化HTML根节点的font-size，postcss-pxtorem插件实现把项目中的px单位自动转换成rem单位；使用border.css解决关于border的手机DPR问题。
4、优于在PC端访问项目时视窗过宽，amfe-flexible插件会给html设置100+的像素值，导致PC端项目界面过大没法查看，因此通过在main.js中自定义了一个方法限制了html的最大font-size值为75px，以解决了PC端查看项目界面过大的问题。
5、由于PC端商城即采用前后端分离的方式开发，所以很多接口和业务逻辑都可以参考PC端项目，大大的节省了开发消耗。

线上网址：
  PC端商城：https://www.city-office.com.cn/
  移动端商城：https://www.city-office.com.cn/mobile_shop
  移动端商城测试站：http://api.city-office.com.cn/main/mobile_shop

开发日期：2020

上线时间：2020

作者：刘勇
