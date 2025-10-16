import Api from "@/utils/api"

class DriverService {
  async scanDriverQR(qrData: Record<string, unknown>) {
    try {
      const response = await Api.post("/api/drivers/scan-qr", { qrData })
      return response.data
    } catch (error) {
      console.error("Error scanning driver QR:", error)
      throw error
    }
  }

  async getDriverDetails(driverId: string) {
    try {
      const response = await Api.get(`/api/drivers/${driverId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching driver details:", error)
      throw error
    }
  }

  async getDriverVouchers(driverId: string) {
    try {
      const response = await Api.get(`/api/drivers/${driverId}/vouchers`)
      return response.data
    } catch (error) {
      console.error("Error fetching driver vouchers:", error)
      throw error
    }
  }
}

const driverService = new DriverService()
export default driverService
