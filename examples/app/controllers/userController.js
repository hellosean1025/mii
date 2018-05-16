const mii = require('../../../src/index')

module.exports = class userController extends mii.controller{

  /**
   * path /api/user/list
   */
  async getListAction(){
    return this.render({
      code: 400,
      data: 'hello world'
    })
  }

  async getAction(){
    return this.render('200')
  }

  /**
   * path /api/user/add_one_user
   */
  async postAddOneUserAction(){
    this.render('hello world!!!')
  }

  async missAction(){
    this.render('404')
  }

  async anyProfileAction(){
    this.render(this.params)
  }
}
