<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <div class="banner">
          <my-carousel :interval=5000 class="carousel">
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('activity/2019spring/')" class="cc-active">
              </div>
            </my-carousel-item>
            <!-- <my-carousel-item class="carousel-item">
              <div @click="$router.push('activity/xian')" class="xian-active">
              </div>
            </my-carousel-item>
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('wonderfulDay')" class="aa-active">
              </div>
            </my-carousel-item> -->
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('activity/free/')" class="fr-active">
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
        <div class="loginOrRegister-form">
          <div class="title">
            <span :class="{select: formType === 'login'}" @click="$router.push('Login')">登录</span>
            <span :class="{select: formType === 'register'}" @click="$router.push('Register')">注册</span>
          </div>
          <div class="register-body" v-show="formType === 'register'">
            <div v-if="registerForm.onStep < 3">
              <div class="import" v-if="registerForm.registerType==='phone'&& registerForm.onStep === 1"
                   :class="{error: registerForm.errorMsg === 'isRegister' || registerForm.errorMsg === 'formatPhoneError'}">
                <img style="margin-right: 10px" src="../../assets/img/login/lr-icon5.png"/>
                <Select class="login-select" v-model="registerForm.registerPhonePrefix" style="width:70px;margin-right: 10px">
                  <Option v-for="(item,index) in registerForm.phonePrefixList" :value="item.tel" :key="index"> +{{item.tel }}</Option>
                </Select>
                <input class="verificationPhone" v-model="registerForm.loginPhone" type="text" placeHolder="请输入手机号码" @blur="verifyIsRegister" @input="registerForm.errorMsg=''"/>
              </div>
              <div class="import" v-if="registerForm.registerType==='email'&& registerForm.onStep === 1" :class="{error: registerForm.errorMsg === 'formatEmailError'}">
                <img src="../../assets/img/login/lr-icon6.png"/>
                <input v-model="registerForm.loginEmail" type="text" placeHolder="请输入邮箱号码" @blur="verifyIsRegister" @input="registerForm.errorMsg=''"/>
              </div>
              <div class="import" v-if="registerForm.onStep === 2" :class="{error: registerForm.errorMsg === 'passwordTooEasy'}">
                <img src="../../assets/img/login/lr-icon2.png"/>
                <input v-model="registerForm.password" @focus="registerForm.passwordHint = true" @blur="registerPasswordBlur" @input="registerForm.errorMsg=''"
                       ref="registerPasInput" type="password"
                       placeHolder="请输入密码"/>
                <img style="cursor: pointer" @click="changeLoginPasType('registerPasInput')" src="../../assets/img/login/lr-icon3.png"/>
                <div class="popTip" v-show="registerForm.passwordHint">
                  <div><i :class="{reach: registerForm.passwordDegree > 0 }"></i>
                    <p>8-32个字符</p></div>
                  <div><i :class="{reach: registerForm.passwordDegree > 1 }"></i>
                    <p>包含数字、大小写字母</p></div>
                  <div><p style="color:rgba(102,102,102,1);">可输入特殊字符包括：!#$%_()^&*,-<>?@.+=</p></div>
                </div>
              </div>
              <div class="errorMsg">
                <div v-if="registerForm.errorMsg === 'isRegister'">
                  <i></i>
                  <p>此号码已经注册，请<span @click="$router.push('Login')">登录</span></p>
                </div>
                <div v-if="registerForm.errorMsg === 'formatPhoneError'">
                  <i></i>
                  <p>请输入正确的手机号码</p>
                </div>
                <div v-if="registerForm.errorMsg === 'formatEmailError'">
                  <i></i>
                  <p>请输入正确的邮箱地址</p>
                </div>
                <div v-if="registerForm.errorMsg === 'passwordTooEasy'">
                  <i></i>
                  <p>您输入的密码不符合格式要求，请重新输入</p>
                </div>
              </div>
              <!--              <div v-show="registerForm.onStep === 1">
                              <div id="captchaBox_registerCode" style="height: 40px"></div>
                              <div class="errorMsg">
                                <div v-if="registerForm.errorMsg === 'notSlidingCodeValidation'">
                                  <i></i>
                                  <p>您还没有通过验证</p>
                                </div>
                              </div>
                            </div>-->
              <div class="import" v-if="registerForm.onStep === 1" :class="{error: registerForm.errorMsg === 'verificationCodeMistake'}">
                <img src="../../assets/img/login/lr-icon4.png"/>
                <input class="verification" v-model="registerForm.verificationCode" type="text" @input="registerForm.errorMsg=''" placeHolder="请输入收到的验证码"/>
                <a @click="sendRegisterVailCodeCheck" :class="{disabled:registerForm.verificationCodeText !== '发送验证码' }">{{registerForm.verificationCodeText}}</a>
              </div>
              <div class="import" v-if="registerForm.onStep === 2" :class="{error: registerForm.errorMsg === 'notConfirmPassword'}">
                <img src="../../assets/img/login/lr-icon2.png"/>
                <input v-model="registerForm.passwordAffirm" ref="registerPasInputAffirm" @input="registerForm.errorMsg=''" type="password" placeHolder="请确认密码"/>
                <img style="cursor: pointer" @click="changeLoginPasType('registerPasInputAffirm')" src="../../assets/img/login/lr-icon3.png"/>
              </div>
              <div class="errorMsg">
                <div v-if="registerForm.errorMsg === 'verificationCodeMistake'">
                  <i></i>
                  <p>您的验证码输入有误，请重新输入</p>
                </div>
                <div v-if="registerForm.errorMsg === 'verificationCodeMistakeTanto'">
                  <i></i>
                  <p>您输入的验证码错误达4次，请点击<span @click="callService">联系客服</span></p>
                </div>
                <div v-if="registerForm.errorMsg === 'notGetVerificationCode'&&registerForm.registerType==='phone'">
                  <i></i>
                  <p>收不到验证码？请选择<span @click="changeToEmailRegister">邮箱注册</span>或<span @click="getRegisterVoiceCodeCheck">接收语音验证码</span></p>
                </div>
                <div v-if="registerForm.errorMsg === 'notGetVerificationCode'&&registerForm.registerType==='email'">
                  <i></i>
                  <p>收不到验证码？请选择<span @click="changeToPhoneRegister">手机注册</span></p>
                </div>
                <div v-if="registerForm.errorMsg === 'notConfirmPassword'">
                  <i></i>
                  <p>您两次输入的密码不同，请重新输入</p>
                </div>
              </div>
              <Checkbox v-model="registerForm.agreeStatus" v-if="registerForm.onStep < 3"><span style="margin-left: 10px;font-size: 14px">我已阅读并同意<span
                style="cursor: pointer;color:#4A97EE"
                @click="ruleModal = true">《新睿云用户使用协议》</span></span></Checkbox>
              <button v-if="registerForm.onStep === 1" @click="registerNextStep">下一步</button>
              <button v-if="registerForm.onStep === 2" @click="registerAndLogin">注册并登录</button>
              <div class="footer">
                <span v-show="registerForm.registerType==='phone'" @click="changeToEmailRegister">邮箱注册</span>
                <span v-show="registerForm.registerType==='email'" @click="changeToPhoneRegister">手机注册</span>
                <span style="float: right" v-if="false">我有推荐码</span>
              </div>
            </div>
            <div class="registerSuccess" v-if="registerForm.onStep === 3||registerForm.onStep === 4">
              <img src="../../assets/img/login/lr-icon9.png"/>
              <h2>注册成功</h2>
              <p>现在完成<span style="color: #2A99F2;cursor: pointer;text-decoration: underline" @click="$router.push('userCenter')"> 实名认证 </span>即可获得<span
                style="color: #FF624B"> 196元 </span>专属优惠券，还可参加<span style="color: #FF624B;cursor: pointer" @click="$router.push('fractive')"> 多款主机免费领 </span>活动。<span v-show="registerForm.onStep === 4">请联系您的专属客服小牛获取优惠券</span></p>
              <button @click="$router.push('userCenter')">前往认证</button>
              <router-link to="/">返回首页></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shade" v-show="onLogin">
      <div class="shade-center">
        <div class="spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="ruleModal" width="800" :scrollable="true">
      <p slot="header" class="modal-header-border" style="text-align: center">
        <span class="universal-modal-title">新睿云业务服务协议</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="rules">
          <div class="rulesContent">
            <p><strong>本网站（www.xrcloud.net）所提供服务是由北京允睿讯通科技有限公司新睿云向本网站注册用户提供的云计算产品和相关服务，
              详见本网站相关产品及服务介绍。本协议由您和北京允睿讯通科技有限公司签订。</strong></p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第一条 总则</strong></p>
            <p>1.1 北京允睿讯通科技有限公司（以下称“乙方”,网址：www.xrcloud.net）按照本协议的规定及不定期发布的操作规则向用户（以下称“甲方”）提供系列云产品及
              云业务服务（以下简称“ 本服务”）。</p>
            <p>1.2 甲方须同意: 乙方变更本服务或协议内容的，将在乙方本服务网络平台（www.xrcloud.net）（以下称“服务门户”）上以公告的方式予以公布，无需另行单独通知
              甲方；甲方在乙方公告之日起5个工作日之内可以选择继续使用原业务或调整后的本服务；若用户在本协议内容公告变更后继续使用本服务，表示用户已充分阅读、理解、接
              受并将遵守修改后的协议内容；若用户不同意修改后的内容，应告知乙方并终止使用本服务。</p>
            <p>1.3 甲方在使用乙方提供的各项服务之前，应仔细阅读本服务协议，如甲方不同意本服务协议及/或随时对其的修改，请停止使用乙方提供的服务。</p>
            <p style="margin-top: 20px;text-indent:0em"><strong>第二条 服务内容</strong></p>
            <p>2.1本服务主要包括乙方基于云计算资源、云存储资源、智能云网络、互联网接入等所提供的云主机、云存储、等服务内容。协议项下本服务的具体内容，以服务门户上展示
              并经甲方申请而由乙方实际向其提供的服务为准。乙方有权不断更新服务内容。</p>
            <p>2.2 乙方负责搭建服务门户，并给予甲方在服务门户中具有唯一识别性的账户，供甲方通过该账户登陆服务门户使用本服务。甲方账号和密码是甲方登录门户、办理和使用
              业务的重要凭证，除非另有约定或说明，凡该账户所发出的指令及相关行为均视为甲方的行为，甲方应承担由此造成的一切后果和责任。甲方应定期修改登录密码，并妥善保
              管账号和密码。</p>
            <p>2.3乙方通过QQ、MSN、邮箱等多种方式为甲方提供7天*8小时的服务支持；乙方通过服务电话热线为付费用户提供7天*24小时技术故障服务。</p>
            <p style="margin-top: 20px;text-indent:0em"><strong>第三条 费用及支付</strong></p>
            <p>3.1甲方使用本服务的，应当按照实际使用的服务项目（产品类型）向乙方缴纳服务费用。乙方提供的详细服务项目及资费请见：（网址）</p>
            <p>3.2甲方应保证账户内的余额充足，并在订购乙方提供的服务、生成订单后，于24小时内完成支付。对于逾期未完成支付的订单，乙方有权自行取消。</p>
            <p>3.3甲方若需要乙方开具发票，则在选择相应服务的同时，应在网站相应界面上申请开具发票，并按格式和要求填写单位、抬头、款项及邮寄地址；乙方在不违反国家相关法
              规和不超出可开具发票范围的前提下，为甲方开具并邮寄相关发票。</p>
            <p>3.4甲方如对应支付费用有异议且经双方确认核对确有错误的，乙方应予以调整。</p>
            <p style="margin-top: 20px;text-indent:0em"><strong>第四条 资质保证及使用规则</strong></p>
            <p>4.1 甲方承诺以其真实身份开通和使用本协议下云业务服务，且是具备相应民事权利能力和民事行为能力的自然人、法人或其他组织。甲方保证所提供的个人或单位身份资料
              信息与文件的真实、完整、准确、合法、有效，并承担相应的法律责任。乙方有权审查甲方所提供的身份信息与文件。</p>
            <p>4.2 甲方使用本服务开展互联网信息服务等相关业务的，甲方保证于本协议签订时及本协议有效期内持续具备开展该等业务所需的全部资质及/或履行相关手续。甲方应根据乙
              方要求签订《互联网云主机用户入网责任书》（附件一）、《网络信息安全承诺书》（附件二）、《新睿云云主机服务等级协议》（附件三）、并严格遵守在该等文件中的承诺。</p>
            <p>4.3 甲方应按照本协议及附件一、附件二约定向乙方提交上述资质证明文件、资料的原件供乙方审查，并提交复印件（加盖甲方公章；自然人签字确认）供乙方留存。甲方保证
              所提供资料的真实、完整、准确、合法、有效。</p>
            <p>4.4 在本协议有效期内，如甲方上述主体资格、资质证明文件所记载内容出现变更，甲方应在完成变更后尽快向乙方提供最新的文件。</p>
            <p>4.5 甲方使用本协议项下云业务服务从事非经营性互联网信息服务的，须严格遵循《非经营性互联网备案管理办法》等规定，甲方须对代备案网站用户信息进行动态维护和更新，
              并定期向乙方和乙方的行业主管部门报送网站管理所需信息。甲方承诺并确认：甲方及其最终用户所提交的所有备案信息真实、完整、合法、有效，当提供的备案信息发生变化
              时应及时到备案系统中提交更新信息，如因未及时更新而导致备案信息不准确，乙方有权依法采取暂停或终止提供云业务服务、断开网络接入等关闭处理措施。</p>
            <p>4.6 如甲方违反在本协议及附件一、附件二中任一项保证的，包括但不限于在本协议签订时不具备开展业务所需的全部资质许可、履行相关手续，或在本协议有效期内丧失全部
              或部分资质许可的，乙方有权暂停提供云业务服务，并要求甲方在限期内改正；如甲方在限期内未改正的，乙方有权终止本协议，并不承担任何责任。甲方应当承担违约责任，
              并赔偿乙方的相应损失。</p>
            <p>4.7甲方承诺，不得通过转让、出租、无偿使用或其他任何方式许可甲方之外的任何第三人使用本协议项下云业务服务。否则，乙方有权终止本协议，并追究甲方相应责任。</p>
            <p>4.8甲方负责其服务门户的账号和密码的保密和使用安全，如因甲方原因导致账号或密码泄露或为他人获取的，甲方自行承担损失和责任。甲方发现其账号或密码被他人非法
              使用或有使用异常的情况的，应及时根据乙方公布的处理方式通知乙方，并有权通知乙方采取措施暂停该账号的登录和使用。乙方在收到甲方要求采取措施暂停其账号登录和
              使用的通知后，应当要求甲方提供并核实与其注册身份信息相一致的个人或单位有效身份信息。乙方核实甲方所提供的个人或单位有效身份信息与所注册的身份信息相一致的，
              应当及时采取措施暂停甲方账号的登录和使用。甲方没有提供其个人或单位有效身份证件或者甲方提供的个人或单位有效身份证件与所注册的身份信息不一致的，乙方有权
              拒绝甲方前述请求，由此造成的损失由甲方自行承担。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第五条 数据私密性、数据知情权和数据可审查性</strong></p>
            <p>5.1乙方承诺甲方的数据互相隔离，不可互访。</p>
            <p>5.2乙方不会删除甲方数据，也不会将甲方数据、个人信息等泄露给任何第三方，除非政府监管部门监管审计需要。甲方所有数据不会存在国外数据中心或用于国外业务或数据
              分析。</p>
            <p>5.3乙方数据中心遵守国家法律合法建设，遵守中华人民共和国法律。甲方有权选择主数据的数据中心位置，有权选择备份数据跟主数据不在同一个数据中心，但是无法选择备
              份数据的数据中心具体位置。</p>
            <p>5.4乙方承诺甲方在必要的条件下，由于合规或是安全取证调查等原因，可以提供相关的信息。乙方承诺遵守国家相应的法律法规，配合政府监管部门的监管审查。提供的相关
              信息包括关键组件运行日志、运维人员操作记录等。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第六条 甲方的权利和义务</strong></p>
            <p>6.1甲方使用本协议项下云业务服务的，必须遵守《中华人民共和国电信条例》、《中华人民共和国计算机信息网络国际联网暂行规定》和其他有关法律、法规或相关规定，不
              得存在任何违法违规行为，不得侵犯乙方以及任何第三方的合法权益。</p>
            <p>6.1.1除遵从本协议其他条款及附件要求外，甲方使用本服务所发布、传输或存储的信息内容不得存在以下任一情形，且不得为他人发布、传输或存储该类信息内容提供任何便利
              （包括但不限于设置URL、链接等）：</p>
            <p style="text-indent:3em">（1）违反国家规定的政治宣传和/或新闻信息；涉及国家秘密和/或安全的信息。</p>
            <p style="text-indent:3em">（2）涉及封建迷信、淫秽色情、赌博、暴力、恐怖的信息内容和教唆犯罪的内容。</p>
            <p style="text-indent:3em">（3）违反国家民族政策和宗教政策的信息内容。</p>
            <p style="text-indent:3em">（4）博彩有奖、赌博游戏、“私服”、“外挂”等非法互联网出版活动。</p>
            <p style="text-indent:3em">（5）侮辱或者诽谤他人，侵害他人所有权或知识产权等合法权益。</p>
            <p style="text-indent:3em">（6）其它有损于社会秩序、社会治安、社会公共道德，违反法律法规强制性规定，或侵害他人合法权益的信息内容。</p>
            <p>6.1.2甲方不得有任何危害或可能危害云业务服务相关平台及网络安全和信息安全的行为，包括但不限于：</p>
            <p style="text-indent:3em">（1）对云业务服务相关平台的功能或者存储、处理、传输的数据和应用程序进行删除或者修改。</p>
            <p style="text-indent:3em">（2）利用网络及系统从事窃取或者破坏他人信息、损害他人合法权益的活动。</p>
            <p style="text-indent:3em">（3）故意制作、复制、传播计算机病毒或者以其他方式攻击他人服务。</p>
            <p style="text-indent:3em">（4）进行钓鱼、黑客、网络诈骗等非法行为，网站或空间中含有或涉嫌散播病毒、木马、恶意代码等，或通过虚拟主机对其他网站、主机进行涉嫌攻击
              行为如扫描、嗅探、ARP欺骗、DOS等。</p>
            <p style="text-indent:3em">（5）危害电信网络安全和信息安全的其他行为。</p>
            <p>6.1.3 除乙方明示许可外，对于乙方提供的操作系统等软件，甲方不得采取修改、翻译、改编、出租、转许可、在信息网络上传播或转让等方式，也不得逆向工程、反编译或试图以
              其他方式发现乙方提供的软件的源代码；</p>
            <p>6.1.4 甲方不散布电子邮件广告、垃圾邮件（SPAM）：不利用乙方提供的服务散发不受欢迎的或者未经请求的电子邮件、电子广告或包含反动、色情等违法或有害信息的电子邮件；</p>
            <p>6.1.5 甲方不得建立或利用设备、配置运行与本服务无关的程序或进程，而大量占用乙方云计算资源（如云服务器、网络带宽、存储空间等）所组成的平台中服务器内存、CPU或者
              网络带宽资源，给乙方云平台或者乙方的其他用户的网络、服务器（包括但不限于本地及外地和国际的网络、服务器等）、产品/应用等带来严重负荷，影响乙方与国际互联网或者
              乙方与特定网络、服务器及乙方内部的通畅联系，或者导致乙方云平台产品与服务或者乙方的其他用户网站所在的服务器宕机、死机或者用户基于云平台的产品/应用不可访问等；</p>
            <p>6.1.6甲方不进行任何改变或试图改变乙方提供的系统配置或破坏系统安全的行为；</p>
            <p>6.1.7 若甲方存在上述6.1.1～6.1.6条约定的任一情形的，乙方有权按相关规定暂停或终止提供云业务服务，保存有关记录，并向政府主管部门报告，由此引起的一切后果和责任
              由甲方负责。同时，乙方有权终止本协议，并不承担任何责任。</p>
            <p>6.2本服务使用过程中，对于甲方自行提供并使用的软件，甲方应保证该等软件的合法性和不侵权。如任何第三方主张甲方所使用软件侵犯其所有权或者知识产权等合法权益，甲方
              应负责解决，并赔偿乙方就此而承担的一切费用和损失。</p>
            <p>6.3甲方使用云业务服务所引起的一切后果由甲方承担。如因甲方使用云业务服务中所涉行为或内容不合法或侵权而导致乙方承担责任或对乙方造成损失的，甲方应负责解决，并赔
              偿乙方由此遭受的全部损失；同时乙方有权终止本协议。</p>
            <p>6.4在本协议有效期内，甲方对由乙方分配的IP地址具有使用权，且不可以任何方式转由他人使用。甲方不得私自使用乙方未分配给甲方的IP地址。甲方不再使用本服务时，则相关
              IP地址使用权由乙方收回。</p>
            <p>6.5对于甲方使用云业务服务过程中所涉自身信息和资料、数据（包括但不限于商业机密等）、最终用户及其他相关主体的信息和资料、数据等，甲方负责保密，并自行承担由此产
              生的一切后果和责任。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第七条 乙方权利和义务</strong></p>
            <p>7.1 乙方负责按照本协议约定的条件提供云业务服务及相关的支撑服务。</p>
            <p>7.2 乙方有权对甲方对外公布信息内容进行检查，一旦发现含有本协议约定的任何违法或有违社会公序良俗的内容、超出经营许可或备案项目范围的内容，或指向这些内容链接的
              数据或信息的，乙方有权要求甲方进行修改、删除；如甲方不予改正，则乙方有权终止对甲方服务。</p>
            <p>7.3 乙方有权根据相关法律法规要求及产品政策或服务功能随时拒绝甲方发布的网站、信息数据内容，如甲方不同意乙方拒绝其提交的网站、数据内容或不进行答复的，则乙方可
              终止甲方云业务服务。</p>
            <p>7.4 乙方将消除甲方非人为操作所出现的云计算资源、云存储资源、互联网接入故障，但因甲方原因和/或不可抗力以及非乙方控制范围之内的事项除外。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第八条 服务的变更、中断或终止</strong></p>
            <p>8.1乙方因技术进步或国家法律、政策变动等原因可对云业务服务的服务内容、业务功能、操作方法等做出调整，但调整时应按本协议约定提前公告甲方并提供相应解决方案。</p>
            <p>8.2如因系统维护或升级的需要而暂停云业务服务的，乙方将尽可能事先以公告方式通知甲方等用户。</p>
            <p>8.3 乙方依据本协议约定暂停向甲方提供本协议项下云业务服务的，应当通知甲方并告知暂停期间，暂停期间届满乙方应当及时恢复对甲方的服务。其中，非乙方原因造成的
              服务暂停，暂停期间甲方仍需正常付费。</p>
            <p> 8.4乙方依据本协议约定终止向甲方提供本协议项下云业务服务或终止本协议的，乙方有权立即终止提供服务并不退还任何款项（包括甲方尚未消费完毕的服务费用余额，
              本协议另有约定除外）。</p>
            <p>8.5 除法定或双方另行约定外，自本协议期满或因任何原因导致本协议提前终止之日起的7日内（注：云存储服务为30日内），乙方应继续存储甲方数据。逾期乙方将不再
              保留甲方数据，甲方需自行承担其数据被销毁后引发的一切后果。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第九条 违约责任</strong></p>
            <p>9.1双方应共同遵守本协议条款及相应附件规定，如一方违约给对方造成损失的，违约方应赔偿守约方的损失。</p>
            <p>9.2甲方逾期付费的，除向乙方补缴欠费外，每逾期1日应按照所欠金额的千分之三向乙方支付违约金。</p>
            <p>9.3 鉴于计算机、互联网的特殊性，下述情况不属于乙方违约：</p>
            <p style="text-indent:3em">9.3.1. 乙方在进行服务器配置、维护时，需要短时间中断服务；</p>
            <p style="text-indent:3em">9.3.2. 由于Internet上的通路阻塞造成甲方网站访问速度下降。</p>
            <p>9.4如果因乙方自身及其控制范围内原因造成甲方不能按约定正常使用本服务的，包括云计算资源、云存储资源、互联网接入故障，乙方以小时为单位向甲方赔偿，即连续
              达1小时不能正常提供服务的，延长一小时的服务期（以此类推）。如果因乙方原因造成甲方连续72小时不能按约定正常使用服务的，甲方有权终止云业务服务，并要求乙方
              进行赔偿。</p>
            <p>9.5 在任何情况下，乙方依据本协议向甲方承担的违约赔偿责任总额不得超过向甲方收取的违约所涉及服务已支付之[壹]月服务费用。</p>
            <p>9.6无论本协议其他条款是否有相反约定，乙方对因本协议项下违约行为而导致的甲方可得利益损失、商业信誉损失以及数据丢失或损坏等其他损失不承担责任。</p>
            <p>9.7为应对大数据业务中产生的海量中间数据乙方云服务器的实例提供充足的本地盘存储空间供您自主选择。如您选择乙方弹性云服务器实例，表明您完全同意本免责声明的全部内容。</p>
            <p>
              您理解并认可，本地盘存储使用的是连接到主机上的物理硬盘，由于物理硬盘可能出现机器损坏、瑕疵、磁道损坏等机械故障从而无法对数据存储提供充分的可靠保障，因此，本地盘存储不对其上面的数据做可靠性保证；尽管乙方已尽了勤勉、合理最大的努力，但仍然不能保证现有的安全技术措施将使您的数据不受任何形式的损失，您同意乙方不对由此原因造成的本地盘存储上任何数据的丢失、损毁等承担责任。
              在终止服务前，您应根据数据的重要性和敏感程度，定期对数据进行额外备份、清理、销毁、忽略或者其他相应操作。
              在终止服务后，乙方本地盘存储服务有权对本地盘存储进行快速格式化，无需对其上残留的任何数据负责，无需承担对本地盘存储上的数据进行清除或销毁的责任，无需对由于本地盘存储上的数据因未清理或未销毁而导致的泄露或造成任何损失而承担任何损失赔偿和责任。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第十条 保密</strong></p>
            <p>10.1未经对方书面许可，任何一方不得向第三方提供或者披露因本协议的签订和履行而得知的与对方业务有关的资料和信息，法律另有规定或本协议另有约定的除外。乙方
              向其关联公司提供或披露与甲方业务有关的资料和信息的，不受此限。</p>
            <p>10.2 保密责任不因本协议的无效、提前终止、解除或不具操作性而失效。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第十一条 不可抗力及免责</strong></p>
            <p>11.1甲方了解乙方按照“现状”和“可得到”的状态向甲方提供本服务，并且乙方对本服务不作任何明示或暗示的保证，包括但不限于服务的适用性、没有错误或疏漏、持续
              性、准确性、可靠性、适用于某一特定用途。同时，乙方不对本服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保
              证。但乙方应尽职尽责、诚实信用完成本服务。</p>
            <p>11.2如由于战争、骚乱、恐怖主义、自然灾害、国家法律法规或规章变动、网络安全、网络无法覆盖、电力故障、通信线路被人为破坏、黑客攻击、计算机病毒侵入或发作，
              导致协议双方或一方无法继续履行协议时，受影响方不承担违约责任，但应尽快书面通知对方，并协商适当延长协议的期限。在影响消除后，受影响方应及时通知对方，本协
              议继续执行。</p>
            <p>11.3如政府管理部门提出要求的，乙方将暂停或终止提供相应服务，且不承担任何责任。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第十二条 法律适用和争议解决</strong></p>
            <p>12.1本协议适用中华人民共和国法律。</p>
            <p>12.2所有因本协议引起的或与本协议有关的任何争议将通过双方友好协商解决。如果双方不能通过友好协商解决争议，则任何一方均可将该争议提交中国国际经济贸易仲裁委
              员会按照申请仲裁时该会的仲裁规则进行仲裁。仲裁在北京进行仲裁语言为中文。仲裁裁决是终局的，对双方均有约束力。仲裁费用由败诉方承担。</p>
            <p>12.3仲裁或诉讼进行过程中，双方将继续履行本协议未涉仲裁或诉讼的其它部分。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>第十三条 协议生效及其他</strong></p>
            <p>13.1甲方在乙方服务网站申请注册时，勾选此用户服务协议则代表甲方已认真阅读、明确理解并完全同意此服务协议中的所有条款。</p>
            <p>13.2双方同意，附件为本协议不可分割的部分，本协议连同其附件将构成甲方和乙方之间有关本服务的全部约定，并取代任何双方之前就与本协议有关事项达成的约定。若
              附件与协议正文有任何冲突，以协议正文为准。</p>
            <p>13.3如果本协议的任何条款在任何时候被确定为不合法、无效或不可强制执行时，本协议的其它条款的效力和履行应不受影响。</p>
            <p>13.4附件为本合同不可分割的部分。若附件与合同正文有任何冲突，以合同正文为准。</p>
            <p style="margin-top: 20px; text-indent:0em">本协议附件为：</p>
            <p style="text-indent:0em">附件一  《云业务服务使用责任书》</p>
            <p style="text-indent:0em">附件二  《网络信息安全承诺书》</p>
            <p style="text-indent:0em">附件三 《新睿云云主机服务等级协议》</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>附件一  《云业务服务使用责任书》</strong></p>
            <p style="text-indent:0em"><strong>云业务服务使用责任书</strong></p>
            <p style="margin-top: 20px; text-indent:0em">通过使用云业务服务接入电信公网的用户（“用户”）必须认真阅读《云业务服务使用责任书》（“《责任书》”），并
              自觉遵守《责任书》的各项规定。</p>
            <p style="text-indent:0em">一、用户接入电信公网，应遵守国家的有关法律、法规和行政规章制度。</p>
            <p style="text-indent:0em">二、用户保证具备从事互联网服务的全部合法必要的资质条件，包括但不限于营业执照、增值电信业务经营许可证、广告经营许可证、税务
              登记证、非经营性互联网信息服务备案证明以及北京允睿讯通科技有限公司（以下称“新睿云”）要求提交的其他资质证明，方得以使用新睿云提供的设备、设施合法
              开展业务。用户应主动向新睿云提供前述资质证明文件的原件交新睿云审核，复印件（加盖公章；自然人签字确认）提交新睿云备案。其中：</p>
            <p style="text-indent:1em">1、用户如从事电子公告、新闻、出版、教育、医疗保健、药品和医疗器械、文化、广播电影电视节目等特殊互联网信息服务，应当根据法律、
              行政法规以及国家有关规定经有关主管部门审核同意，履行批准或备案手续，并取得相关通信管理部门批准或备案文件。</p>
            <p style="text-indent:1em">2、用户如从事非经营性互联网信息服务，保证已首先登录工业和信息化部备案管理系统履行互联网备案手续，并按期履行年度审核手续。如
              当地通信管理部门要求履行非经营性互联网信息服务备案手续的，还应向其住所所在地通信管理部门履行非经营性互联网信息服务备案手续。</p>
            <p style="text-indent:1em">3、用户如从事经营性互联网服务，必须取得相应的增值电信业务经营许可证。</p>
            <p style="text-indent:1em">4、用户如从事经营性互联网服务，应当在其网站主页的显著位置标明其经营许可证编号；用户如从事非经营性互联网服务，用户网站开通时
              在主页底部的中央位置标明其备案编号，并在备案编号下方链接工业和信息化部备案管理系统网址，供公众查询核对，用户还需按照工业和信息化部备案管理系统的要求，
              将备案电子验证标识放置在其网站的指定目录下。</p>
            <p style="text-indent:1em">5、用户保证已履行其他法律、法规及部门规章所规定的手续或已取得有关资质证明文件。</p>
            <p style="text-indent:0em">三、用户不能利用电信公网从事危害国家安全、泄露国家机密等犯罪活动，不能利用电信公网查阅、复制和传播危害国家安全、妨碍社会治安
              和淫秽黄色的信息，不能利用电信公网发布恶意的、向他人挑衅的信息。若发现此类信息，新睿云将立即向相关部门报告，一切后果由用户自行负责。</p>
            <p style="text-indent:0em">四、用户必须建立有效的安全保密制度和技术保证措施，有义务按照新睿云的要求提供网络使用情况和有关资料，接受新睿云的网络安全管理
              和信息安全管理监控；用户需要提供其信息服务的有效检测手段，包括测试账号和密码，并在账号变更时书面知会新睿云。</p>
            <p style="text-indent:0em">五、用户在使用电信公网时，不得从事危害他人信息系统和网络安全、侵犯他人权益的活动。当网络出现异常情况，应积极配合新睿云解决，
              用户维护设备或进行设备配置参数调整必须接受机房维护管理约定以避免对其他用户造成影响。</p>
            <p style="text-indent:0em">六、用户在进入新睿云机房时，应严格遵守机房的各项管理规定。</p>
            <p style="text-indent:0em">七、用户不得以任何方式经营未经政府管理部门批准的业务或双方未约定同意开展的业务，在协议有效期内对于新睿云分配的IP地址，用户只有使用权。</p>
            <p style="text-indent:0em">八、如用户违反上述保证，新睿云有权拒绝或停止提供服务或设施，并要求用户在限期内改正。如用户在限期内未改正的，新睿云有权终止双方
              合同，并不承担任何责任；用户存在前述情形给新睿云造成损失的，应当予以赔偿。</p>
            <p style="text-indent:0em">九、根据各省市公安局网监分局的要求，用户应在入网后 5 个工作日内在网上提交备案信息，提交信息后 10 个工作日内到相应省市公安局网监
              分局办理备案业务，相关法律法规、备案流程、备案材料清单请查阅当地公安局网站。</p>
            <p style="text-indent:0em">十、用户的各级主管人员有责任教育、监督服务使用者严格遵守上述条款。</p>
            <p style="text-indent:0em">十一、用户承诺与最终用户参照签订此类《云业务服务使用责任书》，并督促最终用户履行相应责任，否则，用户承担连带责任。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>附件二  《网络信息安全承诺书》</strong></p>
            <p style="text-indent:0em"><strong>网络信息安全承诺书</strong></p>
            <p style="text-indent:0em">甲方郑重承诺遵守本承诺书的有关条款，如有违反本承诺书有关条款的行为，甲方承担由此带来的一切民事、行政和刑事责任。</p>
            <p style="text-indent:0em">一、甲方承诺遵守《中华人民共和国计算机信息系统安全保护条例》和《计算机信息网络国际联网安全保护管理办法》及有关法律、法规和行政规章
              制度、文件规定。</p>
            <p style="text-indent:0em">二、甲方保证不利用网络危害国家安全、泄露国家秘密，不侵犯国家的、社会的、集体的利益和第三方的合法权益，不从事违法犯罪活动。</p>
            <p style="text-indent:0em">三、甲方承诺严格按照国家相关法律法规做好甲方网站的信息安全管理工作，按政府有关部门要求设立信息安全责任人和信息安全审查员，信息安全
              责任人和信息安全审查员应在通过公安机关的安全技术培训后，持证上岗。</p>
            <p style="text-indent:0em">四、甲方承诺健全各项网络安全管理制度和落实各项安全保护技术措施。</p>
            <p style="text-indent:0em">五、甲方承诺接受公安机关的监督和检查,如实主动提供有关安全保护的信息、资料及数据文件，积极协助查处通过国际联网的计算机信息网络违法犯罪行为。</p>
            <p style="text-indent:0em">六、甲方承诺不通过互联网制作、复制、查阅和传播下列信息：</p>
            <p style="text-indent:1em">1、反对宪法所确定的基本原则的。</p>
            <p style="text-indent:1em">2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。</p>
            <p style="text-indent:1em">3、损害国家荣誉和利益的。</p>
            <p style="text-indent:1em">4、煽动民族仇恨、民族歧视，破坏民族团结的。</p>
            <p style="text-indent:1em">5、破坏国家宗教政策，宣扬邪教和封建迷信的。</p>
            <p style="text-indent:1em">6、散布谣言，扰乱社会秩序，破坏社会稳定的。</p>
            <p style="text-indent:1em">7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的。</p>
            <p style="text-indent:1em">8、侮辱或者诽谤他人，侵害他人合法权益的。</p>
            <p style="text-indent:1em">9、含有法律法规禁止的其他内容的。</p>
            <p style="text-indent:0em">七、甲方承诺不从事任何危害计算机信息网络安全的活动，包括但不限于：</p>
            <p style="text-indent:1em">1、未经允许，进入计算机信息网络或者使用计算机信息网络资源的。</p>
            <p style="text-indent:1em">2、未经允许，对计算机信息网络功能进行删除、修改或者增加的。</p>
            <p style="text-indent:1em">3、未经允许，对计算机信息网络中存储或者传输的数据和应用程序进行删除、修改或者增加的。</p>
            <p style="text-indent:1em">4、故意制作、传播计算机病毒等破坏性程序的。</p>
            <p style="text-indent:1em">5、其他危害计算机信息网络安全的。</p>
            <p style="text-indent:0em">八、甲方承诺，当计算机信息系统发生重大安全事故时，立即采取应急措施，保留有关原始记录，并在24小时内向政府监管部门报告，并书面知会乙方。</p>
            <p style="text-indent:0em">九、若违反本承诺书有关条款和国家相关法律法规的，甲方直接承担相应法律责任，造成财产损失的，由甲方直接赔偿。同时，乙方有权暂停提供云
              服务直至解除服务协议。</p>
            <p style="text-indent:0em">十、用户承诺与最终用户参照签订此类《网络信息安全承诺书》，并督促最终用户履行相应责任，否则，用户承担连带责任。</p>
            <p style="text-indent:0em">十一、本承诺书自用户申请注册之日起生效并遵行。</p>
            <p style="margin-top: 20px; text-indent:0em"><strong>附件三  《新睿云云主机服务等级协议》</strong></p>
            <p style="text-indent:0em"><strong>新睿云云主机服务等级协议</strong></p>
            <p style="text-indent:0em">为规范乙方为甲方提供的云主机服务及相关的客户服务的质量，以保证甲方能获得良好的服务，甲乙双方特签订如下协议：</p>
            <p style="text-indent:0em">一、网络连通性保证</p>
            <p style="text-indent:1em">1   “网络连通性”是指乙方提供的公有云数据中心内云主机与互联网的连通性。</p>
            <p style="text-indent:1em">2   乙方保证提供给甲方的网络连通性为99.95%（百分之九十九点九五）。以下原因导致的网络不连通的情况例外：</p>
            <p>1）乙方预先通知甲方后进行维护所引起的；</p>
            <p>2）任何甲方的电路或设备所引起的；</p>
            <p>3）甲方的应用程序或安装活动所引起的；</p>
            <p>4）甲方的疏忽或由甲方授权的操作所引起的；</p>
            <p>5） 因不可抗力以及其他原因引起的。</p>
            <p style="text-indent:1em">3   违约补偿</p>
            <p>乙方在一个服务周期（服务周期以月为单位，不满一个月，不计算为一个服务周期）内未能按照承诺满足SLA要求，承诺给甲方进行违约补偿，具体如下：</p>
            <p>每月运行时间百分比<99.95%,补偿时长24小时；</p>
            <p>每月运行时间百分比<99%,补偿时长720小时。</p>
            <p>注：“每月运行时间百分比”的计算公式为 100% 减去甲方无法通过互联网进行访问时长（以分钟为单位）除以每月总时长，百分比计算结果以四舍五入计算。这可通过以下公式反映：</p>
            <p>每月运行时间百分比= 100% –无法通过互联网进行访问时长/每月总时长。</p>
            <p style="text-indent:0em">二、云主机可用性保证</p>
            <p>1    “云主机可用性”是指乙方分配给甲方的云主机系统正常运行。</p>
            <p>2  乙方保证甲方云主机系统99.95%（百分之九十九点九）的可用性。乙方保证交付给甲方的云主机、操作系统、网络和公网IP地址可用。甲方收到乙方提供的操作系统用户名和密码后
              ，及时修改妥善保管，进行验证后反馈乙方（2个工作日未反馈乙方，默认为甲方已验证能正常使用），此后甲方对操作系统以及系统上安装的应用程序负责。以下原因导致的甲方云主机不可用的情况例外：</p>
            <p style="text-indent:3em">1） 乙方预先通知甲方后进行云主机维护所引起的；</p>
            <p style="text-indent:3em">2） 何甲方的电路或设备所引起的；</p>
            <p style="text-indent:3em">3） 甲方的应用程序或安装活动所引起的；</p>
            <p style="text-indent:3em">4） 甲方的疏忽或由甲方授权的操作所引起的；</p>
            <p style="text-indent:3em">5） 甲方维护不当或保密不当致使数据、口令、密码等丢失或泄漏所引起的；</p>
            <p style="text-indent:3em">6） 甲方自行升级操作系统所引起的；</p>
            <p style="text-indent:3em">7） 因不可抗力以及其他原因引起的。</p>
            <p>3    违约补偿</p>
            <p>乙方在一个服务周期（服务周期以月为单位，不满一个月，不计算为一个服务周期）内未能按照承诺满足SLA要求，承诺给甲方进行违约补偿，具体如下：</p>
            <p>每月运行时间百分比<99.95%,补偿时长24小时；</p>
            <p>每月运行时间百分比<99%,补偿时长720小时。</p>
            <p>注：“每月运行时间百分比”的计算公式为100% 减去甲方云主机不可用时长（以分钟为单位）除以每月总时长，百分比计算结果以四舍五入计算。这可通过以下公式反映：</p>
            <p>每月运行时间百分比= 100% - 云主机不可用时长/每月总时长。</p>
            <p style="text-indent:0em">三、客户服务保证</p>
            <p>“故障受理”是指甲方在使用乙方云主机过程中出现影响业务使用的情况下，甲方通过乙方提供的客户服务热线进行申告或投诉并得到乙方的回复；</p>
            <p>“非故障受理”是指甲方在使用乙方云主机过程中遇到不影响业务使用等情况下通过乙方提供的客服热线向乙方咨询、申告或投诉并得到乙方的回复；</p>
            <p>“响应时间”是指自乙方收到甲方咨询、申告或投诉后回复的时间。</p>
            <p>乙方关于客户服务的保证：客户服务热线服务时间为7天×24小时，故障受理后响应时间为30分钟；非故障受理为7天×24小时，受理后响应时间为1小时。</p>
            <p style="text-indent:0em">四、技术支持保证</p>
            <p>1 乙方运维工程师服务时间为7天×24小时。</p>
            <p>2 甲方需要乙方工程师直接对其云主机进行操作时，需要向乙方工程师书面授权；甲方需在与乙方签订的协议中指定授权人（维护人），只有授权人有权利要求乙
              方工程师对其云主机进行操作；在甲方的授权人（维护人）变更时，甲方必须以书面形式通知乙方，书面授权必须有甲方授权人的签字；当甲方授权人无法以书面形式授权时
              ，可以通过邮件向乙方工程师授权，授权人必须通告其身份证号码以便确认，操作完成后需补交书面操作授权书。</p>
            <p style="text-indent:0em">五、不可抗力</p>
            <p>1 本协议中规定的不可抗力包括：</p>
            <p style="text-indent:3em">1.1 地震、台风、洪水、火灾等自然灾害；</p>
            <p style="text-indent:3em">1.2 战争、罢工、停电、政府行为；</p>
            <p>2 当由于上述不可抗力原因而使乙方无法履行保证时，乙方不承担责任；若由于不可抗力致使一方未能全部或部分履行本协议，经书面通知另一方，本合同内受到影响之
              条款可在不能履行之期间及受到影响之范围内不承担责任。一旦此类免除责任的原因得到纠正和补救，各方同意以最大努力恢复本合同项下的履行。</p>
            <p style="text-indent:0em">六、其他</p>
            <p>1 本承诺书自用户申请注册之日起生效并遵行。终止日期以《新睿云云主机服务协议》的终止为准。</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border" style="text-align: center">
        <Button @click="ruleModal = false,registerForm.agreeStatus = true">阅读并同意</Button>
      </div>
    </Modal>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
  .login-wrapper {
    @diff: 129px;
    min-height: calc(~"100% - @{diff}");
    width: 100%;
    background: #F4F4F4;
    .header {
      width: 100%;
      height: 70px;
      background-color: #333;
      .container {
        width: 1200px;
        height: 100%;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
          width: 130px;
          height: 36px;
          // background-color: #ffffff;
          margin: auto 0px;
          background: url(../../assets/img/app/logo.gif) no-repeat center;
          background-size: 110% 260%;
          background-position-y: -29px;
        }
        .home {
          font-size: 18px;
          height: 70px;
          padding: 0px 10px;
          vertical-align: center;
          cursor: pointer;
          a {
            line-height: 70px;
            color: #fff
          }
        }
      }
    }
    .wrapper {
      width: 100%;
      padding: 120px 0px;
      .wrapper-form {
        width: 1200px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .banner {
      height: 493px;
      width: 730px;
      cursor: pointer;
      .banner-text {
        padding: 140px 0 0 53px;
        > p {
          font-size: 24px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
        }
        p:nth-child(2) {
          margin-top: 9px;
          font-size: 40px;
          color: rgba(51, 51, 51, 1);
          line-height: 56px;
        }
        p:nth-child(3) {
          margin-top: 8px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
          span {
            color: rgba(255, 70, 43, 1);
            margin-right: 20px;
          }
        }
        button {
          outline: none;
          cursor: pointer;
          border: none;
          margin-top: 32px;
          background: rgba(255, 70, 43, 1);
          border-radius: 20px;
          font-size: 18px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255, 255, 255, 1);
          padding: 7px 29px;
        }
      }
      .cc-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/cc-banner.png") no-repeat;
      }
      .xian-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/xian-banner.png") no-repeat;
      }
      .aa-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/bb-banner.png") no-repeat;
      }
      .fr-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/fr-banner.png") no-repeat;
      }
    }
    .loginOrRegister-form {
      width: 421px;
      height: 493px;
      padding: 50px 40px;
      background: #FFFFFF;
      border: 1px solid rgba(161, 161, 161, 0.00);
      box-shadow: 0 2px 24px 0 hsla(0, 0%, 49%, .35);
      .title {
        display: flex;
        > span {
          display: inline-block;
          width: 50%;
          text-align: center;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          cursor: pointer;
          border-bottom: 1px solid #C8C8C8;
          line-height: 36px;
          &.select {
            color: rgba(42, 153, 242, 1);
            border-bottom: 4px solid rgba(42, 153, 242, 1);
          }
        }
      }
      .register-body {
        padding-top: 40px;
        .import {
          height: 46px;
          width: 340px;
          border-radius: 4px;
          border: 1px solid rgba(200, 200, 200, 1);
          display: flex;
          align-items: center;
          position: relative;
          &.error {
            border: 1px solid #ff0000;
          }
          > img {
            margin: 0 20px;
          }
          input {
            width: 70%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            &.verification {
              width: 55%;
              height: 70%;
              border-right: 1px solid rgba(200, 200, 200, 1);
            }
            &.verificationPhone {
              width: 55%;
              height: 70%;
              border-left: 1px solid rgba(200, 200, 200, 1);
              padding-left: 15px;
            }
          }
          a {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(42, 153, 242, 1);
            line-height: 44px;
            padding-left: 10px;
            &.disabled {
              cursor: not-allowed;
              color: #c8c8c8;
            }
          }
          .popTip {
            width: 300px;
            padding: 19px 21px;
            position: absolute;
            background: #FFF;
            border-radius: 8px;
            box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
            left: -90%;
            z-index: 3;
            > div {
              display: flex;
              > i {
                display: inline-block;
                border: 1px solid rgba(151, 151, 151, 1);
                margin-right: 3px;
                margin-top: 5px;
                height: 12px;
                width: 12px;
                border-radius: 6px;
                &.reach {
                  background: #09BC1D;
                  border: 1px solid #09BC1D;
                  &:before {
                    content: '';
                    display: inline-block;
                    background: #FFF;
                    height: 1px;
                    width: 10px;
                    transform: translate(3px, -8px) rotate(-55deg);
                  }
                  &:after {
                    content: '';
                    display: inline-block;
                    background: #FFF;
                    height: 1px;
                    width: 6px;
                    transform: translate(0px, -23px) rotate(215deg);
                  }
                }
              }
              > p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
              }
            }
          }
        }
        .errorMsg {
          height: 30px;
          > div {
            display: flex;
            padding: 8px 0;
            > i {
              width: 12px;
              height: 12px;
              background: rgba(255, 0, 0, 1);
              border-radius: 6px;
              margin-right: 5px;
              &:before {
                display: inline-block;
                width: 6px;
                height: 1px;
                content: '';
                background: #FFF;
                transform: translate(3px, -6px) rotate(-55deg)
              }
              &:after {
                display: inline-block;
                width: 6px;
                height: 1px;
                content: '';
                background: #FFF;
                transform: translate(-3px, -6px) rotate(55deg);
              }
            }
            > p {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(255, 0, 0, 1);
              > span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
          }
        }
        button {
          margin-top: 15px;
          height: 46px;
          width: 340px;
          background: rgba(42, 153, 242, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          border: none;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          &.notAllow {
            cursor: not-allowed;
          }
        }
        .footer {
          margin-top: 19px;
          > span {
            cursor: pointer;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(42, 153, 242, 1);
          }
        }
      }
      .registerSuccess {
        text-align: center;
        > h2 {
          font-size: 24px;
          margin-top: 10px;
          font-weight: normal;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
        }
        > p {
          margin-top: 20px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
        }
        > a {
          display: block;
          margin-top: 15px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
        }
      }
    }
    .shade {
      position: fixed;
      background-color: rgba(55, 55, 55, 0.6);
      height: 100%;
      width: 100%;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      .shade-center {
        height: 140px;
        width: 220px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
      }
    }
  }

  .rules {
    height: 500px;
    width: 750px;
    background: white;
    overflow-y: scroll;
    .rulesContent {
      margin: 20px 75px;
      & > p {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 14px;
        color: #2A2A2A;
        line-height: 25px;
        text-indent: 2em;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import areaTel from '../../options/area_tel'
  var debounce = require('throttle-debounce/debounce')
  import gt from '../../util/gt'

  export default {
    data() {
      return {
        regExpObj: {
          phone: /^1[3|5|8|9|6|7]\d{9}$/,
          email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,32}$/
        },
        formType: 'register',
        activeBanner: 1,
        ruleModal: false,
        registerForm: {
          phonePrefixList: areaTel,
          onStep: 1,
          registerPhonePrefix: '86',
          registerType: 'phone',
          loginPhone: '',
          loginEmail: '',
          password: '',
          passwordAffirm: '',
          passwordDegree: 0, // 密码强度
          passwordHint: false,
          errorMsg: '',//isRegister: 已注册 ； formatPhoneError： 手机格式不对；
          verificationCode: '',
          verificationCodeText: '发送验证码',
          verificationCodeTimer: null,
          agreeStatus: true,
          verificationCodeNum: 0, //验证码错误次数,
        },
        codeCaptchaObjStatus: false,
        codeCaptchaObj: null,
        onLogin: false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      /* 滑动验证初始化 -- 发送验证码*/
      gtInitCode() {
        let _self = this
        let url = 'user/silpInitialization.do'
        axios.get(url, {params: {}}).then(res => {
          if (res.status == 200) {
            // 绑定到按钮
            initGeetest({
              // 以下配置参数来自服务端 SDK
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success,
              new_captcha: true,
              product: 'bind',
            }, function (captchaObj) {
              captchaObj.onReady(function () {
                captchaObj.verify()
                _self.onLogin = false
              }).onSuccess(function () {
                _self.registerForm.errorMsg = ''
                var result = captchaObj.getValidate()
                let url = 'user/silpJudge.do'
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode
                }
                axios.get(url, {params: params}).then(response => {
                  if (response.data.status != '1') {
                    captchaObj.reset(); // 调用该接口进行重置
                  } else {
                    _self.sendRegisterVailCode()
                  }
                })
              }).onError(function () {
              })
            })
          }
        })
      },
      /* 滑动验证初始化 -- 发送语音验证码 */
      gtInitVoice() {
        let _self = this
        let url = 'user/silpInitialization.do'
        axios.get(url, {params: {}}).then(res => {
          if (res.status == 200) {
            // 绑定到按钮
            initGeetest({
              // 以下配置参数来自服务端 SDK
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success,
              new_captcha: true,
              product: 'bind',
            }, function (captchaObj) {
              captchaObj.onReady(function () {
                captchaObj.verify()
                _self.onLogin = false
              }).onSuccess(function () {
                _self.registerForm.errorMsg = ''
                var result = captchaObj.getValidate()
                let url = 'user/silpJudge.do'
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode
                }
                axios.get(url, {params: params}).then(response => {
                  if (response.data.status != '1') {
                    captchaObj.reset(); // 调用该接口进行重置
                  } else {
                    _self.getRegisterVoiceCode()
                  }
                })
              }).onError(function () {
              })
            })
          }
        })
      },
      /* 切换banner */
      change(activeIndex) {
        this.activeBanner = activeIndex + 1
      },
      /* 切换登录密码明文显示 */
      changeLoginPasType(name) {
        this.$refs[name].type === 'password' ? this.$refs[name].type = 'text' : this.$refs[name].type = 'password'
      },
      changeToEmailRegister() {
        this.registerForm.registerType = 'email'
        this.registerForm.errorMsg = ''
        this.registerForm.onStep = 1
      },
      changeToPhoneRegister() {
        this.registerForm.registerType = 'phone'
        this.registerForm.errorMsg = ''
        this.registerForm.onStep = 1
      },
      /* 校验手机号是否注册 */
      verifyIsRegister() {
        if (this.registerForm.registerType === 'phone') {
          if (this.regExpObj.phone.test(this.registerForm.loginPhone)) {
            axios.get('user/isRegister.do', {
              params: {
                username: this.registerForm.loginPhone
              }
            }).then(response => {
              if (response.status === 200 && response.data.status === 1) {
                this.registerForm.errorMsg = ''
              } else {
                this.registerForm.errorMsg = 'isRegister'
              }
            })
          } else {
            this.registerForm.errorMsg = 'formatPhoneError'
          }
        } else {
          if (this.regExpObj.email.test(this.registerForm.loginEmail)) {
            axios.get('user/isRegister.do', {
              params: {
                username: this.registerForm.loginEmail
              }
            }).then(response => {
              if (response.status === 200 && response.data.status === 1) {
                this.registerForm.errorMsg = ''
              } else {
                this.registerForm.errorMsg = 'isRegister'
              }
            })
          } else {
            this.registerForm.errorMsg = 'formatEmailError'
          }
        }
      },
      sendRegisterVailCodeCheck: debounce(200, function() {
        if (this.registerForm.registerType === 'phone') {
          if (!this.registerForm.loginPhone || !this.regExpObj.phone.test(this.registerForm.loginPhone)) {
            this.registerForm.errorMsg = 'formatPhoneError'
            return
          }
        } else {
          if (!this.registerForm.loginEmail || !this.regExpObj.email.test(this.registerForm.loginEmail)) {
            this.registerForm.errorMsg = 'formatEmailError'
            return
          }
        }
        if (this.registerForm.verificationCodeText !== '发送验证码') {
          return
        }
        let params = {}
        if (this.registerForm.registerType === 'phone') {
          params = {
            username: this.registerForm.loginPhone
          }
        } else {
          params = {
            username: this.registerForm.loginEmail
          }
        }
        axios.get('user/isRegister.do', {
          params
        }).then(response => {
          if (response.status === 200 && response.data.status === 1) {
            this.onLogin = true
            this.gtInitCode()
          } else {
            this.registerForm.errorMsg = 'isRegister'
          }
        })
      }),
      sendRegisterVailCode() {
        this.registerForm.verificationCodeText = '发送中'
        let url = 'user/code.do'
        let params = {}
        if (this.registerForm.registerType === 'phone') {
          params = {
            aim: this.registerForm.loginPhone,
            isemail: 0
          }
        } else {
          params = {
            aim: this.registerForm.loginEmail,
            isemail: 1
          }
        }
        axios.get(url, {params: params}).then(res => {
            if (res.data.status === 1 && res.status === 200) {
              this.registerForm.errorMsg = ''
              let i = 60
              this.registerForm.verificationCodeText = '60S'
              this.registerForm.verificationCodeTimer = setInterval(() => {
                i -= 1
                if (i < 10) {
                  this.registerForm.verificationCodeText = '0' + i + 'S'
                } else {
                  this.registerForm.verificationCodeText = i + 'S'
                }
                if (i === 0) {
                  this.registerForm.verificationCodeText = '发送验证码'
                  if (!this.registerForm.verificationCode) {
                    this.registerForm.errorMsg = 'notGetVerificationCode'
                  }
                  window.clearInterval(this.registerForm.verificationCodeTimer)
                }
              }, 1000)
            } else {
              this.registerForm.verificationCodeText = '发送验证码'
              this.$Message.info(res.data.message)
            }
          }
        )
      },
      getRegisterVoiceCodeCheck: debounce(200, function() {
        if (!this.regExpObj.phone.test(this.registerForm.loginPhone)) {
          this.registerForm.errorMsg = 'formatPhoneError'
          return
        }
        this.onLogin = true
        this.gtInitVoice()
      }),
      getRegisterVoiceCode() {
        let url = 'user/voiceCode.do'
        axios.get(url, {
          params: {
            aim: this.registerForm.loginPhone
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.registerForm.errorMsg = ''
            let i = 60
            this.registerForm.verificationCodeText = '60S'
            this.registerForm.verificationCodeTimer = setInterval(() => {
              i -= 1
              if (i < 10) {
                this.registerForm.verificationCodeText = '0' + i + 'S'
              } else {
                this.registerForm.verificationCodeText = i + 'S'
              }
              if (i === 0) {
                this.registerForm.verificationCodeText = '发送验证码'
                if (!this.registerForm.verificationCode) {
                  this.registerForm.errorMsg = 'notGetVerificationCode'
                }
                window.clearInterval(this.registerForm.verificationCodeTimer)
              }
            }, 1000)
          } else {
            this.$Message.info(res.data.message)
          }
        })
      },
      registerNextStep() {
        let params = {}
        if (this.registerForm.registerType === 'phone') {
          if (!this.registerForm.loginPhone) {
            this.registerForm.errorMsg = 'formatPhoneError'
            return
          }
          params = {
            username: this.registerForm.loginPhone
          }
        } else {
          if (!this.registerForm.loginEmail) {
            this.registerForm.errorMsg = 'formatEmailError'
            return
          }
          params = {
            username: this.registerForm.loginEmail
          }
        }
        if (!this.registerForm.verificationCode) {
          this.registerForm.errorMsg = 'verificationCodeMistake'
          return
        }
        if (this.registerForm.errorMsg) {
          return
        }
        if (!this.registerForm.agreeStatus) {
          this.$Message.info('请确认阅读并勾选用户使用协议')
          return
        }
        axios.get('user/isRegister.do', {
          params
        }).then(response => {
          if (response.status === 200 && response.data.status === 1) {
            let url = 'user/judgeCode.do'
            let params = {}
            if (this.registerForm.registerType === 'phone') {
              params = {
                aim: this.registerForm.loginPhone,
                code: this.registerForm.verificationCode,
                isemail: 0
              }
            } else {
              params = {
                aim: this.registerForm.loginEmail,
                code: this.registerForm.verificationCode,
                isemail: 1
              }
            }
            axios.get(url, {params: params}).then(res => {
              if (res.data.status === 1 && res.status === 200) {
                this.registerForm.errorMsg = ''
                this.registerForm.onStep = 2
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          } else {
            this.registerForm.errorMsg = 'isRegister'
          }
        })
      },
      registerPasswordBlur() {
        this.registerForm.passwordHint = false
        if (this.registerForm.passwordDegree < 2) {
          this.registerForm.errorMsg = 'passwordTooEasy'
        }
      },
      registerAndLogin() {
        if (this.registerForm.passwordDegree < 2) {
          this.registerForm.errorMsg = 'passwordTooEasy'
          return
        }
        if (this.registerForm.password !== this.registerForm.passwordAffirm) {
          this.registerForm.errorMsg = 'notConfirmPassword'
          return
        }
        if (!this.registerForm.agreeStatus) {
          this.$Message.info('请确认阅读并勾选用户使用协议')
          return
        }
        let params = {}
        if (this.registerForm.registerType === 'phone') {
          params = {
            username: this.registerForm.loginPhone,
            password: this.registerForm.password
          }
        } else {
          params = {
            username: this.registerForm.loginEmail,
            password: this.registerForm.password
          }
        }
        if (localStorage.getItem('comefrom')) {
          params.qdCode = localStorage.getItem('comefrom')
        }
        if (localStorage.getItem('sellCode')) {
          params.sellCode = localStorage.getItem('sellCode')
        }
        axios.get('user/register.do', {
          params
        }).then(response => {
          if (response.status === 200 && response.data.status === 1) {
            window._agl && window._agl.push(['track', ['success', {t: 3}]])
            this.registerForm.onStep = 3
          } else if (response.status === 200 && response.data.status === 3) {
            window._agl && window._agl.push(['track', ['success', {t: 3}]])
            this.registerForm.onStep = 4
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      callService() {
        window.open('tencent://message/?uin=1014172393&amp;Site=www.cloudsoar.com&amp;Menu=yes', '_blank')
      }
    },
    computed: {},
    watch: {
      'registerForm.password'(val) {
        if (val.length >= 8) {
          this.registerForm.passwordDegree = 1
        }
        if (this.regExpObj.password.test(val)) {
          this.registerForm.passwordDegree = 2
        }
      }
    }
  }
</script>
