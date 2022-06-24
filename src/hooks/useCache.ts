import NodeCache, { Key } from 'node-cache'

const myCache = new NodeCache()

export default () => {
  /**
   * 添加一个新缓存
   * @param cachename 缓存名
   * @param value 缓存值
   * @param ttl 缓存时间
   */
  const setCache = (cachename: Key, value: any, ttl: string | number) => {
    myCache.set(cachename, value, ttl)
  }

  /**
   * 获取缓存数据
   * @param cachename 缓存名
   */
  const getCache = (cachename: Key) => {
    return myCache.get(cachename)
  }

  /**
   * 删除缓存数据
   * @param cachename 缓存名
   */
  const delCache = (cachename: Key) => {
    myCache.del(cachename)
  }

  const getKeys = () => {
    return myCache.keys()
  }

  return {
    setCache,
    getCache,
    delCache,
    getKeys
  }
}
