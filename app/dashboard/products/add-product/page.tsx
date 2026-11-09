
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [sku, setSKU] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState([]);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("0");
    const [status, setStatus] = useState("ACTIVE");
    const [price, setPrice] = useState("0");
    const [compareAtPrice, setCompareAtPrice] = useState("0");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");    
    const [media, setMedia] = useState([
        {
            url: "https://example.com/images/s26-ultra-front.jpg",
            type: "IMAGE",
        },
        {
            url: "https://example.com/videos/s26-ultra-demo.mp4",
            type: "VIDEO",
        },
    ]);

    async function addProduct() {

        setIsLoading(true);

        try{


            const stockInNumber = parseInt(stock)
            const priceInNumber = parseFloat(price)
            const compareAtPriceInNumber = parseFloat(compareAtPrice)

            const productData = {
                sku : sku,
                name : name,
                altNames : altNames,
                description : description,
                stock : stockInNumber,
                status : status,
                price : priceInNumber,
                compareAtPrice : compareAtPriceInNumber,
                brand : brand,
                model : model,
                media : media
            }

            await api.post("/api/products", productData)

            toast.success("Product added successfully!")

            // window.location.href = "/dashboard/products"
            router.push("/dashboard/products")

        }catch (error) {
            console.error("Error adding product:", error);
        }

        setIsLoading(false);
        

    }

    return (
        <div className="flex min-h-full w-full flex-col gap-5 pb-8">

            {/* Page Header */}
            <div className="sticky top-14 z-10 w-full rounded-xl border bg-background/95 p-4 shadow-sm backdrop-blur sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Add Product
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Add a new beauty product to your store.
                        </p>
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">

                        <Link
                            href="/dashboard/products"
                            className="flex-1 sm:flex-none"
                        >
                            <Button
                                variant="outline"
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            className="flex-1 sm:flex-none"
                            onClick={addProduct}
                            disabled={isLoading}
                        >
                            {
                                isLoading&&<Spinner />
                            }
                            {
                                isLoading?"Saving Product":"Save Product"
                            }

                            
                            {/* <Spinner /> Saving Product */}
                        </Button>

                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">

                {/* Basic Information */}
                <section className="rounded-xl border bg-background p-4 sm:p-6">

                    <div className="mb-6 space-y-1">
                        <h2 className="text-lg font-semibold">
                            Basic Information
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Enter the product name, SKU and description.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="sku">Product SKU</Label>
                            <Input
                                id="sku"
                                placeholder="e.g. CER-CRM-001"
                                value={sku}
                                onChange={(e) => setSKU(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="productName">Product Name</Label>
                            <Input
                                id="productName"
                                placeholder="e.g. Hydrating Vitamin C Face Cream"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the product, its ingredients, skin benefits, application method and suitable skin types..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[120px] resize-y"
                            />
                        </div>

                    </div>
                </section>

                {/* Inventory & Pricing */}
                <section className="rounded-xl border bg-background p-4 sm:p-6">

                    <div className="mb-6 space-y-1">
                        <h2 className="text-lg font-semibold">
                            Inventory & Pricing
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage product availability and selling prices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                                id="stock"
                                type="number"
                                min="0"
                                placeholder="e.g. 50"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="status">Product Status</Label>
                            <Input
                                id="status"
                                placeholder="e.g. ACTIVE"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Selling Price</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g. 2490.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="compareAtPrice">
                                Compare At Price
                            </Label>
                            <Input
                                id="compareAtPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g. 2990.00"
                                value={compareAtPrice}
                                onChange={(e) => setCompareAtPrice(e.target.value)}
                                className="h-10"
                            />
                        </div>

                    </div>
                </section>

                {/* Product Details */}
                <section className="rounded-xl border bg-background p-4 sm:p-6">

                    <div className="mb-6 space-y-1">
                        <h2 className="text-lg font-semibold">
                            Product Details
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Add the brand and product model information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input
                                id="brand"
                                placeholder="e.g. The Ordinary, CeraVe, L'Oréal"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="model">Model / Variant</Label>
                            <Input
                                id="model"
                                placeholder="e.g. Niacinamide 10% + Zinc 1%, 30ml"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="h-10"
                            />
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}
