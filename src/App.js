import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [searchText, setSearchText] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  return(
    <>
    <SearchBar />
    <ProductTable products={products}/>
    </>
  )
}

function SearchBar() {
  return (
    <>
    <input placeHolder="Search..." type="text" autoFocus="on" className="mx-5 mt-5 p-1 pl-3 bg-gray-200 rounded-md"></input>
    <br></br>
    <input id="button" type="checkbox" className="ml-5 mr-2 mt-4"></input>
    <label>Only show products in stock.</label>
    </>
  )
}

function ProductTable({ products }) {
  let rows = []
  let lastCategory = null;
  products.sort((a, b) => {
    if (a.category < b.category)
      return -1;
    if (a.category > b.category)
      return 1;
    return 0
  });
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />)
      lastCategory = product.category
    }
    rows.push(<ProductRow product={product} />)
  });
  return (
    <table>
      <tr>
      <th className="px-10 py-2">Name</th>
      <th className="px-10 py-2">Price</th>
      </tr>
      {rows}
    </table>
  )
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="px-10 py-2">{category}</th>
    </tr>
  )
}

function ProductRow({ product }) {
  return (
    <tr>
      <td className="px-10"><font color={product.stocked ? "" : "red"}>{product.name}</font></td>
      <td className="px-10"  >{product.price}</td>
    </tr>
  )
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"},
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
];