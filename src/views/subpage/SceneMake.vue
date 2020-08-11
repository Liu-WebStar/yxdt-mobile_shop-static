<template>
  <div class="main">
    <goods-list ref="goods_list"></goods-list>
    <!-- 场景采购 -->
    <full-modal v-model="scene_make" class="scene_make">
      <template slot="header">
        <!-- 搜索 -->
          <div class="sort_search_top">
            <div class="sort_search_box">
              <img class="ferret" src="@/assets/image/images/search/ferret.png" alt="">
              <input @keydown="onSearchIcon2($event)" class="ferret_input" type="search" placeholder="搜索商品">
            </div>
          </div>
      </template>
      <template slot="body">
        <div class="main_content">
          <!-- 轮播图 -->
          <div class="swiper_content">
            <div class="banner_box">
              <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item class="banner1"></van-swipe-item>
                <van-swipe-item class="banner2"></van-swipe-item>
                <van-swipe-item class="banner3"></van-swipe-item>
                <van-swipe-item class="banner4"></van-swipe-item>
              </van-swipe>
            </div>
          </div>
          <!-- 选项卡1 -->
          <div class="nav_tab">
            <div class="nav_tab_box">
              <ul class="tab_ul">
                <li class="tab_li action">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                  </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">办公室</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 图片 -->
          <div class="nav_tab_pic">
            <div class="nav_tab_box_pic">
              <ul class="tab_ul_pic" :style="{transform:'translateX(-' + index * 100 + '%)'}">
                <li class="tab_li_pic" :style="index==0 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==1 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner2.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==2 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==3 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner2.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==4 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==5 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner2.png" alt="">
                </li>
                <li class="tab_li_pic" :style="index==6 ? 'opacity:1':'opacity:0'">
                  <img class="tab_img" src="@/assets/image/banner/banner.png" alt="">
                </li>
              </ul>
            </div>
          </div>
          <!-- 选项卡2 -->
          <div class="nav_tab2">
            <div class="nav_tab_box">
              <div class="nav_line"></div>
              <ul class="tab_ul">
                <li class="tab_li action">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                  </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
                <li class="tab_li">
                  <span class="tab_span_none"></span>
                  <span class="tab_span">饮水机</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods_content">
            <ul class="nav_goods_ul" :style="{transform:'translateX(-' + index2 * 100 + '%)'}">
              <li class="nav_goods_li" :style="index2==0 ? 'opacity:1':'opacity:0'">
                <div class="goods_list">
                  <ul>
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      class="van_box"
                    >
                      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                      <li class="goods_li" v-for="(item,index) in goods_res" :key='index'>
                        <a @click="goods_detail">
                          <img class="goods_pic" :src="item.img_src" to="/goods" v-lazy="img" />
                        </a>
                        <div class="goods_info">
                          <a @click="goods_detail" class="goods_word">{{item.goods_name}}</a>
                          <div class="goods_bottom">
                            <div class="goods_price">
                              <span class="s1">￥</span>
                              <span class="s2">{{item.goods_price}}</span>
                            </div>
                            <span class="goods_car"></span>
                          </div>
                        </div>
                      </li>
                    </van-list>
                  </ul>
                </div>
              </li>
              <li class="nav_goods_li" :style="index2==1 ? 'opacity:1':'opacity:0'">
                <div class="goods_list">
                  <ul>
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      class="van_box"
                    >
                      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                      <li class="goods_li" v-for="(item,index) in goods_res" :key='index'>
                        <a @click="goods_detail">
                          <img class="goods_pic" :src="item.img_src" to="/goods" v-lazy="img" />
                        </a>
                        <div class="goods_info">
                          <a @click="goods_detail" class="goods_word">{{item.goods_name}}</a>
                          <div class="goods_bottom">
                            <div class="goods_price">
                              <span class="s1">￥</span>
                              <span class="s2">{{item.goods_price}}</span>
                            </div>
                            <span class="goods_car"></span>
                          </div>
                        </div>
                      </li>
                    </van-list>
                  </ul>
                </div>
              </li>
              <li class="nav_goods_li" :style="index2==2 ? 'opacity:1':'opacity:0'">
                <div class="goods_list">
                  <ul>
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      class="van_box"
                    >
                      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                      <li class="goods_li" v-for="(item,index) in goods_res" :key='index'>
                        <a @click="goods_detail">
                          <img class="goods_pic" :src="item.img_src" to="/goods" v-lazy="img" />
                        </a>
                        <div class="goods_info">
                          <a @click="goods_detail" class="goods_word">{{item.goods_name}}</a>
                          <div class="goods_bottom">
                            <div class="goods_price">
                              <span class="s1">￥</span>
                              <span class="s2">{{item.goods_price}}</span>
                            </div>
                            <span class="goods_car"></span>
                          </div>
                        </div>
                      </li>
                    </van-list>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 解决方案 -->
    <full-modal class="total_solution"  v-model="total_solution" :hideHeader='true'>
      <template slot="body">
        <div class="total_main">
          <div class="total_head">
            <span class="go_back" @click="goBack('total')"></span>
            <span class="total_pic"></span>
            <span class="total_word">满足不同类型组织的智能化采购诉求提供一站式无忧采购服务</span>
          </div>
          <!--  -->
          <div class="supply">
            <span class="supply_word">整合供应链资源，消除中间环节，缩减流通成本，提供物美价优的产品</span>
            <div class="supply_box">
              <ul class="supply_ul">
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/changjia.png" alt="">
                    <span class="supply_son_word">厂家直供 物美价优</span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/yixian.png" alt="">
                    <span class="supply_son_word">一线品牌 知名厂商</span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/dingzhi.png" alt="">
                    <span class="supply_son_word">反向定制 专属供应</span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/goods.png" alt="">
                    <span class="supply_son_word">专属商品池 持续运营优化</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--  -->
          <div class="internt">
            <span class="supply_word">
              将先进的互联网技术与采购场景相结合，助力采购客户提升效率，降低管理成本
            </span>
            <div class="supply_box">
              <ul class="supply_ul">
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/API.png" alt="">
                    <span class="supply_son_word">API对接</span>
                    <span class="supply_son_word2">
                      支持API对接，与客户已有采购平台进行数据交互，推送商品、物流、发票等信息
                    </span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/zssc.png" alt="">
                    <span class="supply_son_word">专属采购商城</span>
                    <span class="supply_son_word2">
                      专属采购商城，支持多种方式部署、可选择多种支付方式，支持与内部系统对接集成     
                    </span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/sjksh.png" alt="">
                    <span class="supply_son_word">数据可视化</span>
                    <span class="supply_son_word2">
                      数据管理和分析能力，实现采购数据多维 度可视化展示
                    </span>
                  </div>
                </li>
                <li class="supply_li">
                  <div class="supply_son">
                    <img class="supply_son_pic" src="@/assets/image/images/total/dzhkf.png" alt="">
                    <span class="supply_son_word">定制化开发</span>
                    <span class="supply_son_word2">
                      根据客户采购特点，可提供差异化的管理 模块，提供定制化的研发能力
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--  -->
          <div class="map">
            <span class="supply_word">专属落地服务机构，提供多元化的服务，打造售后无忧的采购体验</span>
            <div class="map_box">
              <img class="map_pic" src="@/assets/image/images/total/map.png" alt="">
            </div>
            <div class="map_content">
              <div class="map_top">
                <span class="map_s1">01</span>
                <span class="map_s2"></span>
                <span class="map_s3">
                  在全国各省市级地区建立分子公司和落地服务机构，覆盖全国90%的地区，实现了最后一公里配送上门、安装的服务效果；
                </span>
              </div>
            </div>
            <div class="map_content">
              <div class="map_top">
                <span class="map_s1 two">02</span>
                <span class="map_s2 two"></span>
                <span class="map_s3">
                  提供诸如清洗、维修、保养等多元化的服务选择，满足用户不同方面的诉求。
                </span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="team">
            <span class="supply_word">
              专业的运营服务团队，助力客户采购项目快速落地执行
            </span>
            <div class="team_box_pic">
              <span class="line"></span>
              <div class="center">
                <span class="center_pic"></span>
                <span class="center_pic2"></span>
                <span class="center_s1">运营服务中心</span>
              </div>
              <div class="son_box">
                <img class="team_pic" src="@/assets/image/images/total/fuwu.png" alt="">
                <span class="team_word">客户服务部门</span>
              </div>
              <div class="son_box phone">
                <img class="team_pic" src="@/assets/image/images/total/phone.png" alt="">
                <span class="team_word">客户呼叫部门</span>
              </div>
              <div class="son_box cehua">
                <img class="team_pic" src="@/assets/image/images/total/cehua.png" alt="">
                <span class="team_word">运营策划部门</span>
              </div>
              <div class="son_box fenxi">
                <img class="team_pic" src="@/assets/image/images/total/fenxi.png" alt="">
                <span class="team_word">数据分析部门</span>
              </div>
            </div>
            <div class="team_box2">
              <div class="top">
                <span class="word1"></span>
                <span class="word2">设置专业细分的运营服务团队</span>
              </div>
              <div class="top two">
                <span class="word1"></span>
                <span class="word2">对客户实行全生命周期的管理，提供符合客户诉求的运营方案</span>
              </div>
              <div class="top three">
                <span class="word1"></span>
                <span class="word2">
                  执行数据驱动的工作方法，根据数据的洞察优化产品结构和运营方式，提升用户采购满意度
                </span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="together">
            <div class="together_top">
              <span class="s1">合作客户</span>
              <span class="s2">Cooperative client</span>
              <span class="s3"></span>
            </div>
            <div class="together_bottom">
              <ul class="together_ul">
                <li class="together_li"></li>
                <li class="together_li"></li>
                <li class="together_li"></li>
                <li class="together_li"></li>
                <li class="together_li"></li>
              </ul>
            </div>
          </div>
          <!--  -->
          <div class="flow">
            <div class="together_top">
              <span class="s1">合作流程</span>
              <span class="s2">Cooperative client</span>
              <span class="s3"></span>
            </div>
            <div class="together_bottom">
              <div class="toge_flow">
                <span class="map_s1">01</span>
                <span class="map_s2"></span>
                <span class="map_s3">商务洽谈，沟通需求</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
              </div>
              <div class="toge_flow four">
                <span class="map_s1">04</span>
                <span class="map_s2"></span>
                <span class="map_s3">签署合作协议</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
                <span class="line_s3"></span>
                <span class="line_s4"></span>
              </div>
              <div class="toge_flow five">
                <span class="map_s1">05</span>
                <span class="map_s2"></span>
                <span class="map_s3">项目落地实施</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
              </div>
              <div class="toge_flow two">
                <span class="map_s1">02</span>
                <span class="map_s2"></span>
                <span class="map_s3">提供解决方案</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
                <span class="line_s3"></span>
                <span class="line_s4"></span>
              </div>
              <div class="toge_flow three">
                <span class="map_s1">03</span>
                <span class="map_s2"></span>
                <span class="map_s3">确定合作模式</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
              </div>
              <div class="toge_flow six">
                <span class="map_s1">06</span>
                <span class="map_s2"></span>
                <span class="map_s3">持续运营跟进</span>
                <span class="line_s1"></span>
                <span class="line_s2"></span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="yxdt">
            <span class="yxdt_pic"></span>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 合作申请 -->
    <full-modal class="application total_solution" v-model="application_coop" :hideHeader='true'>
      <template slot="body">
        <div class="coop_main">
          <div class="coop_head">
            <span class="go_back" @click="goBack('coop')"></span>
            <span class="coop_pic"></span>
            <span class="coop_word">一线达通落地服务合作伙伴招募</span>
            <span class="coop_word two">跟随行业变革趋势,共享优势资源,合作共赢未来</span>
            <div class="btn">
              <span class="apply" @click="apply">立即申请</span>
              <span class="seek">咨询电话「400-008-6862」</span>
            </div>
          </div>
          <!--  -->
          <div class="superiority">
            <div class="sup_top">
              <span class="s1">合作优势</span>
              <span class="s2">ADVANTAGES OF COOPERATION</span>
              <span class="s3"></span>
            </div>
            <div class="sup_bottom">
              <ul class="sup_ul">
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">客户资源共享与开发</span>
                </li>
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">商品渠道资源共享</span>
                </li>
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">供应链融资支持</span>
                </li>
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">技术开发能力支持</span>
                </li>
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">落地服务运营指导</span>
                </li>
                <li class="sup_li">
                  <img class="sup_pic" src="@/assets/image/images/coop/kehu.png" alt="">
                  <span class="sup_word">客户数据多维度分析</span>
                </li>
              </ul>
            </div>
          </div>
          <!--  -->
          <div class="settled">
            <div class="set_top">
              <span class="s1">入驻流程</span>
              <span class="s2">SETTLEMENT PROCESSS</span>
              <span class="s3"></span>
            </div>
            <div class="set_bottom">
              <div class="set_box">
                <span class="round_one"></span>
                <span class="round_two">1</span>
                <span class="set_word">注册云商城账号</span>
              </div>
              <div class="round_box">
                <span class="round"></span>
                <span class="round"></span>
                <span class="round"></span>
              </div>
              <div class="set_box">
                <span class="round_one"></span>
                <span class="round_two">2</span>
                <span class="set_word">提交审核资料</span>
              </div>
              <div class="round_box">
                <span class="round"></span>
                <span class="round"></span>
                <span class="round"></span>
              </div>
              <div class="set_box">
                <span class="round_one"></span>
                <span class="round_two">3</span>
                <span class="set_word">审核通过,签订合作协议</span>
              </div>
              <div class="round_box">
                <span class="round"></span>
                <span class="round"></span>
                <span class="round"></span>
              </div>
              <div class="set_box">
                <span class="round_one"></span>
                <span class="round_two">4</span>
                <span class="set_word">入驻成功,开始接受业务培训</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="yxdt">
            <span class="yxdt_pic"></span>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 关于我们 -->
    <full-modal class="about_us total_solution" v-model="about_us" :hideHeader='true'>
      <template slot="body">
        <div class="about_main">
          <!--  -->
          <div class="about_head">
            <span class="go_back" @click="goBack('about')"></span>
            <span class="coop_pic"></span>
            <span class="coop_word">寻找与一线达通一起奔跑的伙伴</span>
            <span class="coop_word two">Look for a running partner with yixiandatong </span>
          </div>
          <!-- 选项卡 -->
          <div class="about_content">
            <div class="about_nav_box">
              <ul class="about_nav_ul">
                <li class="about_nav_li action">
                  <span class="about_nav_span">公司介绍</span>
                </li>
                <li class="about_nav_li">
                  <span class="about_nav_span">发展历程</span>
                </li>
                <li class="about_nav_li">
                  <span class="about_nav_span">荣誉资质</span>
                </li>
                <li class="about_nav_li">
                  <span class="about_nav_span">加入我们</span>
                </li>
                <li class="about_nav_li">
                  <span class="about_nav_span">联系我们</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 图片 -->
          <div class="about_content_body">
            <ul class="about_body_ul" :style="{transform:'translateX(-' + index3 * 100 + '%)'}">
              <li class="about_body_li" :style="index3==0 ? 'opacity:1':'opacity:0'">
                <div class="company_info">
                  <div class="about_content2">
                    <div class="about_nav_box2">
                      <ul class="about_nav_ul2">
                        <li class="about_nav_li2 action">
                          <img class="about_nav_img" src="@/assets/image/images/about_us/w1.png" alt="">
                        </li>
                        <li class="about_nav_li2">
                          <img class="about_nav_img" src="@/assets/image/images/about_us/w3.png" alt="">
                        </li>
                        <li class="about_nav_li2">
                          <img class="about_nav_img" src="@/assets/image/images/about_us/w4.png" alt="">
                        </li>
                        <li class="about_nav_li2">
                          <img class="about_nav_img" src="@/assets/image/images/about_us/w5.png" alt="">
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="company">
                    <span class="company_word">
                      北京一线达通科技发展有限公司成立于2004年，是中国互联网+政企采购服务平台。公司通过与上千家生产厂商合作，以企业非生产物资采购商品为整合对象建设大型供应链平台，通过全国落地服务网络为政企客户提供一站式采购服务。
                    </span>
                    <span class="company_word s1">
                      商城产品覆盖办公文具、办公用纸、办公设备、办公耗材、办公家电、数码设备、电脑及配件、通讯设备、生活用品、商务礼品、办公家具、劳保用品、工具器、食品饮料等十四大类，精选15万SKU，严控价格，保证正品。         
                    </span>
                  </div>
                  <div class="company_box">
                    <img class="company_pic" src="@/assets/image/images/about_us/company.png" alt="">
                    <span class="word s1">使命</span>
                    <span class="word s2">聚集政企采购,促进采购双方和谐共赢</span>
                    <span class="word s3">价值观</span>
                    <span class="word s4">诚信文本,客户优先,科技驱动,服务至上</span>
                    <span class="word s5">愿景</span>
                    <span class="word s6">树立中国采购行业优质服务典范,</span>
                    <span class="word s7">成为一家科技驱动的数字化采购平台型企业</span>
                  </div>
                  <div class="yxdt">
                    <span class="yxdt_pic"></span>
                  </div>
                </div>
              </li>
              <li class="about_body_li" :style="index3==1 ? 'opacity:1':'opacity:0'">
                <div class="deve_history">
                  <span class="line"></span>
                  <div class="history_box">
                    <span class="history_pic"></span>
                    <span class="year">2004年</span>
                    <span class="word">一线达通公司成立，从事办公文具渠道批发业务</span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2008年</span>
                    <span class="word">业务转型，逐步放弃渠道销售业务开展办公产品直销工作</span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2010年</span>
                    <span class="word">中标中央政府采购定点采购供应商项目</span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2012年</span>
                    <span class="word">开始推进电子商务，开发电子商城</span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2015年</span>
                    <span class="word">中标中央及北京市政府采购全国电商定点服务项目</span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2016年</span>
                    <span class="word">
                      开拓全国市场，入围无锡、蜀山、安庆、河南、湘西、包头等全国各地政府采购网上商城
                    </span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2018年</span>
                    <span class="word">
                      持续发力，累计入围全国近80余地区的政府、军队、央国企网上商城项目。在全国27个省会级城市建立省级全资子公司,全国落地服务机构增至千余家。
                    </span>
                  </div>
                  <div class="history_box two">
                    <span class="history_pic"></span>
                    <span class="year">2019年</span>
                    <span class="word">
                      进行了组织框架的调整，成立信息技术中心，客户服务中心，供应链管理中心、市场开发中心及财务结算中心五大板块，中标中国邮政集团公司第三方电商平台项目
                    </span>
                  </div>
                  <div class="history_box two three">
                    <span class="history_pic"></span>
                    <span class="history_pic2"></span>
                    <span class="pic_word">持续进步</span>
                  </div>
                  <div class="yxdt">
                    <span class="yxdt_pic"></span>
                  </div>
                </div>
              </li>
              <li class="about_body_li" :style="index3==2 ? 'opacity:1':'opacity:0'">
                
              </li>
              <li class="about_body_li" :style="index3==3 ? 'opacity:1':'opacity:0'">
                
              </li>
              <li class="about_body_li" :style="index3==4 ? 'opacity:1':'opacity:0'">
                
              </li>
            </ul>
          </div>
        </div>
      </template>
    </full-modal>
  </div>
