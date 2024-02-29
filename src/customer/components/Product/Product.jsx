import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import request from "../../../utils/request";
import HomeCategoryCard from "../HomeCategoryCard/HomeCategoryCard";
import { homeCategoryData } from "../HomeCategory/HomeCategoryData";

export default function Product({ data, trademark }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataProduct, setDataProduct] = useState([]);
  const [nameCategory, setNameCategory] = useState("Categories");
  const itemsCategory = homeCategoryData;
  const render = useEffect(() => {
    setDataProduct(data);
    if (trademark) {
      const nameCate = itemsCategory.find((item) => item.id == trademark)?.name;
      setNameCategory(nameCate);
    } else {
      setNameCategory("Categories");
    }
  }, [data]);
  const sortOptions = [
    { name: "Tăng theo giá", category: "Price", type: true },
    { name: "Giảm theo giá", category: "Price", type: false },
    { name: "Name A > Z", category: "Name", type: true },
    { name: "Name Z > A", category: "Name", type: false },
  ];
  const uniqueNames = [...new Set(data.map((item) => item.categoryName))];
  const subCategories = uniqueNames.map((categoryName) => {
    const item = data.find((item) => item.categoryName === categoryName);
    return { name: item.categoryName, href: item.categoryName };
  });

  const productsPerPage = 6;
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleClickCategory = (categoryName) => {
    const dataNew = data.filter(
      (product) => product.categoryName === categoryName
    );
    if (dataNew) {
      setDataProduct(dataNew);
    }
  };
  const handleSort = (sort) => {
    let dataNew = [...dataProduct];
    if (sort?.category === "Price") {
      if (sort?.type) {
        dataNew = dataNew.sort((a, b) => a.newPrice - b.newPrice);
      } else {
        dataNew = dataNew.sort((a, b) => b.newPrice - a.newPrice);
      }
      setDataProduct(dataNew);
    } else if (sort?.category === "Name") {
      if (sort?.type) {
        dataNew = dataNew.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        dataNew = dataNew.sort((a, b) => b.name.localeCompare(a.name));
      }
      setDataProduct(dataNew);
    }
  };

  const offset = currentPage * productsPerPage;
  const currentPageData = dataProduct.slice(offset, offset + productsPerPage);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {dataProduct?.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="container mx-auto px-4">
          <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 justify-center">
            {itemsCategory?.map((item, index) => (
              <HomeCategoryCard cate={item} key={index} />
            ))}
          </div>
        </div>
        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-3">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {nameCategory ? nameCategory : "Categories"}
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item
                          key={option.name}
                          className={option.current ? "active" : ""}
                        >
                          {({ active }) => (
                            <button
                              className="m-2"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSort(option);
                              }}
                            >
                              <a
                                href={option.href}
                                className={active ? "active" : ""}
                              >
                                {option.name}
                              </a>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-4 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li
                      key={category?.name}
                      className="ml-5 text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClickCategory(category?.name);
                      }}
                    >
                      <a href="#pickCategory">{category?.name}</a>
                    </li>
                  ))}
                </ul>

                {/* {data?.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} */}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4">
                <div className="flex flex-wrap justify-center bg-white py-5 gap-3">
                  {currentPageData.map((item) => (
                    <ProductCard product={item} key={item.id} />
                  ))}
                </div>
                <ReactPaginate
                  previousLabel={
                    <span className="inline-flex items-center px-3 py-1 border border-gray-300 bg-white rounded-md cursor-pointer">
                      Previous
                    </span>
                  }
                  nextLabel={
                    <span className="inline-flex items-center px-3 py-1 border border-gray-300 bg-white rounded-md cursor-pointer">
                      Next
                    </span>
                  }
                  breakLabel={<span className="px-1">...</span>}
                  pageCount={Math.ceil(dataProduct.length / productsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={"flex justify-center items-center mt-4"}
                  activeClassName={"bg-blue-500 text-white"}
                  pageClassName={"mx-2"}
                  pageLinkClassName={
                    "text-gray-800 hover:text-white py-2 px-4 rounded-full"
                  }
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
