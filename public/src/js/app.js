var app = {
    load: function () {
        app.header.event();
    },
    header : {
        event : function () {
            //탑베너 : 종료
            $('.closeTopBannerBtn').bind("click",function(e){
                $('.Wrap').addClass('disableTopBnr');
            });
            //로그인 : 바로가기
            $('.loginBtn').bind("click",function(e){
                $(location).attr("href","#");
            });
            //회원가입 : 바로가기
            $('.memberBtn').bind("click",function(e){
                $(location).attr("href","/member/membership.html");
            });
            //알림창 토글
            $('.userMailBtn').bind("click",function(e){
                $('.alarm').toggleClass('on')
            });
        }
    }
}
app.load();