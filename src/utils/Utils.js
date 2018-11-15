
export default {
  /**
   * 封装userPage对象
   * @param current_page
   * @param page_size
   * @returns {{currentPage: *, pageSize: *}}
   */
  getUserPage (current_page, page_size) {
    const currentPage = current_page
    const pageSize = page_size
    var userPage
    userPage={currentPage,pageSize}
    return userPage
  }

}
