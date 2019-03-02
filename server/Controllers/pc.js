module.exports = {
    index: async ctx => {
        await ctx.render('pc/index',{layout:false})
    }
}