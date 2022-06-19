import Address from '@/model/address.model'

class AddressSerive {
  async create(params: { id: string; address: string; phone: string; consignee: string }) {
    const { id, address, phone, consignee } = params
    const result = await Address.create({ user_id: id, address, phone, consignee })
    return result
  }

  async addressList(id: string) {
    // 获取分页数据
    const result = await Address.find({ user_id: id })
    return result
  }
}

export default new AddressSerive()
