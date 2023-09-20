import {useId} from "react";
import {useEffect} from "react";
import {useState} from "react";
import pb from "@/api/pocketbase";
import {getPbImageURL} from "@/utils/getPbImageURL";
import ProductModal from "./ProductModal";
import {numberWithComma} from "@/utils/numberWithComma";
import {usePocketBaseFilteredData} from "@/hooks/usePocektBaseData";
import LazyImage from "@/utils/LazyImage";

function Products({collection}) {
  const {data, status} = usePocketBaseFilteredData(collection, 1, 20);

  if (data) {
    return (
      <div className="itemWrap">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mobile:grid-cols-2">
          {data?.items?.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Products;

function ProductItem({item, ...restProps}) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <li
      key={item.id}
      {...restProps}
      className="relative cursor-pointer"
      onClick={handleClick}>
      <div>
        <div className="imgFrame relative w-80 h-80 overflow-hidden">
          <LazyImage
            src={getPbImageURL(item, "image")}
            className="w-full transition-all ease-in hover:scale-110"
            alt={item.title}
          />
          <a href="/cart">
            <LazyImage
              src="/src/assets/images/menu/cart.svg"
              className="absolute bottom-0 right-0"
              alt=""
            />
          </a>
        </div>
        <div className="text py-6">
          <p className="title text-jj_22 pb-5 mb-[.3125rem] border-b overflow-hidden text-ellipsis whitespace-nowrap">
            {item.title}
          </p>
          <span className="price text-[#1c1c1b] opacity-70 text-jj_14 leading-none">
            {numberWithComma(item.price)}
          </span>
          <p className="desc text-[#1c1c1b] opacity-70 text-jj_14 mobile:text-sm mt-5 overflow-hidden text-ellipsis line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
      {isClicked && <ProductModal key={item.id} item={item} />}
    </li>
  );
}
