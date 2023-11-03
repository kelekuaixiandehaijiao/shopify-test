# shopify操作指引

### [freebeat官网](https://www.freebeatfit.com/)  
### [Liquid文档](https://liquid.bootcss.com/)
### [shopify文档](https://shopify.dev/)
### [shopify后台](https://freebeat-fit.myshopify.com/admin/themes?channel=true)

* ###后台功能
  > * ###[重要 (后台中任何修改的内容保存后将直接应用于线上！)]() 
  > 
    
  >  * ####[产品](https://freebeat-fit.myshopify.com/admin/products?selectedView=all) (点击列表对应产品进入详细设置)
    >    * 标题 (商品标题)
    >    * 描述 (商品描述信息)
    >    * 媒体 (商品图片)
    >    * 定价
    >      * 价格 (商品实际售价)
    >      * 原价 (商品原价)
    >    * 搜索引擎优化 (基于SEO的设置项)
    >      * 页面标题
    >      * 元描述
    >      * URL (商品url)
    >    * _[产品状态 (重要)]()_
    >      * 活跃 ==> 上线
    >      * 草稿 ==> 下线
    >    * 模板样式 (选择列表里需要的样式)
  
    > * ####[应用](https://freebeat-fit.myshopify.com/admin/apps) (点击列表对应的应用进入详细设置)
    >   * 类似浏览器插件的功能。大部分安装后可直接使用，少部分需要引入代码(按应用安装指引即可)
    >   * 每个应用有自己的设置项，按需求设置即可
  
  * ###在线商店
    > * 模板类型
    >  * 实时模板 (生产)
    >  * 模板库 (类似测试环境)
  
    > * 模板内容
    >  * [自定义](https://freebeat-fit.myshopify.com/admin/themes/126093787321/editor) (可视化编辑界面)
    >  * [代码](https://freebeat-fit.myshopify.com/admin/themes/126093787321) (基于liquid语言)
   
    > * 自定义
    >  * 顶部下拉菜单 (类似路由效果，点击进入不同页面)
    >  * 顶部右侧小电脑图标 (切换不同屏幕下的预览效果)
    >  * 左侧操作区 (点击模块进行可视化设置)
    >    * 添加分区 (添加需要的模块进行编辑)
    >    * 常用模块 (Slideshow，Rich text with image，Custom HTML)
    >    * [模块功能如不满足需求，需要通过ID确定具体模块，代码改造模块功能]()
    >  * 右侧效果区
  
    > * 代码
    >   * 左侧文件列表
    >     * Layout ==> theme.liquid(主文件)
    >     * Templates (通过自定义设置的内容通过.json文件存储)
    >     * Sections (模板文件 eg: slideshow.liquid)
    >     * Snippet (模板复用文件)
    >     * Asstes (静态资源)
    >     * Config (模板内变量)
    >     * Locales (模板语言)
    >   * 右侧代码内容区
    >     * 旧版本 (最近提交记录的列表)
  
    > * 代码额外改造 (中文注释位置都为魔改代码)
    >   * 代码改造列表
    >     * Layout
    >       * theme.liquid
    >     * Section
    >       * announcement.liquid
    >       * custom-html.liquid
    >       * featured-product.liquid
    >       * footer.liquid
    >       * main-cart.liquid
    >       * main-customers-login.liquid
    >       * main-page.liquid
    >       * main-product.liquid
    >       * popup.liquid
    >       * shop-the-look.liquid
    >       * sidebar-menu.liquid
    >       * slideshow.liquid
    >       * text-with-image.liquid
    >     * Snippets
    >       * cart-drawer.liquid
    >       * cart-items.liquid
    >       * css-variables.liquid
    >       * microdata-schema.liquid
    >       * minmaxify-head.liquid
    >       * product-item.liquid
    >       * product-meta.liquid
    >       * product-tabs.liquid
    >       * spurit_sct_theme_snippet.liquid
    >       * spurit_sct_theme_snippet.liquid
    >     * Assets
    >       * custom-calculate-style.css
    >       * custom-style.css
    >       * theme.css
    >       * ajax.js
    >       * custom-js.js
    >       * theme.js
    >       * pandectes-settings.json
    >     * Config
    >       * settings_data.json
    
    >   
    >  * 代码改造事例
    >   * slideshow.liquid (eg: 首页banner视频)
    >   ``` js 
    >   <!--      首页banner插入视频        -->
    >   {%- if block.id == 'slide-0' -%}
    >       <video class="bg-video pc-video" style="position: absolute;top:0;" x-webkit-airplay="allow" webkit-playsinline="true" playsinline="true" autoplay="autoplay" muted="muted" loop="loop" src="https://cdn.shopifycdn.net/s/files/1/0592/3766/2905/files/home_video01_pc.mp4?v=1629446793"></video>
    >   {%- endif -%}
    >   ```
  
    >   * text-with-image.liquid (eg: 首页图文)
    >   ``` js 
    >   <!--    首页      -->
    >   {%- if section.id == 'template--14935822467257__1629082876ba69851e' -%}
    >       <video class="class-video pc-video" style="position: absolute;top:0;left:10%;width:80%;height:100%;z-index:1;" webkit-playsinline="true" playsinline="true" autoplay="autoplay" muted="muted" loop="loop" src="https://cdn.shopifycdn.net/s/files/1/0592/3766/2905/files/20221211357.mp4?v=1642744681"></video>
    >   {%- endif -%}
    >   ```
    
    >   * custom-html.liquid (eg: 首页单车对比图)
    >   ``` js 
    >   <!--    VS other bike    -->
    >   {%- if section.settings.title == 'vsOtherBike' -%}
    >      <div class="fb_vsOtherBike">
    >           <div class="fb_vsOtherBike_title">PRODUCT COMPARISON</div>
    >           <div class="fb_vsOtherBike_sub">Why choose freebeat? See for yourself</div>
    >           <img class="fb_vsOtherBike_img" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/202112151119.png?v=1639624849" alt sizes="(max-width: 640px) 128px, 1260px" srcset="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/202112201538.png?v=1639985975 256w, https://cdn.shopify.com/s/files/1/0592/3766/2905/files/202112201437.png?v=1639982330 1260w" />
    >       </div>
    >   {%- endif -%}
    >   ```
       
    >
    >  * 代码改造查找
    >    * css查找
    >      * 拿对应id ==> 截取后部模块部分 ==> 搜索定位使用模块的页面 ==> 在网页控台元素中搜索完整id定位 
    
