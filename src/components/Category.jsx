import React from 'react'
import { category } from '../data/Data'

const Category = () => {
  return (
    <div>
      <div className="w-10/12 m-auto">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {category.map((cat, index) => (
              <div className="m-2" key={index}>
                <div>
                  {cat.img && (
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        className="rounded-3xl hover:scale-110 transition-all ease-in-out duration-700"
                        src={cat.img}
                        alt="catimg"
                      />
                      <p className="absolute rounded-full rounded-s-none p-3 border-white bg-gray-900 text-white bottom-0 left-0 text-sm md:text-lg capitalize">{cat.name}</p>
                    </div>
                  )}

                  {cat.imgs && cat.imgs.length > 0 && (
                    <div className=''>
                      {cat.imgs.map((image, key) => (
                        <div
                          key={key}
                          className="relative overflow-hidden rounded-3xl mb-4"
                        >
                          <img
                            src={image.img}
                            alt="img"
                            className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-all ease-in-out duration-700"
                          />
                          <p className="absolute rounded-3xl rounded-s-none p-3 border-white bg-gray-900 text-white bottom-0 text-sm md:text-lg capitalize">
                            {image.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category