const http = uni.$u.http

const baseURL = 'http://api.huokexinxi.com' /* 根域名 */

// 查询用户收支记录
export const getTeamsApi = (userId) => http.get(
  `${baseURL}/api/user/teams/${userId}`,
)