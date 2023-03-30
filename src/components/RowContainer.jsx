import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../assets/img/NotFound.svg";
import { useStateValue } from "../contexts/StateProvider";
import { actionType } from "../contexts/reducer";
import { toast } from "react-toastify";

const RowContainer = ({ flag, data, id }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems);

  // // add to cart
  // const addToCart = (product, id) => {
  //   const newItem = product;
  //   // check if the item is already in the cart
  //   const cartItem = items.find((item) => {
  //     return item.id === id;
  //   });
  //   // if cart item is already in the cart
  //   if (cartItem) {
  //     const newCart = items.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, qty: cartItem.qty + 1 };
  //       } else {
  //         return item;
  //       }
  //     });
  //     setItems(newCart);
  //     cartDispatch();
  //   } else {
  //     setItems([...items, newItem]);
  //     cartDispatch();
  //   }
  // };

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  useEffect(() => {
    addtocart(); // eslint-disable-next-line react-hooks/exhaustive-deps
    localStorage.setItem("cartItems", JSON.stringify(items)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div
      id={id}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth bg-gray-100  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-slate-200 rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => {
                  setItems([...cartItems, item]);
                  toast.success("Item added to cart successfully...!", {
                    autoClose: 2500,
                  });
                }}
                // onClick={() => addToCart(item, item.id)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="notfound" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available !
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
