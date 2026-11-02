import toast from "react-hot-toast";

const sampleVideo =
  "https://developer.mozilla.org/shared-assets/videos/flower.mp4";

export const products = [
  {
    id: "a1000000-0000-4000-8000-000000000001",
    sku: "SAL-SHP-001",
    name: "Moisturizing Shampoo",
    altNames: ["Hydrating Shampoo", "Daily Shampoo"],
    description: "Gentle moisturizing shampoo for dry and damaged hair. 250ml.",
    stock: 45,
    status: "ACTIVE",
    price: 1850,
    compareAt: 2200,
    brand: "Salon Essentials",
    model: "Hydrate 250",
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000001",
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000001",
      },
      {
        id: "b1000000-0000-4000-8000-000000000002",
        url: sampleVideo,
        type: "VIDEO",
        productId: "a1000000-0000-4000-8000-000000000001",
      },
    ],
  },
  {
    id: "a1000000-0000-4000-8000-000000000002",
    sku: "SAL-CON-002",
    name: "Repair Conditioner",
    altNames: ["Hair Conditioner"],
    description: "Conditioner that softens hair and helps reduce tangles. 250ml.",
    stock: 32,
    status: "ACTIVE",
    price: 2100,
    compareAt: null,
    brand: "Salon Essentials",
    model: "Repair 250",
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000003",
        url: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000002",
      },
    ],
  },
  {
    id: "a1000000-0000-4000-8000-000000000003",
    sku: "SAL-SER-003",
    name: "Smoothing Hair Serum",
    altNames: ["Anti-Frizz Serum", "Hair Serum"],
    description: "Lightweight finishing serum for smooth, shiny hair. 100ml.",
    stock: 18,
    status: "ACTIVE",
    price: 2750,
    compareAt: 3200,
    brand: "Glow Professional",
    model: "Smooth 100",
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000004",
        url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000003",
      },
      {
        id: "b1000000-0000-4000-8000-000000000005",
        url: sampleVideo,
        type: "VIDEO",
        productId: "a1000000-0000-4000-8000-000000000003",
      },
    ],
  },
  {
    id: "a1000000-0000-4000-8000-000000000004",
    sku: "SAL-CRM-004",
    name: "Daily Face Moisturizer",
    altNames: ["Face Cream", "Moisturizer"],
    description: "Lightweight daily moisturizer for soft and hydrated skin. 50ml.",
    stock: 24,
    status: "ACTIVE",
    price: 1650,
    compareAt: 1900,
    brand: "Glow Professional",
    model: null,
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000006",
        url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000004",
      },
    ],
  },
  {
    id: "a1000000-0000-4000-8000-000000000005",
    sku: "SAL-OIL-005",
    name: "Nourishing Hair Oil",
    altNames: ["Hair Oil", "Scalp Oil"],
    description: "Nourishing oil for scalp massage and hair care. 100ml.",
    stock: 0,
    status: "ACTIVE",
    price: 1450,
    compareAt: null,
    brand: "Botanical Care",
    model: "Nourish 100",
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000007",
        url: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000005",
      },
    ],
  },
  {
    id: "a1000000-0000-4000-8000-000000000006",
    sku: "SAL-MSK-006",
    name: "Deep Conditioning Hair Mask",
    altNames: ["Hair Mask", "Deep Conditioner"],
    description: "Intensive conditioning treatment for dry hair. 200ml.",
    stock: 8,
    status: "ACTIVE",
    price: 3400,
    compareAt: 3900,
    brand: "Salon Essentials",
    model: "Restore 200",
    media: [
      {
        id: "b1000000-0000-4000-8000-000000000008",
        url: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
        type: "IMAGE",
        productId: "a1000000-0000-4000-8000-000000000006",
      },
      {
        id: "b1000000-0000-4000-8000-000000000009",
        url: sampleVideo,
        type: "VIDEO",
        productId: "a1000000-0000-4000-8000-000000000006",
      },
    ],
  },
];

export default function ProductsPage(){
        
    return(
        <div className="w-full  h-full">
            {
                products.map(

                    (item )=>{

                        return(
                            <div key={item.id}>
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                                <p>Price: {item.price}</p>
                            </div>
                        )
                        

                    }

                )
            }
        </div>
    )
}