import React from "react";

const Loading = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 py-10">
      {/* Image Skeleton */}
      <div className="px-4 md:px-10">
        <div className="w-full h-[560px] bg-gray-200 animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="px-4 sm:px-10 py-6 flex flex-col space-y-6">
        {/* Title and Price */}
        <div className="space-y-3">
          <div className="h-9 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-md w-1/4 animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-md w-1/3 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-md w-1/4 animate-pulse" />
          <div className="space-y-2 pl-10">
            <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse" />
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-8 mt-6 animate-pulse" />
          <div className="flex gap-16">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center w-full">
          <div className="font-clash text-clash-14 flex flex-col lg:flex-row lg:gap-6 items-start lg:items-center lg:my-10 w-full">
            <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse" />
            <div className="bg-gray-100 px-6 py-4 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="h-6 bg-gray-200 rounded-md w-24 animate-pulse" />
            </div>
          </div>
          <div className="w-full lg:w-auto mt-4 lg:mt-0">
            <div className="h-12 bg-gray-200 rounded-md w-full lg:w-40 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="col-span-1 md:col-span-2 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="w-full h-[200px] bg-gray-200 mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded-md w-1/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
