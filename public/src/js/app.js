var app = {
    load: function () {
        app.header.event();
        app.header.resiseSearch();
        app.header.resizeActive();
    },
    header : {
        event : function () {
            //탑베너 : 종료
            $('.closeTopBannerBtn').bind("click",function(e){
                $('.Wrap').addClass('disableTopBnr');
                if (  $('#sort-menu') ) { // 페이지가 딜화면이라면
                    $('#sort-menu').scrollToFixed( {
                        marginTop: 46
                    });
                }
            });
            //로그인 : 바로가기
            $('.loginBtn').bind("click",function(e){
                //var url = $(this).attr("data-href");
                //$(location).attr("href",url);href
                // $.get( "/member/login_pop.html", function( data ) {
                //     $('#modal-box').html( data );
                //     $('#modal-box').modal('show');
                // });
            });

            //회원가입 : 바로가기
            $('.memberBtn').bind("click",function(e){
                $(location).attr("href","/member/membership.html");
            });
            //알림창 토글
            $('.userMailBtn').bind("click",function(e){
                $('.alarm').toggleClass('on')
            });

            // 모바일버전 탑메뉴 토글
            $('.mb-topmenu .listBtn, .closeSideMenuBtn').bind("click",function(e){
                $('.mobile-menu').toggleClass("active")
            });
        },
        resiseSearch : function() {
            var serchbox_width = $('.pc-topmenu').innerWidth() - $('.nav-control').innerWidth() - 250;
            if ( serchbox_width > 450 )  serchbox_width = 450;

            $('.searchBox').css('width',serchbox_width + 'px');
            $('.searchBox').find('#search_common_input').css('width',( serchbox_width - 80  ) + 'px');
        },
        resizeActive : function () {
            var _this = this;
            $( window ).resize(function() {
                _this.resiseSearch();
            });
        }
    }
}
app.load();
