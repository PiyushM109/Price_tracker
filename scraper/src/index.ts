import express from "express";
import { fetchProduct } from "./scrapper.js";

const main = async () => {
  const data = await fetchProduct(
    "https://www.amazon.in/BassHeads-102-Earphones-Multi-Function-Microphone/dp/B07S8PSW59/?_encoding=UTF8&ref_=pd_hp_d_btf_ci_mcx_mr_ca_id_hp_d"
  );
  console.log(data);
};

main();
