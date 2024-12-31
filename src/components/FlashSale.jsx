import React, {useState} from 'react'
import { products } from '../data/Data'
import Heading from '../common/Heading'
import { IoMdHeartEmpty, IoMdSearch } from 'react-icons/io'
import { BiCart } from 'react-icons/bi'
import Modal from '../common/Modal'

const FlashSale = () => {




  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (productId) => {
    setIsModalOpen(productId)
  }

  const handleClose = (productId) => {
    setIsModalOpen(productId)
  }




  return (
    <div>
      <div>
        <div className="w-10/12 m-auto">
          <Heading heading={"You are In Kitchen"} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.map((item, key) => (
              <div key={key} className="mt-8">
                <div className="overflow-hidden relative">
                  <div className="image-container relative">
                    <div className="rounded-3xl">
                      <img src={item.img} alt="itemimg" className="rounded-3xl" />
                    </div>

                    <div className="absolute top-0 right-0 m-1 opacity-0">
                      <div className="bg-white p-2 lg:p-4 rounded-full md-2">
                        <IoMdHeartEmpty />
                      </div>

                      <div className="bg-white p-2 lg:p-4 rounded-full">
                        <IoMdSearch />
                      </div>
                    </div>

                    <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-1 rounded-s-2xl">
                      <div className="bg-black text-white h-8 w-8 lg:w-10 lg:h-10 grid place-items-center rounded-3xl">
                        <button
                          className="text-xl"
                          onClick={() => handleOpen(item.id)}
                        >
                          <BiCart />
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="product-details mt-2">
                    <p className="mb-2">{item.title}</p>
                    <p>${item.price}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        data={products.find((item) => item.id=== isModalOpen)}
        handleClose={handleClose} />
    </div>
  );
};

export default FlashSale