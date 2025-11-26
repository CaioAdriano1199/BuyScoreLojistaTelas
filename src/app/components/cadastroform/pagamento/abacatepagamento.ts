import AbacatePay from "abacatepay-nodejs-sdk";
import { CreateCustomerData, CreatePixQrCodeData} from "abacatepay-nodejs-sdk/dist/types";

const abacatepay= AbacatePay('abc_dev_yKhNFCBTud4nBm4sA5T6Xhzf')

export async function createPaymente(customer: CreateCustomerData){
  const data: CreatePixQrCodeData = {
    amount: 1000,
    expiresIn: 3500,
    customer,
    description: "Pagamento de teste"
  }

  const response = await abacatepay.pixQrCode.create(data)
  return response

}

export async function checkStatus(paymentId:string){
    const response = await abacatepay.pixQrCode.check({id: paymentId})
    return response
}

export async function simulatePayment(paymentId:string){
    const response = await abacatepay.pixQrCode.simulatePayment({id: paymentId})
    return response
}