</template>

<script>
import GoodsList from '@/views/components/GoodsList';
import FullModal from '@/iYxdt/FullModal';
import $ from 'jquery';

export default {
  data() {
    return {
      about_us:false,  //关于我们
      application_coop:false, //合作申请
      total_solution:false,  //解决方案
      scene_make:false,  //场景采购
      index:0,
      index2:0,
      index3:0,
      finished:false,
      loading:false,
      goods_res:[],
      list:[],
      img:'https://b.yzcdn.cn/vant/sku/shoes-3.png',
    }
  },
  methods:{
    apply(){
      console.log('立即申请')
    },
    goBack(val){
      if(val=='total'){
        this.total_solution=false;
      }else if(val=='coop'){
        this.application_coop=false
      }else if(val=='about'){
        this.about_us=false;
      }
    },
    // 
    goods_detail(){
      this.$router.push('/goods');
    },
    onSearchIcon(val){
      console.log(val);
      $('.ferret_input').val('');
      this.$refs.goods_list.goods_screen_list=true;
    },
    onSearchIcon2(e){
      if(e.keyCode == 13){
        var val=$('.ferret_input').val();
        this.onSearchIcon(val);
      }
    },
    onLoad() {
      setTimeout(() => {
        var src={
      'success':'true',
      'res':[
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
              'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
              'goods_price':'2112.00'},
      ]
    }
    var json=JSON.stringify(src);
    var res=JSON.parse(json);
    this.goods_res=res.res;
        this.loading = false;
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
      console.log(222)
    },
  },
  mounted(){
    var _this=this;
    // 选项卡1
    $('.nav_tab').find('.tab_li').each(function(i,b){
      $(b).click(function(){
        _this.index=i;
        $('.nav_tab').find('.tab_li').removeClass('action');
        $(this).addClass('action');
      })
    })
    // 选项卡2
    $('.nav_tab2').find('.tab_li').each(function(i,b){
      $(b).click(function(){
        _this.index2=i;
        $('.nav_tab2').find('.tab_li').removeClass('action');
        $(this).addClass('action');
      })
    })
    // 关于我们
    $('.about_content').find('.about_nav_li').each(function(i,b){
      $(b).click(function(){
        _this.index3=i;
        $('.about_content').find('.about_nav_li').removeClass('action');
        $(this).addClass('action');
      })
    })
  },
  components:{
    GoodsList,
    FullModal
  }
}
</script>

<style lang="scss" scoped>
  .main{
    // 场景采购
    .scene_make{
      // 搜索
      .sort_search_top{
        margin-left:27px;
        margin-right:30px;
        height:88px;
        background:#fff;
        // 搜索框
        .sort_search_box{
          width:641px;
          height:60px;
          display:inline-block;
          background: #f6f6f6;
          border-radius:30px;
          vertical-align: middle;
          box-sizing: border-box;
          margin-left:27px;
          position: relative;
          .ferret{
            display: inline-block;
            position:absolute;
            width:30px;
            height:30px;
            left:20px;
            top: 15px;
          }
          .ferret_input{
            display: block;
            border: 0;
            width:579px;
            height:60px;
            margin-left:62px;
            border-radius: 30px;
            &::-webkit-search-cancel-button{
              -webkit-appearance: none;
            }
          }
        }
      }
      .main_content{
        height:100%;
        // 轮播图
        .swiper_content{
          width:100%;
          height:300px;
          margin-top:20px;
          margin-bottom:50px;
          .banner_box{
            width:690px;
            height:300px;
            box-sizing:border-box;
            margin:0 auto;
            .my-swipe {
              .van-swipe-item {
                color: #fff;
                font-size: 20px;
                line-height: 300px;
                text-align: center;
                border-radius: 30px;
                &.banner1{
                  background-image: url('../../assets/image/banner/banner.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner2{
                  background-image: url('../../assets/image/banner/banner2.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner3{
                  background-image: url('../../assets/image/banner/banner.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner4{
                  background-image: url('../../assets/image/banner/banner2.png');
                  background-size:100% 100%;
                  height: 300px;
                }
              }
            }
          }
        }
        // 选项卡1
        .nav_tab{
          margin-left:30px;
          width: 750px;
          height: 50px;
          overflow: hidden;
          .nav_tab_box{
            overflow-x:auto;
            height:70px;
            // 文案
            .tab_ul{
              width:970px;
              display:flex;
              flex-wrap: nowrap;
              height: 50px;
              .tab_li{
                margin-left:25px;
                margin-right:25px;
                display: inline-block;
                height:28px;
                line-height: 28px;
                margin-top:3px;
                position: relative;
                &:first-child{
                  margin-left:0px;
                }
                &.action{
                  height:32px;
                  line-height: 32px;
                  margin-top:0;
                  .tab_span{
                    font-size:32px;
                    color:#333;
                    font-weight: bold;
                    height: 32px;
                    line-height: 32px;
                  }
                  .tab_span_none{
                    position:absolute;
                    top:35px;
                    left:20px;
                    display:inline-block;
                    width:52px;
                    height:8px;
                    border-radius: 4px;
                    background:linear-gradient(90deg,rgba(255,175,3,1),rgba(255,96,0,1));
                    box-shadow:0px 2px 4px 0px rgba(255,124,1,0.4);
                  }
                }
                .tab_span{
                  display: block;
                  font-size: 28px;
                  height:28px;
                  line-height: 28px;
                  color:#666;
                }
              }
            }
          }
        }
        // 图片
        .nav_tab_pic{
          width: 100%;
          margin-top:16px;
          margin-bottom:30px;
          .nav_tab_box_pic{
            border-radius: 10px;
             margin:0 30px;
             overflow: hidden;
            // 图片
            .tab_ul_pic{
              display: flex;
              flex-wrap: nowrap;
              .tab_li_pic{
                display:inline-block;
                transition: all 0.3s ease-in-out;
                width: 100%;
                .tab_img{
                  display: block;
                  width:690px;
                  height:413px;
                }
              }
            }
          }
        }
        // 选项卡2
        .nav_tab2{
          margin-left:30px;
          overflow: hidden;
          height:50px;
          .nav_tab_box{
            overflow-x: auto;
            width:750px;
            height:70px;
            position: relative;
            // 文案
            .tab_ul{
              width:970px;
              display:flex;
              flex-wrap: nowrap;
              height: 50px;
              .tab_li{
                margin-left:25px;
                margin-right:25px;
                display: inline-block;
                height:26px;
                line-height: 26px;
                margin-top:3px;
                position: relative;
                &:first-child{
                  margin-left:0px;
                }
                &.action{
                  height:30px;
                  line-height: 30px;
                  margin-top:0;
                  .tab_span{
                    font-size:30px;
                    color:#333;
                    font-weight: bold;
                    height: 30px;
                    line-height: 30px;
                  }
                  .tab_span_none{
                    position:absolute;
                    top:35px;
                    left:20px;
                    display:inline-block;
                    width:52px;
                    height:8px;
                    border-radius: 4px;
                    background:linear-gradient(90deg,rgba(255,175,3,1),rgba(255,96,0,1));
                    box-shadow:0px 2px 4px 0px rgba(255,124,1,0.4);
                  }
                }
                .tab_span{
                  display: block;
                  font-size: 26px;
                  height:26px;
                  line-height: 26px;
                  color:#666;
                }
              }
            }
            .nav_line{
              position:absolute;
              top:45px;
              left:0px;
              width:910px;
              height:1Px;
              background:rgba(0,0,0,1);
              opacity:0.1;
            }
          }
        }
        // 商品列表
        .goods_content{
          .nav_goods_ul{
            display: flex;
            flex-wrap:nowrap;
            transition: all 0.3s ease-in-out;
            .nav_goods_li{
              margin-left:30px;
              margin-right: 13px;
              flex-shrink: 0;
              transition: all 0.3s ease-in-out;
              // 内容
              .goods_list{
                width:707px;
                height:auto;
                ul{
                  &::after{
                    clear: both;
                    content:'';
                    display: block;
                  }
                  .goods_li{
                    width:340px;
                    height:450px;
                    box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                    border-radius:10px;
                    margin-right: 10px;
                    float: left;
                    margin-top:20px;
                    .goods_pic{
                      display: inline-block;
                      width:340px;
                      height:296px;
                    }
                    .goods_info{
                      .goods_word{
                        padding:0 20px;
                        color:#333;
                        font-size:26px;
                        display:-webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                      .goods_bottom{
                        margin-top:10px;
                        display:flex;
                        justify-content: space-between;
                        .goods_price{
                          display: inline-block;
                          color:#ff6501;
                          font-weight: bold;
                          margin-left:20px;
                          line-height: 36px;
                          .s1{
                            font-size: 14px;
                          }
                          .s2{
                            font-size: 22px;
                          }
                        }
                        .goods_car{
                          display: inline-block;
                          background-image:url('../../assets/image/images/main/goods_car.png');
                          background-size:100% 100%;
                          width:36px;
                          height:36px;
                          margin-top:10px;
                          margin-right: 20px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    // 解决方案
    .total_solution{
      .total_main{
        position:relative;
        overflow:hidden;
        .total_head{
          height:430px;
          .go_back{
            display: inline-block;
            position:absolute;
            top:13px;
            left:30px;
            background-image: url('../../assets/image/images/goods/return.png');
            background-size:100% 100%;
            width:50px;
            height:50px;
          }
          .total_pic{
            display: inline-block;
            background-image: url('../../assets/image/banner/banner2.png');
            background-size:100% 100%;
            width:750px;
            height:430px;
          }
          .total_word{
            color:#f8f8f8;
            font-size:44px;
            line-height:66px;
            display: inline-block;
            position:absolute;
            top:162px;
            left:30px;
            font-weight: bold;
            width:658px;
          }
        }
        // 
        .supply{
          margin-top:45px;
          margin-bottom:50px;
          .supply_word{
            display: inline-block;
            font-size:32px;
            color:#333;
            width:681px;
            margin-left:35px;
            text-align: center;
            font-weight: bold;
          }
          .supply_box{
            margin-top:15px;
            .supply_ul{
              display:flex;
              flex-wrap: wrap;
              margin:0 30px;
              .supply_li{
                width:330px;
                height:248px;
                margin-top:30px;
                margin-right:30px;
                box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                border-radius:10px;
                &:nth-child(2n){
                  margin-right:0px;
                }
                .supply_son{
                  width:330px;
                  height:248px;
                  .supply_son_pic{
                    display: block;
                    width:134px;
                    height:134px;
                    margin:0 auto;
                    padding-top:30px;
                  }
                  .supply_son_word{
                    font-size:24px;
                    color:#333;
                    display: block;
                    height:23px;
                    line-height:23px;
                    font-weight:bold;
                    text-align: center;
                    margin-top:30px;
                  }
                }
              }
            }
          }
        }
        //
        .internt{
          margin-top:100px;
          margin-bottom:50px;
          .supply_word{
            display: inline-block;
            font-size:32px;
            color:#333;
            width:670px;
            margin-left:41px;
            text-align: center;
            font-weight: bold;
          }
          .supply_box{
            margin-top:15px;
            .supply_ul{
              display:flex;
              flex-wrap: wrap;
              margin:0 30px;
              .supply_li{
                width:330px;
                height: 380px;
                margin-top:30px;
                margin-right:30px;
                box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                border-radius:10px;
                &:nth-child(2n){
                  margin-right:0px;
                }
                .supply_son{
                  width:330px;
                  height:380px;
                  .supply_son_pic{
                    display: block;
                    width:134px;
                    height:134px;
                    margin:0 auto;
                    padding-top:30px;
                  }
                  .supply_son_word{
                    font-size:24px;
                    color:#333;
                    display: block;
                    height:23px;
                    line-height:23px;
                    font-weight:bold;
                    text-align: center;
                    margin-top:30px;
                  }
                  .supply_son_word2{
                    display: block;
                    font-size:22px;
                    color:#333;
                    width:292px;
                    margin:0 auto;
                    padding-top:15px;
                  }
                }
              }
            }
          }
        }
        // 
        .map{
          margin-top:100px;
          .supply_word{
            display: inline-block;
            font-size:32px;
            color:#333;
            width:670px;
            margin-left:41px;
            text-align: center;
            font-weight: bold;
          }
          .map_box{
            margin-top:45px;
            margin-bottom:50px;
            .map_pic{
              width: 488px;
              height:416px;
              display:block;
              margin:0 auto;
            }
          }
          .map_content{
            width:690px;
            margin-left:30px;
            box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
            border-radius:10px;
            margin-bottom:30px;
            .map_top{
              padding:30px;
              position: relative;
              .map_s1{
                position:absolute;
                top:50px;
                left:30px;
                display: inline-block;
                width:40px;
                height:40px;
                background:#FF6901;
                color:#fff;
                z-index: 10;
                font-size:26px;
                font-weight: bold;
                line-height: 40px;
                text-align: center;
               &.two{
                 top:34px;
               }
              }
              .map_s2{
                display: inline-block;
                width:40px;
                height:40px;
                border:2px solid rgba(255,105,1,1);
                position: absolute;
                top:55px;
                left:35px;
                z-index: 1;
                box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                &.two{
                  top:39px;
                }
              }
              .map_s3{
                font-size:22px;
                color:#333;
                display:inline-block;
                padding-left:77px;
              }
            }
          }
        }
        // 
        .team{
          margin-top: 100px;
          margin-bottom:100px;
          .supply_word{
            display: inline-block;
            font-size:32px;
            color:#333;
            width:670px;
            margin-left:41px;
            text-align: center;
            font-weight: bold;
          }
          .team_box_pic{
            position: relative;
            margin-top:50px;
            margin-bottom:100px;
            .line{
              border:1px dashed #FF6901;
              display: inline-block;
              width: 575px;
              height:129px;
              margin-left:145px;
              margin-top:30px;
            }
            .center{
              width: 210px;
              height:210px;
              position: absolute;
              top:0;
              left:30px;
              .center_pic{
                display: inline-block;
                background-image: url('../../assets/image/images/total/center.png');
                background-size:100% 100%;
                width: 210px;
                height:210px;
              }
              .center_pic2{
                position:absolute;
                top:72px;
                left:85px;
                display: inline-block;
                background-image: url('../../assets/image/images/total/yunying.png');
                background-size:100% 100%;
                width:40px;
                height:36px;
              }
              .center_s1{
                position:absolute;
                top:120px;
                left:46px;
                font-size:20px;
                color:#fff;
                display:inline-block;
                height:20px;
                line-height: 20px;
              }
            }
            .son_box{
              position:absolute;
              top:0px;
              left:337px;
              &.phone{
                left:560px;
              }
              &.cehua{
                top:125px;
              }
              &.fenxi{
                top:125px;
                left:560px;
              }
              .team_pic{
                display:block;
                width:66px;
                height:66px;
                margin:0 auto;
              }
              .team_word{
                font-size:20px;
                color:#333;
                display:block;
                height:20px;
                line-height: 20px;
                margin-top:10px;
              }
            }
          }
          .team_box2{
            margin-left:30px;
              .top{
                width:386px;
                height:90px;
                box-shadow:0px 0px 8px 0px rgba(20,53,124,0.1);
                border-radius:10px;
                margin-bottom:30px;
                position: relative;
                &.two{
                  width:690px;
                  .word1{
                    background:#1387EA;
                  }
                }
                &.three{
                  width:690px;
                  height:116px;
                  .word1{
                    height:116px;
                    background:#EA5513;
                  }
                  .word2{
                    padding-top:29px;
                    height:56px;
                    line-height: 28px;
                  }
                }
                .word1{
                  display:inline-block;
                  position:absolute;
                  top:0;
                  left:0;
                  width:10px;
                  height:90px;
                  background:#EF8200;
                  border-top-left-radius:10px;
                  border-bottom-left-radius:10px;
                }
                .word2{
                  font-size:22px;
                  color:#333;
                  display: block;
                  font-weight: bold;
                  height:22px;
                  line-height: 22px;
                  padding-left:40px;
                  padding-top:34px;
                }
              }
          }
        }
        // 
        .together{
          width:100%;
          margin-bottom:80px;
          .together_top{
            text-align: center;
            margin-bottom:50px;
            .s1{
              color:#333;
              font-size:32px;
              font-weight: bold;
              display: block;
              height:32px;
              line-height: 32px;
            }
            .s2{
              font-size:20px;
              font-family:PingFang SC;
              display: block;
              height:16px;
              line-height: 16px;
              margin-top:20px;
            }
            .s3{
              margin:0 auto;
              width:68px;
              height:4px;
              background:#EA5513;
              display: block;
              margin-top:15px;
            }
          }
          .together_bottom{
            margin-left:30px;
            .together_ul{
              display:flex;
              flex-wrap: wrap;
              .together_li{
                width:210px;
                height:84px;
                border:1px solid #E5E5E5;
                margin-bottom:20px;
                margin-right:30px;
                &:nth-child(3n){
                  margin-right:0;
                }
              }
            }
          }
        }
        // 
        .flow{
          width:100%;
          margin-bottom:70px;
          .together_top{
            text-align: center;
            margin-bottom:50px;
            .s1{
              color:#333;
              font-size:32px;
              font-weight: bold;
              display: block;
              height:32px;
              line-height: 32px;
            }
            .s2{
              font-size:20px;
              font-family:PingFang SC;
              display: block;
              height:16px;
              line-height: 16px;
              margin-top:20px;
            }
            .s3{
              margin:0 auto;
              width:68px;
              height:4px;
              background:#EA5513;
              display: block;
              margin-top:15px;
            }
          }
          .together_bottom{
            margin:0 30px;
            height:265px;
            .toge_flow{
              position: relative;
              &.six{
                left:480px;
                top:216px;
              }
              &.three{
                left:480px;
                top:108px;
              }
              &.two{
                left:480px;
                .line_s3{
                  position:absolute;
                  top:58px;
                  left:21px;
                  display: inline-block;
                  height: 34px;
                  border:1px dashed #FF6901
                }
              }
              &.four{
                top:108px;
                .line_s3{
                  position:absolute;
                  top:58px;
                  left:21px;
                  display: inline-block;
                  height: 34px;
                  border:1px dashed #FF6901
                }
              }
              &.five{
                top:216px;
              }
              .map_s1{
                position:absolute;
                top:0;
                left:0;
                display: inline-block;
                width:40px;
                height:40px;
                background:#FF6901;
                color:#fff;
                z-index: 10;
                font-size:26px;
                font-weight: bold;
                line-height: 40px;
                text-align: center;
              }
              .map_s2{
                display: inline-block;
                width:40px;
                height:40px;
                border:2px solid rgba(255,105,1,1);
                position: absolute;
                top:5px;
                left:5px;
                z-index: 1;
                box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
              }
              .map_s3{
                position: absolute;
                top: 15px;
                left: 67px;
                font-size:22px;
                color:#333;
                font-weight: bold;
                display:inline-block;
                height:23px;
                line-height: 23px;
              }
              .line_s1{
                position:absolute;
                top:26px;
                left:280px;
                display: inline-block;
                width:181px;
                border:1px dashed #FF6901;
              }
            }
          }
        }
        // 
        .yxdt{
          height: 50px;
          width: 750px;
          margin-bottom:20px;
          .yxdt_pic{
            display:block;
            background-image: url('../../assets/image/images/total/yxdt.png');
            background-size:100% 100%;
            width:175px;
            height:50px;
            margin:0 auto;
          }
        }
      }
    }
    // 合作申请
    .application{
      background: #f8f8f8;
      .coop_main{
        position:relative;
        // 
        .coop_head{
          height:430px;
          .go_back{
            display: inline-block;
            position:absolute;
            top:13px;
            left:30px;
            background-image: url('../../assets/image/images/goods/return.png');
            background-size:100% 100%;
            width:50px;
            height:50px;
          }
          .coop_pic{
            display: inline-block;
            background-image: url('../../assets/image/images/coop/hzsq.png');
            background-size:100% 100%;
            width:750px;
            height:430px;
          }
          .coop_word{
            color:#f8f8f8;
            font-size:44px;
            height: 42px;
            line-height:42px;
            display: inline-block;
            position:absolute;
            top:115px;
            left:30px;
            font-weight: 600;
            width:671px;
            letter-spacing:3px;
            &.two{
              top:185px;
              font-size:30px;
              font-weight: 400;
              height:30px;
              line-height: 30px;
              width:646px;
              letter-spacing:0px;
            }
          }
          .btn{
            width: 552px;
            height: 60px;
            position:absolute;
            top:294px;
            left:30px;
            .apply{
              display:inline-block;
              width:180px;
              height:60px;
              line-height: 60px;
              text-align: center;
              font-size:24px;
              background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
              border-radius:30px;
              color:#fff;
              vertical-align: middle;
            }
            .seek{
              display: inline-block;
              height:23px;
              line-height: 23px;
              margin-left:30px;
              font-size:24px;
              color:#fff;
              vertical-align: middle;
            }
          }
        }
        // 
        .superiority{
          margin-top:50px;
          .sup_top{
            text-align: center;
            margin-bottom:46px;
            .s1{
              color:#333;
              font-size:32px;
              font-weight: bold;
              display: block;
              height:32px;
              line-height: 32px;
            }
            .s2{
              font-size:20px;
              font-family:PingFang SC;
              display: block;
              height:16px;
              line-height: 16px;
              margin-top:20px;
            }
            .s3{
              margin:0 auto;
              width:68px;
              height:8px;
              background:linear-gradient(90deg,rgba(253,104,45,1),rgba(255,167,15,1));
              box-shadow:0px 0px 16px 0px rgba(255,104,13,0.2);
              border-radius:4px;
              display: block;
              margin-top:15px;
            }
          }
          .sup_bottom{
            margin:0 30px;
            .sup_ul{
              display:flex;
              flex-wrap: wrap;
              margin-bottom:20px;
              .sup_li{
                width:330px;
                height: 60px;
                margin-right:30px;
                margin-bottom:30px;
                &:nth-child(2n){
                  margin-right:0;
                }
                .sup_pic{
                  display:inline-block;
                  width:60px;
                  height:60px;
                  vertical-align: middle;
                }
                .sup_word{
                  display:inline-block;
                  font-size:24px;
                  color:#333;
                  font-weight:bold;
                  height:23px;
                  line-height:23px;
                  vertical-align:middle;
                  padding-left:30px;
                }
              }
            }
          }
        }
        // 
        .settled{
          margin-top:50px;
          .set_top{
            text-align: center;
            margin-bottom:46px;
            .s1{
              color:#333;
              font-size:32px;
              font-weight: bold;
              display: block;
              height:32px;
              line-height: 32px;
            }
            .s2{
              font-size:20px;
              font-family:PingFang SC;
              display: block;
              height:16px;
              line-height: 16px;
              margin-top:20px;
            }
            .s3{
              margin:0 auto;
              width:68px;
              height:8px;
              background:linear-gradient(90deg,rgba(253,104,45,1),rgba(255,167,15,1));
              box-shadow:0px 0px 16px 0px rgba(255,104,13,0.2);
              border-radius:4px;
              display: block;
              margin-top:15px;
            }
          }
          .set_bottom{
            margin-left:50px;
            .set_box{
              height:40px;
              width:700px;
              position:relative;
              margin-bottom:20px;
              &:last-child{
                margin-bottom:50px;
              }
              .round_one{
                display:inline-block;
                position:absolute;
                width:40px;
                height:40px;
                background:#FFE2D4;
                border-radius: 50%;
                top:0;
                left:0;
              }
              .round_two{
                display: inline-block;
                position: absolute;
                top:5px;
                left:5px;
                background:#FF6901;
                width:30px;
                height:30px;
                border-radius:50%;
                color:#F3F3F3;
                text-align:center;
                line-height: 30px;
                font-size:26px;
              }
              .set_word{
                font-size:24px;
                color:#333;
                height:24px;
                line-height:24px;
                padding-left:88px;
                display: block;
                padding-top: 8px;
              }
            }
            .round_box{
              margin-left:16px;
              .round{
                display: block;
                width:8px;
                height:8px;
                border-radius: 50%;
                background:#FF6901;
                margin-bottom:16px;
                &:last-child{
                  margin-bottom:20px;
                }
              }
            }
          }
        }
        // 
        .yxdt{
          margin-top:20px;
          width:100%;
          height:50px;
          margin-bottom:20px;
          .yxdt_pic{
            display: block;
            width:175px;
            height:50px;
            background-image: url('../../assets/image/images/total/yxdt.png');
            background-size: 100% 100%;
            margin:0 auto;
          }
        }
      }
    }
    // 关于我们
    .about_us{
      .about_main{
        // 
        .about_head{
          height:430px;
          .go_back{
            display: inline-block;
            position:absolute;
            top:13px;
            left:30px;
            background-image: url('../../assets/image/images/goods/return.png');
            background-size:100% 100%;
            width:50px;
            height:50px;
          }
          .coop_pic{
            display: inline-block;
            background-image: url('../../assets/image/images/coop/hzsq.png');
            background-size:100% 100%;
            width:750px;
            height:430px;
          }
          .coop_word{
            color:#f8f8f8;
            font-size:44px;
            height: 42px;
            line-height:42px;
            display: inline-block;
            position:absolute;
            top:169px;
            left:30px;
            font-weight: 600;
            width:670px;
            letter-spacing:3px;
            &.two{
              top:240px;
              font-size:22px;
              font-weight: 400;
              height:21px;
              line-height: 22px;
              width:466px;
              letter-spacing:0px;
            }
          }
        }
        //
        .about_content{
            margin-top:50px;
            height:60px;
            width:750px;
            overflow: hidden;
          .about_nav_box{
            height:70px;
            overflow-x: auto;
            margin-left:30px;
            .about_nav_ul{
              height:60px;
              display: flex;
              flex-wrap: nowrap;
              width: 860px;
              .about_nav_li{
                width:150px;
                height:60px;
                margin-right:20px;
                border-radius:30px;
                text-align: center;
                background:#F6F6F6;
                &.action{
                  background:linear-gradient(62deg,rgba(253,104,45,1),rgba(255,167,15,1));
                  box-shadow:0px 0px 16px 0px rgba(255,104,13,0.2);
                  .about_nav_span{
                    color:#fff;
                  }
                }
                .about_nav_span{
                  display: block;
                  font-size:28px;
                  color:#333;
                  height:26px;
                  line-height: 26px;
                  padding-top: 17px;
                }
              }
            }
          }
        }
        //body
        .about_content_body{
          .about_body_ul{
            display: flex;
            transition: all 0.3s ease-in-out;
            .about_body_li{
              // 公司简介
              .company_info{
                .about_content2{
                  margin-top:40px;
                  height:330px;
                  overflow: hidden;
                  width:750px;
                  .about_nav_box2{
                    margin-left:30px;
                    overflow-x: auto;
                    height:350px;
                    .about_nav_ul2{
                      width:2160px;
                      display:flex;
                      flex-wrap: nowrap;
                      height:330px;
                      .about_nav_li2{
                        display: inline-block;
                        margin-right:30px;
                        width:500px;
                        height:300px;
                        &.action{
                          width:540px;
                          height: 330px;
                          .about_nav_img{
                            width:540px;
                            height: 330px;
                          }
                        }
                        .about_nav_img{
                          width:500px;
                          height:300px;
                          display: block;
                        }
                      }
                    }
                  }
                }
                .company{
                  margin:0 30px;
                  margin-top:58px;
                  .company_word{
                    font-size:26px;
                    color:#333;
                    display: inline-block;
                    &.s1{
                      margin-top:40px;
                    }
                  }
                }
                .company_box{
                  margin:0 30px;
                  margin-top:40px;
                  position:relative;
                  height:300px;
                  .company_pic{
                    display:inline-block;
                    width:690px;
                    height:300px;
                  }
                  .word{
                    font-size:20px;
                    height:19px;
                    line-height: 19px;
                    display: inline-block;
                    position:absolute;
                    top:20px;
                    left:30px;
                    color:#fff;
                    &.s2{
                      top:50px;
                    }
                    &.s3{
                      top:112px;
                    }
                    &.s4{
                      top:140px;
                    }
                    &.s5{
                      top:198px;
                    }
                    &.s6{
                      top:226px;
                    }
                    &.s7{
                      top:256px;
                    }
                  }
                }
                .yxdt{
                  margin-top:50px;
                  width:100%;
                  height:50px;
                  margin-bottom:20px;
                  .yxdt_pic{
                    display: block;
                    width:175px;
                    height:50px;
                    background-image: url('../../assets/image/images/total/yxdt.png');
                    background-size: 100% 100%;
                    margin:0 auto;
                  }
                }
              }
              // 发展历程
              .deve_history{
                margin-top:40px;
                width:100%;
                margin-left:30px;
                position: relative;
                .line{
                  display: inline-block;
                  width:4px;
                  height:1050px;
                  background:#FF6901;
                  position: absolute;
                  top: 0;
                  left:13px;
                }
                .history_box{
                  position: relative;
                  display: inline-block;
                  width:623px;
                  margin-left:72px;
                  &.two{
                    margin-top: 20px;
                    .word{
                      line-height: 32px;
                    }
                    &.three{
                      margin-top:40px;
                      .history_pic2{
                        background-image: url('../../assets/image/images/about_us/biaoqian.png');
                        background-size:100% 100%;
                        display: inline-block;
                        width:162px;
                        height:66px;
                      }
                      .pic_word{
                        font-size:22px;
                        color:#fff;
                        height:22px;
                        line-height: 22px;
                        display: inline-block;
                        position: absolute;
                        top:18px;
                        left:61px;
                      }
                    }
                  }
                  .history_pic{
                    position:absolute;
                    top:0px;
                    left:-72px;
                    display:block;
                    height:30px;
                    width:30px;
                    background-image: url('../../assets/image/images/about_us/round.png');
                    background-size:100% 100%;
                  }
                  .year{
                    display: block;
                    font-size:26px;
                    color:#FF6901;
                    height:25px;
                    line-height: 25px;
                    padding-top:3px;
                  }
                  .word{
                    display:block;
                    color: #333;
                    font-size:26px;
                    height: 26px;
                    line-height: 26px;
                    padding-top:20px;
                  }
                }
                .yxdt{
                  margin-top:22px;
                  width:100%;
                  height:50px;
                  margin-bottom:20px;
                  .yxdt_pic{
                    display: block;
                    width:175px;
                    height:50px;
                    background-image: url('../../assets/image/images/total/yxdt.png');
                    background-size: 100% 100%;
                    margin:0 auto;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>