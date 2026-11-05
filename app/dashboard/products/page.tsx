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
} from "@/components/ui/pagination";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

"https://developer.mozilla.org/shared-assets/videos/flower.mp4";

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const parameters = useSearchParams();
	const currentPage = Number(parameters.get("pageNumber") || 1);
	const pageSize = Number(parameters.get("pageSize") || 10);

	const [pagination, setPagination] = useState({
		pageNumber: currentPage,
		pageSize,
		totalCount: 0,
		totalPages: 0,
	});

	console.log(parameters.get("pageSize"));
	console.log(parameters.get("pageNumber"));

	useEffect(() => {
		api
			.get("/api/products", {
				params: {
					pageNumber: currentPage,
					pageSize,
				},
			})
			.then((res) => {
				setProducts(res.data.products);
				setPagination(res.data.pagination);
			});
	}, [currentPage, pageSize]);

	const pageHref = (pageNumber: number) =>
		`/dashboard/products?pageSize=${pageSize}&pageNumber=${pageNumber}`;

	const visiblePages = Array.from(
		{ length: pagination.totalPages },
		(_, index) => index + 1,
	).filter(
		(page) =>
			page === 1 ||
			page === pagination.totalPages ||
			Math.abs(page - currentPage) <= 1,
	);

	return (
		<div className="w-full h-full space-y-5">
			<div className="w-full overflow-x-auto rounded-lg border bg-background">
				<Table className="min-w-[1100px]">
					<TableCaption className="py-4 text-sm text-muted-foreground">
						A list of your recent invoices.
					</TableCaption>
					<TableHeader className="bg-muted/50">
						<TableRow className="hover:bg-muted/50">
							<TableHead className="w-20"></TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">SKU</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Name</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Stock</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Status</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Price</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Compare At</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Brand</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Model</TableHead>
							<TableHead className="text-xs font-semibold uppercase tracking-wide">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((item) => {
							return (
								<TableRow
									key={item.id}
									className="transition-colors hover:bg-muted/40"
								>
									<TableCell className="py-3">
										<img
											src={item.media[0].url}
											alt={item.name}
											className="aspect-square w-12 rounded-md border object-cover"
										/>
										{/* <Image
                   src={item.media[0].url}
                   alt={item.name}
                   width={48}
                   height={48}
                   className="rounded-full"
                 /> */}
									</TableCell>
									<TableCell className="whitespace-nowrap font-mono text-sm">{item.sku}</TableCell>
									<TableCell className="font-medium">{item.name}</TableCell>
									<TableCell>{item.stock}</TableCell>
									<TableCell>{item.status}</TableCell>
									<TableCell>{item.price}</TableCell>
									<TableCell>{item.compareAt}</TableCell>
									<TableCell>{item.brand}</TableCell>
									<TableCell>{item.model}</TableCell>
									<TableCell></TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={pageHref(Math.max(1, currentPage - 1))}
							aria-disabled={currentPage <= 1}
							tabIndex={currentPage <= 1 ? -1 : undefined}
							className={
								currentPage <= 1
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>

					{visiblePages.map((page, index) => (
						<>
							{index > 0 && page - visiblePages[index - 1] > 1 && (
								<PaginationItem key={`ellipsis-${page}`}>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem key={page}>
								<PaginationLink
									href={pageHref(page)}
									isActive={page === currentPage}
									aria-current={page === currentPage ? "page" : undefined}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						</>
					))}

					<PaginationItem>
						<PaginationNext
							href={pageHref(
								Math.min(pagination.totalPages, currentPage + 1),
							)}
							aria-disabled={
								pagination.totalPages === 0 ||
								currentPage >= pagination.totalPages
							}
							tabIndex={
								pagination.totalPages === 0 ||
								currentPage >= pagination.totalPages
									? -1
									: undefined
							}
							className={
								pagination.totalPages === 0 ||
								currentPage >= pagination.totalPages
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}