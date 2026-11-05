"use client";
import toast from "react-hot-toast";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

const sampleVideo =
	"https://developer.mozilla.org/shared-assets/videos/flower.mp4";

export default function ProductsPage() {
	const [products, setProducts] = useState([])
	const parameters = useSearchParams();
  const [pagination, setPagination] = useState(
    {
      pageNumber: parameters.get("pageNumber") || 1,
      pageSize: parameters.get("pageSize") || 10,
      totalCount: 0,
      totalPages: 0
    }
  )

	console.log(parameters.get("pageSize"))
	console.log(parameters.get("pageNumber"))

	useEffect(() => {
		api
			.get("/api/products", {
				params: {
					pageNumber: parameters.get("pageNumber") || 1,
					pageSize: parameters.get("pageSize") || 10,
				},
			})
			.then((res) => {
				setProducts(res.data.products);
        console.log(res.data.pagination);
			});
	}, []);

	return (
		<div className="w-full  h-full">
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						<TableHead>SKU</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Compare At</TableHead>
						<TableHead>Brand</TableHead>
						<TableHead>Model</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((item) => {
						return (
							<TableRow key={item.id}>
								<TableCell>
									<img
										src={item.media[0].url}
										alt={item.name}
										className="w-12 aspect-square rounded-full"
									/>
									{/* <Image
                    src={item.media[0].url}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  /> */}
								</TableCell>
								<TableCell>{item.sku}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.stock}</TableCell>
								<TableCell>{item.status}</TableCell>
								<TableCell>{item.price}</TableCell>
								<TableCell>{item.compareAt}</TableCell>
								<TableCell>{item.brand}</TableCell>
								<TableCell>{item.model}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="/dashboard/products?pageSize=10&pageNumber=1">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="/dashboard/products?pageSize=10&pageNumber=2">
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="/dashboard/products?pageSize=10&pageNumber=3">
							3
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
