// components/ui/DataTable.jsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust import paths as needed

const DataTable = ({ headers, rows }) => {
  return (
    <Table className='h-60vh'>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((cells, index) => (
          <TableRow key={index}>
            {cells.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className="font-medium">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;



// : <Table className='h-60vh'>
// <TableCaption className="items-right">
//   {/* <Toolbar /> 
//   A list of your recent invoices.
//   <Pagination>
//   <PaginationContent>
//     <PaginationItem>
//       <PaginationPrevious href="#" />
//     </PaginationItem>
//     <PaginationItem>
//       <PaginationLink href="#">1</PaginationLink>
//     </PaginationItem>
//     <PaginationItem>
//       <PaginationLink href="#" isActive>
//         2
//       </PaginationLink>
//     </PaginationItem>
//     <PaginationItem>
//       <PaginationLink href="#">3</PaginationLink>
//     </PaginationItem>
//     <PaginationItem>
//       <PaginationEllipsis />
//     </PaginationItem>
//     <PaginationItem>
//       <PaginationNext href="#" />
//     </PaginationItem>
//   </PaginationContent>
// </Pagination> */}
// </TableCaption>
// <TableHeader >
//   <TableRow>
//     {datas.headers.map((header, index) => (
//       <TableHead key={index}>{header}</TableHead>
//     ))}
//     {/* <TableHead className="w-[100px]">Invoice</TableHead>
// <TableHead>Status</TableHead>
// <TableHead>Method</TableHead>
// <TableHead className="text-right">Amount</TableHead> */}
//   </TableRow>
// </TableHeader>
// <TableBody>
//   {datas.rows.map((cells, index) => (
//     <TableRow key={index}>
//       {cells.map((cell, index) => (
//         // <ScrollArea className="rounded-md border">
//         <TableCell key={index} className="font-medium">{cell}</TableCell>
//         // </ScrollArea>
//       ))}
//     </TableRow>
//   ))}
// </TableBody>
// {/* <TableRow>
// <TableCell className="font-medium">INV001</TableCell>
// <TableCell>Paid</TableCell>
// <TableCell>Credit Card</TableCell>
// <TableCell className="text-right">$250.00</TableCell>
// </TableRow> */}
// {/* <TableRow>
// <TableCell className="font-medium">INV001</TableCell>
// <TableCell>Paid</TableCell>
// <TableCell>Credit Card</TableCell>
// <TableCell className="text-right">$250.00</TableCell>
// </TableRow><TableRow>
// <TableCell className="font-medium">INV001</TableCell>
// <TableCell>Paid</TableCell>
// <TableCell>Credit Card</TableCell>
// <TableCell className="text-right">$250.00</TableCell>
// </TableRow> */}
// </Table>