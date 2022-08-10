// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { logger } from "ethers";

export default function secret(req, res) {
  res.status(200).json({
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  });
}
