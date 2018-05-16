const mii = require('../../../../src/index')

module.exports = class userController extends mii.controller{

  /**
   * path /api/user/list
   */
  async getListAction(){
    return this.render({
      code: 1000,
      data: 'hello world-xxx'
    })
  }

  async getAction(){
    return this.render('200-xxx')
  }

  /**
   * path /api/user/add_one_user
   */
  async postAddOneUserAction(){
    this.render('hello world!!!-xxx')
  }

  async missAction(){
    this.render('404-xxx')
  }

  async anyProfileAction(){
    this.render(this.params)
  }
}
