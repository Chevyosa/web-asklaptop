import React from "react";

const ProductSpecifications = ({ product }) => {
  const cleanCapacity = (val) => val?.replace(/\.0$/, "");
  const storageValue =
    (product.ssd_capacity > 0
      ? `${cleanCapacity(product.ssd_capacity)} GB SSD `
      : "") +
    (product.hdd_capacity > 0
      ? `${cleanCapacity(product.hdd_capacity)} GB HDD `
      : "") +
    (product.emmc_capacity > 0
      ? `${cleanCapacity(emmc_capacity)} GB eMMC `
      : "");

  const specifications = [
    {
      label: "Display",
      value:
        product.screen_size +
        "-Inch " +
        product.screen_res +
        " " +
        product.screen_type,
    },
    {
      label: "Processor",
      value: product.processor_brand + " " + product.processor_name,
    },
    { label: "RAM", value: product.memory + "GB " + product.memory_type },
    ...(storageValue.trim() // hanya push kalau ada isinya
      ? [{ label: "Total storage capacity", value: storageValue }]
      : []),
    { label: "Video card chipset", value: product.graphic_processor },
  ];

  return (
    <div className="w-full">
      <table className="w-full max-w-[700px] border-collapse mx-auto">
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className={index % 2 !== 0 ? "bg-white rounded-lg" : ""}
            >
              <td
                className={`p-3 font-normal text-gray-700 w-1/2 ${
                  index % 2 !== 0 ? "rounded-l-lg" : ""
                }`}
              >
                {spec.label}
              </td>
              <td
                className={`p-3 text-gray-600 w-1/2 ${
                  index % 2 !== 0
                    ? "border-l-2 border-[#F5F5F5] rounded-r-lg"
                    : ""
                }`}
              >
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
