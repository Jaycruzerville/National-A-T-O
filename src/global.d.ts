// src/global.d.ts
interface PaystackPop {
  resumeTransaction(
    reference: string,
    options: {
      onSuccess: (transaction: any) => void
      onCancel: () => void
    }
  ): void
}

interface Window {
  PaystackPop: new () => PaystackPop
}
