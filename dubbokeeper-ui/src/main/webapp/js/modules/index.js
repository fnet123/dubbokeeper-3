var dubbokeeper=angular.module("dubbokeeper",["apps","head","menu","breadCrumb",'dialog','statistics','monitor','httpWrapper','override','router','theme']);
dubbokeeper.controller("dubbokeeperCtrl",function($scope,$dkContext){
    $dkContext._init($scope);
    $scope.currentHome={};
});
dubbokeeper.barDataset=[{
    barShowName:"仪表盘",
    barIdentify:"dashboard",
    barHref:"/statistics",
    barIconClass:"icon-dashboard"
},{
    barShowName:"服务管理",
    barIdentify:"admin",
    barHref:"/admin/apps",
    barIconClass:"glyphicon glyphicon-user",
    menus:[{
        showName:"应用列表",
        identify:"admin/apps",
        href:"/admin/apps",
        icon:"icon-cloud",
        isHome:true
    },{
        showName:"动态配置",
        identify:"admin/dynamicConfig",
        href:"/admin/override/list",
        icon:"icon-cogs"
    },{
        showName:"路由规则",
        identify:"admin/routeConfig",
        href:"/admin/route/list",
        icon:"icon-random"
    }]
},{
    barShowName:"实时监控",
    barIdentify:"monitor",
    barHref:"/monitor/elapsed",
    barIconClass:"icon-bar-chart",
    menus:[{
        showName:"耗时",
        identify:"monitor/elapsed",
        href:"/monitor/elapsed",
        icon:"glyphicon glyphicon-home",
        isHome:true
    }]
},{
    barShowName:"关于我们",
    barIdentify:"aboutus",
    barHref:"/statistics",
    barIconClass:"icon-bookmark"
}];
dubbokeeper.$dkContext= function () {
    var dubboKeeperContext = function () {
        this.inited=false;
    }
    dubboKeeperContext.prototype._init=function($scope){
        this.scope = $scope;
        if(this.temporaryContainer){
            for(var i=0;i<this.temporaryContainer.length;i++){
                this.scope[this.temporaryContainer[i].key]=this.temporaryContainer[i].value;
            }
        }
        this.inited=true;
    }
    dubboKeeperContext.prototype.changeProperty=function(key,value){
        if(this.inited){
            this.scope[key] = value;
        }else{
            if(this.temporaryContainer){
                this.temporaryContainer=[];
            }
            this.temporaryContainer.push({key:key,value:value});
        }
    }
    dubboKeeperContext.prototype.getProperty=function(key){
        if(this.scope){
            return this.scope[key];
        }
    }
    dubboKeeperContext.prototype.getBars=function(){
        return dubbokeeper.barDataset;
    }
    dubboKeeperContext.prototype.getBarByMenuIdentify=function(menuIdentify){
        for(var i=0;i<dubbokeeper.barDataset.length;i++){
            var bar = dubbokeeper.barDataset[i];
            if(bar.menus){
                for(var j=0;j<bar.menus.length;j++){
                    if(bar.menus[j].identify==menuIdentify){
                        return bar;
                    }
                }
            }
        }
    }
    this.$get = function () {
        return new dubboKeeperContext();
    };
}
dubbokeeper.provider("$dkContext",dubbokeeper.$dkContext);
