import React from "react";
import Heroimage from "./aaaa.jpg"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="my-2 ">
      <section class="py-10 bg-white lg:py-0 h-fit ">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
            <div class="h-full pr-12 lg:order-2 lg:mb-30">
              <div class="mt-40 h-full lg:h-auto">
                <img
                className="my-32 "
                  class=" rounded-3xl "
                  src="https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
            </div>

            <div class="flex  justify-start py-0 lg:order-1 sm:py-16 lg:py-24 xl:py-40">
              <div>
                <h2 class="mt-2 text-3xl font-bold leading-tight text-[#17403C] sm:text-4xl lg:text-5xl lg:leading-tight">
                  Adgriadventure
                </h2>
                <p class="text-xl leading-relaxed text-black mt-9">
                  We are a website dedicated to agricultural tourism. It offers
                  a variety of unique and educational experiences that allow you
                  to learn about where your food comes from and connect with the
                  people who produce it.
                </p>
                <Link to="/Category"><a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center px-6 py-4 mt-12 text-base font-semibold text-black transition-all duration-200 bg-[#80B500] rounded-2xl hover:bg-[#679200] focus:bg-[#17403C]"
                  role="button"
                >
                  {" "}
                  Start now{" "}
                </a></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;