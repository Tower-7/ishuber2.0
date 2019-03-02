const Article = require('../Models/Common/article')
const Essay = require('../Models/Move/essay')
module.exports = {
    //主页
    index: async ctx => {
        let articles = await Article.findAllPublic()
        let essays = await Essay.findAll(Essay)
        await ctx.render('move/index',{
            articles: articles,
            essays: essays,
        })
    },
    //登陆注册页面
    sign: async ctx => {
        await ctx.render('move/sign')
    },
    //编辑碎片
    addEssay: async ctx => {
        await ctx.render('move/addEssay')
    },
    //添加碎片
    submitEssay: async ctx => {
        let essay = ctx.request.body
        let _essay = new Essay({
            author: ctx.session.user.name,
            coverPic: essay.coverPic,
            content: essay.content,
        })
        essays = await _essay.save()
        ctx.redirect('/m')
    },
    //文章详情页
    detailRead: async ctx => {
        let id = ctx.params.id
        let article = await Article.findById(Article,id)
        await ctx.render('move/detailRead',{
            article: article,
        })
    },
    //个人中心
    profile: async ctx => {
        await ctx.render('move/profile',{
            user: ctx.session.user
        })
    },
    //个人文章列表
    myArticle: async ctx => {
        let name = ctx.params.name
        let articles = await Article.findByName(Article,name)
        await ctx.render('move/myArticle',{
            articles:articles,
        })
    },
    //删除碎片
    delEssay: async ctx => {
        let id = ctx.params.id
        let name = ctx.session.name
        Essay.deletById(Essay,id)
        ctx.redirect('/m/myWrite/'+name)
    },
    //个人碎片列表
    myWrite: async ctx => {
        let name = ctx.params.name
        let essays = await Essay.findByName(Essay,name)
        await ctx.render('move/myWrite',{
            essays:essays,
        })
    },
    //预览文章
    viewUpdateArticle: async ctx => {
        let id = ctx.params.id
        let article = await Article.findById(Article,id)
        await ctx.render('move/addArticle',{
            article: article,
        })
    },
    //预览文章详情
    viewArticleContent: async ctx => {
        let id = ctx.params.id
        let article = await Article.findById(Article,id)
        await ctx.render('move/addArticleContent',{
            article: article,
        })
    },
    //验证登陆中间件
    signRequired: async(ctx,next) => {
        let user = ctx.session.user
        let url = ctx.request.originalUrl
        if(!user){
            return ctx.redirect('/m/sign?' + url)
        }
        await next()
    }
}