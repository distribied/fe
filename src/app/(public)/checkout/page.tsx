export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <p className="text-muted-foreground">
              Form will be implemented here.
            </p>
          </div>
        </div>
        <div>
          <div className="border rounded-lg p-6 bg-muted/50">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-muted-foreground">
              Cart items will be listed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
